import React, { useEffect } from 'react';
import { Auth } from '@supabase/ui';
import { supabase } from '../api';
import { useRouter } from 'next/router';
import { useAuthContext } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user]);
  return (
    <div className="w-1/4 mx-auto max-w-md">
      <Auth
        supabaseClient={supabase}
        providers={['google']}
        socialLayout="vertical"
        socialButtonSize="xlarge"
      />
    </div>
  );
};

export default Login;
