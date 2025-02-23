import { t } from './trpc';
import { greetingApi } from 'trpc/tRpcApis/greetingTRpcApi';

export const tRpcAppRouter = t.router({
  ...greetingApi,
});

export type TRpcAppRouter = typeof tRpcAppRouter;
