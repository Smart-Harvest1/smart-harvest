import prisma from '../db.js';

export async function getStats(req, res) {
  // basic stats: users, actions, pending alerts
  const usersCount = await prisma.user.count();
  const actionsCount = await prisma.action.count();
  const alertsCount = await prisma.action.count({ where: { status: { not: 'completed' } } });
  const latestAction = await prisma.action.findFirst({ orderBy: { createdAt: 'desc' }, take: 1 });

  res.json({
    usersCount,
    actionsCount,
    alertsCount,
    latestAction,
    lastUpdated: new Date().toISOString(),
  });
}
