import React from 'react';
import Link from 'next/link';
import { useAuthContext } from '../../contexts/AuthContext';
import { supabase } from '../../api';
import ActiveLink from '../atomics/ActiveLink';

const Navigation: React.FC = () => {
  const { session } = useAuthContext();
  return (
    <div className="w-full h-12 bg-gray-400 flex items-center justify-between px-8 absolute top-0">
      <Link href="/">
        <a className="my-auto text-xl font-bold py-2">Sharewe</a>
      </Link>
      <div className="w-1/2 h-full flex items-center justify-end space-x-8">
        <ActiveLink href="/todos">Todos</ActiveLink>
        {session ? (
          <button onClick={() => supabase.auth.signOut()}>Logout</button>
        ) : (
          <ActiveLink href="/login">Login</ActiveLink>
        )}
      </div>
    </div>
  );
};

export default Navigation;
