"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "./actions"; // Import action yang kita buat tadi
import { Button } from "@/components/ui/button";
import { LayoutDashboard, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";

export default function NewProjectPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    try {
      // Menjalankan Server Action untuk simpan ke Neon DB
      await createProject(formData);
      
      // Kalau sukses, balik ke dashboard dan refresh data
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Waduh, gagal simpen project nih Bre!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 md:p-12 selection:bg-zinc-500/30">
      <div className="max-w-2xl mx-auto">
        
        {/* Tombol Back */}
        <Link 
          href="/dashboard" 
          className="flex items-center gap-2 text-zinc-500 hover:text-white mb-10 transition-colors group w-fit"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </Link>

        <div className="bg-zinc-900/40 border border-zinc-800 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-white rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <Sparkles className="text-black w-6 h-6 fill-current" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white">New Project</h1>
              <p className="text-zinc-500 text-sm">Start your next big idea here.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-zinc-400 ml-1">
                Project Name
              </label>
              <input
                required
                name="name"
                type="text"
                placeholder="e.g. LumeStack Pro"
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all text-white placeholder:text-zinc-700"
              />
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-14 bg-white text-black hover:bg-zinc-200 font-extrabold text-lg rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-white/5"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Deploying...</span>
                  </div>
                ) : (
                  "Create Project Now"
                )}
              </Button>
            </div>
          </form>

          <p className="mt-8 text-center text-xs text-zinc-600">
            This project will be synced automatically with your Neon PostgreSQL database.
          </p>
        </div>
      </div>
    </div>
  );
}