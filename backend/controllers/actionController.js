import prisma from '../config/db.js';

export async function listActions(req, res) {
  const query = req.user.role === 'admin' ? {} : { userId: req.user.id };
  const actions = await prisma.action.findMany({
    where: query,
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { id: true, fullName: true, email: true, role: true } } },
  });
  res.json({ actions });
}

export async function getAction(req, res) {
  const actionId = Number(req.params.id);
  const action = await prisma.action.findUnique({
    where: { id: actionId },
    include: { user: { select: { id: true, fullName: true, email: true, role: true } } },
  });

  if (!action) {
    return res.status(404).json({ error: 'Action not found' });
  }

  if (req.user.role !== 'admin' && action.userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  res.json({ action });
}

export async function createAction(req, res) {
  const { type, payload, status } = req.body;
  const action = await prisma.action.create({
    data: {
      type: type?.trim() || 'general',
      payload: payload ? String(payload) : null,
      status: status?.trim() || 'pending',
      user: { connect: { id: req.user.id } },
    },
  });
  res.status(201).json({ action });
}

export async function updateAction(req, res) {
  const actionId = Number(req.params.id);
  const { type, payload, status } = req.body;
  const action = await prisma.action.update({
    where: { id: actionId },
    data: {
      type: type ?? undefined,
      payload: payload ? String(payload) : undefined,
      status: status ?? undefined,
    },
  });
  res.json({ action });
}

export async function deleteAction(req, res) {
  const actionId = Number(req.params.id);
  await prisma.action.delete({ where: { id: actionId } });
  res.status(204).send();
}
