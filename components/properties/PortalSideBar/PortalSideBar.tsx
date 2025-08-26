import React from "react";

interface PortalSideBarProps {
  open: boolean;
  onClose?: () => void;
}

export default function PortalSideBar({ open, onClose }: PortalSideBarProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-60 transition-opacity duration-300 ${open ? "bg-foreground opacity-60" : "bg-primary opacity-0 pointer-events-none"}`}
        onClick={onClose}
        data-test-id="sidebar-overlay"
      />
      <aside
        className={`fixed top-0 left-0 h-full w-64 shadow-lg z-60 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
        style={{ borderRight: "1px solid var(--color-border)", background: "var(--color-background)" }}
        data-test-id="sidebar-aside"
      >
        <div className="p-4 flex flex-col gap-6 mt-10" style={{marginTop: '40px'}} data-test-id="sidebar-content">
          {/* Logo y nombre centrado */}
          <div className="flex flex-col items-center justify-center mb-4 gap-2">
            <img src="/PropLogo2.png" alt="Logo Paltaforma" className="w-12 h-12 mb-1" />
            <span className="text-2xl font-bold text-foreground text-center">Paltaforma inmobiliaria</span>
          </div>
          {/* Menú estilizado igual al NavBar */}
          <ul className="space-y-3 mt-2" data-test-id="sidebar-list">
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded bg-gray-50 hover:bg-primary/10 text-sm font-semibold text-foreground transition-colors">
                <span className="material-symbols-sharp text-xl text-primary">home</span>
                Inicio
              </a>
            </li>
            <li>
              <div className="flex flex-col gap-1 px-3 py-2 rounded bg-gray-50">
                <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <span className="material-symbols-sharp text-xl text-primary">groups</span>
                  Nosotros
                </span>
                <ul className="ml-6 mt-1 space-y-1">
                  <li><a href="#" className="block text-xs text-foreground hover:text-primary">Historia</a></li>
                  <li><a href="#" className="block text-xs text-foreground hover:text-primary">Equipo</a></li>
                </ul>
              </div>
            </li>
            <li>
              <div className="flex flex-col gap-1 px-3 py-2 rounded-lg bg-gray-50">
                <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <span className="material-symbols-sharp text-xl text-primary">apartment</span>
                  Propiedades
                </span>
                <ul className="ml-6 mt-1 space-y-1">
                  <li><a href="#" className="block text-xs text-foreground hover:text-primary">En venta</a></li>
                  <li><a href="#" className="block text-xs text-foreground hover:text-primary">En arriendo</a></li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50 hover:bg-primary/10 text-sm font-semibold text-foreground transition-colors">
                <span className="material-symbols-sharp text-xl text-primary">edit_note</span>
                Publica tu propiedad
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50 hover:bg-primary/10 text-sm font-semibold text-foreground transition-colors">
                <span className="material-symbols-sharp text-xl text-primary">price_check</span>
                Valoriza tu propiedad
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50 hover:bg-primary/10 text-sm font-semibold text-foreground transition-colors">
                <span className="material-symbols-sharp text-xl text-primary">edit_note</span>
                Blog
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
