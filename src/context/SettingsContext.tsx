import React, { createContext, useContext, useState, useEffect } from 'react';

type FontSize = 'small' | 'medium' | 'large';
type Density = 'comfortable' | 'compact';

interface Settings {
  fontSize: FontSize;
  speechRate: number;
  density: Density;
  reducedMotion: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('app-settings');
    return saved ? JSON.parse(saved) : {
      fontSize: 'medium',
      speechRate: 1.0,
      density: 'comfortable',
      reducedMotion: false,
    };
  });

  useEffect(() => {
    localStorage.setItem('app-settings', JSON.stringify(settings));
    
    // Apply font size class to document
    const root = window.document.documentElement;
    root.classList.remove('text-small', 'text-medium', 'text-large');
    root.classList.add(`text-${settings.fontSize}`);
    
    // Apply density class to document
    root.classList.remove('density-comfortable', 'density-compact');
    root.classList.add(`density-${settings.density}`);
  }, [settings]);

  const updateSettings = (updates: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
