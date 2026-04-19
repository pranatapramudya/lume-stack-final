// @ts-nocheck
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

// URL Neon lu (Nanti ingetin pembeli buat ganti ini di .env)
const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_k0DZQveEXb1a@ep-bold-star-a1eftypu.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Inisialisasi Prisma dengan Adapter (Wajib di Prisma 7)
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma