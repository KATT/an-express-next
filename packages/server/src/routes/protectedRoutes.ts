import { Router } from 'express';
import { dataRoutes } from './data/dataRoutes';
import { userRoutes } from './user/userRoutes';

export const protectedRoutes: Router = Router();

protectedRoutes.use('/data', dataRoutes);
protectedRoutes.use('/user', userRoutes);
