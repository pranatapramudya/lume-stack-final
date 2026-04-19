"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { ArrowRight, CheckCircle2, Zap, LayoutDashboard, Loader2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-zinc-500/30 font-sans">
      {/* --- NAVBAR --- */}
      <nav className="flex items-center justify-between px-4 py-4 md:px-12 md:py-6 border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-lg md:text-xl tracking-tighter shrink-0">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <Zap className="text-black w-5 h-5 fill-current" />
          </div>
          <span className="text-white font-black tracking-tight">LUMESTACK</span>
        </div>
        
        <div className="flex items-center gap-3 md:gap-6">
          {!isLoaded ? (
            <Loader2 className="w-5 h-5 animate-spin text-zinc-500" />
          ) : isSignedIn ? (
            <div className="flex items-center gap-3 md:gap-5">
              <Link href="/dashboard" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <UserButton />
            </div>
          ) : (
            <div className="flex items-center gap-3 md:gap-6">
              <SignInButton mode="modal">
                <button className="text-xs md:text-sm font-medium text-zinc-400 hover:text-white transition-colors whitespace-nowrap">
                  Sign In
                </button>
              </SignInButton>
              
              <Link href="https://lumestack.gumroad.com/l/saas-kit-2026">
                <Button size="sm" className="bg-white text-black hover:bg-zinc-200 rounded-full px-4 md:px-5 font-bold transition-all text-xs md:text-sm">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="flex flex-col items-center justify-center px-6 py-20 md:py-32 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-sm text-zinc-400 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Next.js 16 & Clerk 7 Ready
        </div>

        <h1 className="max-w-4xl text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          Build your SaaS in <span className="text-zinc-500 italic">days</span>, <br /> 
          launch this weekend.
        </h1>

        <p className="max-w-2xl text-zinc-400 text-lg md:text-xl mb-10 leading-relaxed">
          The ultimate boilerplate with Authentication, Prisma, and Premium UI. 
          Stop wasting time on configuration and start building your product.
        </p>

        {/* --- CTA BUTTONS (CLEANED UP) --- */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center min-h-[60px]">
          {!isLoaded ? (
             <Button disabled size="lg" className="h-14 px-10 bg-zinc-900 text-zinc-600 rounded-full border border-zinc-800">
               <Loader2 className="w-5 h-5 animate-spin mr-2" />
               Checking Session...
             </Button>
          ) : isSignedIn ? (
            <Link href="/dashboard">
              <Button size="lg" className="h-14 px-10 bg-white text-black hover:bg-zinc-200 font-bold text-lg rounded-full shadow-2xl shadow-white/10 transition-all active:scale-95">
                Go to Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          ) : (
            <Link href="https://lumestack.gumroad.com/l/saas-kit-2026">
              <Button size="lg" className="h-14 px-10 bg-white text-black hover:bg-zinc-200 font-bold text-lg rounded-full group transition-all active:scale-95 shadow-2xl shadow-white/5">
                Get Lifetime Access — $39
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          )}
        </div>

        {/* --- FEATURES PREVIEW --- */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-left max-w-5xl border-t border-zinc-900 pt-16">
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    Secure Auth
                </div>
                <p className="text-zinc-500 leading-relaxed text-sm">
                  Clerk 7 integration with React 19 Actions support. Social login & MFA ready in minutes.
                </p>
            </div>
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    Neon & Prisma
                </div>
                <p className="text-zinc-500 leading-relaxed text-sm">
                  Prisma v7 for serverless PostgreSQL. Optimized for Neon DB connection pooling.
                </p>
            </div>
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    Tailwind v4
                </div>
                <p className="text-zinc-500 leading-relaxed text-sm">
                  Using the latest CSS engine for 2026. Lightning fast builds and modern design tokens.
                </p>
            </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-zinc-900 text-center">
        <p className="text-zinc-600 text-sm">
          © 2026 LumeStack Premium. <br className="md:hidden" />
          Build by <span className="text-zinc-400 font-medium">S.Kom Dev</span> in Sumedang.
        </p>
      </footer>
    </div>
  );
}