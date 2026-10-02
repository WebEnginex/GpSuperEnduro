import { siteConfig, venueConfig } from "@/data/site";

/** Toujours l’URL publique : les clients mail ne chargent pas localhost. */
const PUBLIC_SITE_URL = "https://gpsuperenduroparis.fr";
const LOGO_URL = `${PUBLIC_SITE_URL}/images/logo/logo_SuperEnduro.png`;
const CONTACT_EMAIL = "contact@gpsuperenduroparis.fr";

const BRAND = {
  red: "#E30613",
  redDark: "#B8050F",
  black: "#0a0a0a",
  ink: "#151515",
  muted: "#6b6b6b",
  soft: "#8a8a8a",
  line: "#ececec",
  bg: "#ececec",
  white: "#ffffff",
  quoteBg: "#f7f7f7",
} as const;

const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function nl2brEscaped(value: string) {
  return escapeHtml(value).replaceAll("\n", "<br/>");
}

function capitalizeWord(value: string) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function metaRow(label: string, valueHtml: string, last = false) {
  const border = last ? "" : `border-bottom:1px solid ${BRAND.line};`;
  return `
    <tr>
      <td style="padding:14px 16px;${border}width:108px;vertical-align:top;font-family:${FONT};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${BRAND.soft};font-weight:700;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:14px 16px;${border}vertical-align:top;font-family:${FONT};font-size:15px;line-height:1.45;color:${BRAND.ink};">
        ${valueHtml}
      </td>
    </tr>
  `.trim();
}

/** Enveloppe HTML branding GP SuperEnduro (compatible clients mail). */
export function wrapBrandedEmail(params: {
  title: string;
  preheader?: string;
  eyebrow?: string;
  bodyHtml: string;
}) {
  const preheader = params.preheader
    ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">${escapeHtml(params.preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>`
    : "";

  const eyebrow = params.eyebrow
    ? `<p style="margin:0 0 18px;font-family:${FONT};font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${BRAND.red};font-weight:700;">${escapeHtml(params.eyebrow)}</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta name="color-scheme" content="light"/>
  <meta name="supported-color-schemes" content="light"/>
  <title>${escapeHtml(params.title)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.bg};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  ${preheader}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;border-collapse:separate;">
          <!-- Header -->
          <tr>
            <td style="background:${BRAND.black};border-radius:14px 14px 0 0;overflow:hidden;">
              <div style="height:3px;line-height:3px;font-size:0;background:linear-gradient(90deg, ${BRAND.red} 0%, ${BRAND.redDark} 55%, ${BRAND.black} 100%);">&nbsp;</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:28px 28px 12px;">
                    <a href="${PUBLIC_SITE_URL}" style="text-decoration:none;">
                      <img
                        src="${LOGO_URL}"
                        width="220"
                        alt="${escapeHtml(siteConfig.name)}"
                        style="display:block;width:220px;max-width:70%;height:auto;border:0;outline:none;"
                      />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:0 28px 26px;">
                    <p style="margin:0;font-family:${FONT};font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.55);">
                      Championnat du monde · 27 février 2027
                    </p>
                    <p style="margin:8px 0 0;font-family:${FONT};font-size:13px;color:rgba(255,255,255,0.78);">
                      ${escapeHtml(venueConfig.name)} · Tremblay-en-France
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:${BRAND.white};padding:36px 32px 28px;font-family:${FONT};color:${BRAND.ink};">
              ${eyebrow}
              ${params.bodyHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:${BRAND.black};border-radius:0 0 14px 14px;padding:0;" align="center">
              <div style="height:1px;line-height:1px;font-size:0;background:${BRAND.red};opacity:0.85;">&nbsp;</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:26px 32px 14px;">
                    <a href="${PUBLIC_SITE_URL}" style="text-decoration:none;">
                      <img
                        src="${LOGO_URL}"
                        width="140"
                        alt="${escapeHtml(siteConfig.name)}"
                        style="display:block;width:140px;max-width:42%;height:auto;border:0;outline:none;opacity:0.95;"
                      />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:0 32px 28px;">
                    <a href="${PUBLIC_SITE_URL}" style="font-family:${FONT};font-size:12px;color:rgba(255,255,255,0.55);text-decoration:none;letter-spacing:0.04em;">
                      gpsuperenduroparis.fr
                    </a>
                    <span style="color:rgba(255,255,255,0.2);font-family:${FONT};font-size:12px;">&nbsp;·&nbsp;</span>
                    <a href="mailto:${CONTACT_EMAIL}" style="font-family:${FONT};font-size:12px;color:rgba(255,255,255,0.55);text-decoration:none;">
                      ${CONTACT_EMAIL}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

export function buildContactInboundHtml(params: {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}) {
  const bodyHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 22px;border:1px solid ${BRAND.line};border-radius:10px;overflow:hidden;">
      ${metaRow(
        "De",
        `<strong style="font-weight:700;">${escapeHtml(params.name)}</strong><br/><a href="mailto:${escapeHtml(params.email)}" style="color:${BRAND.red};text-decoration:none;">${escapeHtml(params.email)}</a>`
      )}
      ${metaRow("Catégorie", escapeHtml(params.category))}
      ${metaRow("Objet", escapeHtml(params.subject), true)}
    </table>
    <div style="padding:18px 18px 18px 16px;background:${BRAND.quoteBg};border-left:3px solid ${BRAND.red};border-radius:0 8px 8px 0;font-family:${FONT};font-size:15px;line-height:1.65;color:${BRAND.ink};">
      ${nl2brEscaped(params.message)}
    </div>
    <p style="margin:20px 0 0;font-family:${FONT};font-size:12px;line-height:1.5;color:${BRAND.muted};">
      Répondre à cet e-mail envoie directement au visiteur.
    </p>
  `.trim();

  return wrapBrandedEmail({
    title: params.subject,
    preheader: `Message de ${params.name} — ${params.subject}`,
    eyebrow: "Nouveau message contact",
    bodyHtml,
  });
}

export function buildContactReplyHtml(params: {
  toName: string;
  replyBody: string;
  originalMessage: string;
}) {
  const firstName = capitalizeWord(
    params.toName.trim().split(/\s+/)[0] || params.toName.trim()
  );
  const greeting = firstName
    ? `<p style="margin:0 0 18px;font-family:${FONT};font-size:16px;line-height:1.5;color:${BRAND.ink};">Bonjour <strong style="font-weight:700;">${escapeHtml(firstName)}</strong>,</p>`
    : "";

  const bodyHtml = `
    ${greeting}
    <div style="font-family:${FONT};font-size:16px;line-height:1.7;color:${BRAND.ink};">
      ${nl2brEscaped(params.replyBody)}
    </div>
    <p style="margin:28px 0 0;font-family:${FONT};font-size:14px;line-height:1.6;color:${BRAND.muted};">
      Sportivement,<br/>
      <strong style="color:${BRAND.ink};font-weight:700;">L’équipe ${escapeHtml(siteConfig.name)}</strong>
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
      <tr>
        <td style="padding-top:18px;border-top:1px solid ${BRAND.line};">
          <p style="margin:0 0 8px;font-family:${FONT};font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#b0b0b0;font-weight:600;">
            Votre message
          </p>
          <p style="margin:0;font-family:${FONT};font-size:13px;line-height:1.55;color:#9a9a9a;font-style:italic;">
            ${nl2brEscaped(params.originalMessage)}
          </p>
        </td>
      </tr>
    </table>
  `.trim();

  return wrapBrandedEmail({
    title: "Réponse",
    preheader: params.replyBody.slice(0, 120),
    bodyHtml,
  });
}
