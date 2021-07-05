import React, { ChangeEvent, useEffect, useState } from 'react';
import { supabase } from '../../api';
import { useAuthContext } from '../../contexts/AuthContext';
import FormInput from '../atomics/FormInput';
import Button from '../atomics/Button';

const Account: React.FC = () => {
  const { session } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatar_url`)
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
    if (session) {
      getProfile();
    }
  }, [session]);

  return (
    <div className="w-1/3 flex flex-col items-center space-y-8">
      <div className="w-full space-y-8">
        <FormInput
          fieldName="email"
          type="text"
          value={session?.user?.email}
          disabled
        />
        <FormInput
          fieldName="username"
          type="text"
          value={username || ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
      </div>
      <div className="self-end">
        <Button
          onClick={() => updateProfile({ username, avatar })}
          disabled={loading}
        >
          {loading ? 'Saving ...' : 'Save'}
        </Button>
      </div>
    </div>
  );
};

export default Account;
