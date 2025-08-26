import React, { useState, useRef, useEffect } from "react";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  name?: string;
  placeholder?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  variante?: "normal" | "contrast";
  rows?: number;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  type = "text",
  name,
  placeholder,
  startIcon,
  endIcon,
  className = "",
  variante = "normal",
  rows,
}) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const shrink = focused || value.length > 0;
  const [showPlaceholder, setShowPlaceholder] = useState(!shrink);

  useEffect(() => {
    if (!shrink) {
  const timeout = setTimeout(() => setShowPlaceholder(true), 250);
      return () => clearTimeout(timeout);
    } else {
      setShowPlaceholder(false);
    }
  }, [shrink]);

  // Estilos para variante contrast
  const contrastInput = variante === "contrast"
    ? "border-background text-background placeholder-background focus:border-background bg-transparent placeholder:opacity-50"
    : "text-foreground border-border bg-transparent";
  const contrastLabel = variante === "contrast"
    ? "bg-foreground text-background"
    : "bg-white text-foreground";

  return (
    <div className={`relative ${className}`}>
      {startIcon && (
        <span
          className={`absolute left-2 top-1/2 -translate-y-1/2 text-base flex items-center justify-center pointer-events-none ${focused ? 'text-primary' : 'text-border'}`}
          style={{ height: '1.5rem' }}
        >
          {startIcon}
        </span>
      )}
      {typeof rows === "number" ? (
        <textarea
          name={name}
          value={value}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={onChange}
          className={`block w-full min-w-[180px] rounded border-[1px] pr-4 py-2 text-sm font-light focus:outline-none transition-colors duration-200 ${(startIcon ? " pl-9" : " px-3")} ${contrastInput}`}
          placeholder={shrink || !showPlaceholder ? "" : (placeholder ?? label)}
        />
      ) : (
        <input
          ref={inputRef}
          type={type}
          name={name}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={onChange}
          className={`block w-full min-w-[180px] rounded border-[1px] pr-4 py-2 text-sm font-light focus:outline-none transition-colors duration-200 ${(startIcon ? " pl-9" : " px-3")} ${contrastInput}`}
          placeholder={shrink || !showPlaceholder ? "" : (placeholder ?? label)}
        />
      )}
      <label
        className={`absolute left-3 top-0 pointer-events-none transition-all duration-300 ease-in-out px-1 font-light text-xs ${contrastLabel}${shrink ? " -translate-y-2 scale-90 opacity-100" : " opacity-0"}`}
        style={variante === "contrast" ? { backgroundColor: "var(--color-foreground)", color: "var(--color-background)" } : { backgroundColor: "#fff", color: "var(--color-foreground)" }}
        onClick={() => inputRef.current?.focus()}
      >
        {label}
      </label>
      {endIcon && (
        <span
          className={`absolute right-2 top-1/2 -translate-y-1/2 text-base flex items-center justify-center ${focused ? 'text-primary' : 'text-border'}`}
          style={{ height: '1.5rem' }}
        >
          {endIcon}
        </span>
      )}
    </div>
  );
};
