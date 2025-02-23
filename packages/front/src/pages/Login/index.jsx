import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <header className="flex justify-end items-center p-4 gap-4 h-16">
          <SignedOut>
            <SignInButton redirectUrl="/" />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
      </div>
    </div>
  );
}
