import { trpc } from 'utils/trpc';
import { Spinner } from 'components/Spinner/Spinner';

export default function Protected() {
  const { data, isLoading, error } = trpc.greetPrivate.useQuery(
    {
      name: 'Sammy',
    },
    {
      retry: false,
      meta: {
        protected: true,
      },
    }
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner color="bg-red-500" />
      </div>
    );

  return (
    <div>
      <div className="text-center">
        <h1>A protected TRpc procedure</h1>
      </div>
      <p>Data: {data}</p>
    </div>
  );
}
