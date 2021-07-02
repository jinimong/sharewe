import Link from 'next/link';
import { useAuthContext } from '../contexts/AuthContext';

export default function Home() {
  const { session } = useAuthContext();
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-400 dark:text-gray-100 py-8">
        일상을 공유하다
      </h1>
      {!session ? <Link href="/login">Login</Link> : <div>Dashboard</div>}
    </div>
  );
}
