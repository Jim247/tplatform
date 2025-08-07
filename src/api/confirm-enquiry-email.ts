import { sendMailtrapEmail } from '@utils/sendMailtrapEmail';
import { EnquiryNotification } from '@/constants/email';

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
