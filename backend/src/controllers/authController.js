import prisma from '../db.js';
import { comparePasswords, generateAccessToken, hashPassword, sanitizeRole } from '../auth.js';

export async function signup(req, res) {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'fullName, email and password are required' });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ error: 'Email is already registered' });
  }

  const userCount = await prisma.user.count();
  const assignedRole = sanitizeRole(role, userCount);
  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: passwordHash,
      role: assignedRole,
      status: 'ACTIVE',
    },
  });

  const token = generateAccessToken(user);
  res.status(201).json({
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
    },
    token,
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await comparePasswords(password, user.password))) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = generateAccessToken(user);
  res.json({
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
    },
    token,
  });
}

export async function me(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ user });
}
