/**
 * Email validation utility.
 *
 * Performs thorough client-side checks:
 *  1. RFC-compliant format (local@domain.tld)
 *  2. No consecutive dots, leading/trailing dots
 *  3. Domain must contain at least one dot with a 2+ char TLD
 *  4. Rejects common disposable / temporary email providers
 *  5. Returns a human-readable error string (or null when valid)
 */

// ── Disposable / temporary email domains ────────────────────────────────
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  'guerrillamail.net',
  'tempmail.com',
  'throwaway.email',
  'temp-mail.org',
  'fakeinbox.com',
  'sharklasers.com',
  'guerrillamailblock.com',
  'grr.la',
  'dispostable.com',
  'yopmail.com',
  'trashmail.com',
  'trashmail.net',
  'mailnesia.com',
  'maildrop.cc',
  'discard.email',
  'tempail.com',
  'tempr.email',
  'temp-mail.io',
  'mohmal.com',
  'burnermail.io',
  'getnada.com',
  '10minutemail.com',
  'minutemail.com',
  'emailondeck.com',
  'mailcatch.com',
  'inboxkitten.com',
]);

// ── Core regex ──────────────────────────────────────────────────────────
// Matches:  local-part @ domain . tld
// – local: letters, digits, and . _ % + - (no consecutive dots)
// – domain: letters, digits, dots, hyphens
// – TLD: 2-12 alpha chars
const EMAIL_RE =
  /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,12}$/;

/**
 * Validate an email address.
 * @returns `null` if valid, otherwise a user-facing error string.
 */
export function validateEmail(email: string): string | null {
  const trimmed = email.trim();

  if (!trimmed) {
    return 'Email address is required.';
  }

  // Length limits (RFC 5321)
  if (trimmed.length > 254) {
    return 'Email address is too long.';
  }

  // Basic format
  if (!EMAIL_RE.test(trimmed)) {
    return 'Please enter a valid email address.';
  }

  // Consecutive dots anywhere
  if (/\.{2,}/.test(trimmed)) {
    return 'Email address contains consecutive dots.';
  }

  const [localPart, domain] = trimmed.split('@');

  // Local part length (RFC 5321 max = 64)
  if (localPart.length > 64) {
    return 'The part before @ is too long.';
  }

  // Domain checks
  const domainLower = domain.toLowerCase();

  if (domainLower.startsWith('-') || domainLower.endsWith('-')) {
    return 'Email domain cannot start or end with a hyphen.';
  }

  // Disposable provider check
  if (DISPOSABLE_DOMAINS.has(domainLower)) {
    return 'Please use a permanent email address, not a disposable one.';
  }

  return null; // ✅ valid
}

/**
 * Verify an email exists using the check-if-email-exists backend.
 * @returns `null` if valid (or if backend is unreachable), otherwise a user-facing error string.
 */
export async function verifyEmailExists(email: string): Promise<string | null> {
  const baseUrl = import.meta.env.VITE_REACHER_URL || 'http://localhost:8080';
  
  try {
    const res = await fetch(`${baseUrl}/v0/check_email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to_email: email })
    });

    if (res.ok) {
      const data = await res.json();
      
      // "is_reachable" can be "safe", "risky", "invalid", "unknown"
      if (data.is_reachable === 'invalid') {
        return 'This email address does not exist.';
      }
      
      // We can also reject if smtp.is_disabled is explicitly true
      if (data.smtp?.is_disabled) {
        return 'This email account has been disabled.';
      }
      
      if (data.smtp?.has_full_inbox) {
        return 'This email inbox is full.';
      }
    }
  } catch (err) {
    // If the backend isn't running or network fails, we gracefully degrade
    // and assume it's valid so we don't block users from signing up.
    console.warn('Email verification backend unreachable:', err);
  }

  return null;
}
