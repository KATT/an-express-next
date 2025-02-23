import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { errorHandler } from 'middlewares/errorHandler';
// import { protectedRoutes } from 'routes/protectedRoutes';
// import { openRoutes } from 'routes/openRoutes';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { clerkMiddleware } from '@clerk/express';
// import { requireAuth } from '@clerk/express'

import { createTRPCContext } from 'trpc/trpc';
import { tRpcAppRouter } from 'trpc/tRpcAppRouter';

const app = express();

console.log('  Found client URL:', process.env.CLIENT_URL);
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Replace with your frontend URL
    credentials: true,
  })
);

// Apply Clerk Middleware for authentication
app.use(clerkMiddleware()); // allows the getAuth() function to work

app.use(express.json());

// Open Api
// Reads CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY from .env file
// app.use('/api', openRoutes);

// Protected Api
// Reads CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY from .env file
// app.get('/api', requireAuth(), protectedRoutes);

// tRPC
app.use(
  '/trpc',
  createExpressMiddleware({
    router: tRpcAppRouter,
    createContext: createTRPCContext,
  })
);

// app.use(authErrorHandler);
app.use(errorHandler);

const SERVER_PORT = process.env.SERVER_PORT || 4000;
app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
