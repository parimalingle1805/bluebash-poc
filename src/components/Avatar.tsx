import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, className = '' }) => {
  return (
    <img
      className={`h-10 w-10 rounded-full object-cover ${className}`}
      src={src}
      alt={alt}
    />
  );
};

export default Avatar;
