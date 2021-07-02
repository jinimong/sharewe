import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

type ActiveLinkProps = {
  children: ReactNode;
  href: string;
};

export default function ActiveLink({ children, href }: ActiveLinkProps) {
  const { pathname } = useRouter();
  const isActive = pathname === href;
  return (
    <Link href={href}>
      <a className={isActive ? 'text-black-300' : 'text-black-500'}>
        {children}
      </a>
    </Link>
  );
}
