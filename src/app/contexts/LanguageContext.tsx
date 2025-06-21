'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getTranslation, Translations } from '../utils/translations';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: Translations;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<string>('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('weather-app-language');
      if (storedLang) {
        setLanguageState(storedLang);
      }
    }
    setIsLoading(false);
  }, []);

  const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('weather-app-language', newLanguage);
    }
  };

  const t = getTranslation(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading, setIsLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
