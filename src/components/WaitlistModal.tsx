import { useState, useCallback } from 'react';
import { X, CheckCircle2, Loader2, ArrowUpRight } from 'lucide-react';
import { useWaitlist } from '../context/WaitlistContext';
import { validateEmail, verifyEmailExists } from '../lib/validateEmail';
import { CornerMarks, DimLine } from '../scenes/wire';

const WaitlistModal = () => {
  const { isModalOpen, closeModal, markAsJoined, modalSource } = useWaitlist();
  const isVoiceStudio = Boolean(modalSource && modalSource.toLowerCase().includes('voice studio'));
  const isWaitlistMode = Boolean(modalSource && modalSource !== 'Hero' && modalSource !== 'Newsletter') || isVoiceStudio;

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
          source: modalSource ? `Waitlist: ${modalSource}` : 'Newsletter',
          title: isVoiceStudio ? 'Voice Studio' : 'Reader',
        }),
      });

      fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          creatorType,
          source: modalSource || 'Waitlist',
        }),
      }).catch(() => {});

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

  /* ── Voice Studio Dedicated Forest Theme ── */
  if (isVoiceStudio) {
    return (
      <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
        {/* Backdrop — Deep forest overlay */}
        <div
          className="absolute inset-0 bg-[#040f08]/85 backdrop-blur-md transition-opacity animate-fade-in"
          onClick={closeModal}
        />

        {/* Modal Card — Voice Studio Theme */}
        <div className="relative w-full max-w-md bg-gradient-to-b from-[#0a1c12] to-[#051109] border border-[#2b4b35] rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(154,240,185,0.15),0_25px_60px_rgba(0,0,0,0.8)] animate-fade-in transition-all font-['Inter',sans-serif]">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-[#789581] hover:text-[#ebf8ed] hover:bg-[#9af0b9]/10 transition-colors z-10 cursor-pointer"
            aria-label="Close"
          >
            <X size={18} strokeWidth={2} />
          </button>

          {isSuccess ? (
            <div className="flex flex-col items-center justify-center text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#9af0b9]/15 border border-[#9af0b9]/40 flex items-center justify-center mb-5 text-[#9af0b9] shadow-[0_0_30px_rgba(154,240,185,0.25)]">
                <CheckCircle2 size={32} strokeWidth={2} />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#9af0b9]/10 text-[#9af0b9] border border-[#9af0b9]/30 mb-3">
                ACCESS RESERVED
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-[#ebf8ed] mb-2 font-['Inter',sans-serif]">
                You are on the waitlist
              </h3>
              <p className="text-sm text-[#8fa896] leading-relaxed max-w-xs">
                We will notify you the moment installer builds and closed beta access open.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#9af0b9]/10 text-[#9af0b9] border border-[#9af0b9]/30 mb-3.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9af0b9] shadow-[0_0_8px_#9af0b9]" />
                  VOICE STUDIO WAITLIST
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-[#ebf8ed] mb-2 font-['Inter',sans-serif]">
                  Join Voice Studio Waitlist
                </h2>
                <p className="text-xs sm:text-sm text-[#8fa896] leading-relaxed font-['Inter',sans-serif]">
                  Be the first to access offline voice cloning, speech-to-speech, and audio stem tools in Premiere Pro.
                </p>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#9af0b9]/25 to-transparent mb-5" />

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-[#9af0b9] mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#08150d] border border-[#243d2b] focus:border-[#9af0b9] focus:ring-1 focus:ring-[#9af0b9]/40 rounded-lg px-4 py-2.5 text-sm text-[#ebf8ed] placeholder-[#546e5b] focus:outline-none transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-[#9af0b9] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onBlur={handleEmailBlur}
                    className={`w-full bg-[#08150d] border ${
                      emailError && emailTouched ? 'border-red-500/60 focus:border-red-500' : 'border-[#243d2b] focus:border-[#9af0b9]'
                    } focus:ring-1 focus:ring-[#9af0b9]/40 rounded-lg px-4 py-2.5 text-sm text-[#ebf8ed] placeholder-[#546e5b] focus:outline-none transition-all`}
                    placeholder="john@example.com"
                    required
                  />
                  {emailError && emailTouched && (
                    <p className="text-red-400 text-[10px] mt-1.5 tracking-wider uppercase font-medium">{emailError}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.16em] text-[#9af0b9] mb-1.5">
                    Creator Type
                  </label>
                  <select
                    value={creatorType}
                    onChange={(e) => setCreatorType(e.target.value)}
                    className="w-full bg-[#08150d] border border-[#243d2b] focus:border-[#9af0b9] focus:ring-1 focus:ring-[#9af0b9]/40 rounded-lg px-4 py-2.5 text-sm text-[#ebf8ed] focus:outline-none transition-all appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239af0b9' stroke-width='1.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 16px center',
                    }}
                  >
                    <option value="Solo Creator" className="bg-[#08150d] text-[#ebf8ed]">Solo Creator</option>
                    <option value="Company" className="bg-[#08150d] text-[#ebf8ed]">Company</option>
                    <option value="Agency" className="bg-[#08150d] text-[#ebf8ed]">Agency</option>
                  </select>
                </div>

                {error && (
                  <div className="text-red-400 text-xs font-light tracking-wider p-3 border border-red-500/30 bg-red-500/5 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#9af0b9] hover:bg-[#bdf7d2] text-[#051309] font-semibold py-3 px-4 rounded-lg tracking-[0.14em] uppercase text-xs transition-all shadow-[0_0_20px_rgba(154,240,185,0.3)] hover:shadow-[0_0_28px_rgba(154,240,185,0.55)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Joining Waitlist...
                    </>
                  ) : (
                    <>
                      Join Voice Studio Waitlist <ArrowUpRight size={15} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }

  /* ── shared input style ── */
  const inputBase =
    'w-full bg-transparent border px-4 py-3 text-[var(--bp-ink-strong)] placeholder-[var(--bp-muted)] focus:outline-none transition-all font-light tracking-wider text-sm';
  const inputNormal =
    `${inputBase} border-[var(--bp-accent)]/25 focus:border-[var(--bp-accent)] focus:shadow-[0_0_0_1px_var(--bp-accent)]`;
  const inputError =
    `${inputBase} border-red-500/50 focus:border-red-500 focus:shadow-[0_0_0_1px_rgba(239,68,68,0.5)]`;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
      {/* Backdrop — blueprint-tinted overlay */}
      <div
        className="absolute inset-0 bg-[var(--bp-bg)]/85 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={closeModal}
      />

      {/* Modal — blueprint card */}
      <div className="relative w-full max-w-md bg-[var(--bp-bg)] border border-[var(--bp-accent)]/30 p-6 sm:p-8 shadow-[0_0_60px_color-mix(in_srgb,var(--bp-accent)_15%,transparent)] animate-fade-in transition-all font-bank">
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
              {isWaitlistMode ? 'You are on the waitlist' : 'Welcome to Vampro'}
            </h3>
            <p className="text-sm font-light tracking-wider text-[var(--bp-muted2)]">
              {isVoiceStudio
                ? 'We will notify you the moment installer builds and closed beta access open.'
                : isWaitlistMode
                  ? 'We will notify you with early access details shortly.'
                  : 'Thank you for subscribing!'}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="bp-label mb-4 block">
                {isVoiceStudio ? 'Voice Studio' : isWaitlistMode ? 'Waitlist' : 'Newsletter'}
              </span>
              <h2
                className="text-2xl font-bold tracking-wide text-[var(--bp-ink-strong)] mb-2"
                style={{ WebkitTextStroke: '1px var(--bp-accent)', color: 'transparent' }}
              >
                {isVoiceStudio
                  ? 'Join Voice Studio Waitlist'
                  : isWaitlistMode
                    ? 'Join the Waitlist'
                    : 'Get the latest updates'}
              </h2>
              <p className="text-sm font-light tracking-wider text-[var(--bp-muted2)]">
                {isVoiceStudio
                  ? 'Be the first to access offline voice cloning, speech-to-speech, and audio stem tools in Premiere Pro.'
                  : "Be the first to experience Vampro's new creative tools."}
              </p>
            </div>

            <DimLine label={isWaitlistMode ? 'Waitlist' : 'Subscribe'} className="mb-6" />

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
                className="w-full border border-[var(--bp-accent)] text-[var(--bp-accent)] hover:bg-[color-mix(in_srgb,var(--bp-accent)_10%,transparent)] font-medium py-3.5 px-4 tracking-[0.2em] uppercase text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" strokeWidth={1.5} /> {isWaitlistMode ? 'Joining...' : 'Subscribing...'}
                  </>
                ) : (
                  isWaitlistMode ? 'Join Waitlist' : 'Subscribe'
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

