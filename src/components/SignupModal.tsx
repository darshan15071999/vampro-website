import { useState, useCallback } from 'react';
import { X, CheckCircle2, Loader2 } from 'lucide-react';
import { useSignup } from '../context/SignupContext';
import { validateEmail } from '../lib/validateEmail';

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
        className="absolute inset-0 bg-[#07060F]/80 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={closeModal}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-[#07060F]/95 backdrop-blur-2xl border border-indigo-500/30 rounded-3xl p-8 shadow-[0_0_80px_rgba(59,59,255,0.2)] animate-fade-in transition-all">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Redirecting...</h3>
            <p className="text-slate-400 font-light leading-relaxed">
              Thank you for signing up!
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-white mb-2">Sign up to download</h2>
              <p className="text-slate-400 font-light"></p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-indigo-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#3B3BFF] focus:ring-1 focus:ring-[#3B3BFF] transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onBlur={handleEmailBlur}
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                    emailError && emailTouched
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30'
                      : 'border-indigo-500/20 focus:border-[#3B3BFF] focus:ring-[#3B3BFF]'
                  }`}
                  placeholder="john@example.com"
                  required
                />
                {emailError && emailTouched && (
                  <p className="text-red-400 text-xs mt-1.5 font-medium">{emailError}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Creator Type</label>
                <select
                  value={creatorType}
                  onChange={(e) => setCreatorType(e.target.value)}
                  className="w-full bg-white/5 border border-indigo-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#3B3BFF] focus:ring-1 focus:ring-[#3B3BFF] transition-all appearance-none cursor-pointer"
                >
                  <option value="Solo Creator" className="bg-[#07060F]">Solo Creator</option>
                  <option value="Company" className="bg-[#07060F]">Company</option>
                  <option value="Agency" className="bg-[#07060F]">Agency</option>
                </select>
              </div>

              {error && (
                <div className="text-red-400 text-sm font-medium p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#3B3BFF] hover:bg-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(59,59,255,0.3)] hover:shadow-[0_0_30px_rgba(59,59,255,0.5)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Signing up...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupModal;
