import z from 'zod';
import { publicProcedure, protectedProcedure } from 'trpc/trpcProcedures';
import { User } from '@clerk/express';

const getPrimaryEmail = (user: User | null) => {
  return user?.primaryEmailAddress?.emailAddress ?? 'unknown';
};

export const greetingApi = {
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
};
