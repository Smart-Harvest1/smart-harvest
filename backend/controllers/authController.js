import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'please-change-this-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h';
const ALLOWED_ROLES = ['admin', 'technician', 'viewer', 'farmer'];
const ALLOWED_STATUS = ['active', 'inactive', 'suspended'];

function normalizeRole(role) {
  const normalized = String(role ?? 'viewer').toLowerCase();
  return ALLOWED_ROLES.includes(normalized) ? normalized : 'viewer';
}

function normalizeStatus(status) {
  const normalized = String(status ?? 'active').toLowerCase();
  return ALLOWED_STATUS.includes(normalized) ? normalized : 'active';
}

function generateToken(user) {
  return jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export async function register(req, res) {
  const { fullName, email, password, role } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'fullName, email and password are required' });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ error: 'Email is already registered' });
  }

  const userCount = await prisma.user.count();
  const assignedRole = userCount === 0 ? normalizeRole(role || 'admin') : normalizeRole(role);
  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: passwordHash,
      role: assignedRole,
      status: normalizeStatus('active'),
    },
  });

  const token = generateToken(user);
  res.status(201).json({ user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role, status: user.status }, token, message: 'Registration successful' });
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = generateToken(user);
  res.json({ user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role, status: user.status }, token, message: 'Login successful' });
}

export async function me(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, fullName: true, email: true, role: true, status: true, createdAt: true, updatedAt: true },
  });

  res.json({ user });
}
