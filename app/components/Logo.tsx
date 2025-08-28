import React from 'react';

interface LogoProps {
  src?: string;
  alt?: string;
  className?: string;
}

const SkeletonLogo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`w-24 h-24 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center ${className}`}>
    <span className="text-gray-400 text-lg font-bold">Logo</span>
  </div>
);

const Logo: React.FC<LogoProps> = ({ src, alt = 'Logo', className }) => {
  if (!src) return <SkeletonLogo className={className} />;
  return (
    <img src={src} alt={alt} className={`w-24 h-24 object-contain ${className}`} />
  );
};

export default Logo;
