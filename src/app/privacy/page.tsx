import { privacyMetadata } from '@/utils/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = privacyMetadata;

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 text-white">
      <h1 className="text-4xl font-bold mb-8 text-amber-300">Privacy Policy & Terms of Service</h1>
      <p className="text-gray-300 mb-8">Last updated: {new Date().toLocaleDateString('en-GB')}</p>

      {/* Privacy Policy Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-amber-300">Privacy Policy</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">1. Who We Are</h3>
            <p className="text-gray-200 leading-relaxed">
              Tempo Tuition is a music education service operating in Bristol and the surrounding areas. 
              We connect students with qualified music tutors for lessons in guitar, piano, singing, and other instruments.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">2. What Information We Collect</h3>
            <p className="text-gray-200 leading-relaxed mb-3">
              When you enquire about or book music lessons with us, we collect the following information:
            </p>
            <ul className="list-disc ml-6 text-gray-200 space-y-2">
              <li>Personal details: Name, email address, phone number</li>
              <li>Location information: Postcode and approximate geographical location</li>
              <li>Learning preferences: Instruments of interest, experience level, learning goals</li>
              <li>Age information: To match you with appropriate tutors and teaching styles</li>
              <li>Any additional notes you provide about your musical goals or requirements</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">3. How We Use Your Information</h3>
            <p className="text-gray-200 leading-relaxed mb-3">
              We use your personal information for the following purposes:
            </p>
            <ul className="list-disc ml-6 text-gray-200 space-y-2">
              <li>To match you with suitable music tutors in your area</li>
              <li>To share your details with approved tutors who can provide the lessons you need</li>
              <li>To communicate with you about your enquiry and potential lessons</li>
              <li>To improve our service and understand demand in different areas</li>
              <li>To comply with legal obligations</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">4. Data Sharing</h3>
            <p className="text-gray-200 leading-relaxed mb-3">
              We share your information with:
            </p>
            <ul className="list-disc ml-6 text-gray-200 space-y-2">
              <li><strong>Approved Music Tutors:</strong> We share relevant details with vetted, qualified tutors who can provide the lessons you&apos;re looking for</li>
              <li><strong>Service Providers:</strong> Email services for communications and secure data storage providers</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights</li>
            </ul>
            <p className="text-gray-200 leading-relaxed mt-3">
              We do not sell your personal information to third parties or use it for marketing purposes beyond our own services.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">5. Data Storage and Security</h3>
            <p className="text-gray-200 leading-relaxed">
              Your data is stored securely using industry-standard encryption and security measures. 
              We retain your information only as long as necessary to provide our services or as required by law. 
              All our tutors are required to handle your personal information in accordance with GDPR requirements.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">6. Your Rights Under GDPR</h3>
            <p className="text-gray-200 leading-relaxed mb-3">
              As a UK resident, you have the following rights regarding your personal data:
            </p>
            <ul className="list-disc ml-6 text-gray-200 space-y-2">
              <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Right to Restrict Processing:</strong> Request limitation of how we use your data</li>
              <li><strong>Right to Data Portability:</strong> Request your data in a portable format</li>
              <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">7. Cookies and Website Data</h3>
            <p className="text-gray-200 leading-relaxed">
              Our website may use cookies to improve your browsing experience. These are typically used for 
              functionality purposes and to remember your preferences. You can control cookie settings through your browser.
            </p>
          </div>
        </div>
      </section>

      {/* Terms of Service Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-amber-300">Terms of Service</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">1. Service Description</h3>
            <p className="text-gray-200 leading-relaxed">
              Tempo Tuition provides a connection service between students seeking music lessons and qualified music tutors. 
              We facilitate introductions but do not directly provide the music lessons themselves.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">2. Tutor Arrangements</h3>
            <p className="text-gray-200 leading-relaxed">
              Once we connect you with a suitable tutor, lesson arrangements, scheduling, payments, and policies 
              are managed directly between you and the tutor. We carefully vet our tutors, but each operates as 
              an independent contractor with their own terms and teaching methods.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">3. Enquiry Process</h3>
            <p className="text-gray-200 leading-relaxed">
              By submitting an enquiry through our website, you consent to us sharing your information with 
              appropriate tutors in your area. There is no obligation to proceed with lessons after making an enquiry.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">4. Accuracy of Information</h3>
            <p className="text-gray-200 leading-relaxed">
              You agree to provide accurate and complete information when making an enquiry. This helps us 
              match you with the most suitable tutors for your needs.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">5. Limitation of Liability</h3>
            <p className="text-gray-200 leading-relaxed">
              Tempo Tuition acts as an introduction service. We are not liable for the quality of lessons, 
              tutor conduct, payment disputes, or any issues arising from the direct relationship between 
              students and tutors. However, we are committed to working with reputable, qualified professionals.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">6. Modifications</h3>
            <p className="text-gray-200 leading-relaxed">
              We reserve the right to modify these terms and our privacy policy at any time. 
              Significant changes will be communicated via our website.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-amber-300">Contact Us</h2>
        <div className="space-y-4">
          <p className="text-gray-200 leading-relaxed">
            If you have any questions about this privacy policy, our terms of service, or wish to exercise 
            any of your data protection rights, please contact us:
          </p>
          <div className="bg-gray-800 p-6 rounded-lg">
            <p className="text-white mb-2"><strong>Email:</strong> jim@tempotuition.co.uk</p>
            <p className="text-white mb-2"><strong>Response Time:</strong> We aim to respond to all privacy-related enquiries within 30 days</p>
            <p className="text-white"><strong>Data Protection:</strong> We are committed to GDPR compliance and protecting your personal information</p>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <div className="border-t border-gray-300 pt-6">
        <p className="text-gray-200 text-sm">
          This privacy policy and terms of service comply with UK GDPR requirements and are regularly reviewed to ensure continued compliance.
        </p>
      </div>
    </div>
  );
}
