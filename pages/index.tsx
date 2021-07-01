import Head from 'next/head';
import { useEffect, useState } from 'react';
import { supabase } from '../api';
import { Session } from '@supabase/supabase-js';
import { useAuthContext } from '../contexts/AuthContext';
import Account from '../components/organisms/Account';
import EmailLogin from '../components/organisms/EmailLogin';

export default function Home() {
  const { session } = useAuthContext();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {!session ? <EmailLogin /> : <Account session={session} />}
    </div>
  );
}
