import { authorize as authorizeUser } from '../auth.js';

export const authorize = (...allowedRoles) => authorizeUser(...allowedRoles);
