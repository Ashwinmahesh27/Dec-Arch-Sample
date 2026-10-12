import React from 'react';
import { X, Bookmark, User, Bell, CheckCircle2, ChevronRight, Trash2 } from 'lucide-react';
import { Story } from '../types/news';
import { LEAD_STORY, OTHER_STORIES } from '../data/newsData';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSubscribed: boolean;
  onOpenSubscribe: () => void;
  savedStoryIds: string[];
  onSelectStory: (story: Story) => void;
  onRemoveSaved: (storyId: string) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  isSubscribed,
  onOpenSubscribe,
  savedStoryIds,
  onSelectStory,
  onRemoveSaved,
}) => {
  if (!isOpen) return null;

  const allStories = [LEAD_STORY, ...OTHER_STORIES];
  const savedStories = allStories.filter((s) => savedStoryIds.includes(s.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white border border-stone-300 shadow-2xl p-6 z-10 flex flex-col text-left max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-stone-400 hover:text-black transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Profile Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
          <div className="w-12 h-12 bg-stone-900 text-white rounded-full flex items-center justify-center font-bold text-lg">
            AM
          </div>
          <div>
            <h3 className="font-bold text-sm text-black">Ashwin Mahesh</h3>
            <p className="text-xs text-stone-500">ashwinmahesh.mec@gmail.com</p>
            <div className="mt-1">
              {isSubscribed ? (
                <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" />
                  All Access Subscriber
                </span>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onOpenSubscribe();
                  }}
                  className="text-[11px] font-semibold text-blue-700 hover:underline"
                >
                  Free Account · Upgrade to All Access →
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Saved Articles */}
        <div className="py-4 border-b border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-black" />
              <span>Saved Articles ({savedStories.length})</span>
            </h4>
          </div>

          {savedStories.length > 0 ? (
            <div className="space-y-2">
              {savedStories.map((story) => (
                <div
                  key={story.id}
                  className="p-2.5 bg-stone-50 border border-stone-200 rounded flex items-center justify-between gap-2 group hover:border-black transition-colors"
                >
                  <div
                    onClick={() => {
                      onSelectStory(story);
                      onClose();
                    }}
                    className="flex-1 cursor-pointer"
                  >
                    <span className="text-[10px] font-bold uppercase text-stone-500">
                      {story.category}
                    </span>
                    <h5 className="font-serif text-xs font-bold line-clamp-1 group-hover:text-[#326891]">
                      {story.headline}
                    </h5>
                  </div>
                  <button
                    onClick={() => onRemoveSaved(story.id)}
                    className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                    title="Remove saved story"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-stone-500 italic py-2">
              No saved articles yet. Tap the bookmark icon on any story to save it for later.
            </p>
          )}
        </div>

        {/* Preferences */}
        <div className="py-4 space-y-3 text-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
            Account Preferences
          </div>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-stone-700">Breaking News Notifications</span>
            <input type="checkbox" defaultChecked className="rounded accent-black" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-stone-700">The Morning & Evening Briefings</span>
            <input type="checkbox" defaultChecked className="rounded accent-black" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-stone-700">Audio Narration Autoplay</span>
            <input type="checkbox" className="rounded accent-black" />
          </label>
        </div>

        {/* Sign Out */}
        <div className="pt-3 border-t border-stone-200 text-center">
          <button
            onClick={onClose}
            className="text-xs text-stone-500 hover:text-black font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
