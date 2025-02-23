import { ReactNode, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc, useTrpcClient } from 'utils/trpc';
import { useRouter } from 'next/router';

const queryClient = new QueryClient();

interface TRpcProviderProps {
  children: ReactNode;
}

export const TRpcProvider = ({ children }: TRpcProviderProps) => {
  const trpcClient = useTrpcClient();
  const router = useRouter();

  useEffect(() => {
    /**
     * Subscribes to query cache events to handle unauthorized errors globally.
     * If an unauthorized error occurs, the user is redirected to the home page.
     * This includes when protected trpc functions are called when the Clerk
     * JWT is not valid or present.
     */
    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (event?.query.state.status === 'error') {
        const error = event.query.state.error as any;

        if (
          error?.data?.code === 'UNAUTHORIZED' &&
          event.query.meta?.protected
        ) {
          void router.push('/');
        }
      }
    });

    return () => unsubscribe();
  }, [queryClient, router]);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
