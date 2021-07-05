import type { AppProps } from 'next/app';
import React, { useCallback } from 'react';
import 'tailwindcss/tailwind.css';
import Navigation from '../components/organisms/Navigation';
import { AuthContextProvider } from '../contexts/AuthContext';
import { TodoContextProvider } from '../contexts/TodoContext';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const prevent = useCallback((e) => {
    e.preventDefault();
  }, []);
  return (
    <AuthContextProvider>
      <TodoContextProvider>
        <div
          onContextMenu={prevent}
          onDragStart={prevent}
          className="w-screen h-screen flex justify-center items-center"
          style={{
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            KhtmlUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none',
          }}
        >
          <Navigation />
          <Component {...pageProps} />
        </div>
      </TodoContextProvider>
    </AuthContextProvider>
  );
};

export default MyApp;
