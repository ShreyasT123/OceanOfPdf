"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
}

export default function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-lg group">
      
      <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40 z-20 transition-colors group-focus-within:text-foreground/70" />

      <div className="relative overflow-hidden rounded-full">
        
        <input
          type="text"
          placeholder="Search OceanOfPDF"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-full bg-foreground/5 dark:bg-white/10 px-6 py-3 pl-12 text-sm text-black/80 dark:text-[#fefefe] placeholder:text-black/45 dark:placeholder:text-[#fefefe]/30 backdrop-blur-[32px] transition-all focus:outline-none relative z-10"
        />

        {/* overlays */}
        <div className="absolute inset-0 pointer-events-none z-[5] bg-gradient-to-br from-foreground/[0.05] dark:from-white/25 via-transparent to-transparent opacity-80" />
        
        <div className="absolute inset-0 pointer-events-none z-[4] bg-foreground/[0.01] dark:bg-white/[0.02] backdrop-blur-[4px]" />
        
        <div className="absolute inset-0 rounded-full pointer-events-none z-[6] shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]" />
      
      </div>
    </form>
  );
}