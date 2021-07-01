import React, { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../api';

type AccountProps = {
  session: Session;
};

const Account: React.FC<AccountProps> = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avater_url`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) throw error;
      if (data) {
        const { username, avatar_url: avatar } = data;
        setUsername(username);
        setAvatar(avatar);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async ({
    username,
    avatar,
  }: {
    username: string | null;
    avatar: string | null;
  }) => {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      const updates = {
        id: user?.id,
        username,
        avatar_url: avatar,
        updated_at: new Date(),
      };
      const { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal',
      });
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, [session]);

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session?.user?.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <button
          className="button block primary"
          onClick={() => updateProfile({ username, avatar })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
      <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Account;
