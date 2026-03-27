
import React, { useState } from 'react';

interface BotMenuProps {
  onOpenAssistant: () => void;
  whatsappNumber: string;
}

const BotMenu: React.FC<BotMenuProps> = ({ onOpenAssistant, whatsappNumber }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleWhatsApp = () => {
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}`, '_blank');
    setIsOpen(false);
  };

  const handleAssistant = () => {
    onOpenAssistant();
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      {/* Menu Options */}
      <div className={`flex flex-col gap-3 mb-2 transition-all duration-300 transform origin-bottom ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none translate-y-4'
      }`}>
        <button
          onClick={handleAssistant}
          className="flex items-center gap-3 bg-gray-900 border border-gray-800 text-white px-6 py-4 rounded-2xl shadow-2xl hover:bg-gray-800 transition-all group min-w-[240px]"
        >
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm group-hover:scale-110 transition-transform flex-shrink-0">
            <i className="fa-solid fa-robot"></i>
          </div>
          <div className="text-left">
            <p className="text-sm font-bold">AI Assistant</p>
            <p className="text-[10px] text-gray-400">What can I make for you?</p>
          </div>
        </button>

        <button
          onClick={handleWhatsApp}
          className="flex items-center gap-3 bg-gray-900 border border-gray-800 text-white px-6 py-4 rounded-2xl shadow-2xl hover:bg-gray-800 transition-all group min-w-[240px]"
        >
          <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-sm group-hover:scale-110 transition-transform flex-shrink-0">
            <i className="fa-brands fa-whatsapp"></i>
          </div>
          <div className="text-left">
            <p className="text-sm font-bold">WhatsApp Chat</p>
            <p className="text-[10px] text-gray-400">+91 99112 58733</p>
          </div>
        </button>
      </div>

      {/* Main Trigger Button */}
      <button
        onClick={toggleMenu}
        aria-label="Toggle Support Menu"
        className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-2xl transition-all duration-300 active:scale-90 ${
          isOpen 
            ? 'bg-gray-700 text-white rotate-[135deg]' 
            : 'bg-gradient-to-tr from-blue-600 to-purple-600 text-white hover:shadow-blue-500/40 hover:scale-105'
        }`}
      >
        <i className={`fa-solid ${isOpen ? 'fa-plus' : 'fa-comment-dots'}`}></i>
      </button>
    </div>
  );
};

export default BotMenu;
