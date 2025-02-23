import { Router } from 'express';
import { User } from '@next-trpc-express/shared/prisma';

export const userRoutes: Router = Router();

userRoutes.get('/user', (req, res) => {
  // TODO::: Break this out into a controller or a service; no business logic in the routes
  // get data from database

  const car: User = {
    id: 123,
    email: 'onetwo@gmail.com',
    password: 'something',
    createdAt: new Date('now'),
    updatedAt: new Date('now'),
  };

  res.send(car);
});
