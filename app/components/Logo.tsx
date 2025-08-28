import React from 'react';

interface LogoProps {
  src?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  aspect?: { w: number; h: number };
}

const SkeletonLogo: React.FC<{ className?: string; width?: number; height?: number; aspect?: { w: number; h: number } }> = ({ className, width = 50, height = 50, aspect = { w: 1, h: 1 } }) => (
  <div
    className={`bg-gray-200 animate-pulse rounded-lg flex items-center justify-center ${className} aspect-[${aspect.w}/${aspect.h}]`}
    style={{ width, height }}
  >
    <span className="text-gray-400 text-lg font-bold">Logo</span>
  </div>
);

const Logo: React.FC<LogoProps> = ({ src, alt = 'Logo', className, width = 50, height = 50, aspect = { w: 1, h: 1 } }) => {
  if (!src) return <SkeletonLogo className={className} width={width} height={height} aspect={aspect} />;
  return (
    <div
      className={`relative overflow-hidden ${className} aspect-[${aspect.w}/${aspect.h}]`}
      style={{ width, height }}
    >
      <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-contain" />
    </div>
  );
};

export default Logo;
