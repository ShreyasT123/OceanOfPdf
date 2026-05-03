"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { Search, ArrowRight, Download, BookOpen, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// --- Types ---
interface Book {
  _id: string;
  title: string;
  author: string;
  coverUrl: string;
  fileUrl: string;
  year: number;
  category: string;
  size: string;
}

import { Noise } from "@/components/noise";

import { BACKEND_URL } from "@/lib/constants";
import { MenuOverlay } from "@/components/menu-overlay";
import { SubpageHeader } from "@/components/subpage-header";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0C0A00] flex items-center justify-center text-zinc-500 font-serif italic text-2xl tracking-widest animate-pulse">Loading Archives...</div>}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<Book[]>([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- Custom Cursor Logic ---
  const springConfig = { stiffness: 1000, damping: 50, mass: 0.1 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    if (isMenuOpen) {
      document.body.classList.remove("hide-default-cursor");
    } else {
      document.body.classList.add("hide-default-cursor");
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove("hide-default-cursor");
    };
  }, [cursorX, cursorY, isMenuOpen]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setHasSearched(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/books/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();

      if (data.error) throw new Error(data.error);

      setResults(data.results || []);
    } catch (error) {
      console.error("Search failed", error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  return (
    <main className="relative min-h-screen bg-[#0C0A00] text-zinc-200 selection:bg-white selection:text-black overflow-x-hidden font-sans">
      <Noise className="fixed inset-0" opacity={0.025} />

      {/* Global Custom Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[150] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: 1,
          opacity: isMenuOpen ? 0 : 1,
        }}
      >
        <motion.div
          className="w-4 h-4 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        />
      </motion.div>

      {/* Shared Nav Components */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SubpageHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-12 pt-32 pb-24 min-h-screen flex flex-col">
        
        {/* Search Input Area - Animates from center to top using layout */}
        <motion.div 
          layout
          className={`w-full flex flex-col ${hasSearched ? "items-start mt-10" : "items-center justify-center flex-1"}`}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {!hasSearched && (
            <motion.div layoutId="search-header" className="text-zinc-500 font-medium text-xs uppercase tracking-[0.4em] mb-8 text-center">
              ( Access the Archives )
            </motion.div>
          )}

          <form onSubmit={handleFormSubmit} className="relative w-full max-w-4xl group">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 text-zinc-600 group-focus-within:text-white transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Title, author, or keyword..."
              className="w-full bg-transparent border-b border-zinc-800 focus:border-white py-6 md:py-8 pl-12 md:pl-16 pr-12 text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter text-zinc-500 placeholder:text-zinc-800 outline-none transition-colors"
              autoFocus
            />
            <button 
              type="submit" 
              disabled={isSearching || !query.trim()}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white disabled:opacity-30 transition-colors"
            >
              <ArrowRight className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
            </button>
          </form>

          {hasSearched && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
              className="mt-6 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-500"
            >
              <span>{isSearching ? "Searching..." : `${results.length} Results Found`}</span>
              <div className="h-px w-12 bg-zinc-800" />
              <span>Query: "{query}"</span>
            </motion.div>
          )}
        </motion.div>

        {/* Results Grid */}
        <AnimatePresence mode="wait">
          {hasSearched && !isSearching && results.length > 0 && (
            <motion.div 
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16"
            >
              {results.map((book) => (
                <motion.div 
                  key={book._id}
                  variants={{
                    hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
                    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                  }}
                  className="group flex flex-col gap-4"
                >
                  {/* Book Cover */}
                  <div className="relative w-full aspect-[2/3] bg-zinc-900 overflow-hidden rounded-xl border border-white/10 group-hover:border-white/20 transition-all duration-500 shadow-2xl">
                    {book.coverUrl ? (
                      <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-800"><BookOpen size={48} strokeWidth={1} /></div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 backdrop-blur-[2px]">
                      <motion.a 
                        href={book.fileUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-white text-black text-center py-4 rounded-lg text-[10px] font-bold tracking-[0.25em] uppercase hover:bg-zinc-100 transition-colors flex items-center justify-center gap-3 shadow-xl"
                      >
                        <Download className="w-4 h-4" /> Get PDF
                      </motion.a>
                    </div>
                  </div>

                  {/* Book Meta */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-lg font-bold uppercase tracking-tight leading-tight text-white group-hover:text-zinc-300 transition-colors line-clamp-2">
                        {book.title}
                      </h3>
                      <span className="text-[10px] font-mono text-zinc-600 mt-1 flex-shrink-0">{book.year}</span>
                    </div>
                    <p className="text-sm font-medium text-zinc-500">{book.author}</p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] uppercase tracking-widest font-bold text-zinc-700">
                      <span>{book.category}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-800" />
                      <span>{book.size}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {hasSearched && !isSearching && results.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center mt-20"
            >
              <div className="text-zinc-700 mb-6"><Search className="w-16 h-16" strokeWidth={1} /></div>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-white">No signals found.</h3>
              <p className="text-zinc-500 mt-2 max-w-md">We scoured the archives but couldn't find any documents matching your query. Try a different title or author.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
