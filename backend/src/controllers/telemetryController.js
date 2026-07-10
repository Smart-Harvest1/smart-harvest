import prisma from '../db.js';

export async function listTelemetry(req, res) {
  const results = await prisma.telemetry.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: { user: { select: { id: true, fullName: true, email: true, role: true } } },
  });
  res.json(results);
}

export async function createTelemetry(req, res) {
  const { key, value, source } = req.body;
  if (!key || value === undefined) return res.status(400).json({ error: 'key and value are required' });

  const telemetry = await prisma.telemetry.create({
    data: {
      key,
      value: typeof value === 'object' ? value : String(value),
      source: source ?? 'manual',
      user: { connect: { id: req.user.id } },
    },
  });

  res.status(201).json(telemetry);
}

export async function deleteTelemetry(req, res) {
  const id = Number(req.params.id);
  const item = await prisma.telemetry.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ error: 'Not found' });

  // allow owner, admin, technician to delete
  if (req.user.role !== 'ADMIN' && req.user.role !== 'TECHNICIAN' && item.userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  await prisma.telemetry.delete({ where: { id } });
  res.status(204).send();
}
