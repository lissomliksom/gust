'use client';

import { useState } from 'react';

export default function InputWithButton({ onButtonClick }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    onButtonClick(inputValue);
  };

  return (
    <div className="flex items-center my-20">
      <div className="flex w-full max-w-md">
        <input
          type="text"
          placeholder="Paste CSS file URL"
          className="w-full px-4 py-2 text-sm border border-black rounded-l-sm focus:outline-none focus:border-black"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          onClick={handleClick}
          className="px-4 py-2 text-sm font-medium text-white transition-colors duration-300 bg-black border border-black rounded-r-sm hover:bg-white hover:text-black"
        >
          Analyze
        </button>
      </div>
    </div>
  );
};
