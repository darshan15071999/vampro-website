import { useState } from 'react';
import { X, CheckCircle2, Loader2 } from 'lucide-react';
import { useWaitlist } from '../context/WaitlistContext';

const WaitlistModal = () => {
  const { isModalOpen, closeModal, markAsJoined, modalSource } = useWaitlist();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [creatorType, setCreatorType] = useState('Solo Creator');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!name || !email) {
      setError('Name and Email are required.');
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, creatorType, source: modalSource }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setIsSuccess(true);
      markAsJoined(data.count);

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
            <h3 className="text-2xl font-bold text-white mb-3">Welcome to Vampro</h3>
            <p className="text-slate-400 font-light leading-relaxed">
              You're on the list! We'll notify you when early access becomes available.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-4 tracking-widest uppercase">
                Early Access
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-2">Join Waitlist</h2>
              <p className="text-slate-400 font-light">Be the first to experience Vampro's new creative tools.</p>
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
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-indigo-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#3B3BFF] focus:ring-1 focus:ring-[#3B3BFF] transition-all"
                  placeholder="john@example.com"
                  required
                />
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
                    <Loader2 size={18} className="animate-spin" /> Joining...
                  </>
                ) : (
                  'Join Waitlist'
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
