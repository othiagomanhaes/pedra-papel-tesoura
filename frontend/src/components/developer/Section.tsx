import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, title, children, className = '' }: SectionProps) {
  const titleId = id && title ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      className={className}
      aria-labelledby={titleId}
    >
      {title && (
        <h2 id={titleId} className="section-title">
          {title}
        </h2>
      )}
      <div className="section-content">
        {children}
      </div>
    </section>
  );
}
