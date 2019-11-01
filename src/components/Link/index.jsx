import React from 'react';
import Link from 'next/link';

export default function MyLink ({ href, as, isExternal, children, className }) {
  if (isExternal) {
    return (
      <a className={className} href={href} target="_blank">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} as={as}>
      <a href={href} className={className} target="_self">
        {children}
      </a>
    </Link>
  );
}
