import React from "react";
import { IconButton } from "@/components/Button/IconButton";
import { Button } from "@/components/Button/Button";
import { useRouter } from "next/navigation";

function formatCLP(value: number) {
  return value.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
}

interface TopBarProps {
  onMenuClick?: () => void;
  nombreEmpresa?: string;
  uf?: number;
}

export default function TopBar({ onMenuClick, nombreEmpresa = "Plataforma Inmobiliaria", uf = 34879 }: TopBarProps) {
  const router = useRouter();

  return (
    <div
      className="flex items-center justify-between h-16 w-full bg-background sm:px-8 md:px-24 box-border sticky top-0 left-0 z-50"
      data-test-id="topBar"
    >
      {/* Izquierda: icono imagen y nombre empresa */}
      <div className="flex items-center gap-3 ml-4" data-test-id="topBarLogo">
        <img
          src="/PropLogo2.png"
          alt="Logo"
          style={{ width: "40px", height: "40px", objectFit: "contain" }}
          data-test-id="topBarLogo"
        />
        <span className="sm:text-base md:text-2xl font-medium text-foreground whitespace-nowrap">
          {nombreEmpresa}
        </span>
      </div>

      {/* Centro: contacto y teléfono */}
      <div className="hidden md:flex flex-col items-center justify-center flex-1">
        <div className="flex items-center gap-6 justify-center">
          <span className="flex items-center gap-1 text-xs text-foreground whitespace-nowrap">
            <span className="material-symbols-outlined text-base">mail</span>
            contacto@empresa.cl
          </span>
          <span className="flex items-center gap-1 text-xs text-foreground whitespace-nowrap">
            <span className="material-symbols-outlined text-base">call</span>
            +56 9 1234 5678
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {/* Hide this UF on small screens; show compact UF next to menu instead */}
        <span className="hidden sm:inline text-main text-xs font-normal whitespace-nowrap">
          UF hoy: {formatCLP(uf)}
        </span>
        <div className="hidden sm:flex items-center gap-1">
          <div className="h-6 w-px bg-foreground mx-2" />
          <Button variant="text" className="text-xs text-foreground px-2" onClick={() => router.push("/properties/portal/login")}>
            Ingresar
          </Button>
          <div className="h-6 w-px bg-foreground mx-2" />
          <Button variant="text" className="text-xs text-foreground px-2" onClick={() => router.push("/properties/portal/register")}>
            Registrarse
          </Button>
        </div>
      </div>

      <div className="flex sm:hidden items-center mr-2 gap-2">
        {/* Compact UF visible only on small screens, placed next to menu */}
        <span className="text-main text-xs font-normal whitespace-nowrap">
          UF: {formatCLP(uf)}
        </span>
        <IconButton variant="text" className="ml-0" onClick={onMenuClick}>
          <span className="material-symbols-outlined">menu</span>
        </IconButton>
      </div>
    </div>
  );
}
