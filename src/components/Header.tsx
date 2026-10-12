import React from 'react';

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenAccount: () => void;
  onOpenSubscribe: () => void;
  onGoHome: () => void;
  currentDate?: string;
  isSubscribed?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  onOpenAccount,
  onOpenSubscribe,
  onGoHome,
  currentDate = 'Monday, October 12, 2026',
  isSubscribed = false,
}) => {
  return (
    <>
      {/* BEGIN: TopHeader */}
      <header
        className="w-full border-b border-[#e2e2e2] px-4 py-2.5 flex items-center justify-between sticky top-0 bg-white z-40 select-none shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
        data-purpose="top-navigation"
      >
        {/* Hamburger Menu Button */}
        <button
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="p-1 -ml-1 text-[#121212] hover:opacity-70 transition-opacity active:scale-95 cursor-pointer"
          type="button"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <line x1="3" x2="21" y1="6" />
            <line x1="3" x2="21" y1="12" />
            <line x1="3" x2="21" y1="18" />
          </svg>
        </button>

        {/* Iconic Masthead Logo */}
        <div
          onClick={onGoHome}
          className="flex-1 text-center cursor-pointer transition-opacity hover:opacity-85"
        >
          <h1 className="nyt-masthead text-[27px] sm:text-[30px] font-bold text-[#121212] leading-none tracking-tight">
            The New York Times
          </h1>
        </div>

        {/* Account Profile Button */}
        <button
          onClick={onOpenAccount}
          aria-label="Account"
          className="p-1 -mr-1 text-[#121212] hover:opacity-70 transition-opacity active:scale-95 relative cursor-pointer"
          type="button"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
          </svg>
          {isSubscribed && (
            <span
              title="Subscriber"
              className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#121212] rounded-full border-2 border-white"
            />
          )}
        </button>
      </header>
      {/* END: TopHeader */}

      {/* BEGIN: SubHeader */}
      <section
        className="w-full border-b border-[#e2e2e2] px-4 py-2.5 flex items-center justify-between bg-white text-[#121212]"
        data-purpose="date-and-subscription-bar"
      >
        {/* Date Display */}
        <div className="text-[12.5px] font-bold text-[#121212] tracking-normal">
          {currentDate}
        </div>

        {/* Subscribe CTA Pill */}
        <div>
          <button
            onClick={onOpenSubscribe}
            className="inline-block text-[12px] font-semibold text-[#121212] border border-[#121212] rounded-[4px] px-2.5 py-1 tracking-tight hover:bg-black hover:text-white transition-colors duration-150 active:scale-95 cursor-pointer"
            type="button"
          >
            {isSubscribed ? 'All Access Member' : 'Subscribe for $1/week'}
          </button>
        </div>
      </section>
      {/* END: SubHeader */}
    </>
  );
};
