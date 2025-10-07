'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState('en');
  const router = useRouter();

  useEffect(() => {
    // Get language from localStorage or default to 'en'
    const savedLang = localStorage.getItem('language') || 'en';
    setCurrentLang(savedLang);
    
    // Update HTML attributes
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    
    setCurrentLang(newLang);
    
    // Save to localStorage
    localStorage.setItem('language', newLang);
    
    // Update HTML attributes
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    
    // Reload the page to apply language changes
    router.refresh();
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-500 transition-colors duration-200"
      title={`Switch to ${currentLang === 'en' ? 'Arabic' : 'English'}`}
    >
      <span className="text-lg">
        {currentLang === 'en' ? '🇺🇸' : '🇪🇬'}
      </span>
      <span className="hidden sm:inline">
        {currentLang === 'en' ? 'EN' : 'AR'}
      </span>
    </button>
  );
}
