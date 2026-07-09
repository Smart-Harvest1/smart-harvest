import prisma from '../db.js';
import { hashPassword, sanitizeRole, validateStatus } from '../auth.js';

export async function listUsers(req, res) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json(users);
}

export async function getUserById(req, res) {
  const userId = Number(req.params.id);

  if (req.user.id !== userId && req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
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

  res.json(user);
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

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: passwordHash,
      role: sanitizeRole(role, 0),
      status: validateStatus(status),
    },
  });

  res.status(201).json({
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    status: user.status,
  });
}

export async function updateUser(req, res) {
  const userId = Number(req.params.id);
  const { fullName, password, role, status } = req.body;

  if (req.user.id !== userId && req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const updates = {};
  if (fullName) updates.fullName = fullName;
  if (password) updates.password = await hashPassword(password);
  if (req.user.role === 'ADMIN') {
    if (role) updates.role = sanitizeRole(role, 0);
    if (status) updates.status = validateStatus(status);
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updates,
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

  res.json(updatedUser);
}

export async function deleteUser(req, res) {
  const userId = Number(req.params.id);
  await prisma.user.delete({ where: { id: userId } });
  res.status(204).send();
}
