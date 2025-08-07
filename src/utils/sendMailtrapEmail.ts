export interface SendEmailOptions {
  to: string;
  subject: string;
  message?: string;
  html?: string;
  category?: string;
  from?: { email: string; name?: string };
}

export async function sendMailtrapEmail(options: SendEmailOptions) {
  const apiToken = process.env.NEXT_MAILTRAP_API_KEY;
  if (!apiToken) throw new Error('NEXT_MAILTRAP_API_KEY is not set in environment variables.');

  const {
    to,
    subject,
    message,
    html,
    category = 'Notification',
    from = { email: 'jim@tempomobile.co.uk', name: 'MusoSpot' },
  } = options;

  const payload: any = {
    from,
    to: [{ email: to }],
    subject,
    category,
  };
  if (message) payload.text = message;
  if (html) payload.html = html;

  const response = await fetch('https://send.api.mailtrap.io/api/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Mailtrap API error: ${response.status} ${errorText}`);
  }
}
