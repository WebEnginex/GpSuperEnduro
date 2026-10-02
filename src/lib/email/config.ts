/**
 * Config envoi transactionnel (Brevo).
 * MAIL_FROM doit être une adresse du domaine vérifié chez Brevo.
 * MAIL_TO = boîte qui reçoit les messages formulaire (souvent contact@ → redirect Proton).
 */
export function getMailConfig() {
  const apiKey = process.env.BREVO_API_KEY?.trim() ?? "";
  const fromEmail =
    process.env.MAIL_FROM?.trim() || "contact@gpsuperenduroparis.fr";
  const fromName =
    process.env.MAIL_FROM_NAME?.trim() || "GP SuperEnduro Paris";
  const toEmail =
    process.env.MAIL_TO?.trim() || fromEmail;

  return {
    apiKey,
    fromEmail,
    fromName,
    toEmail,
    configured: Boolean(apiKey),
  };
}

export function isMailConfigured() {
  return getMailConfig().configured;
}
