'use client'
import React, { useState, useRef } from "react";
import { IconButton } from "@/components/Button/IconButton";

export interface Option {
  id: number;
  label: string;
}

interface AutoCompleteProps {
  options: Option[];
  label: string;
  placeholder?: string;
  value?: Option | null;
  onChange?: (option: Option | null) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ options, label, placeholder, value = null, onChange }) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [inputValue, setInputValue] = useState(value ? value.label : "");
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const shrink = focused || inputValue.length > 0;
  const filteredOptions = options.filter(opt => opt.label.toLowerCase().includes(inputValue.toLowerCase()));

  const handleSelect = (option: Option) => {
    setInputValue(option.label);
    setOpen(false);
    onChange?.(option);
  };

  const handleClear = () => {
    setInputValue("");
    onChange?.(null);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full" data-test-id="auto-complete-root">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onFocus={() => { setFocused(true); setOpen(true); }}
        onBlur={() => { setFocused(false); setTimeout(() => setOpen(false), 100); setHighlightedIndex(-1); }}
        onChange={e => { setInputValue(e.target.value); setOpen(true); setHighlightedIndex(-1); }}
        onKeyDown={e => {
          if (!open && ["ArrowDown", "ArrowUp", "Enter"].includes(e.key)) setOpen(true);
          if (filteredOptions.length === 0) return;
          if (e.key === "ArrowDown") {
            setHighlightedIndex(i => (i < filteredOptions.length - 1 ? i + 1 : 0));
            e.preventDefault();
          } else if (e.key === "ArrowUp") {
            setHighlightedIndex(i => (i > 0 ? i - 1 : filteredOptions.length - 1));
            e.preventDefault();
          } else if (e.key === "Enter" && highlightedIndex >= 0) {
            handleSelect(filteredOptions[highlightedIndex]);
            setHighlightedIndex(-1);
            e.preventDefault();
          }
        }}
        className="block w-full min-w-[180px] rounded border-[0.5px] bg-transparent px-3 py-2 text-sm font-light text-foreground focus:outline-none transition-colors duration-200 border-border"
        placeholder={shrink ? "" : (placeholder ?? label)}
        autoComplete="off"
        data-test-id="auto-complete-input"
      />
      <label
        className={`absolute left-3 top-0 pointer-events-none transition-all duration-300 ease-in-out bg-white px-1 font-light text-xs text-foreground` +
          (shrink ? " -translate-y-2 scale-90 opacity-100" : " opacity-0")}
        onClick={() => inputRef.current?.focus()}
        data-test-id="auto-complete-label"
      >
        {label}
      </label>
      {inputValue && (
        <IconButton
          variant="text"
          className="absolute right-8 top-1/2 -translate-y-1/2 p-0 m-0"
          style={{lineHeight:0}}
          onClick={handleClear}
          aria-label="Limpiar selección"
          data-test-id="auto-complete-clear-icon"
        >
          <span className="material-symbols-outlined text-base text-secondary" style={{fontSize: '22px'}}>
            close
          </span>
        </IconButton>
      )}
      <IconButton
        variant="text"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-0 m-0"
        style={{lineHeight:0}}
        tabIndex={-1}
        aria-label="Desplegar opciones"
        onClick={() => {
          if (!open) setOpen(true);
          if (!inputValue) inputRef.current?.focus();
        }}
        data-test-id="auto-complete-dropdown-icon"
      >
        <span className="material-symbols-outlined text-base text-secondary" style={{fontSize: '22px'}}>
          arrow_drop_down
        </span>
      </IconButton>
      {open && filteredOptions.length > 0 && (
  <ul className="absolute z-30 w-full bg-white border border-neutral-200 rounded shadow mt-1 max-h-56 overflow-auto" data-test-id="auto-complete-list">
          {filteredOptions.map((opt, idx) => (
            <li
              key={opt.id}
              className={`px-3 py-2 cursor-pointer text-sm font-light ${highlightedIndex === idx ? 'bg-primary/30' : ''} ${value?.id === opt.id ? 'text-foreground' : 'text-neutral-700'} hover:bg-primary/30`}
              onMouseDown={() => handleSelect(opt)}
              onMouseEnter={() => setHighlightedIndex(idx)}
              data-test-id={`auto-complete-option-${opt.id}`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
