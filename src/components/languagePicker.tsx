"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const languages = {
  en: { name: "English", flag: "🇬🇧" },
  es: { name: "Español", flag: "🇪🇸" },
  de: { name: "Deutsch", flag: "🇩🇪" },
};

export const LanguagePicker = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages[i18n.language as keyof typeof languages];

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-10 right-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors border border-zinc-700"
      >
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-1 right-0 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg overflow-hidden">
          {Object.entries(languages).map(([code, { name, flag }]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-zinc-700 transition-colors"
            >
              <span>{flag}</span>
              <span>{name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
