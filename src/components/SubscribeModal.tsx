import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles } from 'lucide-react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribeSuccess: () => void;
  isSubscribed: boolean;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({
  isOpen,
  onClose,
  onSubscribeSuccess,
  isSubscribed,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      onSubscribeSuccess();
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white border border-black shadow-2xl p-6 z-10 flex flex-col text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-stone-400 hover:text-black transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-4">
          <div className="nyt-masthead text-[26px] font-bold text-black mb-1">
            The New York Times
          </div>
          <span className="text-[11px] font-mono tracking-widest uppercase font-semibold text-red-800">
            LIMITED TIME OFFER
          </span>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="headline-font text-2xl font-bold text-black">
              Welcome to All Access
            </h3>
            <p className="text-xs text-stone-600">
              Your unlimited digital subscription is now active. Thank you for supporting independent journalism.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h2 className="headline-font text-[24px] font-bold text-black leading-tight mb-2">
                Subscribe for $1/week for your first year.
              </h2>
              <p className="text-xs text-stone-600">
                Cancel or pause anytime. Gain complete access to high-impact journalism, investigations, and analysis.
              </p>
            </div>

            {/* Perks */}
            <div className="space-y-2.5 mb-6 text-xs text-stone-800 border-t border-b border-stone-200 py-4">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Unlimited News, Opinion & Interactive Graphics</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>NYT Games including Wordle, Spelling Bee & The Crossword</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Audio journalism, The Daily early access & subscriber shows</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Wirecutter product reviews & NYT Cooking recipes</span>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={handleSubscribe}
              disabled={isProcessing || isSubscribed}
              className="w-full bg-black text-white hover:bg-stone-800 py-3 text-sm font-bold tracking-tight rounded-none transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Activating subscription...</span>
              ) : isSubscribed ? (
                <span>Already Subscribed</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Start All Access Trial · $1/week</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-stone-400 text-center mt-3">
              Special introductory pricing billed at $4 every 4 weeks for the first year.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
