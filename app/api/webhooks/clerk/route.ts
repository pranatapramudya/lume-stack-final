import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma as db } from '@/lib/prisma' 

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.error("❌ Missing CLERK_WEBHOOK_SECRET");
    return new Response('Error: Missing secret', { status: 500 });
  }

  const headerPayload = await headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing svix headers', { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)
  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('❌ Webhook verification failed:', err);
    return new Response('Error: Verification failed', { status: 400 })
  }

  const eventType = evt.type
  const { id, email_addresses, first_name, last_name } = evt.data as any;

  // --- LOGIKA PEMBERSIHAN NAMA (ANTI-NULL STRING) ---
  const cleanPart = (part: any) => {
    if (!part || String(part).toLowerCase() === "null" || String(part).trim() === "") {
      return "";
    }
    return String(part).trim();
  };

  const fName = cleanPart(first_name);
  const lName = cleanPart(last_name);
  const fullName = `${fName} ${lName}`.trim() || "User";
  
  // Ambil email atau gunakan dummy jika dalam mode testing tanpa email
  const email = email_addresses?.[0]?.email_address || "no-email@test.com";

  // 1. CREATE & UPDATE (UPSERT)
  if (eventType === 'user.created' || eventType === 'user.updated') {
    try {
      await db.user.upsert({
        where: { id: id },
        update: { 
          email: email, 
          name: fullName 
        },
        create: {
          id: id,
          email: email,
          name: fullName,
          isActive: true,
        },
      });
      console.log(`✅ [${eventType}] Sync Success: ${id} | ${fullName}`);
      return new Response('Sync Success', { status: 200 });
    } catch (dbError) {
      console.error('❌ Database Ops Error:', dbError);
      return new Response('Database Error', { status: 500 });
    }
  }

  // 2. DELETE
  if (eventType === 'user.deleted') {
    try {
      await db.user.delete({ where: { id: id } });
      console.log(`🗑️ User Deleted: ${id}`);
      return new Response('User Deleted', { status: 200 });
    } catch (err) {
      return new Response('User already gone or not found', { status: 200 });
    }
  }

  return new Response('Event ignored', { status: 200 })
}