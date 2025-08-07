import { sendMailtrapEmail } from '@utils/sendMailtrapEmail';
import { EnquiryNotification } from '@/constants/email';

export const sendEnquiryConfirmationEmail = async (enquiry: EnquiryNotification): Promise<void> => {
  const { booking_owner, students } = enquiry;
  const subject = 'Tempo Tuition, thanks for your enquiry!';

  const studentSummary = students
    .map(
      (student) =>
        `- ${student.name} (Age: ${student.age}, Level: ${student.level}, Instruments: ${student.instruments.join(', ')})`
    )
    .join('\n');

  const message = `
Hi ${booking_owner.first_name},

Thanks for your enquiry with Tempo Tuition. We will be in touch soon.

Your enquiry details:
${studentSummary}

Best regards,
The Tempo Team
`;

  try {
    await sendMailtrapEmail({
      to: booking_owner.email,
      subject: subject,
      message: message,
    });
  } catch (emailErr) {
    console.error(`Error sending email to ${booking_owner.email}:`, emailErr);
    throw emailErr;
  }
};
