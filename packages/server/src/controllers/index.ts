// TODO:::  This file may just need to die, but it's the only controller for now, so...

// src/controllers/authController.ts
// import { Request, Response } from 'express'; // Keep this import
// import { registerUser, loginUser } from '../services/authService';
import { User } from '@next-trpc-express/shared/prisma';

const testUser: User = {
  id: 123,
  email: 'onetwo@gmail.com',
  password: 'something',
  createdAt: new Date('now'),
  updatedAt: new Date('now'),
};
