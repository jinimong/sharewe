import React, { useEffect } from 'react';
import { Auth } from '@supabase/ui';
import { supabase } from '../api';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const user = supabase.auth.user();
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
