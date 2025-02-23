import { Router } from 'express';

export const openRoutes: Router = Router();

openRoutes.get('/hello', (req, res) => {
  res.send('Hello, Clerk!');
});
