import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../api';
import EmailLogin from '../components/organisms/EmailLogin';

const loginPageUrl = '/login';

export const withAuth = (Component: any) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const { session } = props;
    if (!session) {
      if (typeof window !== 'undefined') {
        router.push(loginPageUrl);
      }
      return null;
    }
    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }
  return Auth;
};

type AuthContextProps = {
  session: Session | null;
};

const AuthContext = createContext<AuthContextProps>({ session: null });

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
};
