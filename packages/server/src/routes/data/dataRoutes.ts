import { Router } from 'express';
import { Car } from '@next-trpc-express/shared/types/basicTypes';

export const dataRoutes: Router = Router();

dataRoutes.get('/data', (req, res) => {
  // get data from database
  const car: Car = {
    car: 'Cougar',
    year: 1968,
    color: 'red',
  };

  res.send(car);
});
