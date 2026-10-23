import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  to?: string;
  children: React.ReactNode;
}

export default function Link({ href, to, children, className, onClick, ...props }: LinkProps) {
  const targetUrl = to || href || '#';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && targetUrl.startsWith('/')) {
      e.preventDefault();
      window.history.pushState({}, '', targetUrl);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <a href={targetUrl} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
