import React from 'react';
import Link from 'next/link';

export default function MyLink({ href, as, isExternal, children, className }) {
  return isExternal ? (
    <a href={href} target="_blank" className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} as={as}>
      <a href={href} className={className}>
        {children}
      </a>
    </Link>
  );
}
