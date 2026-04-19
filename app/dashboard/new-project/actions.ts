"use server";

import { prisma } from "@/lib/prisma"; 
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
  try {
    // 1. Validasi Auth
    const { userId } = await auth();
    if (!userId) {
      throw new Error("User tidak terautentikasi.");
    }

    // 2. Ambil data dari form
    const name = formData.get("name") as string;
    if (!name || name.trim() === "") {
      throw new Error("Nama project tidak boleh kosong.");
    }

    console.log(`🚀 Menjalankan Create Project: ${name} untuk User: ${userId}`);

    // 3. Simpan ke Database Neon (Wajib pake await)
    const newProject = await prisma.project.create({
      data: {
        name: name.trim(),
        userId: userId,
      },
    });

    console.log("✅ Project berhasil disimpan di DB:", newProject);

    // 4. Refresh data di halaman dashboard supaya list project terbaru muncul
    revalidatePath("/dashboard");

    return { success: true, data: newProject };

  } catch (error: any) {
    console.error("❌ GAGAL CREATE PROJECT:", error.message);
    throw new Error(error.message || "Gagal menyimpan project ke database.");
  }
}