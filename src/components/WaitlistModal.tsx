import { useState, useCallback } from 'react';
import { X, CheckCircle2, Loader2 } from 'lucide-react';
import { useWaitlist } from '../context/WaitlistContext';
import { validateEmail, verifyEmailExists } from '../lib/validateEmail';
import { CornerMarks, DimLine } from '../scenes/wire';

const WaitlistModal = () => {
  const { isModalOpen, closeModal, markAsJoined } = useWaitlist();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [creatorType, setCreatorType] = useState('Solo Creator');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
    if (emailTouched && value) {
      const err = validateEmail(value);
      setEmailError(err || '');
    } else if (!value) {
      setEmailError('');
    }
  }, [emailTouched]);

  const handleEmailBlur = useCallback(() => {
    setEmailTouched(true);
    if (email) {
      const err = validateEmail(email);
      setEmailError(err || '');
    }
  }, [email]);

  // NOTE: keep this below every hook — an early return above a hook call
  // changes the hook count between renders and crashes the whole app.
  if (!isModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!name || !email) {
      setError('Name and Email are required.');
      return;
    }

    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      setEmailTouched(true);
      return;
    }

    setIsSubmitting(true);

    const existError = await verifyEmailExists(email);
    if (existError) {
      setEmailError(existError);
      setEmailTouched(true);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          creatorType,
          source: 'Newsletter',
          title: 'Reader',
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit waitlist.');
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      markAsJoined(1);

      // Auto close after 3 seconds
      setTimeout(() => {
        closeModal();
        // Reset state after closing
        setTimeout(() => {
          setIsSuccess(false);
          setName('');
          setEmail('');
          setCreatorType('Solo Creator');
        }, 500);
      }, 3000);

    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  /* ── shared input style ── */
  const inputBase =
    'w-full bg-transparent border px-4 py-3 text-[var(--bp-ink-strong)] placeholder-[var(--bp-muted)] focus:outline-none transition-all font-light tracking-wider text-sm';
  const inputNormal =
    `${inputBase} border-[var(--bp-accent)]/25 focus:border-[var(--bp-accent)] focus:shadow-[0_0_0_1px_var(--bp-accent)]`;
  const inputError =
    `${inputBase} border-red-500/50 focus:border-red-500 focus:shadow-[0_0_0_1px_rgba(239,68,68,0.5)]`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop — blueprint-tinted overlay */}
      <div
        className="absolute inset-0 bg-[var(--bp-bg)]/85 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={closeModal}
      />

      {/* Modal — blueprint card */}
      <div className="relative w-full max-w-md bg-[var(--bp-bg)] border border-[var(--bp-accent)]/30 p-8 shadow-[0_0_60px_color-mix(in_srgb,var(--bp-accent)_15%,transparent)] animate-fade-in transition-all font-bank">
        {/* Corner marks */}
        <CornerMarks inset={8} size={12} />

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 text-[var(--bp-muted)] hover:text-[var(--bp-accent)] transition-colors z-10"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center text-center py-8">
            <div className="w-14 h-14 border border-[var(--bp-accent)]/40 flex items-center justify-center mb-6">
              <CheckCircle2 size={28} className="text-[var(--bp-accent)]" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold tracking-wider text-[var(--bp-ink-strong)] mb-3">
              Welcome to Vampro
            </h3>
            <p className="text-sm font-light tracking-wider text-[var(--bp-muted2)]">
              Thank you for subscribing!
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="bp-label mb-4 block">Newsletter</span>
              <h2
                className="text-2xl font-bold tracking-wide text-[var(--bp-ink-strong)] mb-2"
                style={{ WebkitTextStroke: '1px var(--bp-accent)', color: 'transparent' }}
              >
                Get the latest updates
              </h2>
              <p className="text-sm font-light tracking-wider text-[var(--bp-muted2)]">
                Be the first to experience Vampro's new creative tools.
              </p>
            </div>

            <DimLine label="Subscribe" className="mb-6" />

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="bp-label block mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputNormal}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="bp-label block mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onBlur={handleEmailBlur}
                  className={emailError && emailTouched ? inputError : inputNormal}
                  placeholder="john@example.com"
                  required
                />
                {emailError && emailTouched && (
                  <p className="text-red-400 text-[10px] mt-1.5 tracking-wider uppercase font-medium">{emailError}</p>
                )}
              </div>

              <div>
                <label className="bp-label block mb-2">Creator Type</label>
                <select
                  value={creatorType}
                  onChange={(e) => setCreatorType(e.target.value)}
                  className={`${inputNormal} appearance-none cursor-pointer`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                  }}
                >
                  <option value="Solo Creator" className="bg-[var(--bp-bg)] text-[var(--bp-ink)]">Solo Creator</option>
                  <option value="Company" className="bg-[var(--bp-bg)] text-[var(--bp-ink)]">Company</option>
                  <option value="Agency" className="bg-[var(--bp-bg)] text-[var(--bp-ink)]">Agency</option>
                </select>
              </div>

              {error && (
                <div className="text-red-400 text-xs font-light tracking-wider p-3 border border-red-500/30 bg-red-500/5">
                  {error}
                </div>
              )}

              <DimLine className="!my-4" />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full border border-[var(--bp-accent)] text-[var(--bp-accent)] hover:bg-[color-mix(in_srgb,var(--bp-accent)_10%,transparent)] font-medium py-3.5 px-4 tracking-[0.2em] uppercase text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" strokeWidth={1.5} /> Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default WaitlistModal;

