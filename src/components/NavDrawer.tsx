import React, { useState } from 'react';
import { X, Search, Bookmark, Newspaper, Sparkles, Globe, Compass, ChevronRight } from 'lucide-react';
import { Story } from '../types/news';
import { LEAD_STORY, OTHER_STORIES } from '../data/newsData';

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStory: (story: Story) => void;
  onOpenBroadsheet: () => void;
  onOpenGames: () => void;
  onOpenSaved: () => void;
  savedCount: number;
}

export const NavDrawer: React.FC<NavDrawerProps> = ({
  isOpen,
  onClose,
  onSelectStory,
  onOpenBroadsheet,
  onOpenGames,
  onOpenSaved,
  savedCount,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [edition, setEdition] = useState<'us' | 'intl' | 'es'>('intl');

  const allStories = [LEAD_STORY, ...OTHER_STORIES];
  const filteredStories = searchQuery.trim()
    ? allStories.filter(
        (s) =>
          s.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.deck.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const SECTIONS = [
    'World',
    'U.S. News',
    'Politics',
    'New York',
    'Business & Economy',
    'Technology',
    'Science & Climate',
    'Opinion & Columnists',
    'Arts & Culture',
    'Books',
    'Style & Fashion',
    'Food & Cooking',
    'Travel',
    'Magazine',
    'Real Estate',
    'Wirecutter',
    'The Athletic',
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-[320px] bg-white text-[#121212] h-full shadow-2xl flex flex-col z-10 overflow-hidden">
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#e2e2e2] flex items-center justify-between bg-stone-50">
          <div className="nyt-masthead text-[22px] font-bold text-black select-none">
            The New York Times
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 transition-colors text-black cursor-pointer"
            title="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-[#e2e2e2]">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news, topics, authors..."
              className="w-full bg-stone-100 border border-stone-200 rounded py-1.5 pl-9 pr-3 text-xs focus:bg-white focus:outline-none focus:border-black transition-colors"
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#f0f0f0]">
          {/* Search Results if active */}
          {searchQuery.trim() && (
            <div className="p-3 bg-stone-50">
              <div className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500 mb-2">
                Search Results ({filteredStories.length})
              </div>
              {filteredStories.length > 0 ? (
                <div className="space-y-2">
                  {filteredStories.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        onSelectStory(s);
                        onClose();
                      }}
                      className="p-2 bg-white border border-stone-200 rounded text-left cursor-pointer hover:border-black"
                    >
                      <span className="text-[9.5px] font-bold uppercase text-red-700">
                        {s.category}
                      </span>
                      <h5 className="font-serif text-xs font-bold line-clamp-2">
                        {s.headline}
                      </h5>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-stone-500 italic py-2">
                  No matching stories found for "{searchQuery}".
                </p>
              )}
            </div>
          )}

          {/* Quick Shortcuts */}
          <div className="p-3 space-y-1">
            <button
              onClick={() => {
                onOpenBroadsheet();
                onClose();
              }}
              className="w-full flex items-center justify-between p-2 rounded text-xs font-semibold hover:bg-stone-100 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Newspaper className="w-4 h-4 text-black" />
                <span>Today's Front Page (Broadsheet)</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </button>

            <button
              onClick={() => {
                onOpenGames();
                onClose();
              }}
              className="w-full flex items-center justify-between p-2 rounded text-xs font-semibold hover:bg-stone-100 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-black" />
                <span>Games & The Mini Crossword</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </button>

            <button
              onClick={() => {
                onOpenSaved();
                onClose();
              }}
              className="w-full flex items-center justify-between p-2 rounded text-xs font-semibold hover:bg-stone-100 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4 text-black" />
                <span>Saved Articles</span>
              </div>
              <span className="text-[11px] font-mono bg-stone-200 px-1.5 py-0.2 rounded font-bold">
                {savedCount}
              </span>
            </button>
          </div>

          {/* Edition Selector */}
          <div className="p-3">
            <div className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
              Edition
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={() => setEdition('intl')}
                className={`flex-1 py-1 text-[11px] font-semibold border rounded transition-colors ${
                  edition === 'intl' ? 'bg-black text-white border-black' : 'bg-white text-stone-700 border-stone-300'
                }`}
              >
                International
              </button>
              <button
                onClick={() => setEdition('us')}
                className={`flex-1 py-1 text-[11px] font-semibold border rounded transition-colors ${
                  edition === 'us' ? 'bg-black text-white border-black' : 'bg-white text-stone-700 border-stone-300'
                }`}
              >
                U.S.
              </button>
              <button
                onClick={() => setEdition('es')}
                className={`flex-1 py-1 text-[11px] font-semibold border rounded transition-colors ${
                  edition === 'es' ? 'bg-black text-white border-black' : 'bg-white text-stone-700 border-stone-300'
                }`}
              >
                Español
              </button>
            </div>
          </div>

          {/* Sections List */}
          <div className="p-3">
            <div className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
              News Sections
            </div>
            <ul className="space-y-1">
              {SECTIONS.map((sec) => (
                <li key={sec}>
                  <button
                    onClick={onClose}
                    className="w-full text-left py-1.5 px-2 rounded text-[13px] hover:bg-stone-100 transition-colors text-stone-800 hover:text-black font-medium"
                  >
                    {sec}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 text-center text-[10.5px] text-stone-500">
          The New York Times Digital Edition · Version 2026.10
        </div>
      </div>
    </div>
  );
};
