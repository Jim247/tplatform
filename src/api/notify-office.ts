import { sendMailtrapEmail } from '@utils/sendMailtrapEmail';
import { EnquiryNotification } from '@constants/email';

export const notifyOfficeEmail = async (
  enquirer: EnquiryNotification
): Promise<void> => {
  const officeEmail = 'jim@tempomobile.co.uk'; // Replace with your office email
  const subjectToOffice = `New Enquiry from ${enquirer.first_name} ${enquirer.last_name}`;
  const messageToOffice = `
New enquiry received:

Name: ${enquirer.first_name} ${enquirer.last_name}
Email: ${enquirer.email}
Phone: ${enquirer.phone || 'N/A'}
Instruments: ${enquirer.instruments?.join(', ') || 'N/A - Enquirer is parent or guardian'}

${
  enquirer.students && enquirer.students.length > 0
    ? `Students:\n${enquirer.students
        .map(
          (student, index) => `
  ${index + 1}. Name: ${student.name}
     Age: ${student.age}
     Level: ${student.level}
     Instruments: ${student.instruments.join(', ')}
     Notes: ${student.notes || 'N/A'}
`
        )
        .join('\n')}`
    : 'No additional students provided.'
}

Please follow up with the enquirer as soon as possible.
`;

  try {
    await sendMailtrapEmail({ to: officeEmail, subject: subjectToOffice, message: messageToOffice });
  } catch (emailErr) {
    console.error(`Error sending email to the office:`, emailErr);
    throw emailErr;
  }
};