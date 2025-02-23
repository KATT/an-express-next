// types/express.d.ts
import { Request } from 'express';
import { StrictAuthProp } from '@clerk/clerk-sdk-node';
import { AuthObject } from '@clerk/express'; // Adjust the import based on the actual type of auth object

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {
      auth?: AuthObject;
    }
  }
}
