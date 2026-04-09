import React from "react";
import { Menu } from "lucide-react";

interface ChatHeaderProps {
  onMenuClick?: () => void;
}

export function ChatHeader({ onMenuClick }: ChatHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 h-[68px] px-4">
      <div className="max-w-3xl mx-auto h-full flex items-center justify-between">
        {/* Spacer for centering logo */}
        <div className="w-10" />

        {/* Logo */}
        <div className="h-8 flex items-center">
          <span className="text-lg font-bold tracking-wide text-teal-600">AIGA</span>
        </div>

        {/* Menu Button */}
        <button 
          onClick={onMenuClick}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          aria-label="메뉴"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
