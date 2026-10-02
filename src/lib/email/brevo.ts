import { getMailConfig } from "@/lib/email/config";
import {
  buildContactInboundHtml,
  buildContactReplyHtml,
} from "@/lib/email/layout";

type SendEmailInput = {
  to: { email: string; name?: string };
  subject: string;
  textContent: string;
  htmlContent?: string;
  replyTo?: { email: string; name?: string };
  tags?: string[];
};

export type SendEmailResult = {
  messageId: string | null;
};

export async function sendTransactionalEmail(
  input: SendEmailInput
): Promise<SendEmailResult> {
  const { apiKey, fromEmail, fromName, configured } = getMailConfig();

  if (!configured) {
    throw new Error("BREVO_API_KEY manquante.");
  }

  const payload: Record<string, unknown> = {
    sender: { email: fromEmail, name: fromName },
    to: [
      {
        email: input.to.email,
        ...(input.to.name ? { name: input.to.name } : {}),
      },
    ],
    subject: input.subject,
    textContent: input.textContent,
  };

  if (input.htmlContent) {
    payload.htmlContent = input.htmlContent;
  }

  if (input.replyTo?.email) {
    payload.replyTo = {
      email: input.replyTo.email,
      ...(input.replyTo.name ? { name: input.replyTo.name } : {}),
    };
  }

  if (input.tags?.length) {
    payload.tags = input.tags;
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Brevo ${response.status}: ${detail || response.statusText}`
    );
  }

  const data = (await response.json().catch(() => ({}))) as {
    messageId?: string;
  };

  return { messageId: data.messageId ?? null };
}

function categoryLabel(category: string) {
  const labels: Record<string, string> = {
    general: "Informations générales",
    tickets: "Billets",
    vip: "VIP",
    press: "Presse",
    partnership: "Partenariat",
    volunteer: "Bénévolat",
    other: "Autre",
  };
  return labels[category] ?? category;
}

/** Mail entrant type « message reçu » (Reply-To = visiteur). */
export async function sendContactInboundEmail(params: {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}) {
  const { toEmail, fromName } = getMailConfig();
  const category = categoryLabel(params.category);
  const textContent = [
    `Nouveau message via le formulaire contact (${fromName})`,
    "",
    `De : ${params.name} <${params.email}>`,
    `Catégorie : ${category}`,
    `Objet : ${params.subject}`,
    "",
    params.message,
    "",
    "—",
    "Répondre à ce mail envoie directement au visiteur (Reply-To).",
  ].join("\n");

  return sendTransactionalEmail({
    to: { email: toEmail, name: fromName },
    subject: params.subject,
    textContent,
    htmlContent: buildContactInboundHtml({
      ...params,
      category,
    }),
    replyTo: { email: params.email, name: params.name },
    tags: ["contact-inbound"],
  });
}

/** Réponse admin → visiteur. */
export async function sendContactReplyEmail(params: {
  toEmail: string;
  toName: string;
  subject: string;
  replyBody: string;
  originalMessage: string;
}) {
  const replySubject = params.subject.toLowerCase().startsWith("re:")
    ? params.subject
    : `Re: ${params.subject}`;

  const textContent = [
    ...(params.toName.trim() ? [`Bonjour ${params.toName},`, ""] : []),
    params.replyBody,
    "",
    "Sportivement,",
    "GP SuperEnduro Paris",
    "",
    "—",
    "Message d'origine :",
    params.originalMessage,
  ].join("\n");

  return sendTransactionalEmail({
    to: { email: params.toEmail, name: params.toName },
    subject: replySubject,
    textContent,
    htmlContent: buildContactReplyHtml({
      toName: params.toName,
      replyBody: params.replyBody,
      originalMessage: params.originalMessage,
    }),
    tags: ["contact-reply"],
  });
}
