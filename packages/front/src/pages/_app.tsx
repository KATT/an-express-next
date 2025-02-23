import { ClerkProvider } from '@clerk/nextjs';
import type { AppProps } from 'next/app';
import 'styles/globals.css';
import BaseLayout from 'components/Layouts/BaseLayout';
import { TRpcProvider } from 'components/providers/TRpcProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <TRpcProvider>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </TRpcProvider>
    </ClerkProvider>
  );
}
