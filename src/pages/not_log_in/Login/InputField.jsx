import React, { useState } from 'react';
import './Login.css';
import eye from '../../../assets/eye.png'

const InputField = ({ type, placeholder, icon, alt, showPasswordToggle }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="inputWrapper">
      <img src={icon} alt={alt} className="inputIcon" />
      <input
        type={showPassword ? 'text' : type}
        placeholder={placeholder}
        className="input"
        aria-label={placeholder}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="passwordToggle"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <img src={eye} alt="" className="passwordToggleIcon" />
        </button>
      )}
    </div>
  );
};

export default InputField;