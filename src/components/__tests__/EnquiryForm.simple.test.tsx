/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EnquiryForm from '../EnquiryForm';
// Mock the Supabase client
jest.mock('../../lib/supabaseClient', () => ({
  supabase: {
    from: jest.fn(() => ({
      insert: jest.fn(() => ({
        select: jest.fn(() => Promise.resolve({ data: [{ id: 'test-id' }], error: null })),
      })),
    })),
  },
}));

// Mock the postcode utilities
jest.mock('../../utils/postcodes/postcodeUtils', () => ({
  postcodeToGeoPoint: jest.fn(() =>
    Promise.resolve({
      geopoint: { lat: 51.5074, lng: -0.1278 },
      ward: 'Test Ward',
      region: 'Test Region',
      city: 'Test City',
    })
  ),
}));

// Mock the PostcodeAutocomplete component
jest.mock('../../utils/postcodes/ValidatePostcode', () => {
  return function MockPostcodeAutocomplete({ value, onChange, required }: any) {
    return (
      <input
        data-testid="postcode-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder="Postcode"
      />
    );
  };
});

// Mock the Logo component
jest.mock('../Logo', () => {
  return function MockLogo() {
    return <div data-testid="logo">Logo</div>;
  };
});

describe('EnquiryForm Tests', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  test('renders initial form correctly', () => {
    render(<EnquiryForm />);

    expect(screen.getByText('Make An Enquiry')).toBeInTheDocument();
    expect(screen.getByText('Step 1 of 4')).toBeInTheDocument();
    expect(screen.getByText('Who is this enquiry for?')).toBeInTheDocument();
    expect(screen.getByText("I'm the learner")).toBeInTheDocument();
    expect(screen.getByText("I'm enquiring for someone else")).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.queryByText('Back')).not.toBeInTheDocument();
  });

  test('can select learner type', async () => {
    render(<EnquiryForm />);

    const selfLearnerCard = screen.getByText("I'm the learner").closest('.learner-type-card');
    await user.click(selfLearnerCard!);

    expect(selfLearnerCard).toHaveClass('selected');
  });

  test('can switch between learner types', async () => {
    render(<EnquiryForm />);

    const selfCard = screen.getByText("I'm the learner").closest('.learner-type-card');
    const someoneElseCard = screen
      .getByText("I'm enquiring for someone else")
      .closest('.learner-type-card');

    await user.click(selfCard!);
    expect(selfCard).toHaveClass('selected');

    await user.click(someoneElseCard!);
    expect(someoneElseCard).toHaveClass('selected');
    expect(selfCard).not.toHaveClass('selected');
  });

  test('progresses to instrument selection', async () => {
    render(<EnquiryForm />);

    const selfLearnerCard = screen.getByText("I'm the learner").closest('.learner-type-card');
    await user.click(selfLearnerCard!);
    await user.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('Which instruments would you like to learn?')).toBeInTheDocument();
    });
  });

  test('can select instruments', async () => {
    render(<EnquiryForm />);

    // Navigate to instruments step
    const selfLearnerCard = screen.getByText("I'm the learner").closest('.learner-type-card');
    await user.click(selfLearnerCard!);
    await user.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('Which instruments would you like to learn?')).toBeInTheDocument();
    });

    const pianoChip = screen.getByText('Piano');
    await user.click(pianoChip);

    expect(pianoChip).toHaveClass('chip-selected');
  });

  test('can select multiple instruments', async () => {
    render(<EnquiryForm />);

    // Navigate to instruments step
    const selfLearnerCard = screen.getByText("I'm the learner").closest('.learner-type-card');
    await user.click(selfLearnerCard!);
    await user.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('Which instruments would you like to learn?')).toBeInTheDocument();
    });

    // Wait for the chips to be rendered
    const pianoChip = await screen.findByText('Piano');
    const guitarChip = await screen.findByText('Electric Guitar');

    await user.click(pianoChip);
    await user.click(guitarChip);

    expect(pianoChip).toHaveClass('chip-selected');
    expect(guitarChip).toHaveClass('chip-selected');
  });

  test('validation prevents progression without instrument selection', async () => {
    render(<EnquiryForm />);

    // Navigate to instruments step
    const selfLearnerCard = screen.getByText("I'm the learner").closest('.learner-type-card');
    await user.click(selfLearnerCard!);
    await user.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('Which instruments would you like to learn?')).toBeInTheDocument();
    });

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();

    // Select an instrument
    const pianoChip = await screen.findByText('Piano');
    await user.click(pianoChip);

    await waitFor(() => {
      expect(nextButton).not.toBeDisabled();
    });
  });

  test('shows correct fields for self-learner details', async () => {
    render(<EnquiryForm />);

    // Navigate through to learner details
    const selfLearnerCard = screen.getByText("I'm the learner").closest('.learner-type-card');
    await user.click(selfLearnerCard!);
    await user.click(screen.getByText('Next'));

    // Select instrument and proceed
    await waitFor(async () => {
      const pianoChip = await screen.findByText('Piano');
      await user.click(pianoChip);
    });

    await user.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('Your Learning Details')).toBeInTheDocument();
      expect(screen.getByLabelText('Your Age')).toBeInTheDocument();
      expect(screen.getByLabelText('Your Level')).toBeInTheDocument();
      expect(screen.getByLabelText('Tell us about your goals')).toBeInTheDocument();
      expect(screen.queryByLabelText('Learner Name')).not.toBeInTheDocument();
    });
  });

  test('can fill learner details', async () => {
    render(<EnquiryForm />);

    // Navigate through to learner details
    const selfLearnerCard = screen.getByText("I'm the learner").closest('.learner-type-card');
    await user.click(selfLearnerCard!);
    await user.click(screen.getByText('Next'));

    await waitFor(async () => {
      const pianoChip = screen.getByText('Piano');
      await user.click(pianoChip);
      await user.click(screen.getByText('Next'));
    });

    await waitFor(async () => {
      const ageSelect = screen.getByLabelText('Your Age');
      const levelSelect = screen.getByLabelText('Your Level');
      const notesTextarea = screen.getByLabelText('Tell us about your goals');

      await user.selectOptions(ageSelect, '25');
      await user.selectOptions(levelSelect, 'Complete Beginner');
      await user.type(notesTextarea, 'Learn jazz piano');

      expect(ageSelect).toHaveValue('25');
      expect(levelSelect).toHaveValue('Complete Beginner');
      expect(notesTextarea).toHaveValue('Learn jazz piano');
    });
  });

  test('shows learner name field for others', async () => {
    render(<EnquiryForm />);

    // Select "someone else" option
    const someoneElseCard = screen
      .getByText("I'm enquiring for someone else")
      .closest('.learner-type-card');
    await user.click(someoneElseCard!);
    await user.click(screen.getByText('Next'));

    await waitFor(async () => {
      const pianoChip = screen.getByText('Piano');
      await user.click(pianoChip);
      await user.click(screen.getByText('Next'));
    });

    await waitFor(() => {
      expect(screen.getByText('Learner Name')).toBeInTheDocument();
      expect(screen.getByText('Age')).toBeInTheDocument();
      expect(screen.getByText('Level')).toBeInTheDocument();
      expect(screen.getByText('+ Add Another Learner')).toBeInTheDocument();
    });
  });

  test('back button navigation works', async () => {
    render(<EnquiryForm />);

    // Navigate forward
    const selfLearnerCard = screen.getByText("I'm the learner").closest('.learner-type-card');
    await user.click(selfLearnerCard!);
    await user.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('Which instruments would you like to learn?')).toBeInTheDocument();
      expect(screen.getByText('Back')).toBeInTheDocument();
    });

    // Go back
    await user.click(screen.getByText('Back'));

    await waitFor(() => {
      expect(screen.getByText('Who is this enquiry for?')).toBeInTheDocument();
    });
  });

  test('step counter updates correctly', async () => {
    render(<EnquiryForm />);

    expect(screen.getByText('Step 1 of 4')).toBeInTheDocument();

    // Navigate to step 2
    const selfLearnerCard = screen.getByText("I'm the learner").closest('.learner-type-card');
    await user.click(selfLearnerCard!);
    await user.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('Step 2 of 4')).toBeInTheDocument();
    });
  });

  test('progresses through substeps including levelnotes', async () => {
    render(<EnquiryForm />);

    // Navigate to instruments step
    const selfLearnerCard = screen.getByText("I'm the learner").closest('.learner-type-card');
    await user.click(selfLearnerCard!);
    await user.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('Which instruments would you like to learn?')).toBeInTheDocument();
    });

    // Select an instrument and proceed
    const pianoChip = screen.getByText('Piano');
    await user.click(pianoChip);
    await user.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('Your Learning Details')).toBeInTheDocument();
    });

    // Fill in details and proceed
    const ageSelect = screen.getByLabelText('Your Age');
    const levelSelect = screen.getByLabelText('Your Level');
    await user.selectOptions(ageSelect, '25');
    await user.selectOptions(levelSelect, 'Complete Beginner');
    await user.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('Tell us about your goals')).toBeInTheDocument();
    });

    // Fill in goals and proceed
    const notesTextarea = screen.getByLabelText('Tell us about your goals');
    await user.type(notesTextarea, 'Learn jazz piano');
    await user.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('Summary')).toBeInTheDocument();
    });
  });

  test('validation prevents progression without level in levelnotes substep', async () => {
    render(<EnquiryForm />);

    // Navigate to levelnotes step
    const selfLearnerCard = screen.getByText("I'm the learner").closest('.learner-type-card');
    await user.click(selfLearnerCard!);
    await user.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('Which instruments would you like to learn?')).toBeInTheDocument();
    });

    const pianoChip = screen.getByText('Piano');
    await user.click(pianoChip);
    await user.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('Your Learning Details')).toBeInTheDocument();
    });

    const ageSelect = screen.getByLabelText('Your Age');
    await user.selectOptions(ageSelect, '25');
    await user.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('Tell us about your goals')).toBeInTheDocument();
    });

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();

    // Fill in level and proceed
    const levelSelect = screen.getByLabelText('Your Level');
    await user.selectOptions(levelSelect, 'Complete Beginner');

    await waitFor(() => {
      expect(nextButton).not.toBeDisabled();
    });
  });
});
