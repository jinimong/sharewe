import React from 'react';
import Link from 'next/link';
import { useAuthContext } from '../../contexts/AuthContext';
import { supabase } from '../../api';

const Navigation: React.FC = () => {
  const { session } = useAuthContext();
  return (
    <div className="w-full h-12 bg-gray-400 flex items-center justify-between px-8 absolute top-0">
      <Link href="">
        <a className="my-auto text-xl font-bold py-2">Sharewe</a>
      </Link>
      <div className="w-1/2 h-full flex items-center justify-end space-x-8">
        <Link href="/todos">Todos</Link>
        {session ? (
          <button onClick={() => supabase.auth.signOut()}>Logout</button>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navigation;
