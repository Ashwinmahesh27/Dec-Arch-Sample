import React, { useState } from 'react';
import { Story } from '../types/news';
import { ArrowLeft, Headphones, Bookmark, Share2, Type, Play, Pause, MessageSquare, Check, ExternalLink } from 'lucide-react';

interface ArticleReaderProps {
  story: Story;
  onBack: () => void;
  onToggleSave: (storyId: string) => void;
  isSaved: boolean;
  onPlayArticleAudio: (story: Story) => void;
  isAudioPlaying: boolean;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  story,
  onBack,
  onToggleSave,
  isSaved,
  onPlayArticleAudio,
  isAudioPlaying,
}) => {
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copiedShare, setCopiedShare] = useState(false);
  const [comments, setComments] = useState<string[]>([
    'Crucial reporting on regional commercial flight safety. Hope humanitarian corridors remain intact.',
    'Aviation reroutes around the Gulf are going to add noticeable delays for travelers this month.'
  ]);
  const [newComment, setNewComment] = useState('');

  const fontClasses = {
    normal: 'text-[17px] leading-[1.8]',
    large: 'text-[19px] leading-[1.85]',
    xlarge: 'text-[21px] leading-[1.9]',
  }[fontSizeLevel];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([newComment.trim(), ...comments]);
    setNewComment('');
  };

  return (
    <div className="w-full bg-white min-h-screen text-[#121212] flex flex-col pb-16">
      {/* Sticky Reader Action Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#e2e2e2] px-4 py-2.5 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-[#121212] hover:opacity-70 transition-opacity cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Top Stories</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Audio Listen Button */}
          <button
            onClick={() => onPlayArticleAudio(story)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11.5px] font-semibold border transition-all cursor-pointer ${
              isAudioPlaying
                ? 'bg-[#121212] text-white border-[#121212]'
                : 'bg-stone-50 text-[#121212] border-stone-300 hover:bg-stone-100'
            }`}
            title="Listen to this article"
          >
            {isAudioPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Playing</span>
              </>
            ) : (
              <>
                <Headphones className="w-3.5 h-3.5" />
                <span>Listen (3m)</span>
              </>
            )}
          </button>

          {/* Font Size Toggle */}
          <button
            onClick={() => {
              setFontSizeLevel((prev) =>
                prev === 'normal' ? 'large' : prev === 'large' ? 'xlarge' : 'normal'
              );
            }}
            className="p-1 text-[#444] hover:text-black hover:bg-stone-100 rounded transition-colors"
            title="Adjust text size"
          >
            <Type className="w-4 h-4" />
          </button>

          {/* Save/Bookmark */}
          <button
            onClick={() => onToggleSave(story.id)}
            className="p-1 hover:text-black transition-colors"
            title={isSaved ? 'Saved' : 'Save article'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-black text-black' : 'text-[#555]'}`} />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-1 text-[#555] hover:text-black transition-colors relative"
            title="Share article"
          >
            {copiedShare ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Article Content Container */}
      <article className="max-w-2xl mx-auto px-4 sm:px-6 pt-6">
        {/* Kicker */}
        <div className="text-[11px] font-bold uppercase tracking-widest text-[#727272] mb-2">
          {story.kicker}
        </div>

        {/* Main Headline */}
        <h1 className="headline-font text-[30px] sm:text-[36px] font-bold text-[#121212] leading-[1.12] mb-3">
          {story.headline}
        </h1>

        {/* Deck */}
        <p className="deck-font text-[16px] sm:text-[18px] text-[#444] leading-relaxed mb-4">
          {story.deck}
        </p>

        {/* Bylines & Date */}
        <div className="border-y border-[#e2e2e2] py-3 my-4 flex flex-col gap-1 text-[13px] text-[#555]">
          <div>
            By <strong className="text-[#121212] font-semibold">{story.author}</strong>
            {story.authorRole && <span className="text-[#777]"> · {story.authorRole}</span>}
          </div>
          <div className="text-[11.5px] text-[#777]">
            Published {story.date} · {story.readTime}
          </div>
        </div>

        {/* Featured Editorial Photo */}
        {story.image && (
          <figure className="my-5 -mx-4 sm:mx-0">
            <div className="relative aspect-[16/9] overflow-hidden bg-stone-100 border border-[#e2e2e2]">
              <img
                src={story.image}
                alt={story.headline}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            {story.imageCaption && (
              <figcaption className="px-4 sm:px-0 pt-2 text-[12px] text-[#555] leading-snug">
                {story.imageCaption}
                {story.imageCredit && (
                  <span className="text-[#888] font-sans"> {story.imageCredit}</span>
                )}
              </figcaption>
            )}
          </figure>
        )}

        {/* Key Takeaways Callout Box if present */}
        {story.content.takeaways && story.content.takeaways.length > 0 && (
          <div className="my-6 p-4 bg-[#fbf9f5] border border-[#e5d5be]">
            <h3 className="text-[11.5px] font-bold tracking-widest uppercase text-[#8a5d3b] mb-2.5">
              Key Takeaways
            </h3>
            <ul className="space-y-2">
              {story.content.takeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[13.5px] text-[#292524] leading-snug">
                  <span className="text-[#b91c1c] font-bold">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body Paragraphs */}
        <div className={`article-body-font ${fontClasses} text-[#1a1a1a] space-y-5 my-6`}>
          {/* Opening paragraph with drop cap */}
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#121212]">
            {story.content.leadParagraph}
          </p>

          {story.content.paragraphs.map((p, idx) => (
            <React.Fragment key={idx}>
              <p>{p}</p>

              {/* Middle Pull Quote */}
              {idx === 2 && story.content.pullQuote && (
                <blockquote className="my-8 py-5 border-y border-[#121212]/80 text-center px-4">
                  <p className="headline-font italic text-[21px] sm:text-[23px] text-[#121212] leading-snug">
                    “{story.content.pullQuote.quote}”
                  </p>
                  <cite className="block mt-2.5 text-[11px] font-sans font-bold tracking-widest uppercase text-[#727272] not-italic">
                    — {story.content.pullQuote.attribution}
                  </cite>
                </blockquote>
              )}

              {/* Geographic Airport Strike Map graphic at middle */}
              {idx === 3 && (
                <div className="my-6 border border-[#e2e2e2] p-3 bg-stone-50 rounded-none not-italic font-sans">
                  <div className="text-[11px] font-bold tracking-wider text-[#727272] uppercase mb-2">
                    Visual Map · Arabian Peninsula Air Corridor
                  </div>
                  <div className="relative aspect-[16/7] bg-[#1a2e26] rounded overflow-hidden flex items-center justify-center p-4 text-white">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="relative z-10 w-full flex justify-around items-center text-center">
                      <div className="bg-black/40 p-2 rounded border border-white/20">
                        <div className="text-[10px] text-amber-300 font-mono">NORTHERN GULF</div>
                        <div className="font-bold text-sm">Riyadh (KKIA)</div>
                        <div className="text-[9px] text-emerald-300">Auxiliary Hangar Alert</div>
                      </div>
                      <div className="h-[2px] flex-1 bg-gradient-to-r from-amber-400 via-rose-500 to-red-400 mx-2 relative">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/70">
                          850 km flight vector
                        </span>
                      </div>
                      <div className="bg-black/40 p-2 rounded border border-white/20">
                        <div className="text-[10px] text-rose-300 font-mono">SOUTHERN HUB</div>
                        <div className="font-bold text-sm">Sana’a Airport</div>
                        <div className="text-[9px] text-rose-300">Runway Operations Halted</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-[10.5px] text-[#666] mt-1.5 text-center">
                    Source: Regional Flight Tracking Data & Civil Aviation Notices (NOTAM)
                  </p>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Reader Comments Section */}
        <section className="mt-12 pt-6 border-t border-[#121212] font-sans">
          <div className="flex items-center justify-between mb-4">
            <h3 className="headline-font text-[22px] font-bold text-[#121212]">
              Comments ({comments.length})
            </h3>
            <span className="text-[11.5px] text-[#727272]">Moderated conversation</span>
          </div>

          <form onSubmit={handleAddComment} className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What are your thoughts on this story? (Verified subscriber comment)"
              className="w-full border border-stone-300 p-2.5 text-[13px] rounded focus:outline-none focus:border-black resize-none h-20"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="bg-[#121212] text-white px-4 py-1.5 text-[12px] font-semibold disabled:opacity-40 cursor-pointer hover:bg-[#333] transition-colors"
              >
                Post Comment
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {comments.map((comment, index) => (
              <div key={index} className="p-3 bg-stone-50 border border-stone-200">
                <div className="flex items-center justify-between mb-1 text-[11px] text-[#666]">
                  <span className="font-semibold text-[#121212]">Times Reader</span>
                  <span>Verified</span>
                </div>
                <p className="text-[12.5px] text-[#333] leading-relaxed">{comment}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
};
