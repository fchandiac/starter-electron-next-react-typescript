'use client'
import React, { useState } from "react";

export interface Option {
  id: number;
  label: string;
}


interface SelectProps {
  options: Option[];
  placeholder: string;
  value?: number | null;
  onChange?: (id: number | null) => void;
}

const Select: React.FC<SelectProps> = ({ options, placeholder, value = null, onChange }) => {
  const [focused, setFocused] = useState(false);
  const selected = options.find(opt => opt.id === value);
  const shrink = focused || selected;

  return (
    <div className="relative w-full" data-test-id="select-root">
      <select
        className={`block w-full min-w-[180px] rounded border-[0.5px] bg-transparent px-3 py-2 text-sm font-light text-primary focus:outline-none transition-colors duration-200 appearance-none border-primary`}
        value={value ?? ""}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={e => onChange?.(e.target.value ? Number(e.target.value) : null)}
        data-test-id="select-input"
      >
        <option value="" disabled hidden data-test-id="select-placeholder">{placeholder}</option>
        {options.map(opt => (
          <option key={opt.id} value={opt.id} data-test-id={`select-option-${opt.id}`}>{opt.label}</option>
        ))}
      </select>
      <label
        className={`absolute left-3 top-0 pointer-events-none transition-all duration-300 ease-in-out bg-white px-1 font-light text-xs` +
          (shrink ? " -translate-y-2 scale-90 opacity-100" : " opacity-0")}
        style={{ color: focused ? "var(--color-accent)" : "var(--color-primary)" }}
        data-test-id="select-label"
      >
        {placeholder}
      </label>
      {/* Icono X para limpiar selección */}
      {value !== null && (
        <button
          type="button"
          className="absolute right-8 top-1/2 -translate-y-1/2 text-primary p-0 m-0 bg-transparent border-none cursor-pointer"
          style={{lineHeight:0}}
          onClick={() => onChange?.(null)}
          aria-label="Limpiar selección"
          data-test-id="select-clear-btn"
        >
          <span className="material-symbols-outlined text-base" style={{fontSize: '22px'}}>
            close
          </span>
        </button>
      )}
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-base text-primary pointer-events-none" data-test-id="select-dropdown-icon">▼</span>
    </div>
  );
};

export default Select;
