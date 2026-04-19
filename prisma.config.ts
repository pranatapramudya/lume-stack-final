import "dotenv/config";
import { defineConfig } from "@prisma/config";

export default defineConfig({
  // Pastikan path schema mengarah ke folder prisma lu
  schema: "./prisma/schema.prisma",
  
  // Konfigurasi untuk CLI (Migrate, Introspection, dll)
  datasource: {
    url: process.env.DATABASE_URL,
  },

  // Opsional: Jika lu pake migration (bukan cuma db push)
  migrations: {
    path: "./prisma/migrations",
  },
});