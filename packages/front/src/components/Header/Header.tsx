import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from '@clerk/nextjs';

export default function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 flex justify-between items-center p-4 bg-gray-800 text-white shadow-md">
      <nav className="flex items-center gap-4">
        {['/', '/About', '/Public', '/Protected'].map((path) => (
          <Link
            key={path}
            href={path}
            className={`hover:underline ${router.pathname === path ? 'underline' : ''}`}
          >
            {path === '/' ? 'Home' : path.substring(1)}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
          <SignOutButton />
        </SignedIn>
      </div>
    </header>
  );
}
