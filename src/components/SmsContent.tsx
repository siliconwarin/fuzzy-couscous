import React from 'react';

// Enhanced SMS Content Component
interface SmsContentProps {
  content: string;
  highlight?: string;
  className?: string;
}

export const SmsContent: React.FC<SmsContentProps> = ({ 
  content, 
  highlight, 
  className = '' 
}) => {
  if (!highlight) {
    return <span className={className}>{content}</span>;
  }

  return (
    <span className={className}>
      {content.split(highlight).map((part, index, array) => (
        <React.Fragment key={index}>
          {part}
          {index < array.length - 1 && (
            <span className="bg-pink-400 text-white px-1.5 py-0.5 rounded-md animate-pulse font-medium shadow-sm">
              {highlight}
            </span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
};
