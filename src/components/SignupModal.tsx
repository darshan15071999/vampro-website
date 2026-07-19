import { useState, useCallback } from 'react';
import { X, CheckCircle2, Loader2 } from 'lucide-react';
import { useSignup } from '../context/SignupContext';
import { validateEmail, verifyEmailExists } from '../lib/validateEmail';
import SpecularButton from './SpecularButton';
import ShinyText from './ShinyText';

const SignupModal = () => {
  const { isModalOpen, closeModal, markAsSignedUp, modalSource } = useSignup();

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

    try {
      // Salesforce Web-to-Lead — submit via hidden iframe to avoid CORS issues
      const iframeName = 'sf_signup_iframe';

      // Always create a fresh iframe to avoid stale state
      const existingIframe = document.querySelector<HTMLIFrameElement>(`iframe[name="${iframeName}"]`);
      if (existingIframe) existingIframe.remove();

      const iframe = document.createElement('iframe');
      iframe.name = iframeName;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      const [firstName, ...lastNames] = name.trim().split(' ');
      const lastName = lastNames.join(' ') || '-';

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8';
      form.target = iframeName;

      const fields: Record<string, string> = {
        oid: '00DdN000011GI3G',
        retURL: window.location.href,
        first_name: firstName,
        last_name: lastName,
        email: email,
        company: creatorType,
        title: 'User',
        lead_source: `Plugin: ${modalSource}`,
      };

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);

      // Wait for the iframe to load (i.e., Salesforce has received and responded to the POST)
      // before cleaning up and showing success
      await new Promise<void>((resolve, _reject) => {
        const timeout = setTimeout(() => {
          // Even if we don't get a load event (cross-origin may block it),
          // treat as success after a reasonable wait since the POST was sent
          cleanup();
          resolve();
        }, 5000);

        const cleanup = () => {
          clearTimeout(timeout);
          iframe.removeEventListener('load', onLoad);
        };

        const onLoad = () => {
          cleanup();
          resolve();
        };

        iframe.addEventListener('load', onLoad);

        // Now submit the form
        form.submit();

        // Remove the form after a short delay to ensure the browser has serialized the request
        setTimeout(() => form.remove(), 500);
      });

      setIsSubmitting(false);
      setIsSuccess(true);

      // Auto close and execute callback after short delay
      setTimeout(() => {
        closeModal();
        markAsSignedUp(); // This executes the callback!

        setTimeout(() => {
          setIsSuccess(false);
          setName('');
          setEmail('');
          setCreatorType('Solo Creator');
        }, 500);
      }, 1500);

    } catch (err: any) {
      setError(err.message || 'Failed to connect to Salesforce. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#04030A]/80 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={closeModal}
      />

      {/* Modal Content - Styled like a plugin page Glass Card */}
      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-[40px] border border-white/10 rounded-[30px] p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] animate-fade-in transition-all">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center text-center py-8">
            <div className="w-16 h-16 bg-white/5 border border-white/10 text-green-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(74,222,128,0.2)]">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3"><ShinyText text="Redirecting..." speed={2} shineColor="#ffffff" color="#ffffff" /></h3>
            <p className="text-slate-400 font-light leading-relaxed">
              Thank you for signing up!
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold text-white mb-3">
                <ShinyText text="Sign up to download" speed={3} shineColor="#ffffff" color="#ffffff" />
              </h2>
              <p className="text-slate-400 font-light text-sm tracking-wide">Join the ecosystem of professional creators.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-inner"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onBlur={handleEmailBlur}
                  className={`w-full bg-black/20 border rounded-2xl px-5 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all shadow-inner ${
                    emailError && emailTouched
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30'
                      : 'border-white/10 focus:border-indigo-500/50 focus:ring-indigo-500/50'
                  }`}
                  placeholder="john@example.com"
                  required
                />
                {emailError && emailTouched && (
                  <p className="text-red-400 text-xs mt-1.5 font-medium">{emailError}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Creator Type</label>
                <select
                  value={creatorType}
                  onChange={(e) => setCreatorType(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all appearance-none cursor-pointer shadow-inner"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255, 255, 255, 0.5)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                  }}
                >
                  <option value="Solo Creator" className="bg-[#04030A]">Solo Creator</option>
                  <option value="Company" className="bg-[#04030A]">Company</option>
                  <option value="Agency" className="bg-[#04030A]">Agency</option>
                </select>
              </div>

              {error && (
                <div className="text-red-400 text-sm font-medium p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  {error}
                </div>
              )}

              <div className="pt-2">
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
                      'Sign Up'
                    )}
                  </div>
                </SpecularButton>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupModal;
