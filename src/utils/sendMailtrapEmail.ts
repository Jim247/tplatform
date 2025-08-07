// Define the Mailtrap API payload interface
interface MailtrapPayload {
  from: {
    email: string;
    name: string;
  };
  to: Array<{
    email: string;
    name?: string;
  }>;
  subject: string;
  category: string;
  text?: string;
  html?: string;
}

// Define the options interface
interface SendMailtrapEmailOptions {
  to: string;
  subject: string;
  message?: string;
  html?: string;
  category?: string;
  from?: {
    email: string;
    name: string;
  };
}

export async function sendMailtrapEmail(options: SendMailtrapEmailOptions) {
  const apiToken = process.env.MAILTRAP_API_TOKEN;

  if (!apiToken) {
    throw new Error('MAILTRAP_API_TOKEN environment variable is not set');
  }

  const {
    to,
    subject,
    message,
    html,
    category = 'Notification',
    from = { email: 'jim@tempomobile.co.uk', name: 'Tempo Tuition' },
  } = options;

  const payload: MailtrapPayload = {
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
    const errorData = await response.json();
    throw new Error(`Mailtrap API error: ${errorData.message || response.statusText}`);
  }

  return await response.json();
}
