import React, { useState } from 'react';
import PostcodeAutocomplete from '@/utils/postcodes/ValidatePostcode';
import { postcodeToGeoPoint } from '@/utils/postcodes/postcodeUtils';
import { INSTRUMENTS } from '@/constants/instruments';
import Logo from './Logo';
import { mdiAccount, mdiAccountMultiple } from '@mdi/js';
import Icon from '@mdi/react';

interface Student {
  id: string; // Unique identifier for the student
  booking_owner_id: string; // Links to the booking owner
  name: string;
  age: string;
  level: string;
  notes: string;
  instruments: string[];
  is_booking_owner: boolean; // True if this student is the same person as the booking owner
}

interface BookingOwner {
  first_name: string;
  last_name: string;
  email: string;
  postcode: string;
  phone: string;
  geopoint_consent?: boolean;
}

interface ProfileFields extends BookingOwner {
  students: Student[];
  studentIsMyself: boolean;
}

const ChipSelector = ({
  options,
  selectedOptions,
  onChange,
}: {
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
  const [subStep, setSubStep] = useState<'instruments' | 'details' | 'levelnotes' | 'summary'>(
    'instruments'
  );
  const [currentLearnerIndex, setCurrentLearnerIndex] = useState(0);

  // Add state for tracking direction
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  // Helper functions
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getCurrentStudent = () => fields.students[currentLearnerIndex];

  const isStudentComplete = (student: Student) =>
    student.instruments.length > 0 &&
    student.name.trim() !== '' &&
    student.age.trim() !== '' &&
    student.level.trim() !== '';

  // Validation with error message return
  const validateStepWithError = (): { isValid: boolean; errorMessage: string } => {
    const currentStudent = getCurrentStudent();

    switch (step) {
      case 1:
        return { isValid: true, errorMessage: '' };

      case 2:
        switch (subStep) {
          case 'instruments':
            return {
              isValid: !!currentStudent && currentStudent.instruments.length > 0,
              errorMessage: 'Please select at least one instrument.',
            };
          case 'details':
            if (!currentStudent) {
              return { isValid: false, errorMessage: 'Please enter learner details.' };
            }
            if (currentStudent.name.trim() === '') {
              return { isValid: false, errorMessage: "Please enter the learner's name." };
            }
            if (currentStudent.age.trim() === '') {
              return { isValid: false, errorMessage: "Please select the learner's age." };
            }
            return { isValid: true, errorMessage: '' };
          case 'levelnotes':
            return {
              isValid: !!currentStudent && currentStudent.level.trim() !== '',
              errorMessage: 'Please select the learning level.',
            };
          case 'summary':
            return {
              isValid: fields.students.length > 0 && fields.students.some(isStudentComplete),
              errorMessage: "Please complete at least one learner's details.",
            };
          default:
            return { isValid: false, errorMessage: '' };
        }

      case 3:
        if (fields.first_name.trim() === '') {
          return { isValid: false, errorMessage: 'Please enter your first name.' };
        }
        if (fields.last_name.trim() === '') {
          return { isValid: false, errorMessage: 'Please enter your last name.' };
        }
        if (fields.email.trim() === '') {
          return { isValid: false, errorMessage: 'Please enter your email address.' };
        }
        if (!isValidEmail(fields.email.trim())) {
          return { isValid: false, errorMessage: 'Please enter a valid email address.' };
        }
        return { isValid: true, errorMessage: '' };

      default:
        return { isValid: true, errorMessage: '' };
    }
  };

  const validateStep = () => validateStepWithError().isValid;

  // Step navigation helpers
  const createNewStudent = (): Student => ({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    booking_owner_id: '', // Will be set by the server
    name: fields.studentIsMyself
      ? `${fields.first_name} ${fields.last_name}`.trim() || 'Myself'
      : '',
    age: '',
    level: '',
    notes: '',
    instruments: [],
    is_booking_owner: fields.studentIsMyself,
  });

  const handleStepProgression = () => {
    if (step === 1) {
      if (fields.students.length === 0) {
        setFields((prev) => ({
          ...prev,
          students: [createNewStudent()],
        }));
      }
      setStep(2);
    } else if (step === 2) {
      const progressionMap = {
        instruments: () => setSubStep('details'),
        details: () => setSubStep('levelnotes'),
        levelnotes: () => {
          if (currentLearnerIndex < fields.students.length - 1) {
            setCurrentLearnerIndex(currentLearnerIndex + 1);
            setSubStep('instruments');
          } else {
            setSubStep('summary');
          }
        },
        summary: () => setStep(3),
      };
      progressionMap[subStep]?.();
    } else if (step < 4) {
      setStep(step + 1);
    }
  };

  const nextStep = () => {
    setError('');
    setDirection('forward');

    const validation = validateStepWithError();
    if (!validation.isValid) {
      setError(validation.errorMessage);
      return;
    }

    handleStepProgression();
  };

  const prevStep = () => {
    setError('');
    setDirection('backward');

    const regressionMap = {
      2: {
        details: () => setSubStep('instruments'),
        levelnotes: () => setSubStep('details'),
        summary: () => setSubStep('levelnotes'),
        instruments: () => setStep(1),
      },
    };

    if (step === 2) {
      regressionMap[2][subStep]?.();
    } else if (step === 3) {
      setStep(2);
      setSubStep('summary');
    } else {
      setStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const addStudent = () => {
    const newStudent = createNewStudent();
    setFields((prev) => ({ ...prev, students: [...prev.students, newStudent] }));
    setCurrentLearnerIndex(fields.students.length);
    setSubStep('instruments');
  };

  const editLearner = (index: number) => {
    setCurrentLearnerIndex(index);
    setSubStep('instruments');
  };

  const updateStudent = (index: number, updates: Partial<Student>) => {
    setFields((prev) => ({
      ...prev,
      students: prev.students.map((student, i) =>
        i === index ? { ...student, ...updates } : student
      ),
    }));
  };

  const removeStudent = (index: number) => {
    setFields((prev) => ({ ...prev, students: prev.students.filter((_, i) => i !== index) }));
    if (currentLearnerIndex >= index && currentLearnerIndex > 0) {
      setCurrentLearnerIndex(currentLearnerIndex - 1);
    }
  };

  // Display helpers
  const getStepNumber = () => {
    if (step === 2) {
      switch (subStep) {
        case 'instruments':
          return '2';
        case 'details':
          return '3';
        case 'levelnotes':
          return '4';
        case 'summary':
          return '2';
        default:
          return '2';
      }
    }
    return step > 2 ? String(step + 2) : String(step);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleValidatedSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const validation = validateStepWithError();
    if (!validation.isValid) {
      setError(validation.errorMessage);
      return;
    }

    setIsLoading(true);
    setSuccess('');

    try {
      const geoPoint = await postcodeToGeoPoint(fields.postcode);

      // Update student names for self-learners with contact details
      const updatedStudents = fields.students.map((student) => {
        if (student.is_booking_owner) {
          return {
            ...student,
            name: `${fields.first_name} ${fields.last_name}`.trim(),
          };
        }
        return student;
      });

      const enquirerDetails = {
        booking_owner: {
          first_name: fields.first_name,
          last_name: fields.last_name,
          username: `${fields.first_name}${fields.last_name}`.toLowerCase().replace(/\s+/g, ''),
          email: fields.email,
          phone: fields.phone,
          postcode: fields.postcode,
          geopoint: geoPoint?.geopoint || null,
          ward: geoPoint?.ward,
          region: geoPoint?.region,
          city: geoPoint?.city,
          geopoint_consent: fields.geopoint_consent,
        },
        students: updatedStudents,
      };

      const response = await fetch('/api/handle-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquirerDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process enquiry');
      }

      setSuccess('Enquiry submitted successfully!\nWe will be in touch soon.');
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setError(errorMsg);
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
          <span className="block text-base font-normal mt-2">Step {getStepNumber()} of 5</span>
        </h1>
      </div>

      {/* Content Section */}
      <div className="form-content">
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}
        <form ref={undefined} onSubmit={handleValidatedSubmit} className="form-section">
          {/* Step 1: Learner Type Selection */}
          {step === 1 && !success && (
            <div
              className={`form-group form-stage ${direction === 'forward' ? 'form-stage-slide-in-right' : 'form-stage-slide-in-left'}`}
            >
              <div className="learner-type-selection">
                <h2 className="form-subtitle">Who is this enquiry for?</h2>
                <div className="learner-type-cards">
                  <div
                    className={`learner-type-card ${fields.studentIsMyself ? 'selected' : ''}`}
                    onClick={() => {
                      setFields((prev) => ({
                        ...prev,
                        studentIsMyself: true,
                        students: [],
                      }));
                    }}
                  >
                    <Icon path={mdiAccount} size={1.5} className="card-icon" />
                    <h3>Myself, or myself & others</h3>
                    <p className="text-white">Add yourself, plus other learners if needed</p>
                  </div>

                  <div
                    className={`learner-type-card ${!fields.studentIsMyself ? 'selected' : ''}`}
                    onClick={() => {
                      setFields((prev) => ({
                        ...prev,
                        studentIsMyself: false,
                        students: [],
                      }));
                    }}
                  >
                    <Icon path={mdiAccountMultiple} size={1.5} className="card-icon" />
                    <h3>I&apos;m enquiring for someone else </h3>
                    <p>Children, family member, or friend</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Instruments Selection */}
          {step === 2 && subStep === 'instruments' && !success && (
            <div
              className={`form-group form-stage ${direction === 'forward' ? 'form-stage-slide-in-right' : 'form-stage-slide-in-left'}`}
            >
              <h2 className="form-subtitle">
                Which instruments would {fields.studentIsMyself ? 'you' : 'they'} like to learn?
              </h2>
              <div className="learner-details-card">
                <ChipSelector
                  options={Object.values(INSTRUMENTS).flat()}
                  selectedOptions={getCurrentStudent()?.instruments || []}
                  onChange={(selected) =>
                    updateStudent(currentLearnerIndex, { instruments: selected })
                  }
                />
              </div>
            </div>
          )}

          {/* Step 3: Learner Details */}
          {step === 2 && subStep === 'details' && !success && (
            <div
              className={`form-group form-stage ${direction === 'forward' ? 'form-stage-slide-in-right' : 'form-stage-slide-in-left'}`}
            >
              <h2 className="form-subtitle">
                {fields.studentIsMyself ? 'Your Basic Details' : 'Learner Basic Details'}
              </h2>

              <div className="learner-details-card">
                {/* Name - show for all students, but pre-populate for self-learners */}
                <div className="form-group">
                  <label className="form-label" htmlFor="learner_name">
                    {fields.studentIsMyself ? 'Your Name' : 'Learner Name'}
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="learner_name"
                    value={getCurrentStudent()?.name || ''}
                    onChange={(e) => updateStudent(currentLearnerIndex, { name: e.target.value })}
                    placeholder={
                      fields.studentIsMyself
                        ? 'This will be populated from your contact details'
                        : 'e.g. Emily Smith'
                    }
                    disabled={fields.studentIsMyself}
                    required
                  />
                  {fields.studentIsMyself && (
                    <small className="form-hint">
                      Your name will be automatically filled from your contact details
                    </small>
                  )}
                </div>

                {/* Age */}
                <div className="form-group">
                  <label className="form-label" htmlFor="learner_age">
                    {fields.studentIsMyself ? 'Your Age' : 'Age'}
                  </label>
                  <select
                    className="form-select"
                    id="learner_age"
                    value={getCurrentStudent()?.age || ''}
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
              </div>
            </div>
          )}

          {/* Step 2: Level & Notes */}
          {step === 2 && subStep === 'levelnotes' && !success && (
            <div
              className={`form-group form-stage ${direction === 'forward' ? 'form-stage-slide-in-right' : 'form-stage-slide-in-left'}`}
            >
              <h2 className="form-subtitle">
                {fields.studentIsMyself ? 'Your Learning Level & Goals' : 'Learning Level & Goals'}
              </h2>

              <div className="learner-details-card">
                {/* Level */}
                <div className="form-group">
                  <label className="form-label" htmlFor="learner_level">
                    {fields.studentIsMyself ? 'Your Current Level' : 'Current Level'}
                  </label>
                  <select
                    className="form-select"
                    id="learner_level"
                    value={getCurrentStudent()?.level || ''}
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

                {/* Notes */}
                <div className="form-group">
                  <label className="form-label" htmlFor="learner_notes">
                    {fields.studentIsMyself
                      ? 'Tell us about your goals'
                      : 'Tell us about their goals'}
                  </label>
                  <textarea
                    className="form-input"
                    id="learner_notes"
                    value={getCurrentStudent()?.notes || ''}
                    onChange={(e) => updateStudent(currentLearnerIndex, { notes: e.target.value })}
                    placeholder={
                      fields.studentIsMyself
                        ? 'What would you like to achieve? Any specific styles, songs, or goals...'
                        : 'What would they like to achieve? Any specific styles, songs, or goals...'
                    }
                    rows={6}
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
            <div
              className={`form-group form-stage ${direction === 'forward' ? 'form-stage-slide-in-right' : 'form-stage-slide-in-left'}`}
            >
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
                      <p>
                        <strong>Age:</strong> {student.age}
                      </p>
                      <p>
                        <strong>Level:</strong> {student.level}
                      </p>
                      <p>
                        <strong>Instruments:</strong> {student.instruments.join(', ')}
                      </p>
                      {student.notes && (
                        <p>
                          <strong>Goals:</strong> {student.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                <div className="add-learner-section">
                  <button type="button" className="btn-secondary" onClick={() => addStudent()}>
                    + Add Another Learner
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Contact Details */}
          {step === 3 && !success && (
            <div
              className={`form-group form-stage ${direction === 'forward' ? 'form-stage-slide-in-right' : 'form-stage-slide-in-left'}`}
            >
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
                    onChange={(val: string) => setFields((f) => ({ ...f, postcode: val }))}
                    required
                  />
                </div>

                <div className="form-group consent-group">
                  <label className="consent-label">
                    <input
                      type="checkbox"
                      name="geopoint_consent"
                      checked={fields.geopoint_consent}
                      onChange={(e) =>
                        setFields((f) => ({ ...f, geopoint_consent: e.target.checked }))
                      }
                      required
                    />
                    <span className="consent-text">
                      I consent to my information being shared with the team at Tempo. All
                      information is handled within GDPR and our Privacy Policy
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {!success && (
            <div className="form-buttons-container">
              {(step > 1 ||
                (step === 2 &&
                  (subStep === 'details' ||
                    subStep === 'levelnotes' ||
                    subStep === 'summary'))) && (
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
