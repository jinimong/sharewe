import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../api';

type AuthContextProps = {
  user: User | null;
};

const AuthContext = createContext<AuthContextProps>({ user: null });

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user || null);

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
