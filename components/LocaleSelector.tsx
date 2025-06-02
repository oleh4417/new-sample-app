// components/LocaleSelector.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface LocaleSelectorProps {
  buttonText?: string;
  availableLocales?: string[];
  buttonStyle?: 'primary' | 'secondary' | 'outline';
  showFlag?: boolean;
}

const LocaleSelector: React.FC<LocaleSelectorProps> = ({
  buttonText = 'Select Language',
  availableLocales = ['en', 'es', 'fr', 'de'],
  buttonStyle = 'primary',
  showFlag = true,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const currentLocale = router.locale || 'en';

  const localeNames: Record<string, string> = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    it: 'Italiano',
    pt: 'Português',
    ja: '日本語',
    ko: '한국어',
    zh: '中文',
  };

  const localeFlags: Record<string, string> = {
    en: '🇺🇸',
    es: '🇪🇸',
    fr: '🇫🇷',
    de: '🇩🇪',
    it: '🇮🇹',
    pt: '🇵🇹',
    ja: '🇯🇵',
    ko: '🇰🇷',
    zh: '🇨🇳',
  };

  const handleLocaleChange = (locale: string) => {
    router.push(router.asPath, router.asPath, { locale });
    setIsOpen(false);
  };

  const getButtonClasses = () => {
    const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2';
    
    switch (buttonStyle) {
      case 'primary':
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700`;
      case 'secondary':
        return `${baseClasses} bg-gray-600 text-white hover:bg-gray-700`;
      case 'outline':
        return `${baseClasses} border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white`;
      default:
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700`;
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={getButtonClasses()}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {showFlag && (
          <span className="text-lg">
            {localeFlags[currentLocale] || '🌐'}
          </span>
        )}
        <span>{buttonText}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-full">
          {availableLocales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleLocaleChange(locale)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 ${
                currentLocale === locale ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
            >
              {showFlag && (
                <span className="text-lg">
                  {localeFlags[locale] || '🌐'}
                </span>
              )}
              <span>{localeNames[locale] || locale.toUpperCase()}</span>
              {currentLocale === locale && (
                <span className="ml-auto text-blue-600">✓</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LocaleSelector;
