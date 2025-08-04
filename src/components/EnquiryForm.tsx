import React, { useState } from 'react';
import supabase from '../lib/supabaseClient'
import { postcodeValidator } from 'postcode-validator';
import PostcodeAutocomplete from '@/utils/postcodes/ValidatePostcode';
import { postcodeToGeoPoint } from '@/utils/postcodes/postcodeUtils';
import { isValidUKPhone } from '@/utils/validationUtils';
import { INSTRUMENTS } from '@/constants/instruments';
import Logo from './Logo';

interface ProfileFields {
  first_name: string;
  last_name: string
  email: string
  instruments?: string[];
  postcode: string;
  phone: string;
  geopoint_consent?: boolean;
}

// Ensure instruments are typed correctly
const typedInstruments: Record<string, string[]> = INSTRUMENTS;

const ChipSelector = ({ options, selectedOptions, onChange }: {
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
}) => {
  const handleSelect = (option: string) => {
    if (selectedOptions.includes(option)) {
      onChange(selectedOptions.filter((item) => item !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  return (
    <div className="chip-container">
      {options.map((option) => (
        <div
          key={option}
          className={`chip ${selectedOptions.includes(option) ? 'chip-selected' : ''}`}
          onClick={() => handleSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

const EnquiryForm = () => {
  const [fields, setFields] = useState<ProfileFields>({
    first_name: '',
    last_name: '',
    instruments: [],
    postcode: '',
    email: '',
    phone: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Add state for tracking direction
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const validateStep = async (currentStep: number): Promise<boolean> => {
    setError('');
    if (currentStep === 1) {
      if (!fields.first_name || !fields.last_name) {
        setError('First and last name are required.');
        return false;
      }
    } else if (currentStep === 3) {
      if (!fields.postcode || !fields.phone) {
        setError('Postcode and phone are required.');
        return false;
      }
      const rawPostcode = fields.postcode?.toUpperCase();
      if (!postcodeValidator(rawPostcode, 'GB')) {
        setError('Please enter a valid UK postcode.');
        return false;
      }
      // Validate postcode location with geoPoint
      const geoPoint = await postcodeToGeoPoint(rawPostcode);
      if (!geoPoint) {
        setError('Could not validate postcode location. Please check your postcode.');
        setIsLoading(false);
        setStep(3);
        return false;
      }
      if (!isValidUKPhone(fields.phone || '')) {
        setError('Please enter a valid UK mobile number.');
        return false;
      }
    }
    return true;
  };

  const nextStep = async () => {
    setError('');
    if (await validateStep(step)) {
      setDirection('forward');
      setStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setError('');
    setDirection('backward');
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleValidatedSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(await validateStep(step))) return;
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Since this is an enquiry form, write to forms table instead of creating users
      const geoPoint = await postcodeToGeoPoint(fields.postcode);
      
      const formData = {
        ...fields,
        instruments: fields.instruments || [],
        geopoint: geoPoint?.geopoint || null,
        ward: geoPoint?.ward,
        region: geoPoint?.region,
        city: geoPoint?.city,
        geopoint_consent: fields.geopoint_consent,
      };

      // Write to forms table instead of users table
      const { error: insertError } = await supabase
        .from('forms') // or whatever your enquiry table is called
        .insert([formData]);
        
      if (insertError) {
        setError(insertError.message);
        setIsLoading(false);
        return;
      }
      
      setSuccess('Enquiry submitted successfully! We will be in touch soon.');
      setTimeout(() => {
        window.location.href = '/thank-you'; // redirect to thank you page
      }, 1500);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setError(errorMsg);
      setIsLoading(false);
      console.error('Form submission error:', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      {/* Header Section */}
      <div className="form-header">
        <Logo height={100} width={100} />
        <h1 className="form-title">
          Make An Enquiry
          <br />
          <span className="block text-base font-normal mt-2">Step {step} of 3</span>
        </h1>
      </div>

      {/* Content Section */}
      <div className="form-content">
        {error && (
          <div className="form-error">
            {error}
          </div>
        )}
        {success && (
          <div className="form-success">
            {success}
          </div>
        )}
        <form ref={undefined} onSubmit={handleValidatedSubmit} className="form-section">
          {/* Form Steps */}
          {step === 1 && !success && (
            <div className={`form-group form-stage ${direction === 'forward' ? 'form-stage-slide-in-right' : 'form-stage-slide-in-left'}`}>
              {/* Step 1 Content */}
              <div className="flex flex-col gap-4">
                <div className="form-group">
                  <label className="form-label" htmlFor="first_name">
                    First Name
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={fields.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="last_name">
                    Last Name
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={fields.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          )}
          {step === 2 && !success && (
            <div className={`form-group form-stage ${direction === 'forward' ? 'form-stage-slide-in-right' : 'form-stage-slide-in-left'}`}>
              {/* Step 2 Content */}
              <label className="form-label" htmlFor="instruments">
                Which Instruments do you require tuition for?
              </label>
              <ChipSelector
                options={Object.values(INSTRUMENTS).flat()}
                selectedOptions={fields.instruments || []}
                onChange={(selected) => setFields({ ...fields, instruments: selected })}
              />
            </div>
          )}
          {step === 3 && !success && (
            <div className={`form-group form-stage ${direction === 'forward' ? 'form-stage-slide-in-right' : 'form-stage-slide-in-left'}`}>
              {/* Step 3 Content */}
              <div className="form-group">
                <label className="form-label" htmlFor="postcode">
                  Postcode
                </label>
                <PostcodeAutocomplete
                  value={fields.postcode}
                  onChange={(val: string) => setFields(f => ({ ...f, postcode: val }))}
                  required
                />
              </div>
                <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                className="form-input"
                type="email"
                id="email"
                name="email"
                value={fields.email}
                onChange={handleChange}
                placeholder="e.g elton@john.com"

                />

              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  Mobile Phone
                </label>
                <input
                  className="form-input"
                  type="tel"
                  id="phone"
                  name="phone"
                  value={fields.phone}
                  onChange={handleChange}
                  placeholder="e.g. 07123 456789"
                  required
                />
              </div>
              <div className="form-group">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="geopoint_consent"
                    checked={fields.geopoint_consent}
                    onChange={e => setFields(f => ({ ...f, geopoint_consent: e.target.checked }))}
                    required
                  />
                  <span className="ml-2">
                    I consent to my information being shared with the team at Tempo. All information is handled within GDPR and our Privacy Policy
                  </span>
                </label>
              </div>
            </div>
          )}
          {!success && (
            <div className="form-buttons-container">
              {step > 1 && (
                <button type="button" className="btn-secondary" onClick={prevStep}>
                  Back
                </button>
              )}
              {step < 3 && (
                <button type="button" className="btn-primary" onClick={nextStep}>
                  Next
                </button>
              )}
              {step === 3 && (
                <button type="submit" className="btn-primary" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Profile'}
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;
