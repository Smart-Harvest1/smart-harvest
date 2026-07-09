import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from './db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'please-change-this-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h';
const ALLOWED_ROLES = ['ADMIN', 'TECHNICIAN', 'VIEWER', 'FARMER'];
const ALLOWED_STATUSES = ['ACTIVE', 'INACTIVE', 'SUSPENDED'];

export const hashPassword = async (password) => {
  return bcrypt.hash(password, 12);
};

export const comparePasswords = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid token or user not found' });
    }

    req.user = { id: user.id, role: user.role };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
};

export const sanitizeRole = (role, existingUserCount) => {
  const normalized = String(role ?? '').toUpperCase();
  if (!ALLOWED_ROLES.includes(normalized)) {
    return 'VIEWER';
  }

  if (existingUserCount === 0) {
    return normalized;
  }

  return normalized === 'ADMIN' ? 'VIEWER' : normalized;
};

export const validateStatus = (status) => {
  const normalized = String(status ?? '').toUpperCase();
  return ALLOWED_STATUSES.includes(normalized) ? normalized : 'ACTIVE';
};
