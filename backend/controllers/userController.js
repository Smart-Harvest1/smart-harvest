import bcrypt from 'bcryptjs';
import prisma from '../config/db.js';

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

export async function listUsers(req, res) {
  const users = await prisma.user.findMany({
    select: { id: true, fullName: true, email: true, role: true, status: true, createdAt: true, updatedAt: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ users });
}

export async function getUser(req, res) {
  const userId = Number(req.params.id);
  if (req.user.id !== userId && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, fullName: true, email: true, role: true, status: true, createdAt: true, updatedAt: true },
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ user });
}

export async function createUser(req, res) {
  const { fullName, email, password, role, status } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'fullName, email and password are required' });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ error: 'Email is already registered' });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: passwordHash,
      role: normalizeRole(role),
      status: normalizeStatus(status),
    },
  });

  res.status(201).json({ user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role, status: user.status } });
}

export async function updateUser(req, res) {
  const userId = Number(req.params.id);
  const { fullName, password, role, status } = req.body;

  if (req.user.id !== userId && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const updates = {};
  if (fullName) updates.fullName = fullName;
  if (password) updates.password = await bcrypt.hash(password, 12);
  if (req.user.role === 'admin') {
    if (role) updates.role = normalizeRole(role);
    if (status) updates.status = normalizeStatus(status);
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: updates,
    select: { id: true, fullName: true, email: true, role: true, status: true, createdAt: true, updatedAt: true },
  });

  res.json({ user });
}

export async function deleteUser(req, res) {
  const userId = Number(req.params.id);
  await prisma.user.delete({ where: { id: userId } });
  res.status(204).send();
}
