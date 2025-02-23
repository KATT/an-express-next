import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';

import type { TRpcAppRouter } from '@next-trpc-express/server/trpc/tRpcAppRouter';
import { z } from 'zod';
import { useAuth } from '@clerk/nextjs';

export const trpc = createTRPCReact<TRpcAppRouter>();

const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const useTrpcClient = () => {
  const { getToken } = useAuth(); // Use the Clerk hook to get the JWT

  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: `${apiURL}/trpc`,
        headers: async () => {
          const token = await getToken();
          return {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : undefined,
          };
        },
        fetch(url, options) {
          return fetch(url, {
            ...options,
            credentials: 'include', // Ensures Clerk authentication works
          });
        },
        transformer: {
          serialize: (input) => z.any().parse(input),
          deserialize: (input) => z.any().parse(input),
        },
      }),
    ],
  });

  return trpcClient;
};
