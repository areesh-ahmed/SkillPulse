import React, { useState, useEffect } from 'react';
import { Type, Moon, Sun, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export default function AccessibilityToolbar() {
  const [highContrast, setHighContrast] = useState(false);
  const [textSize, setTextSize] = useState(100);

  useEffect(() => {
    // Apply contrast
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    // Apply text size
    document.documentElement.style.fontSize = `${textSize}%`;
  }, [textSize]);

  const handleIncreaseText = () => setTextSize(prev => Math.min(prev + 10, 130));
  const handleDecreaseText = () => setTextSize(prev => Math.max(prev - 10, 90));
  const handleResetText = () => setTextSize(100);

  return (
    <div className="bg-neutral-900 text-neutral-100 px-4 py-1 text-xs border-b border-neutral-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:bg-primary-600 focus:text-white focus:px-4 focus:py-2 focus:z-50 focus:rounded">
            Skip to main content
          </a>
          <span className="opacity-80 hidden sm:inline">Government of Maharashtra | Skill, Employment, Entrepreneurship and Innovation Department</span>
          <span className="opacity-80 sm:hidden">Govt. of Maharashtra</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Contrast Toggle */}
          <div className="flex items-center space-x-1 border-r border-neutral-700 pr-4">
            <span className="sr-only">Toggle Contrast</span>
            <button 
              onClick={() => setHighContrast(false)}
              className={`p-1 rounded ${!highContrast ? 'bg-neutral-700' : 'hover:bg-neutral-800'}`}
              title="Normal Contrast"
              aria-pressed={!highContrast}
            >
              <Sun size={14} />
            </button>
            <button 
              onClick={() => setHighContrast(true)}
              className={`p-1 rounded ${highContrast ? 'bg-neutral-700' : 'hover:bg-neutral-800'}`}
              title="High Contrast"
              aria-pressed={highContrast}
            >
              <Moon size={14} />
            </button>
          </div>

          {/* Text Size */}
          <div className="flex items-center space-x-1">
            <span className="sr-only">Text Size</span>
            <button 
              onClick={handleDecreaseText}
              className="p-1 rounded hover:bg-neutral-800 flex items-center"
              title="Decrease Text Size"
            >
              <ZoomOut size={14} />
            </button>
            <button 
              onClick={handleResetText}
              className="p-1 rounded hover:bg-neutral-800 flex items-center font-medium px-2"
              title="Reset Text Size"
            >
              <RotateCcw size={12} className="mr-1" />
              A
            </button>
            <button 
              onClick={handleIncreaseText}
              className="p-1 rounded hover:bg-neutral-800 flex items-center"
              title="Increase Text Size"
            >
              <ZoomIn size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
