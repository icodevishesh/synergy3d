'use client';

import React, { useState, useEffect } from 'react';

export const EpisodeUnlockModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [practice, setPractice] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };
    window.addEventListener('open-optin-modal', handleOpen);
    return () => window.removeEventListener('open-optin-modal', handleOpen);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setEmail('');
      setPractice('');
    }, 300);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !practice) {
      alert('Please fill in all fields.');
      return;
    }
    // Simulate opt-in subscription success
    setIsSuccess(true);
  };

  const handleUnlockClick = () => {
    // Notify all listeners that dynamic premium locks are unlocked!
    window.dispatchEvent(new Event('optin-unlocked'));
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[2000] bg-navy/88 backdrop-blur-[14px] flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl w-full max-w-[460px] max-h-[calc(100vh-2rem)] overflow-y-auto shadow-2xl relative transition-transform duration-300">
        <button 
          className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-black/10 hover:bg-black/20 border-none cursor-pointer flex items-center justify-center text-white text-[0.85rem] z-[10] transition-colors"
          onClick={handleClose}
        >
          ✕
        </button>

        <div className="bg-gradient-to-br from-navy-mid to-blue-default px-8 pt-8 pb-6 text-center relative text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:32px_32px] pointer-events-none" />
          <div className="w-12 h-12 rounded-full bg-white/12 border border-white/22 flex items-center justify-center mx-auto mb-3.5 relative z-[1]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h3 className="font-serif text-xl font-bold mb-1.5 relative z-[1]">Unlock this episode</h3>
          <p className="text-[0.82rem] text-white/68 leading-relaxed relative z-[1]">
            This episode is exclusive to Synergy 3D members. Enter your details to get instant free access.
          </p>
        </div>

        <div className="px-7 py-6 text-navy-text">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 mb-1">
                {[
                  'Instant access to all locked episodes',
                  'Weekly new episodes delivered to your inbox',
                  '100% free — no credit card required',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-[0.84rem] text-gray-700">
                    <svg className="text-blue-default shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    {item}
                  </div>
                ))}
              </div>

              <input 
                type="text" 
                required
                placeholder="Your full name" 
                className="bg-gray-50 border border-border-light rounded-lg px-3.5 py-2.5 text-[0.88rem] outline-none focus:border-blue-default transition-colors w-full"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input 
                type="email" 
                required
                placeholder="Work email address" 
                className="bg-gray-50 border border-border-light rounded-lg px-3.5 py-2.5 text-[0.88rem] outline-none focus:border-blue-default transition-colors w-full"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input 
                type="text" 
                required
                placeholder="Practice name" 
                className="bg-gray-50 border border-border-light rounded-lg px-3.5 py-2.5 text-[0.88rem] outline-none focus:border-blue-default transition-colors w-full"
                value={practice}
                onChange={e => setPractice(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-blue-default hover:bg-blue-bright text-white font-bold py-3 px-5 rounded-lg text-[0.9rem] transition-all hover:-translate-y-0.5 w-full cursor-pointer mt-1"
              >
                Unlock Free Access →
              </button>
              <p className="text-[0.72rem] text-[#aab4ce] text-center">
                No spam. Unsubscribe anytime. Your info is never shared.
              </p>
            </form>
          ) : (
            <div className="text-center py-4 flex flex-col items-center gap-3">
              <div className="text-4xl animate-bounce">🎉</div>
              <h4 className="font-serif text-xl font-bold text-navy-text">You&apos;re in!</h4>
              <p className="text-[0.86rem] text-gray-500 max-w-[260px] leading-relaxed">
                All SynergyTalks episodes are now fully unlocked. Enjoy!
              </p>
              <button 
                onClick={handleUnlockClick}
                className="bg-blue-default hover:bg-blue-bright text-white font-bold py-3 px-8 rounded-lg text-[0.9rem] transition-all w-full cursor-pointer mt-1"
              >
                Watch Now →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default EpisodeUnlockModal;
