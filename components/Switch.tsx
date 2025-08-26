import React, { useState } from "react";

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  labelPosition?: 'left' | 'right';
}

const Switch: React.FC<SwitchProps> = ({ checked = false, onChange, label, labelPosition = 'left' }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onChange?.(!isChecked);
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      {labelPosition === 'left' && label && (
        <span className="text-sm font-light">{label}</span>
      )}
      <span
        className={`relative w-10 h-6 flex items-center bg-white rounded-full transition-colors duration-200 shadow-[inset_0_0_0_4px_#d1d5db]`}
        onClick={handleToggle}
        role="switch"
        aria-checked={isChecked}
        tabIndex={0}
      >
        <span
          className={`absolute left-1 top-1 w-4 h-4 rounded-full border transition-transform duration-200 ${isChecked ? 'translate-x-4 bg-primary border-primary' : 'bg-background border-gray-400'}`}
        />
      </span>
      {labelPosition === 'right' && label && (
        <span className="text-sm font-light">{label}</span>
      )}
    </label>
  );
};

export default Switch;
