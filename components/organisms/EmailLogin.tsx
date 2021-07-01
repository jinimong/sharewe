import React, { useState } from 'react';
import { supabase } from '../../api';
import Button from '../atomics/Button';

const EmailLogin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert('전송 완료!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-1/2 h-1/2 m-auto text-center flex flex-col items-center justify-around">
      <h1 className="text-2xl">Login Page</h1>
      <div>
        <p>이메일의 인증코드를 포함한 링크로 로그인 하세요!</p>
        <input
          className="w-full border border-gray-200 text-center my-3 h-10 rounded"
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          fullWidth
          onClick={(e) => {
            e.preventDefault();
            handleLogin(email);
          }}
          disabled={loading}
        >
          <span>{loading ? 'Loading' : '이메일로 로그인 링크 전송'}</span>
        </Button>
      </div>
    </div>
  );
};

export default EmailLogin;
