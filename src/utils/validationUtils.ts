// utils/validationUtils.ts

/**
 * Normalize a UK postcode: uppercase and remove all spaces.
 */
export function normalizePostcode(postcode: string): string {
  return postcode ? postcode.toUpperCase().replace(/\s+/g, '') : '';
}

/**
 * Validate a UK mobile phone number (accepts +44 and 07 formats).
 */
export function isValidUKPhone(phone: string): boolean {
  if (!phone) return false;
  // Accepts +44 7xxx xxx xxx or 07xxx xxx xxx (with or without spaces)
  const pattern = /^(\+44\s?7\d{3}|07\d{3})\s?\d{3}\s?\d{3}$/;
  return pattern.test(phone.trim());
}
