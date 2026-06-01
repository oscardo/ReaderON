import React, { createContext, useContext, useState, useEffect } from 'react';

type FontSize = 'small' | 'medium' | 'large';
type Density = 'comfortable' | 'compact';
type ProficiencyLevel = 'B1' | 'B2' | 'C1';

interface Settings {
  fontSize: FontSize;
  speechRateEn: number;
  speechRateEs: number;
  density: Density;
  reducedMotion: boolean;
  proficiencyLevel: ProficiencyLevel;
  gemmaModelPath: string;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('app-settings');
    const parsed = saved ? JSON.parse(saved) : {};
    return {
      fontSize: parsed.fontSize || 'medium',
      speechRateEn: parsed.speechRateEn || parsed.speechRate || 1.0,
      speechRateEs: parsed.speechRateEs || parsed.speechRate || 0.85,
      density: parsed.density || 'comfortable',
      reducedMotion: parsed.reducedMotion || false,
      proficiencyLevel: parsed.proficiencyLevel || 'B2',
      gemmaModelPath: parsed.gemmaModelPath || '',
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
