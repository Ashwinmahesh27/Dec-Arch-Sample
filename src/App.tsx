/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Story } from './types/news';
import { LEAD_STORY, OTHER_STORIES, PODCAST_EPISODE } from './data/newsData';
import { Header } from './components/Header';
import { LeadStoryCard } from './components/LeadStoryCard';
import { TopStoriesFeed } from './components/TopStoriesFeed';
import { ArticleReader } from './components/ArticleReader';
import { VisualDispatchModal } from './components/VisualDispatchModal';
import { MiniCrossword } from './components/MiniCrossword';
import { BroadsheetView } from './components/BroadsheetView';
import { NavDrawer } from './components/NavDrawer';
import { SubscribeModal } from './components/SubscribeModal';
import { AccountModal } from './components/AccountModal';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { Smartphone, Monitor, BookOpen, Newspaper, Sparkles } from 'lucide-react';

type ScreenView = 'feed' | 'reader' | 'crossword' | 'broadsheet';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenView>('feed');
  const [selectedStory, setSelectedStory] = useState<Story>(LEAD_STORY);
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'responsive'>('mobile');

  // Modals
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isVisualDispatchOpen, setIsVisualDispatchOpen] = useState(false);

  // User state
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [savedStoryIds, setSavedStoryIds] = useState<string[]>(['saudi-yemeni-strikes']);

  // Audio Player
  const [audioTrack, setAudioTrack] = useState<{
    title: string;
    subtitle: string;
    isPlaying: boolean;
  } | null>(null);

  const handleSelectStory = (story: Story) => {
    setSelectedStory(story);
    setCurrentScreen('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSaveStory = (storyId: string) => {
    setSavedStoryIds((prev) =>
      prev.includes(storyId) ? prev.filter((id) => id !== storyId) : [...prev, storyId]
    );
  };

  const handlePlayPodcast = () => {
    if (audioTrack?.title === PODCAST_EPISODE.title && audioTrack.isPlaying) {
      setAudioTrack({ ...audioTrack, isPlaying: false });
    } else {
      setAudioTrack({
        title: PODCAST_EPISODE.title,
        subtitle: `The Daily · with ${PODCAST_EPISODE.host}`,
        isPlaying: true,
      });
    }
  };

  const handlePlayArticleAudio = (story: Story) => {
    if (audioTrack?.title === story.headline && audioTrack.isPlaying) {
      setAudioTrack({ ...audioTrack, isPlaying: false });
    } else {
      setAudioTrack({
        title: story.headline,
        subtitle: `Narrated Article · ${story.readTime}`,
        isPlaying: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#ececec] text-[#121212] flex flex-col items-center justify-start antialiased font-sans">
      {/* Floating Top Mode & Screen Switcher Bar */}
      <nav
        aria-label="App Navigation Controls"
        className="sticky top-0 z-50 w-full bg-[#121212] text-white border-b border-stone-800 px-3 py-1.5 flex flex-wrap items-center justify-between text-xs shadow-md select-none gap-2"
      >
        <div className="flex items-center gap-1.5">
          <span className="font-serif font-bold text-stone-300">NYT Screens:</span>
          <button
            onClick={() => setCurrentScreen('feed')}
            className={`px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer ${
              currentScreen === 'feed' ? 'bg-white text-black font-bold' : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            Top Stories
          </button>
          <button
            onClick={() => {
              setSelectedStory(LEAD_STORY);
              setCurrentScreen('reader');
            }}
            className={`px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer ${
              currentScreen === 'reader' ? 'bg-white text-black font-bold' : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            Article Reader
          </button>
          <button
            onClick={() => setCurrentScreen('crossword')}
            className={`px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer ${
              currentScreen === 'crossword' ? 'bg-white text-black font-bold' : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            The Mini
          </button>
          <button
            onClick={() => setCurrentScreen('broadsheet')}
            className={`px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer ${
              currentScreen === 'broadsheet' ? 'bg-white text-black font-bold' : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Newspaper className="w-3 h-3" />
            Broadsheet A1
          </button>
        </div>

        {/* Viewport Frame Toggle */}
        <div className="flex items-center gap-1 bg-stone-800 p-0.5 rounded text-[11px]">
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`px-2 py-0.5 rounded flex items-center gap-1 transition-colors cursor-pointer ${
              deviceMode === 'mobile' ? 'bg-stone-600 text-white font-semibold' : 'text-stone-400 hover:text-white'
            }`}
            title="View in mobile shell"
          >
            <Smartphone className="w-3 h-3" />
            <span>Mobile (480px)</span>
          </button>
          <button
            onClick={() => setDeviceMode('responsive')}
            className={`px-2 py-0.5 rounded flex items-center gap-1 transition-colors cursor-pointer ${
              deviceMode === 'responsive' ? 'bg-stone-600 text-white font-semibold' : 'text-stone-400 hover:text-white'
            }`}
            title="View expanded full canvas"
          >
            <Monitor className="w-3 h-3" />
            <span>Expanded</span>
          </button>
        </div>
      </nav>

      {/* Main Content Container / Shell */}
      <div
        className={`w-full transition-all duration-300 flex flex-col justify-start items-center ${
          deviceMode === 'mobile'
            ? 'max-w-[480px] bg-white min-h-screen border-x border-[#e2e2e2] shadow-xl my-0 sm:my-3 sm:rounded-none'
            : 'max-w-5xl bg-white min-h-screen border-x border-[#e2e2e2] shadow-sm'
        }`}
      >
        {/* SCREEN 1: FEED / TOP STORIES (MATCHES SCREENSHOT) */}
        {currentScreen === 'feed' && (
          <div className="w-full flex flex-col">
            <Header
              onOpenMenu={() => setIsNavDrawerOpen(true)}
              onOpenAccount={() => setIsAccountModalOpen(true)}
              onOpenSubscribe={() => setIsSubscribeModalOpen(true)}
              onGoHome={() => setCurrentScreen('feed')}
              isSubscribed={isSubscribed}
            />

            {/* The exact lead story card from the user's prompt */}
            <LeadStoryCard
              story={LEAD_STORY}
              onSelectStory={handleSelectStory}
              onOpenVisualDispatch={() => setIsVisualDispatchOpen(true)}
            />

            {/* Top Stories Feed with Live Updates, subsequent articles, The Daily & The Mini Crossword */}
            <TopStoriesFeed
              onSelectStory={handleSelectStory}
              onOpenMiniCrossword={() => setCurrentScreen('crossword')}
              onPlayPodcast={handlePlayPodcast}
              isPodcastPlaying={audioTrack?.title === PODCAST_EPISODE.title && audioTrack.isPlaying}
              savedStoryIds={savedStoryIds}
              onToggleSaveStory={handleToggleSaveStory}
            />
          </div>
        )}

        {/* SCREEN 2: ARTICLE READER */}
        {currentScreen === 'reader' && (
          <ArticleReader
            story={selectedStory}
            onBack={() => setCurrentScreen('feed')}
            onToggleSave={handleToggleSaveStory}
            isSaved={savedStoryIds.includes(selectedStory.id)}
            onPlayArticleAudio={handlePlayArticleAudio}
            isAudioPlaying={audioTrack?.title === selectedStory.headline && audioTrack.isPlaying}
          />
        )}

        {/* SCREEN 3: MINI CROSSWORD */}
        {currentScreen === 'crossword' && (
          <MiniCrossword onBack={() => setCurrentScreen('feed')} />
        )}

        {/* SCREEN 4: BROADSHEET A1 */}
        {currentScreen === 'broadsheet' && (
          <BroadsheetView
            onSelectStory={handleSelectStory}
            onBack={() => setCurrentScreen('feed')}
          />
        )}
      </div>

      {/* Persistent Audio Player Bar */}
      {audioTrack && (
        <AudioPlayerBar
          title={audioTrack.title}
          subtitle={audioTrack.subtitle}
          isPlaying={audioTrack.isPlaying}
          onTogglePlay={() =>
            setAudioTrack((prev) => (prev ? { ...prev, isPlaying: !prev.isPlaying } : null))
          }
          onClose={() => setAudioTrack(null)}
        />
      )}

      {/* Nav Drawer */}
      <NavDrawer
        isOpen={isNavDrawerOpen}
        onClose={() => setIsNavDrawerOpen(false)}
        onSelectStory={handleSelectStory}
        onOpenBroadsheet={() => setCurrentScreen('broadsheet')}
        onOpenGames={() => setCurrentScreen('crossword')}
        onOpenSaved={() => setIsAccountModalOpen(true)}
        savedCount={savedStoryIds.length}
      />

      {/* Visual Investigation Fullscreen Modal */}
      <VisualDispatchModal
        isOpen={isVisualDispatchOpen}
        onClose={() => setIsVisualDispatchOpen(false)}
      />

      {/* Subscribe Modal */}
      <SubscribeModal
        isOpen={isSubscribeModalOpen}
        onClose={() => setIsSubscribeModalOpen(false)}
        onSubscribeSuccess={() => setIsSubscribed(true)}
        isSubscribed={isSubscribed}
      />

      {/* Account Profile Modal */}
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        isSubscribed={isSubscribed}
        onOpenSubscribe={() => setIsSubscribeModalOpen(true)}
        savedStoryIds={savedStoryIds}
        onSelectStory={handleSelectStory}
        onRemoveSaved={handleToggleSaveStory}
      />
    </div>
  );
}
