'use client';

import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch?: (searchTerm: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search..." }: SearchBarProps) {
  return (
    <div className="flex items-center bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full p-3 shadow-sm">
      <Search className="h-5 w-5 text-white/70 ml-4" />
      <input 
        type="text"
        placeholder={placeholder}
        className="w-full bg-transparent border-0 focus:outline-none text-lg px-6 text-white placeholder:text-white/50"
        onChange={(e) => onSearch?.(e.target.value)}
      />
    </div>
  );
}