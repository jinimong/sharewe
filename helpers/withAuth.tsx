import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../api';

const loginPageUrl = '/login';

const withAuth = (Component: any) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const user = supabase.auth.user();
    if (!user) {
      if (typeof window !== 'undefined') {
        router.push(loginPageUrl);
      }
    }
    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }
  return Auth;
};

export default withAuth;
