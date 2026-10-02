import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  getContactMessageById,
  insertContactMessageReply,
  updateContactMessagesStatus,
} from "@/lib/admin/messages";
import { isDatabaseConfigured } from "@/lib/db/client";
import { isMailConfigured } from "@/lib/email/config";
import { sendContactReplyEmail } from "@/lib/email/brevo";

async function requireAdminUser() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function POST(request: Request) {
  try {
    const user = await requireAdminUser();
    if (!user) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }
    if (!isDatabaseConfigured()) {
      return NextResponse.json(
        { error: "Base de données non configurée." },
        { status: 503 }
      );
    }
    if (!isMailConfigured()) {
      return NextResponse.json(
        { error: "Envoi email non configuré (BREVO_API_KEY)." },
        { status: 503 }
      );
    }

    const body = (await request.json()) as {
      id?: string;
      reply?: string;
    };

    const id = body.id?.trim() ?? "";
    const reply = body.reply?.trim() ?? "";

    if (!id || !reply) {
      return NextResponse.json(
        { error: "id et reply requis." },
        { status: 400 }
      );
    }

    if (reply.length > 10000) {
      return NextResponse.json(
        { error: "Réponse trop longue." },
        { status: 400 }
      );
    }

    const message = await getContactMessageById(id);
    if (!message) {
      return NextResponse.json(
        { error: "Message introuvable." },
        { status: 404 }
      );
    }

    const { messageId } = await sendContactReplyEmail({
      toEmail: message.email,
      toName: message.name,
      subject: message.subject,
      replyBody: reply,
      originalMessage: message.message,
    });

    await insertContactMessageReply({
      messageId: message.id,
      body: reply,
      sentBy: user.email ?? user.id,
      providerMessageId: messageId,
    });

    await updateContactMessagesStatus([message.id], "replied");

    return NextResponse.json({ ok: true, status: "replied" });
  } catch (error) {
    console.error("[admin/messages/reply]", error);
    return NextResponse.json(
      { error: "Impossible d’envoyer la réponse." },
      { status: 500 }
    );
  }
}
