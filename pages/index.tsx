import Link from 'next/link';
import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { session } = useAuthContext();
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-400 dark:text-gray-100 py-8">
        일상을 공유하다
      </h1>
      {!session ? <Link href="/login">Login</Link> : <div>Dashboard</div>}
    </div>
  );
};

export default Home;
