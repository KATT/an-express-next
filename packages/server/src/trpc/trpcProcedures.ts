import { t } from 'trpc/trpc';
import { TRPCError } from '@trpc/server';

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({ ctx });
});
