'use client'
import React, { useEffect, useRef, useState } from 'react'
import { IconButton } from '@/components/Button/IconButton'

interface NavBarProps {
  className?: string
}

export default function NavBar({ className = '' }: NavBarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const handleMenuClick = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  useEffect(() => {
    if (!openMenu) return;
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenu]);

  return (
  <nav className={`w-full bg-background shadow-[0_4px_8px_-4px_rgba(0,0,0,0.12)] sticky top-16 z-50 ${className}`} aria-label="Main navigation">
    <ul className="flex items-center justify-center gap-3 px-4 py-3">
      <li>
        <a href="#" className="flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-primary">
          <span className="material-symbols-sharp text-2xl text-primary" aria-hidden>
            home
          </span>
        </a>
      </li>
      <li className="relative hidden sm:flex">
        <div className="flex items-center gap-1">
          <a href="#" className="text-sm font-medium text-neutral-900 hover:text-primary">
            Nosotros
          </a>
          <IconButton variant="text" onClick={() => handleMenuClick('nosotros')} aria-label="Desplegar submenú Nosotros">
            <span className="material-symbols-outlined text-base text-primary">arrow_drop_down</span>
          </IconButton>
        </div>
        {openMenu === 'nosotros' && (
          <ul ref={menuRef} className="absolute left-0 top-full mt-2 w-56 bg-white border border-neutral-200 rounded shadow z-30">
            <li><a href="#" className="block px-4 py-2 text-sm text-neutral-900 hover:bg-primary/10">Plataforma Inmobiliaria</a></li>
            <li><a href="#" className="block px-4 py-2 text-sm text-neutral-900 hover:bg-primary/10">Nuestro Equipo</a></li>
            <li><a href="#" className="block px-4 py-2 text-sm text-neutral-900 hover:bg-primary/10">Testimonios</a></li>
            <li><a href="#" className="block px-4 py-2 text-sm text-neutral-900 hover:bg-primary/10">Contacto</a></li>
          </ul>
        )}
      </li>
      <li className="relative">
        <div className="flex items-center gap-1">
          <a href="#" className="text-sm font-medium text-neutral-900 hover:text-primary">
            Propiedades
          </a>
          <IconButton variant="text" onClick={() => handleMenuClick('propiedades')} aria-label="Desplegar submenú Propiedades">
            <span className="material-symbols-outlined text-base text-primary">arrow_drop_down</span>
          </IconButton>
        </div>
        {openMenu === 'propiedades' && (
          <ul ref={menuRef} className="absolute left-0 top-full mt-2 w-40 bg-white border border-neutral-200 rounded shadow z-30">
            <li><a href="#" className="block px-4 py-2 text-sm text-neutral-900 hover:bg-primary/10">En venta</a></li>
            <li><a href="#" className="block px-4 py-2 text-sm text-neutral-900 hover:bg-primary/10">En arriendo</a></li>
          </ul>
        )}
      </li>
      <li>
        <a href="#" className="text-sm font-medium text-neutral-900 hover:text-primary">
          Publica tu propiedad
        </a>
      </li>
      <li>
        <a href="#" className="text-sm font-medium text-neutral-900 hover:text-primary">
          Valoriza tu propiedad
        </a>
      </li>
      <li className="hidden sm:block">
        <a href="#" className="text-sm font-medium text-neutral-900 hover:text-primary">
          Blog
        </a>
      </li>
    </ul>
  </nav>
  )
}
