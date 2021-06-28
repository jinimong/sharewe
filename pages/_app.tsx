import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { TodoContextProvider } from '../contexts/TodoContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TodoContextProvider>
      <Component {...pageProps} />
    </TodoContextProvider>
  );
}

export default MyApp;
