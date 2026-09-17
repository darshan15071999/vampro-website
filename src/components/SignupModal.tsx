import { useState, useCallback } from 'react';
import { X, CheckCircle2, Loader2 } from 'lucide-react';
import { useSignup } from '../context/SignupContext';
import { validateEmail, verifyEmailExists } from '../lib/validateEmail';
import SpecularButton from './SpecularButton';
import ShinyText from './ShinyText';

const SignupModal = () => {
  const { isModalOpen, closeModal, markAsSignedUp, modalConfig } = useSignup();
  const isUniversalPaste = modalConfig.product === 'Universal Paste';

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
    // Clear inline error as user types (re-validate on blur)
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

    const distinctSource = isUniversalPaste
      ? `Plugin: Universal Paste - ${modalConfig.source}`
      : `Plugin: Voice Generator - ${modalConfig.source}`;
    const distinctTitle = modalConfig.title || (isUniversalPaste
      ? 'Universal Paste'
      : 'Voice Generator');

    try {
      // 1. Submit lead to Brevo CRM via /api/lead
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          creatorType,
          source: distinctSource,
          title: distinctTitle,
          product: modalConfig.product,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit signup.');
      }

      // 2. Also notify waitlist & KV storage
      fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          creatorType,
          source: distinctSource,
          product: modalConfig.product,
        }),
      }).catch(() => {});

      setIsSubmitting(false);
      setIsSuccess(true);

      // Auto close and execute callback after short delay
      setTimeout(() => {
        closeModal();
        markAsSignedUp(); // Executes any page-specific callback and saves distinct status

        setTimeout(() => {
          setIsSuccess(false);
          setName('');
          setEmail('');
          setCreatorType('Solo Creator');
        }, 500);
      }, 1500);

    } catch (err: any) {
      setError(err.message || 'Failed to complete signup. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 transition-opacity animate-fade-in ${
          isUniversalPaste ? 'bg-[#050608]/90 backdrop-blur-sm' : 'bg-[#04030A]/80 backdrop-blur-md'
        }`}
        onClick={closeModal}
      />

      {/* Modal Content */}
      <div
        className={
          isUniversalPaste
            ? "relative w-full max-w-md bg-[#0c0d15] border-[3.5px] border-[#07080b] rounded-xl p-6 sm:p-8 shadow-[8px_8px_0_#ffd437] animate-fade-in transition-all"
            : "relative w-full max-w-md bg-white/5 backdrop-blur-[40px] border border-white/10 rounded-[30px] p-6 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] animate-fade-in transition-all"
        }
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className={
            isUniversalPaste
              ? "absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-[#ea1a24] hover:bg-[#ff2a34] text-white border-2 border-[#07080b] shadow-[2px_2px_0_#07080b] rounded font-black transition-transform hover:scale-105 active:scale-95 z-10 cursor-pointer"
              : "absolute top-6 right-6 text-slate-400 hover:text-white transition-colors z-10"
          }
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          isUniversalPaste ? (
            <div className="flex flex-col items-center justify-center text-center py-6">
              <div className="w-16 h-16 bg-[#ffd437] border-[3px] border-[#07080b] text-[#07080b] rounded-xl flex items-center justify-center mb-4 shadow-[4px_4px_0_#07080b]">
                <CheckCircle2 size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-black text-white font-['Orbitron',sans-serif] uppercase mb-2 tracking-wide">
                {modalConfig.successTitle || "Redirecting..."}
              </h3>
              <p className="text-gray-300 font-medium text-sm">
                {modalConfig.successMessage || "Thank you for signing up!"}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-8">
              <div className="w-16 h-16 bg-white/5 border border-white/10 text-green-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(74,222,128,0.2)]">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                <ShinyText
                  text={modalConfig.successTitle || "Redirecting..."}
                  speed={2}
                  shineColor="#ffffff"
                  color="#ffffff"
                />
              </h3>
              <p className="text-slate-400 font-light leading-relaxed">
                {modalConfig.successMessage || "Thank you for signing up!"}
              </p>
            </div>
          )
        ) : (
          <>
            {isUniversalPaste ? (
              <div className="mb-6 text-center">
                <div className="inline-flex items-center gap-1.5 bg-[#ffd437] text-[#07080b] font-['Orbitron',sans-serif] font-black text-[10px] px-2.5 py-0.5 uppercase tracking-widest border-2 border-[#07080b] shadow-[2px_2px_0_#07080b] mb-2.5">
                  ★ UNIVERSAL PASTE ★
                </div>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide font-['Orbitron',sans-serif]">
                  {modalConfig.title || "Sign up to download"}
                </h2>
                <p className="text-gray-300 font-medium text-xs sm:text-sm tracking-wide truncate max-w-full block mt-1.5 px-2">
                  {modalConfig.subtitle || "Enter details to download Universal Paste."}
                </p>
              </div>
            ) : (
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-extrabold text-white mb-3">
                  <ShinyText
                    text={modalConfig.title || "Sign up to download"}
                    speed={3}
                    shineColor="#ffffff"
                    color="#ffffff"
                  />
                </h2>
                <p className="text-slate-400 font-light text-sm tracking-wide">
                  {modalConfig.subtitle || "Join the ecosystem of professional creators."}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className={isUniversalPaste ? "space-y-4" : "space-y-5"}>
              <div>
                <label
                  className={
                    isUniversalPaste
                      ? "block text-xs font-black text-[#ffd437] uppercase tracking-wider mb-1.5 font-['Orbitron',sans-serif]"
                      : "block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2"
                  }
                >
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={
                    isUniversalPaste
                      ? "w-full bg-[#141724] border-2 border-[#2d3248] focus:border-[#ffd437] rounded-lg px-4 py-3 text-white placeholder-slate-500 font-medium transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] focus:outline-none"
                      : "w-full bg-black/20 border border-white/10 rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-inner"
                  }
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label
                  className={
                    isUniversalPaste
                      ? "block text-xs font-black text-[#ffd437] uppercase tracking-wider mb-1.5 font-['Orbitron',sans-serif]"
                      : "block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2"
                  }
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onBlur={handleEmailBlur}
                  className={
                    isUniversalPaste
                      ? `w-full bg-[#141724] border-2 rounded-lg px-4 py-3 text-white placeholder-slate-500 font-medium transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] focus:outline-none ${
                          emailError && emailTouched
                            ? 'border-[#ea1a24] focus:border-[#ea1a24]'
                            : 'border-[#2d3248] focus:border-[#ffd437]'
                        }`
                      : `w-full bg-black/20 border rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all shadow-inner ${
                          emailError && emailTouched
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30'
                            : 'border-white/10 focus:border-indigo-500/50 focus:ring-indigo-500/50'
                        }`
                  }
                  placeholder="john@example.com"
                  required
                />
                {emailError && emailTouched && (
                  <p className={isUniversalPaste ? "text-[#ea1a24] text-xs mt-1.5 font-bold" : "text-red-400 text-xs mt-1.5 font-medium"}>
                    {emailError}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={
                    isUniversalPaste
                      ? "block text-xs font-black text-[#ffd437] uppercase tracking-wider mb-1.5 font-['Orbitron',sans-serif]"
                      : "block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2"
                  }
                >
                  Creator Type
                </label>
                <select
                  value={creatorType}
                  onChange={(e) => setCreatorType(e.target.value)}
                  className={
                    isUniversalPaste
                      ? "w-full bg-[#141724] border-2 border-[#2d3248] focus:border-[#ffd437] rounded-lg px-4 py-3 text-white font-medium transition-all appearance-none cursor-pointer shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] focus:outline-none"
                      : "w-full bg-black/20 border border-white/10 rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all appearance-none cursor-pointer shadow-inner"
                  }
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='${isUniversalPaste ? '%23ffd437' : 'rgba(255, 255, 255, 0.5)'}' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                  }}
                >
                  <option value="Solo Creator" className={isUniversalPaste ? "bg-[#0c0d15] text-white" : "bg-[#04030A]"}>Solo Creator</option>
                  <option value="Company" className={isUniversalPaste ? "bg-[#0c0d15] text-white" : "bg-[#04030A]"}>Company</option>
                  <option value="Agency" className={isUniversalPaste ? "bg-[#0c0d15] text-white" : "bg-[#04030A]"}>Agency</option>
                </select>
              </div>

              {error && (
                <div
                  className={
                    isUniversalPaste
                      ? "text-[#ea1a24] text-xs font-bold p-2.5 bg-red-500/10 rounded-lg border-2 border-[#ea1a24]/30"
                      : "text-red-400 text-sm font-medium p-3 bg-red-500/10 rounded-lg border border-red-500/20"
                  }
                >
                  {error}
                </div>
              )}

              <div className="pt-2">
                {isUniversalPaste ? (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#ffd437] hover:bg-[#ffe17d] active:translate-x-0 active:translate-y-0 text-[#07080b] font-['Orbitron',sans-serif] font-black uppercase tracking-wider py-3.5 px-6 rounded-lg border-[3px] border-[#07080b] shadow-[5px_5px_0_#07080b] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_#07080b] active:shadow-[2px_2px_0_#07080b] transition-all text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Signing up...</span>
                      </>
                    ) : (
                      <span>{modalConfig.buttonText || 'Sign Up'} ➔</span>
                    )}
                  </button>
                ) : (
                  <SpecularButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-[40px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] !px-4 !py-4"
                  >
                    <div className="flex items-center justify-center gap-2 font-bold text-lg text-white">
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="animate-spin" /> Signing up...
                        </>
                      ) : (
                        modalConfig.buttonText || 'Sign Up'
                      )}
                    </div>
                  </SpecularButton>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupModal;
