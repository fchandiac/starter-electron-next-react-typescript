import React from 'react';
import Logo from '../Logo';
import { IconButton } from '../Button/IconButton';

interface TopBarProps {
  title?: string;
  logoSrc?: string;
  className?: string;
}

const TopBar: React.FC<TopBarProps> = ({ title = 'title', logoSrc, className }) => {
  return (
    <header className={`w-full flex items-center justify-between px-4 py-2 bg-white border-b border-border ${className}`}>
      <div className="flex items-center gap-2">
        <Logo src={logoSrc} className="w-10 h-10" />
        <span className="ml-2 text-lg font-bold text-foreground">{title}</span>
      </div>
      <IconButton variant="text" className="text-2xl">
        <span className="material-symbols-outlined">menu</span>
      </IconButton>
    </header>
  );
};

export default TopBar;
