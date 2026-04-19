🚀 LumeStack - Premium SaaS Boilerplate 2026
Modern, lightning-fast, and secure starter kit for building your next SaaS. Built with the latest production-ready tech stack.

🛠 Tech Stack
Framework: Next.js 15+ (App Router)
Styling: Tailwind CSS
Authentication: Clerk (Social Login, MFA Ready)
Database: Neon DB (Serverless PostgreSQL)
ORM: Prisma
Icons: Lucide React

🚀 Quick Start
Follow these steps to get your project up and running:

1. Installation
npm install
2. Environment Variables
Create a .env file in the root directory and add your credentials (refer to .env.example):

Cuplikan kode
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database (Neon DB)
DATABASE_URL="postgresql://user:password@host/db?sslmode=verify-full"

# Clerk Webhook (Required for User Sync)
CLERK_WEBHOOK_SECRET=whsec_...
3. Database Sync
Generate the Prisma client and sync your schema with the database:

npx prisma generate
npx prisma db push
4. Clerk Webhook Setup (Crucial)
To ensure user data synchronizes automatically with your database, follow these steps:

Navigate to Clerk Dashboard > Webhooks.
Add a new Endpoint: https://your-domain.com/api/webhooks/clerk.
Select the following events: user.created, user.updated, and user.deleted.
Copy the Signing Secret and paste it into the CLERK_WEBHOOK_SECRET variable in your .env file.

5. Run Development Server
npm run dev
Open http://localhost:3000 in your browser to see the app.

📁 Folder Structure
/app - Next.js App Router (Pages, API, Webhooks)
/components - Reusable UI components
/lib - Core configurations (Prisma Client, etc.)
/prisma - Database schema and configurations
/public - Static assets

🛡 License
Premium License - Personal and Commercial use for your own SaaS products.

Built with ❤️ by S.Kom Dev | 2026