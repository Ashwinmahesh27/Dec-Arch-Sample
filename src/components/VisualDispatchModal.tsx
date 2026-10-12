import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Layers, Compass, Globe2 } from 'lucide-react';

interface VisualDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VisualDispatchModal: React.FC<VisualDispatchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(18);
  const [activeLayer, setActiveLayer] = useState<'video' | 'satellite' | 'radar'>('video');

  useEffect(() => {
    if (!isOpen) return;
    let timer: number;
    if (isPlaying) {
      timer = window.setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between text-white select-none backdrop-blur-md">
      {/* Top Controls */}
      <div className="p-4 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-semibold">
            VISUAL INVESTIGATION · VERIFIED DISPATCH
          </span>
          <h2 className="headline-font text-[17px] font-bold text-white">
            Strikes on Riyadh & Sana’a: Chronology & Impact
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
          title="Close investigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Visual Stage */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Layer: Primary Video Emulation */}
        {activeLayer === 'video' && (
          <div className="relative w-full h-full max-w-4xl max-h-[75vh] media-backdrop flex flex-col justify-between p-6">
            <div className="absolute inset-0 bg-cover bg-center opacity-70"
                 style={{ backgroundImage: `radial-gradient(circle at 50% 50%, rgba(21,115,71,0.6) 0%, rgba(10,41,28,0.95) 100%)` }}
            />
            {/* Crosshair & telemetry HUD */}
            <div className="relative z-10 flex justify-between text-white/80 font-mono text-[11px]">
              <div>COORDS: 24.9576° N, 46.6988° E (KKIA)</div>
              <div>VERIFICATION: GEO-LOCATED · 02:14 UTC</div>
            </div>

            <div className="relative z-10 self-center text-center max-w-md">
              <div className="w-16 h-16 rounded-full border-2 border-emerald-400 mx-auto mb-3 flex items-center justify-center animate-pulse">
                <Compass className="w-8 h-8 text-emerald-300" />
              </div>
              <div className="text-[13px] font-serif tracking-widest text-white/90 uppercase border-b border-white/20 pb-1 mb-2">
                KINGDOM OF SAUDI ARABIA · TERMINAL 5 VICINITY
              </div>
              <p className="text-[12px] text-white/70">
                Satellite radar telemetry confirmed air defense engagement over northern perimeter.
              </p>
            </div>

            <div className="relative z-10 flex justify-between text-[11px] text-white/60 font-mono">
              <span>ELEVATION: 612m</span>
              <span>AZIMUTH: 184° SSE</span>
            </div>
          </div>
        )}

        {/* Layer: Satellite Radar Imagery */}
        {activeLayer === 'satellite' && (
          <div className="relative w-full h-full max-w-4xl max-h-[75vh] bg-[#0d161d] p-6 flex flex-col justify-center items-center text-center">
            <div className="w-full max-w-md aspect-video border border-emerald-500/40 relative overflow-hidden bg-[#071017] p-4 flex flex-col justify-between">
              <div className="flex justify-between text-[10px] font-mono text-emerald-400">
                <span>SENTINEL-2 SAR IMAGERY</span>
                <span>OCT 11, 2026 23:45 UTC</span>
              </div>
              <div className="my-auto">
                <div className="inline-block px-2 py-1 bg-red-900/60 border border-red-500 text-red-200 text-xs font-mono">
                  THERMAL ANOMALY: AUXILIARY APRON 3B
                </div>
              </div>
              <div className="text-[10px] font-mono text-white/60">
                RESOLUTION: 10m · BAND 12/8A COMPOSITE
              </div>
            </div>
            <p className="text-xs text-stone-300 mt-3 font-serif">
              Infrared satellite scans corroborate localized thermal flare corresponding with drone interception.
            </p>
          </div>
        )}

        {/* Layer: Radar Vector Tracking */}
        {activeLayer === 'radar' && (
          <div className="relative w-full h-full max-w-4xl max-h-[75vh] bg-[#0a1410] p-6 flex flex-col justify-center items-center text-center">
            <div className="w-64 h-64 rounded-full border border-emerald-500/50 relative flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-emerald-500/30" />
              <div className="w-32 h-32 rounded-full border border-emerald-500/20" />
              <div className="w-16 h-16 rounded-full border border-emerald-500/10" />
              <div className="absolute inset-0 border-t border-emerald-400/40 animate-spin" />
              <div className="w-2 h-2 rounded-full bg-emerald-400 absolute top-12 left-20" />
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute bottom-16 right-24" />
            </div>
            <p className="text-xs text-stone-300 mt-4 font-mono">
              FLIGHT VECTOR SIMULATION: Inbound trajectories intercepted at 3,200 ft AGL.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Timeline & Controls */}
      <div className="p-4 bg-black/90 border-t border-white/10 z-20 flex flex-col gap-3">
        {/* Progress Bar */}
        <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
          <div
            className="bg-white h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          {/* Layer switcher */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveLayer('video')}
              className={`px-2.5 py-1 text-[11px] font-mono uppercase rounded transition-colors ${
                activeLayer === 'video' ? 'bg-white text-black font-bold' : 'text-white/70 hover:text-white bg-white/10'
              }`}
            >
              Field Footage
            </button>
            <button
              onClick={() => setActiveLayer('satellite')}
              className={`px-2.5 py-1 text-[11px] font-mono uppercase rounded transition-colors ${
                activeLayer === 'satellite' ? 'bg-white text-black font-bold' : 'text-white/70 hover:text-white bg-white/10'
              }`}
            >
              Satellite SAR
            </button>
            <button
              onClick={() => setActiveLayer('radar')}
              className={`px-2.5 py-1 text-[11px] font-mono uppercase rounded transition-colors ${
                activeLayer === 'radar' ? 'bg-white text-black font-bold' : 'text-white/70 hover:text-white bg-white/10'
              }`}
            >
              Radar Map
            </button>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 text-white/80 hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-stone-200 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
