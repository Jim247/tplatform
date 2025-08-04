import { sendMailtrapEmail } from '@utils/sendMailtrapEmail';

export type EnquiryNotification = {
  id: string;
  email: string;
  phone?: string;
  first_name: string;
  last_name: string;
  username: string;
  instruments?: string[];
};

export const sendEnquiryConfirmationEmail = async (
  enquirer: EnquiryNotification
): Promise<void> => {
  const subject = 'Tempo Tuition, thanks for your enquiry!';
  const message = `
Hi ${enquirer.first_name},

Thanks for your enquiry with Tempo Tuition. We will be in touch soon.

`;
  try {
    await sendMailtrapEmail({ to: enquirer.email, subject: subject, message: message });
  } catch (emailErr) {
    console.error(`Error sending email to ${enquirer.email}:`, emailErr);
    throw emailErr;
  }
};
