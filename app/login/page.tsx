"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Mail, Lock, Loader2, ArrowLeft } from "lucide-react";

function Noise() {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.025] z-0"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("Check your email for a confirmation link.");
    }
    setIsLoading(false);
  };

  return (
    <main className="relative min-h-screen bg-[#fefefe] text-zinc-900 selection:bg-black selection:text-white overflow-hidden font-sans flex items-center justify-center p-8">
      <Noise />
      
      <Link href="/" className="fixed top-8 left-8 flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-zinc-500 hover:text-black transition-colors z-20">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">
            OceanOfPDF
          </h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em]">
            ( Access the Archives )
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-black transition-colors" />
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-black py-4 pl-12 pr-4 text-xs font-bold tracking-widest outline-none transition-all placeholder:text-zinc-300"
                required
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-black transition-colors" />
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-black py-4 pl-12 pr-4 text-xs font-bold tracking-widest outline-none transition-all placeholder:text-zinc-300"
                required
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center"
            >
              {error}
            </motion.p>
          )}

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-4 text-xs font-black tracking-[0.3em] uppercase hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
              Sign In
            </button>
            <button
              type="button"
              onClick={handleSignUp}
              disabled={isLoading}
              className="w-full bg-transparent border border-zinc-200 text-zinc-900 py-4 text-xs font-black tracking-[0.3em] uppercase hover:bg-zinc-50 transition-colors disabled:opacity-50"
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="mt-12 pt-8 border-t border-zinc-100 text-center">
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-loose">
            By continuing, you agree to our <br />
            <Link href="#" className="text-zinc-600 hover:text-black transition-colors">Terms of Service</Link> and <Link href="#" className="text-zinc-600 hover:text-black transition-colors">Privacy Policy</Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
