import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

type ActiveLinkProps = {
  children: ReactNode;
  href: string;
};

const ActiveLink: React.FC<ActiveLinkProps> = ({ children, href }) => {
  const { pathname } = useRouter();
  const isActive = pathname === href;
  return (
    <Link href={href}>
      <a className={isActive ? 'text-black-300' : 'text-black-500'}>
        {children}
      </a>
    </Link>
  );
};

export default ActiveLink;
