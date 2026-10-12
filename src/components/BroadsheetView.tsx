import React from 'react';
import { Story } from '../types/news';
import { LEAD_STORY, OTHER_STORIES } from '../data/newsData';

interface BroadsheetViewProps {
  onSelectStory: (story: Story) => void;
  onBack: () => void;
}

export const BroadsheetView: React.FC<BroadsheetViewProps> = ({
  onSelectStory,
  onBack,
}) => {
  return (
    <div className="w-full bg-[#fbf9f5] text-[#121212] min-h-screen p-4 sm:p-8 font-serif select-text">
      <div className="max-w-5xl mx-auto border-2 border-black p-4 sm:p-6 bg-white shadow-md">
        {/* Newspaper Top Header */}
        <div className="border-b-2 border-black pb-3 text-center">
          <div className="flex justify-between items-center text-[10.5px] uppercase font-sans font-bold tracking-widest border-b border-black pb-1 mb-2">
            <span>"All the News That's Fit to Print"</span>
            <span>Late Edition · Vol. CLXXVI No. 60,320</span>
            <span>$3.50</span>
          </div>

          <h1 className="nyt-masthead text-[40px] sm:text-[56px] font-bold text-black tracking-tight leading-none my-1 select-none">
            The New York Times
          </h1>

          <div className="flex justify-between items-center text-[11px] font-sans border-t border-black pt-1.5 mt-2">
            <span className="font-bold">NEW YORK, MONDAY, OCTOBER 12, 2026</span>
            <span>Partly Cloudy, 68°</span>
            <span>TODAY'S FRONT PAGE</span>
          </div>
        </div>

        {/* Multi-column Broadsheet Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4 items-start">
          {/* Column 1: Secondary News (3 cols) */}
          <div className="md:col-span-3 border-r-0 md:border-r border-stone-300 pr-0 md:pr-4 space-y-5">
            {OTHER_STORIES.slice(0, 2).map((s) => (
              <div
                key={s.id}
                onClick={() => onSelectStory(s)}
                className="cursor-pointer group pb-4 border-b border-stone-200"
              >
                <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-stone-500 mb-1">
                  {s.kicker}
                </div>
                <h3 className="headline-font text-[17px] font-bold text-black group-hover:text-[#326891] leading-tight mb-1.5">
                  {s.headline}
                </h3>
                <p className="text-[12.5px] text-stone-700 leading-snug line-clamp-4">
                  {s.deck}
                </p>
                <span className="block mt-2 text-[10px] font-sans text-stone-500 uppercase">
                  Continued on Page A4
                </span>
              </div>
            ))}
          </div>

          {/* Column 2: Lead Story Banner (6 cols) */}
          <div
            onClick={() => onSelectStory(LEAD_STORY)}
            className="md:col-span-6 border-r-0 md:border-r border-stone-300 pr-0 md:pr-4 cursor-pointer group"
          >
            <div className="text-[11px] font-sans font-bold uppercase tracking-widest text-red-800 mb-1">
              INTERNATIONAL FRONT
            </div>
            <h2 className="headline-font text-[28px] sm:text-[34px] font-bold text-black leading-[1.1] mb-3 group-hover:text-[#326891] transition-colors">
              {LEAD_STORY.headline}
            </h2>

            {LEAD_STORY.image && (
              <div className="my-3 border border-stone-300">
                <img
                  src={LEAD_STORY.image}
                  alt={LEAD_STORY.headline}
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[16/9] object-cover"
                />
                <p className="p-1.5 text-[10.5px] font-sans text-stone-600 bg-stone-50 border-t border-stone-200">
                  {LEAD_STORY.imageCaption}
                </p>
              </div>
            )}

            <p className="text-[14px] text-stone-800 leading-relaxed mb-3">
              {LEAD_STORY.content.leadParagraph}
            </p>
            <p className="text-[13px] text-stone-700 leading-relaxed">
              {LEAD_STORY.content.paragraphs[0]}
            </p>
          </div>

          {/* Column 3: Analysis & Columns (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <div
              onClick={() => onSelectStory(OTHER_STORIES[2])}
              className="cursor-pointer group pb-4 border-b border-stone-200"
            >
              <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-stone-500 mb-1">
                FOREIGN AFFAIRS COLUMN
              </div>
              <h3 className="headline-font text-[19px] font-bold text-black group-hover:text-[#326891] leading-tight mb-2">
                {OTHER_STORIES[2].headline}
              </h3>
              <div className="text-[11px] font-sans font-semibold text-stone-800 mb-1">
                By Thomas L. Friedman
              </div>
              <p className="text-[12.5px] text-stone-700 leading-snug">
                {OTHER_STORIES[2].content.leadParagraph}
              </p>
            </div>

            <div className="p-3 bg-stone-100 border border-stone-300 text-stone-800">
              <div className="text-[10px] font-sans font-bold tracking-wider uppercase mb-1">
                IN TODAY'S PAPER
              </div>
              <ul className="text-[11.5px] space-y-1 font-sans">
                <li>• Business: Energy futures respond to tanker routes</li>
                <li>• Arts: Retrospective on broadsheet photojournalism</li>
                <li>• Science: Early warning radar accuracy</li>
                <li>• Weather: Regional forecasts across 50 states</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-6 pt-4 border-t border-black text-center font-sans">
          <button
            onClick={onBack}
            className="px-4 py-1.5 bg-black text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
          >
            ← Return to Mobile Edition
          </button>
        </div>
      </div>
    </div>
  );
};
