import { sendMailtrapEmail } from '@utils/sendMailtrapEmail';
import { EnquiryNotification } from '@constants/email';

export const notifyOfficeEmail = async (enquiry: EnquiryNotification): Promise<void> => {
  const officeEmail = 'jim@tempomobile.co.uk';
  const { booking_owner, students } = enquiry;
  const subjectToOffice = `New Enquiry from ${booking_owner.first_name} ${booking_owner.last_name}`;

  const studentDetails = students
    .map(
      (student, index) => `
  ${index + 1}. Name: ${student.name} ${student.is_booking_owner ? '(Self)' : ''}
     Age: ${student.age}
     Level: ${student.level}
     Instruments: ${student.instruments.join(', ')}
     Notes: ${student.notes || 'N/A'}
`
    )
    .join('\n');

  const messageToOffice = `
New enquiry received:

BOOKING OWNER:
Name: ${booking_owner.first_name} ${booking_owner.last_name}
Email: ${booking_owner.email}
Phone: ${booking_owner.phone || 'N/A'}
Postcode: ${booking_owner.postcode}
Location: ${booking_owner.city || 'N/A'}, ${booking_owner.region || 'N/A'}

STUDENTS:${studentDetails}

Please follow up with the enquirer as soon as possible.
`;

  try {
    await sendMailtrapEmail({
      to: officeEmail,
      subject: subjectToOffice,
      message: messageToOffice,
    });
  } catch (emailErr) {
    console.error(`Error sending email to the office:`, emailErr);
    throw emailErr;
  }
};
