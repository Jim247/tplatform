import React, { useState } from 'react';
import supabase from '../lib/supabaseClient'
import PostcodeAutocomplete from '@/utils/postcodes/ValidatePostcode';
import { postcodeToGeoPoint } from '@/utils/postcodes/postcodeUtils';
import { INSTRUMENTS } from '@/constants/instruments';
import Logo from './Logo';
import { mdiAccount, mdiAccountMultiple } from '@mdi/js';
import Icon from '@mdi/react';

interface Student {
  booking_owner_id: string; // New field to link student to booking owner
  name: string;
  age: string;
  level: string;
  notes: string;
  instruments: string[];
}

interface ProfileFields {
  first_name: string;
  last_name: string
  email: string
  postcode: string;
  phone: string;
  geopoint_consent?: boolean;
  students: Student[]; 
  studentIsMyself: boolean;
}

interface BookingOwner {
  id: string;
  name: string;
  email: string;
  phone: string;
  postcode: string;
  age: string;        // Only filled if they're also a student
  level: string;      // Only filled if they're also a student  
  notes: string;      // Only filled if they're also a student
  instruments: string[]; // Only filled if they're also a student
  geopoint?: any;
  ward?: string;
  region?: string;
  city?: string;
  geopoint_consent?: boolean;
  created_at?: Date;
}

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
    postcode: '',
    email: '',
    phone: '',
    students: [], // Changed from learners to students
    studentIsMyself: false,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState<'instruments' | 'details' | 'summary'>('instruments');
  const [currentLearnerIndex, setCurrentLearnerIndex] = useState(0);

  // Add state for tracking direction
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const validateStep = () => {
    console.log('Validating step:', step, 'subStep:', subStep);
    console.log('Current students:', fields.students);
    console.log('Current learner index:', currentLearnerIndex);
    
    switch (step) {
      case 1:
        return true; // Just selecting learner type
      case 2:
        if (subStep === 'instruments') {
          // Must have at least one learner with instruments
          const currentStudent = fields.students[currentLearnerIndex];
          const isValid = currentStudent && currentStudent.instruments.length > 0;
          console.log('Instruments validation:', isValid, 'Current student:', currentStudent);
          return isValid;
        } else if (subStep === 'details') {
          // Current learner must have age and level (name only required for others, not self)
          const currentStudent = fields.students[currentLearnerIndex];
          const isValid = currentStudent && 
                 (fields.studentIsMyself || currentStudent.name.trim() !== '') && // Only require name if not self-learner
                 currentStudent.age.trim() !== '' && 
                 currentStudent.level.trim() !== '';
          console.log('Details validation:', isValid, 'Current student:', currentStudent);
          return isValid;
        } else if (subStep === 'summary') {
          // Just need at least one complete learner to proceed
          const hasAtLeastOneCompleteStudent = fields.students.length > 0 && fields.students.some(student => {
            const studentComplete = student.instruments.length > 0 &&
              (fields.studentIsMyself || student.name.trim() !== '') && // Only require name if not self-learner
              student.age.trim() !== '' &&
              student.level.trim() !== '';
            console.log('Student complete check:', student.name, studentComplete, student);
            return studentComplete;
          });
          console.log('Summary validation - at least one student complete:', hasAtLeastOneCompleteStudent);
          return hasAtLeastOneCompleteStudent;
        }
        return false;
      case 3:
        return fields.first_name.trim() !== '' && fields.last_name.trim() !== '' && fields.email.trim() !== '';
      case 4:
        return true; // Review step
      default:
        return false;
    }
  };

  const nextStep = async () => {
    setError('');
    if (await validateStep()) {
      setDirection('forward');
      
      if (step === 2 && subStep === 'instruments') {
        // Move to details sub-step for current learner
        setSubStep('details');
      } else if (step === 2 && subStep === 'details') {
        // Move to summary if we have learners, or next step if self-learner
        if (fields.studentIsMyself) {
          // Self-learner goes directly to contact details
          setStep(3);
          setSubStep('instruments');
        } else {
          // Others go to summary to manage multiple learners
          setSubStep('summary');
        }
      } else if (step === 2 && subStep === 'summary') {
        // Move to contact details
        setStep(3);
        setSubStep('instruments');
      } else {
        // Normal step progression
        setStep(prev => Math.min(prev + 1, 3));
        if (step === 1) {
          // When moving from step 1 to 2, ensure we have a learner
          if (fields.students.length === 0) {
            addStudent();
          }
        }
      }
    }
  };

  const prevStep = () => {
    setError('');
    setDirection('backward');
    
    if (step === 2 && subStep === 'details') {
      // Move back to instruments sub-step
      setSubStep('instruments');
    } else if (step === 2 && subStep === 'summary') {
      // Move back to details for current learner
      setSubStep('details');
    } else if (step === 2 && subStep === 'instruments') {
      // Move back to step 1
      setStep(prev => Math.max(prev - 1, 1));
    } else {
      // Normal step progression
      setStep(prev => Math.max(prev - 1, 1));
      if (step === 3) {
        // When moving back to step 2, set appropriate sub-step
        if (fields.studentIsMyself) {
          setSubStep('details');
        } else {
          setSubStep('summary');
        }
      }
    }
  };

  const addStudent = () => {
    const newStudent: Student = {
      booking_owner_id: '', // Will be set after creating the booking owner
      name: fields.studentIsMyself ? '' : '', // Leave empty for self-learners until contact details are filled
      age: '',
      level: '',
      notes: '',
      instruments: [],
    };
    setFields(prev => ({
      ...prev,
      students: [...prev.students, newStudent]
    }));
    // Set current student index to the new student
    setCurrentLearnerIndex(fields.students.length);
    // Go to instruments step for new student
    setSubStep('instruments');
  };

  const editLearner = (index: number) => {
    setCurrentLearnerIndex(index);
    setSubStep('instruments');
  };

  const updateStudent = (index: number, updates: Partial<Student>) => {
    setFields(prev => ({
      ...prev,
      students: prev.students.map((student, i) => 
        i === index ? { ...student, ...updates } : student
      )
    }));
  };

  const removeStudent = (index: number) => {
    setFields(prev => ({
      ...prev,
      students: prev.students.filter((_, i) => i !== index)
    }));
    // Adjust current student index if needed
    if (currentLearnerIndex >= index && currentLearnerIndex > 0) {
      setCurrentLearnerIndex(currentLearnerIndex - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleValidatedSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(await validateStep())) return;
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const geoPoint = await postcodeToGeoPoint(fields.postcode);
      
      // Step 1: Create the booking owner (the person making the enquiry)
      const bookingOwnerData = {
        name: `${fields.first_name} ${fields.last_name}`,
        age: fields.studentIsMyself ? fields.students[0]?.age || '' : '',
        level: fields.studentIsMyself ? fields.students[0]?.level || '' : '',
        notes: fields.studentIsMyself ? fields.students[0]?.notes || '' : '',
        instruments: fields.studentIsMyself ? fields.students[0]?.instruments || [] : [],
      };

      // Include contact and location data
      const ownerFormData = {
        ...bookingOwnerData,
        email: fields.email,
        phone: fields.phone,
        postcode: fields.postcode,
        geopoint: geoPoint?.geopoint || null,
        ward: geoPoint?.ward,
        region: geoPoint?.region,
        city: geoPoint?.city,
        geopoint_consent: fields.geopoint_consent,
      };

      const { data: ownerResponse, error: ownerError } = await supabase
        .from('booking_owners') // New table for booking owners
        .insert([ownerFormData])
        .select();
        
      if (ownerError) {
        setError(ownerError.message);
        setIsLoading(false);
        return;
      }

      const bookingOwnerId = ownerResponse[0]?.id;

      // Step 2: Create students linked to the booking owner
      if (fields.students.length > 0) {
        const studentsData = fields.students.map((student) => ({
          ...student,
          booking_owner_id: bookingOwnerId,
        }));

        const { error: studentsError } = await supabase
          .from('students') // New table for students
          .insert(studentsData);

        if (studentsError) {
          setError(studentsError.message);
          setIsLoading(false);
          return;
        }
      }
      
      setSuccess('Enquiry submitted successfully! We will be in touch soon.');
      setTimeout(() => {
        window.location.href = '/';
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
          <span className="block text-base font-normal mt-2">
            Step {step === 2 && subStep === 'details' ? '3' : step === 2 ? '2' : step > 2 ? step + 1 : step} of 4
          </span>
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
          {/* Step 1: Learner Type Selection */}
          {step === 1 && !success && (
            <div className={`form-group form-stage ${direction === 'forward' ? 'form-stage-slide-in-right' : 'form-stage-slide-in-left'}`}>
              <div className="learner-type-selection">
                <h2 className="form-subtitle">Who is this enquiry for?</h2>
                <div className="learner-type-cards">
                  <div 
                    className={`learner-type-card ${fields.studentIsMyself ? 'selected' : ''}`}
                    onClick={() => {
                      setFields(prev => ({ 
                        ...prev, 
                        studentIsMyself: true,
                        students: []
                      }));
                    }}
                  >
                    <Icon path={mdiAccount} size={1.5} className="card-icon" />
                    <h3>I&apos;m the learner</h3>
                    <p className='text-white'>Music lessons for myself</p>
                  </div>
                  
                  <div 
                    className={`learner-type-card ${!fields.studentIsMyself ? 'selected' : ''}`}
                    onClick={() => {
                      setFields(prev => ({ 
                        ...prev, 
                        studentIsMyself: false,
                        students: []
                      }));
                    }}
                  >
                    <Icon path={mdiAccountMultiple} size={1.5} className="card-icon" />
                    <h3>I&apos;m enquiring for someone else</h3>
                    <p>Children, family member, or friend</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Instruments Selection */}
          {step === 2 && subStep === 'instruments' && !success && (
            <div className={`form-group form-stage ${direction === 'forward' ? 'form-stage-slide-in-right' : 'form-stage-slide-in-left'}`}>
              <h2 className="form-subtitle">
                Which instruments would {fields.studentIsMyself ? 'you' : 'they'} like to learn?
              </h2>
              <div className="learner-details-card">
                <ChipSelector
                  options={Object.values(INSTRUMENTS).flat()}
                  selectedOptions={fields.students[currentLearnerIndex]?.instruments || []}
                  onChange={(selected) => updateStudent(currentLearnerIndex, { instruments: selected })}
                />
              </div>
            </div>
          )}

          {/* Step 3: Learner Details */}
          {step === 2 && subStep === 'details' && !success && (
            <div className={`form-group form-stage ${direction === 'forward' ? 'form-stage-slide-in-right' : 'form-stage-slide-in-left'}`}>
              <h2 className="form-subtitle">
                {fields.studentIsMyself ? 'Your Learning Details' : 'Learner Details'}
              </h2>
              
              <div className="learner-details-card">
                {/* Name (only for others, not self) */}
                {!fields.studentIsMyself && (
                  <div className="form-group">
                    <label className="form-label" htmlFor="learner_name">
                      Learner Name
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      id="learner_name"
                      value={fields.students[currentLearnerIndex]?.name || ''}
                      onChange={(e) => updateStudent(currentLearnerIndex, { name: e.target.value })}
                      placeholder="e.g. Emily Smith"
                      required
                    />
                  </div>
                )}

                {/* Age and Level */}
                <div className="form-group-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="learner_age">
                      {fields.studentIsMyself ? 'Your Age' : 'Age'}
                    </label>
                    <select
                      className="form-select"
                      id="learner_age"
                      value={fields.students[currentLearnerIndex]?.age || ''}
                      onChange={(e) => updateStudent(currentLearnerIndex, { age: e.target.value })}
                      required
                    >
                      <option value="">Select Age</option>
                      {Array.from({ length: 95 }, (_, i) => i + 6).map((age) => (
                        <option key={age} value={age}>
                          {age}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="learner_level">
                      {fields.studentIsMyself ? 'Your Level' : 'Level'}
                    </label>
                    <select
                      className="form-select"
                      id="learner_level"
                      value={fields.students[currentLearnerIndex]?.level || ''}
                      onChange={(e) => updateStudent(currentLearnerIndex, { level: e.target.value })}
                      required
                    >
                      <option value="">Select Level</option>
                      <option value="Complete Beginner">Complete Beginner</option>
                      <option value="Some Experience">Some Experience</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div className="form-group">
                  <label className="form-label" htmlFor="learner_notes">
                    {fields.studentIsMyself ? 'Tell us about your goals' : 'Tell us about their goals'}
                  </label>
                  <textarea
                    className="form-input"
                    id="learner_notes"
                    value={fields.students[currentLearnerIndex]?.notes || ''}
                    onChange={(e) => updateStudent(currentLearnerIndex, { notes: e.target.value })}
                    placeholder={fields.studentIsMyself ? 
                      "What would you like to achieve? Any specific styles, songs, or goals..." :
                      "What would they like to achieve? Any specific styles, songs, or goals..."
                    }
                    rows={3}
                  />
                </div>
              </div>

              {/* Option to add more learners (only for "someone else") */}
              {!fields.studentIsMyself && (
                <div className="add-learner-section">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      addStudent();
                    }}
                  >
                    + Add Another Learner
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Summary - Show all learners */}
          {step === 2 && subStep === 'summary' && !success && (
            <div className={`form-group form-stage ${direction === 'forward' ? 'form-stage-slide-in-right' : 'form-stage-slide-in-left'}`}>
              <h2 className="form-subtitle">Learners Summary</h2>
              
              <div className="learners-summary">
                {fields.students.map((student, index) => (
                  <div key={index} className="learner-summary-card">
                    <div className="learner-summary-header">
                      <h3>{student.name || `Learner ${index + 1}`}</h3>
                      <div className="learner-summary-actions">
                        <button
                          type="button"
                          className="btn-edit"
                          onClick={() => editLearner(index)}
                        >
                          Edit
                        </button>
                        {fields.students.length > 1 && (
                          <button
                            type="button"
                            className="btn-remove"
                            onClick={() => removeStudent(index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="learner-summary-details">
                      <p><strong>Age:</strong> {student.age}</p>
                      <p><strong>Level:</strong> {student.level}</p>
                      <p><strong>Instruments:</strong> {student.instruments.join(', ')}</p>
                      {student.notes && <p><strong>Goals:</strong> {student.notes}</p>}
                    </div>
                  </div>
                ))}
                
                <div className="add-learner-section">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => addStudent()}
                  >
                    + Add Another Learner
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Contact Details */}
          {step === 3 && !success && (
            <div className={`form-group form-stage ${direction === 'forward' ? 'form-stage-slide-in-right' : 'form-stage-slide-in-left'}`}>
              <h2 className="form-subtitle">Contact Details</h2>
              <div className="contact-details-card">
                <div className="form-group-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="first_name">
                      Your First Name
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={fields.first_name}
                      onChange={handleChange}
                      placeholder="e.g. John"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="last_name">
                      Your Last Name
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={fields.last_name}
                      onChange={handleChange}
                      placeholder="e.g. Smith"
                      required
                    />
                  </div>
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
                    placeholder="e.g. john@example.com"
                    required
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
                  <label className="form-label" htmlFor="postcode">
                    Postcode
                  </label>
                  <PostcodeAutocomplete
                    value={fields.postcode}
                    onChange={(val: string) => setFields(f => ({ ...f, postcode: val }))}
                    required
                  />
                </div>

                <div className="form-group consent-group">
                  <label className="consent-label">
                    <input
                      type="checkbox"
                      name="geopoint_consent"
                      checked={fields.geopoint_consent}
                      onChange={e => setFields(f => ({ ...f, geopoint_consent: e.target.checked }))}
                      required
                    />
                    <span className="consent-text">
                      I consent to my information being shared with the team at Tempo. All information is handled within GDPR and our Privacy Policy
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {!success && (
            <div className="form-buttons-container">
              {(step > 1 || (step === 2 && (subStep === 'details' || subStep === 'summary'))) && (
                <button type="button" className="btn-secondary" onClick={prevStep}>
                  Back
                </button>
              )}
              {(step < 3 || (step === 2 && subStep !== 'summary')) && (
                <button 
                  type="button" 
                  className="btn-primary" 
                  onClick={nextStep}
                  disabled={!validateStep()}
                >
                  Next
                </button>
              )}
              {step === 3 && (
                <button type="submit" className="btn-primary" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Enquiry'}
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
