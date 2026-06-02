"use client";

import React, { useState, useEffect } from "react";
import { Lock, Unlock, ShieldAlert, Zap, RefreshCw } from "lucide-react";
import { playBeep, playSuccessSound, playFailSound } from "@/utils/sound";

interface CyberGameProps {
  onBypassComplete?: (dossier: string) => void;
}

type Difficulty = "easy" | "medium" | "hard";

export default function CyberGame({ onBypassComplete }: CyberGameProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [gridSize, setGridSize] = useState(5);
  const [grid, setGrid] = useState<string[][]>([]);
  const [targetSeq, setTargetSeq] = useState<string[]>([]);
  const [playerSeq, setPlayerSeq] = useState<string[]>([]);
  const [activeCell, setActiveCell] = useState<{ r: number; c: number } | null>(null);
  const [isRowSelect, setIsRowSelect] = useState(true);
  const [selectedCells, setSelectedCells] = useState<boolean[][]>([]);
  const [timer, setTimer] = useState(40);
  const [gameStatus, setGameStatus] = useState<"idle" | "playing" | "success" | "fail">("idle");
  const [cheatMode, setCheatMode] = useState(false);

  // Setup game configuration by difficulty
  const initGame = (diff: Difficulty = difficulty) => {
    playBeep(800, 0.15);
    const codes = ["1C", "E9", "55", "7A", "BD", "FF", "4A"];
    const size = diff === "easy" ? 5 : diff === "medium" ? 6 : 7;
    setGridSize(size);

    // 1. Generate grid
    const tempGrid = Array(size).fill(null).map(() => 
      Array(size).fill(null).map(() => codes[Math.floor(Math.random() * codes.length)])
    );

    // 2. Generate target path
    const seqLen = diff === "easy" ? 3 : diff === "medium" ? 4 : 5;
    const target: string[] = [];
    let curRow = 0;
    let curCol = Math.floor(Math.random() * size);
    
    let walkIsRow = true;
    for (let s = 0; s < seqLen; s++) {
      if (walkIsRow) {
        curCol = Math.floor(Math.random() * size);
        target.push(tempGrid[curRow][curCol]);
      } else {
        curRow = Math.floor(Math.random() * size);
        target.push(tempGrid[curRow][curCol]);
      }
      walkIsRow = !walkIsRow;
    }

    setGrid(tempGrid);
    setTargetSeq(target);
    setPlayerSeq([]);
    setActiveCell({ r: 0, c: 0 }); // First row is active at load
    setIsRowSelect(true);
    setSelectedCells(Array(size).fill(null).map(() => Array(size).fill(false)));
    
    const limit = diff === "easy" ? 40 : diff === "medium" ? 30 : 25;
    setTimer(limit);
    setGameStatus("playing");
  };

  // Timer tick
  useEffect(() => {
    if (gameStatus !== "playing") return;
    if (timer <= 0) {
      playFailSound();
      setGameStatus("fail");
      return;
    }
    const cd = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    return () => clearTimeout(cd);
  }, [timer, gameStatus]);

  const handleCellSelect = (r: number, c: number) => {
    if (gameStatus !== "playing") return;
    if (selectedCells[r][c]) return;

    // Enforce selection rows/columns alternate rule
    if (isRowSelect) {
      if (activeCell && r !== activeCell.r) return;
    } else {
      if (activeCell && c !== activeCell.c) return;
    }

    playBeep(500, 0.08);

    // Flag cell
    const updatedSelected = [...selectedCells];
    updatedSelected[r][c] = true;
    setSelectedCells(updatedSelected);

    const val = grid[r][c];
    const newPlayerSeq = [...playerSeq, val];
    setPlayerSeq(newPlayerSeq);

    // Verify match status
    let match = true;
    for (let i = 0; i < newPlayerSeq.length; i++) {
      if (newPlayerSeq[i] !== targetSeq[i]) {
        match = false;
        break;
      }
    }

    if (match && newPlayerSeq.length === targetSeq.length) {
      playSuccessSound();
      setGameStatus("success");
      if (onBypassComplete) {
        onBypassComplete(difficulty);
      }
      return;
    }

    if (!match || newPlayerSeq.length >= targetSeq.length) {
      playFailSound();
      setGameStatus("fail");
      return;
    }

    // Toggle active alignment coordinates
    setActiveCell({ r, c });
    setIsRowSelect(!isRowSelect);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center font-mono select-none">
      
      {/* Idle Selection State */}
      {gameStatus === "idle" && (
        <div className="max-w-md text-center space-y-4 my-auto p-4">
          <ShieldAlert className="w-12 h-12 text-cyber-magenta glow-text-magenta animate-pulse mx-auto" />
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">
            MAINFRAME BYPASS INJECTOR v2
          </h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Target key lock requires injecting a binary sequence of memory buffer variables. 
            Select row cells when horizontally aligned, and column cells when vertically aligned.
          </p>

          {/* Difficulty Ranks */}
          <div className="flex justify-center gap-3 border border-cyber-blue/20 rounded p-2 bg-slate-950/40">
            {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficulty(diff)}
                className={`flex-1 py-1.5 px-3 rounded text-[10px] uppercase font-bold transition-all cursor-pointer ${
                  difficulty === diff
                    ? "bg-cyber-cyan text-black"
                    : "border border-cyber-blue/30 text-slate-400 hover:text-cyber-cyan"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          <button
            onClick={() => initGame()}
            className="w-full py-2.5 bg-cyber-magenta hover:bg-cyber-magenta/80 text-white rounded font-bold uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_15px_rgba(255,0,127,0.4)]"
          >
            INJECT BYPASS SCRIPT
          </button>
        </div>
      )}

      {/* Active gameplay dashboard grid */}
      {gameStatus === "playing" && (
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left Grid area */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="flex justify-between w-full mb-2 text-[10px] text-slate-500 font-bold px-1">
              <span className="text-cyber-cyan uppercase">
                ALIGNMENT: {isRowSelect ? "ROW (Horizontal)" : "COL (Vertical)"}
              </span>
              <span className="text-slate-400">
                ACTIVE GRID: {gridSize}x{gridSize}
              </span>
            </div>

            <div 
              className="grid gap-1.5 bg-slate-950 p-3 rounded border border-cyber-blue/35 relative overflow-hidden"
              style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
            >
              <div className="scan-line" />
              
              {grid.map((row, rIdx) => 
                row.map((val, cIdx) => {
                  const isSelected = selectedCells[rIdx][cIdx];
                  const isActiveRow = activeCell && rIdx === activeCell.r && isRowSelect;
                  const isActiveCol = activeCell && cIdx === activeCell.c && !isRowSelect;
                  const isSelectable = isSelected ? false : (isActiveRow || isActiveCol);

                  return (
                    <button
                      key={`${rIdx}-${cIdx}`}
                      onClick={() => handleCellSelect(rIdx, cIdx)}
                      disabled={isSelected || !isSelectable}
                      className={`w-10 h-10 md:w-11 md:h-11 text-xs font-bold rounded flex items-center justify-center transition-all duration-200 ${
                        isSelected 
                          ? "bg-slate-900 text-slate-700 cursor-not-allowed border border-slate-950" 
                          : isSelectable
                            ? "bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan cursor-pointer hover:bg-cyber-cyan hover:text-black hover:shadow-[0_0_10px_#00f5d4]"
                            : "bg-slate-950 text-slate-500 border border-slate-900"
                      } ${
                        isRowSelect && activeCell?.r === rIdx ? "bg-cyber-cyan/5" : ""
                      } ${
                        !isRowSelect && activeCell?.c === cIdx ? "bg-cyber-magenta/5" : ""
                      }`}
                    >
                      {val}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right buffer state values and active timers */}
          <div className="md:col-span-5 text-xs text-left space-y-4 w-full">
            {/* Timer panel */}
            <div className="border border-cyber-magenta/30 rounded p-3 bg-slate-950/40 text-left">
              <span className="text-[10px] text-cyber-magenta glow-text-magenta font-bold block mb-1 uppercase">FIREWALL TIMER SECONDS</span>
              <span className={`text-2xl font-black ${timer < 10 ? "text-red-500 animate-pulse" : "text-white"}`}>
                00:{String(timer).padStart(2, "0")}
              </span>
            </div>

            {/* Target values path */}
            <div className="border border-cyber-blue/30 rounded p-3 bg-slate-950/40 text-left">
              <span className="text-[10px] text-cyber-blue font-bold block mb-2 uppercase">BYPASS KEY TARGET SEQUENCE</span>
              <div className="flex flex-wrap gap-2">
                {targetSeq.map((sq, idx) => (
                  <div
                    key={idx}
                    className={`px-3 py-1.5 rounded font-bold border text-xs ${
                      playerSeq.length > idx
                        ? "bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan"
                        : "bg-slate-900 border-slate-700 text-slate-500"
                    }`}
                  >
                    {sq}
                  </div>
                ))}
              </div>
            </div>

            {/* User clicks buffer queue */}
            <div className="border border-cyber-blue/30 rounded p-3 bg-slate-950/40 text-left">
              <span className="text-[10px] text-cyber-blue font-bold block mb-2 uppercase">INPUT MEMORY BUFFER</span>
              <div className="flex gap-2 min-h-[30px] items-center">
                {playerSeq.length === 0 ? (
                  <span className="text-slate-600 italic">No input buffer...</span>
                ) : (
                  playerSeq.map((ps, idx) => (
                    <div key={idx} className="px-3 py-1.5 rounded bg-cyber-magenta/20 border border-cyber-magenta text-cyber-magenta font-bold text-xs">
                      {ps}
                    </div>
                  ))
                )}
                {playerSeq.length < targetSeq.length && (
                  <span className="terminal-cursor w-2 h-4 bg-cyber-cyan animate-ping ml-1" />
                )}
              </div>
            </div>
            
            <button 
              onClick={() => initGame()}
              className="flex items-center justify-center gap-2 text-[10px] text-slate-400 hover:text-cyber-cyan hover:underline cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>RESTART CYBER BYPASS</span>
            </button>
          </div>
        </div>
      )}

      {/* Success unlocked dossier display */}
      {gameStatus === "success" && (
        <div className="max-w-lg text-center space-y-4 my-auto p-5 border border-cyber-cyan rounded bg-cyber-cyan/5 glow-border-cyan animate-fade-in text-left">
          <Unlock className="w-12 h-12 text-cyber-cyan glow-text-cyan animate-bounce mx-auto" />
          <h3 className="text-sm font-bold text-cyber-cyan uppercase tracking-widest text-center glow-text-cyan">
            BYPASS COMPLETE // INTEL ACCESSED
          </h3>
          
          <div className="text-[10px] font-mono text-slate-300 space-y-2 p-3 bg-slate-950/90 rounded border border-cyber-cyan/25 leading-relaxed">
            <p className="text-cyber-magenta glow-text-magenta font-bold uppercase">[SECRET DATA DOSSIER UNLOCKED]</p>
            <p><strong>Alias Name:</strong> Xavia Nguyen (Anh Nguyen)</p>
            <p><strong>Mainframe Focus:</strong> Production scaling architecture, low latency routing, clean responsive UX structures.</p>
            <p><strong>Cognitive Specs:</strong></p>
            <p> - Code-to-Coffee fuel efficiency ratio: 1:3</p>
            <p> - Peak output: Night hours (10:00 PM to 02:00 AM)</p>
            <p> - Core developer directive: Code must look pristine, build must execute fast, and interface must wow.</p>
          </div>

          <div className="flex gap-3 pt-2 justify-center">
            <button
              onClick={() => initGame()}
              className="px-4 py-2 border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/15 rounded text-[10px] font-bold uppercase tracking-widest cursor-pointer"
            >
              Hack Mainframe Again
            </button>
            <button
              onClick={() => setGameStatus("idle")}
              className="px-4 py-2 border border-slate-600 text-slate-400 hover:text-white rounded text-[10px] font-bold uppercase tracking-widest cursor-pointer"
            >
              Close Link
            </button>
          </div>
        </div>
      )}

      {/* Defeat state screen */}
      {gameStatus === "fail" && (
        <div className="max-w-md text-center space-y-4 my-auto p-4 border border-cyber-magenta rounded bg-cyber-magenta/5 glow-border-magenta animate-fade-in">
          <Lock className="w-12 h-12 text-cyber-magenta glow-text-magenta mx-auto animate-pulse" />
          <h3 className="text-sm font-bold text-cyber-magenta uppercase tracking-widest glow-text-magenta">
            INTRUSION TERMINATED // ACCESS DENIED
          </h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Firewall locked down the active buffer segments due to coordinate misalignment or timer expiration.
          </p>
          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={() => initGame()}
              className="px-6 py-2.5 bg-cyber-magenta hover:bg-cyber-magenta/80 text-white rounded font-bold uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_15px_rgba(255,0,127,0.4)]"
            >
              Retry Decryption
            </button>
            <button
              onClick={() => setGameStatus("idle")}
              className="px-4 py-2 border border-slate-600 text-slate-400 hover:text-white rounded text-[10px] font-bold uppercase tracking-widest cursor-pointer"
            >
              Back to Deck
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
