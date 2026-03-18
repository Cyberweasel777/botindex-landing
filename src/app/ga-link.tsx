"use client";

interface GALinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  event: string;
  label?: string;
  target?: string;
  rel?: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GALink({
  href,
  className,
  children,
  event,
  label,
  target,
  rel,
}: GALinkProps) {
  const handleClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", event, {
        event_category: "conversion",
        event_label: label || href,
        value: 1,
      });
    }
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}
