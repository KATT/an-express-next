import { User } from '@clerk/express';
import { z } from 'zod';
import { t } from './trpc';
import { protectedProcedure, publicProcedure } from './trpcProcedures';


const getPrimaryEmail = (user: User | null) => {
  return user?.primaryEmailAddress?.emailAddress ?? 'unknown';
};

export const tRpcAppRouter = t.router({
  greetPrivate: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input, ctx }) => {
      const email = getPrimaryEmail(ctx.user);
      // console.log(' ctx.user email :::  ', email);
      return `PRIVATE: Hello, ${input.name}!  Current email is ${email} `;
    }),
  greet: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input, ctx }) => {
      const email = getPrimaryEmail(ctx.user);
      // console.log(' ctx.user email :::  ', email);
      return `PUBLIC: Hello, ${input.name}!  Current email is ${email} `;
    }),
});

export type TRpcAppRouter = typeof tRpcAppRouter;
