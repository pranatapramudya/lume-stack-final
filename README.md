🚀 LumeStack - Premium SaaS Boilerplate 2026
Modern, lightning-fast, and secure starter kit for building your next SaaS. Built with the latest production-ready tech stack.

🛠 Tech Stack
- Framework: Next.js 15+ (App Router)
- Styling: Tailwind CSS
- Authentication: Clerk (Social Login, MFA Ready)
- Database: Neon DB (Serverless PostgreSQL)
- ORM: Prisma 7+ with PgAdapter
- Icons: Lucide React

🚀 Quick Start
Follow these steps to get your project up and running:

1. Installation
npm install

2. Environment Variables
Create a .env file in the root directory and add your credentials (refer to .env.example):

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database (Neon DB - Use Pooled Connection)
DATABASE_URL="postgresql://user:password@host/neondb?sslmode=require"

# Clerk Webhook (Required for User Sync)
CLERK_WEBHOOK_SECRET=whsec_...

3. Database Sync
Format your schema, generate the Prisma client, and sync with your database:
npx prisma format
npx prisma generate
npx prisma db push

4. Clerk Webhook Setup (Crucial)
To ensure user data synchronizes automatically with your database:
- Navigate to Clerk Dashboard > Webhooks.
- Add a new Endpoint: https://your-domain.com/api/webhooks/clerk.
- Select the following events: user.created, user.updated.
- Copy the Signing Secret and paste it into CLERK_WEBHOOK_SECRET in your .env.

5. Run Development Server
npm run dev

📁 Folder Structure
- /app - Next.js App Router (Pages, API, Webhooks)
- /components - Reusable UI components (Shadcn UI ready)
- /lib - Core configurations (Prisma Client, etc.)
- /prisma - Database schema and configurations

🛡 License
Premium License - Personal and Commercial use for your own SaaS products.

Built with ❤️ by S.Kom Dev in Sumedang | 2026