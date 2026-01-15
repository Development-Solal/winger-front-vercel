import React from 'react';

interface CookieManagerProps {
  onClick: () => void;
}

const CookieManager: React.FC<CookieManagerProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      title="Gérer les cookies"
      aria-label="Gérer les préférences de cookies"
      className="fixed bottom-1 md:bottom-10 left-2 md:left-5 bg-gradient-to-br from-pink-400 to-pink-500 text-white border-none hover:from-pink-500 hover:to-pink-600 rounded-full p-1 md:p-2 cursor-pointer shadow-xl shadow-pink-500/50 hover:scale-110 hover:shadow-2xl hover:shadow-pink-500/60 active:scale-95 transition-all duration-300 z-[9998] group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 md:w-6 md:h-6 animate-spin-slow group-hover:animate-wiggle"
      >
        <path d="M21.598 11.064a1.006 1.006 0 0 0-.854-.172A2.938 2.938 0 0 1 20 11c-1.654 0-3-1.346-3.003-2.938.005-.034.016-.134.017-.168a.998.998 0 0 0-1.254-1.006A3.002 3.002 0 0 1 15 7c-1.654 0-3-1.346-3-3 0-.217.031-.444.099-.716a1 1 0 0 0-1.067-1.236A9.956 9.956 0 0 0 2 12c0 5.514 4.486 10 10 10s10-4.486 10-10c0-.049-.003-.097-.007-.16a1.004 1.004 0 0 0-.395-.776zM8.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-2 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.5-6.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm3.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
      </svg>
    </button>
  );
};

export default CookieManager;