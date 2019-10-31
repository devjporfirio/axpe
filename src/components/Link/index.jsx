import React from 'react';
import Link from 'next/link';

export default function MyLink ({ url, isExternal, children, className }) {
  if (isExternal) {
    return (
      <a className={className} href={url} target="_blank">
        {children}
      </a>
    );
  }
  return (
    <Link href={url}>
      <a href={url} className={className} target="_self">
        {children}
      </a>
    </Link>
  );
}
