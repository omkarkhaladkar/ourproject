import React from 'react';

export default function ToggleSwitch({ checked = false, onChange, label = '', disabled = false }) {
  return (
    <button
      type="button"
      className={`ppf-toggle ${checked ? 'on' : ''}`}
      aria-pressed={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
    />
  );
}
