import React, { useState } from 'react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';

export default function Topbar() {
  const [searchCategory, setSearchCategory] = useState('All Topics');
  const categories = ['All Topics', 'Trainees', 'Courses', 'Providers', 'Districts', 'Employers'];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-3">
        
        {/* Brand / Title (Mobile only, Desktop uses Sidebar) */}
        <div className="md:hidden font-bold text-neutral-900">
          SkillPulse <span className="font-normal text-neutral-500">MH</span>
        </div>

        {/* Mega Search */}
        <div className="hidden md:flex flex-1 max-w-3xl flex-col ml-4">
          <div className="flex w-full shadow-sm">
            <div className="relative">
              <button 
                className="flex items-center justify-between bg-neutral-100 border border-r-0 border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 rounded-l-md hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {searchCategory}
                <ChevronDown size={16} className="ml-2 text-neutral-500" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-neutral-200 rounded-md shadow-lg z-50">
                  <ul className="py-1">
                    {categories.map(cat => (
                      <li key={cat}>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                          onClick={() => {
                            setSearchCategory(cat);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-neutral-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-r-md leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder={`Search ${searchCategory === 'All Topics' ? 'platform' : searchCategory.toLowerCase()}...`}
              />
            </div>
          </div>
          
          {/* Trending Chips */}
          <div className="flex items-center mt-2 space-x-2 overflow-x-auto pb-1">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Trending:</span>
            <button className="text-xs px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full hover:bg-neutral-200 whitespace-nowrap">Nashik skill gaps</button>
            <button className="text-xs px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full hover:bg-neutral-200 whitespace-nowrap">Data Analytics outcomes</button>
            <button className="text-xs px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full hover:bg-neutral-200 whitespace-nowrap">Apply for verification</button>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4 ml-auto">
          <button className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-full relative focus:outline-none focus:ring-2 focus:ring-primary-500">
            <span className="sr-only">Notifications</span>
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-600 ring-2 ring-white"></span>
          </button>
          
          <div className="flex items-center border-l border-neutral-200 pl-4">
            <button className="flex items-center text-sm font-medium text-neutral-700 hover:text-neutral-900 focus:outline-none focus:underline">
              <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-2 font-bold">
                GO
              </div>
              <span className="hidden sm:block">Govt. Officer</span>
              <ChevronDown size={16} className="ml-1 text-neutral-500" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
