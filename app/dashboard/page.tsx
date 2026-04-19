import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, Mail, ShieldCheck } from "lucide-react"; // Hapus User karena gak kepake
import Link from "next/link"; // WAJIB IMPORT INI

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/");
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        
        {/* --- HEADER (JUDUL DASHBOARD) --- */}
        <div className="flex items-center justify-between mb-12 border-b border-zinc-900 pb-8">
          {/* BUNGKUS PAKE LINK BIAR BISA DIKLIK BALIK KE HOME */}
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="p-2 bg-white rounded-lg group-hover:scale-110 transition-transform">
              <LayoutDashboard className="text-black w-6 h-6" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter hover:text-zinc-300 transition-colors">
              DASHBOARD
            </h1>
          </Link>
          <UserButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* --- KARTU PROFIL --- */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-700">
                <img src={user?.imageUrl} alt="profile" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 font-medium">Nama Profile</p>
                <h3 className="text-xl font-bold">
                  {dbUser?.name || `${user?.firstName} ${user?.lastName}` || "User Sakti"}
                </h3>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                <Mail className="text-zinc-400 w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 font-medium">Alamat Email</p>
                <h3 className="text-zinc-100 font-medium">
                  {dbUser?.email || user?.emailAddresses[0].emailAddress}
                </h3>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800">
               {dbUser ? (
                 <div className="flex items-center gap-2 text-emerald-500 text-sm font-bold bg-emerald-500/10 w-fit px-4 py-2 rounded-full">
                   <ShieldCheck className="w-4 h-4" />
                   SYNCED WITH NEON DB
                 </div>
               ) : (
                 <div className="flex items-center gap-2 text-amber-500 text-sm font-bold bg-amber-500/10 w-fit px-4 py-2 rounded-full">
                   <ShieldCheck className="w-4 h-4" />
                   LOCAL SESSION (NOT IN DB YET)
                 </div>
               )}
            </div>
          </div>

          {/* --- KARTU ACTION (TOMBOL ADD PROJECT) --- */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl flex flex-col justify-center items-center text-center">
            <p className="text-zinc-500 mb-4">ID Anda: <code className="text-zinc-300">{userId}</code></p>
            
            {/* TAMBAH LINK DAN CLASS CURSOR-POINTER */}
            <Link href="/dashboard/new-project"> 
              <button className="bg-zinc-100 text-black px-8 py-3 rounded-full font-bold hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Add New Project
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}