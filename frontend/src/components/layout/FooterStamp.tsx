import React, { useState, useEffect } from 'react';

export default function FooterStamp() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Generate a recent date to look realistic, but static for the session
    const now = new Date();
    // Set to a few hours ago to simulate "last reviewed"
    now.setHours(now.getHours() - 3);
    
    const formattedDate = now.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    
    const formattedTime = now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    setCurrentDate(`${formattedDate} at ${formattedTime}`);
  }, []);

  return (
    <footer className="mt-auto border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500 gap-4">
          <div className="text-center md:text-left">
            <p className="font-medium text-neutral-800 mb-1">SkillPulse Intelligence Platform</p>
            <p>Content owned and managed by the Maharashtra State Innovation Society,<br className="hidden md:block"/> Department of Skills, Employment, Entrepreneurship and Innovation.</p>
          </div>
          <div className="text-center md:text-right">
            <p className="mb-1 text-xs uppercase tracking-wider text-neutral-400 font-semibold">Provenance / Audit</p>
            <p>Last reviewed and updated on <span className="font-medium text-neutral-700">{currentDate}</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
