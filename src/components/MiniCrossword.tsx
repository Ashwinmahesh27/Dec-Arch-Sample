import React, { useState, useEffect, useRef } from 'react';
import { MINI_CROSSWORD_GRID, MINI_CROSSWORD_CLUES } from '../data/newsData';
import { ArrowLeft, RotateCcw, CheckCircle, HelpCircle, Trophy } from 'lucide-react';

interface MiniCrosswordProps {
  onBack: () => void;
}

export const MiniCrossword: React.FC<MiniCrosswordProps> = ({ onBack }) => {
  const [userLetters, setUserLetters] = useState<Record<string, string>>({});
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [selectedCol, setSelectedCol] = useState<number>(0);
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [revealedCells, setRevealedCells] = useState<Record<string, boolean>>({});

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isCompleted) {
      timerRef.current = window.setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isCompleted]);

  // Check if grid is solved
  useEffect(() => {
    let allFilled = true;
    let allCorrect = true;

    MINI_CROSSWORD_GRID.forEach((cell) => {
      if (!cell.isBlocked) {
        const key = `${cell.row}-${cell.col}`;
        const val = (userLetters[key] || '').toUpperCase();
        if (!val) allFilled = false;
        if (val !== cell.solution.toUpperCase()) allCorrect = false;
      }
    });

    if (allFilled && allCorrect && !isCompleted) {
      setIsCompleted(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [userLetters, isCompleted]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCellClick = (r: number, c: number, isBlocked: boolean) => {
    if (isBlocked) return;
    if (selectedRow === r && selectedCol === c) {
      setDirection((prev) => (prev === 'across' ? 'down' : 'across'));
    } else {
      setSelectedRow(r);
      setSelectedCol(c);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isCompleted) return;
    const key = `${selectedRow}-${selectedCol}`;

    if (e.key === 'Backspace') {
      setUserLetters((prev) => ({ ...prev, [key]: '' }));
      // Move backwards
      moveCursor(-1);
    } else if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
      setUserLetters((prev) => ({ ...prev, [key]: e.key.toUpperCase() }));
      // Move forwards
      moveCursor(1);
    } else if (e.key === 'ArrowRight') {
      moveCol(1);
    } else if (e.key === 'ArrowLeft') {
      moveCol(-1);
    } else if (e.key === 'ArrowDown') {
      moveRow(1);
    } else if (e.key === 'ArrowUp') {
      moveRow(-1);
    }
  };

  const moveCursor = (delta: number) => {
    if (direction === 'across') {
      moveCol(delta);
    } else {
      moveRow(delta);
    }
  };

  const moveCol = (delta: number) => {
    let newCol = selectedCol + delta;
    if (newCol >= 0 && newCol < 5) {
      const cell = MINI_CROSSWORD_GRID.find((c) => c.row === selectedRow && c.col === newCol);
      if (cell && !cell.isBlocked) {
        setSelectedCol(newCol);
      }
    }
  };

  const moveRow = (delta: number) => {
    let newRow = selectedRow + delta;
    if (newRow >= 0 && newRow < 5) {
      const cell = MINI_CROSSWORD_GRID.find((c) => c.row === newRow && c.col === selectedCol);
      if (cell && !cell.isBlocked) {
        setSelectedRow(newRow);
      }
    }
  };

  const handleReset = () => {
    setUserLetters({});
    setTimerSeconds(0);
    setIsCompleted(false);
    setRevealedCells({});
  };

  const handleRevealCurrent = () => {
    const current = MINI_CROSSWORD_GRID.find((c) => c.row === selectedRow && c.col === selectedCol);
    if (current && !current.isBlocked) {
      const key = `${selectedRow}-${selectedCol}`;
      setUserLetters((prev) => ({ ...prev, [key]: current.solution }));
      setRevealedCells((prev) => ({ ...prev, [key]: true }));
    }
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="w-full bg-[#f7f7f7] min-h-screen text-[#121212] flex flex-col focus:outline-none pb-12"
    >
      {/* Mini Header Bar */}
      <div className="bg-white border-b border-[#e2e2e2] px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#121212] hover:opacity-75 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>News</span>
        </button>

        <div className="text-center">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#727272]">
            NYT GAMES
          </span>
          <h2 className="headline-font text-[16px] font-bold text-[#121212] leading-none">
            The Mini Crossword
          </h2>
        </div>

        <div className="text-right">
          <span className="font-mono text-sm font-bold text-[#121212] bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
            {formatTimer(timerSeconds)}
          </span>
        </div>
      </div>

      <div className="max-w-md mx-auto w-full p-4 flex flex-col items-center">
        {/* Win Banner */}
        {isCompleted && (
          <div className="w-full mb-4 p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3 animate-bounce">
            <Trophy className="w-7 h-7 text-emerald-600 shrink-0" />
            <div>
              <h3 className="font-bold text-sm">Congratulations!</h3>
              <p className="text-xs">
                You solved the Mini in {formatTimer(timerSeconds)}!
              </p>
            </div>
          </div>
        )}

        {/* 5x5 Crossword Grid */}
        <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] bg-black grid grid-cols-5 gap-[1.5px] border-2 border-black shadow-md my-2">
          {MINI_CROSSWORD_GRID.map((cell) => {
            const key = `${cell.row}-${cell.col}`;
            const isSelected = selectedRow === cell.row && selectedCol === cell.col;
            const isInActiveLine =
              direction === 'across'
                ? selectedRow === cell.row
                : selectedCol === cell.col;
            const letter = userLetters[key] || '';
            const isRevealed = revealedCells[key];

            if (cell.isBlocked) {
              return <div key={key} className="bg-black w-full h-full" />;
            }

            return (
              <div
                key={key}
                onClick={() => handleCellClick(cell.row, cell.col, cell.isBlocked)}
                className={`relative w-full h-full flex items-center justify-center cursor-pointer select-none transition-colors ${
                  isSelected
                    ? 'bg-[#ffda00]'
                    : isInActiveLine
                    ? 'bg-[#a7d8ff]'
                    : 'bg-white hover:bg-stone-50'
                }`}
              >
                {/* Cell Number */}
                {cell.number && (
                  <span className="absolute top-0.5 left-1 text-[9px] sm:text-[10px] font-bold text-black/70 font-sans leading-none">
                    {cell.number}
                  </span>
                )}

                {/* Letter */}
                <span
                  className={`text-xl sm:text-2xl font-bold font-sans uppercase ${
                    isRevealed ? 'text-amber-800' : 'text-black'
                  }`}
                >
                  {letter}
                </span>
              </div>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 my-3 text-xs font-semibold">
          <button
            onClick={handleRevealCurrent}
            className="flex items-center gap-1 px-3 py-1 bg-white border border-stone-300 rounded hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Reveal Letter</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1 bg-white border border-stone-300 rounded hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Grid</span>
          </button>
        </div>

        {/* Clues Accordion / List */}
        <div className="w-full bg-white border border-stone-200 p-4 mt-2 shadow-xs">
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#121212] border-b border-black pb-1 mb-2">
                Across
              </h4>
              <ul className="space-y-1.5 text-xs">
                {MINI_CROSSWORD_CLUES.filter((c) => c.direction === 'across').map((clue) => (
                  <li
                    key={`a-${clue.number}`}
                    onClick={() => {
                      setDirection('across');
                      const target = MINI_CROSSWORD_GRID.find((c) => c.number === clue.number);
                      if (target) {
                        setSelectedRow(target.row);
                        setSelectedCol(target.col);
                      }
                    }}
                    className="cursor-pointer hover:text-[#326891] leading-snug"
                  >
                    <strong>{clue.number}.</strong> {clue.text}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#121212] border-b border-black pb-1 mb-2">
                Down
              </h4>
              <ul className="space-y-1.5 text-xs">
                {MINI_CROSSWORD_CLUES.filter((c) => c.direction === 'down').map((clue) => (
                  <li
                    key={`d-${clue.number}`}
                    onClick={() => {
                      setDirection('down');
                      const target = MINI_CROSSWORD_GRID.find((c) => c.number === clue.number);
                      if (target) {
                        setSelectedRow(target.row);
                        setSelectedCol(target.col);
                      }
                    }}
                    className="cursor-pointer hover:text-[#326891] leading-snug"
                  >
                    <strong>{clue.number}.</strong> {clue.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
