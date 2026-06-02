"use client";

import React, { useState, useEffect } from "react";

interface CyberBootProps {
  onBootComplete: () => void;
}

export default function CyberBoot({ onBootComplete }: CyberBootProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [booted, setBooted] = useState(false);

  const bootMessages = [
    "[    0.000000] Booting Xavia Cyber OS Kernel 6.9.2-cyber-core...",
    "[    0.104128] Initializing hardware drivers... OK",
    "[    0.412845] Mount cognitive synapse processor (16 Cores @ 5.8GHz)...",
    "[    0.728954] Synapse node calibration complete. TEMP: 37.0 C",
    "[    1.025684] Loading memory blocks... [ 64GB LPDDR5 RAM mapped ]",
    "[    1.341258] Connecting secure SSL tunnel to nhutanhmc.sh:8080...",
    "[    1.621458] Tunnel established. Security level: AES-256-GCM encryption active",
    "[    1.895420] Pulling GitHub profile repository: nhutanhmc/nhutanhmc...",
    "[    2.245895] Loading tech stack config: React, Next.js, Flutter, Docker, Node.js, AWS...",
    "[    2.562145] Loading lofi sound protocol: Audio visualizer loaded",
    "[    2.894105] Verifying user credentials... Visitor identified.",
    "[    3.204568] Cognitive overflow rating: 99.8%. Systems STABLE.",
    "[    3.524589] System shell ready. Boot sequence SUCCESSFUL.",
  ];

  useEffect(() => {
    let index = 0;
    const addLog = () => {
      if (index < bootMessages.length) {
        setLogs((prev) => [...prev, bootMessages[index]]);
        setProgress((prev) => Math.min(((index + 1) / bootMessages.length) * 100, 100));
        index++;
        setTimeout(addLog, 250 + Math.random() * 200);
      } else {
        setBooted(true);
      }
    };
    addLog();
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-black z-50 p-6 select-none font-mono">
      <div className="w-full max-w-2xl cyber-glass border border-cyber-blue p-6 rounded-lg relative overflow-hidden shadow-[0_0_30px_rgba(0,119,182,0.2)]">
        <div className="scan-line" />
        
        {/* Top panel chrome bar */}
        <div className="flex justify-between items-center mb-4 border-b border-cyber-blue/30 pb-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-cyber-blue font-bold tracking-widest">BOOT_SEQUENCE // COGNITION</span>
        </div>

        {/* Boot console text logs */}
        <div className="h-64 overflow-y-auto mb-4 scrollbar-thin text-left text-xs space-y-1.5 pr-2">
          {logs.map((log, i) => (
            <div key={i} className={i === bootMessages.length - 1 ? "text-cyber-cyan glow-text-cyan" : "text-slate-300"}>
              {log}
            </div>
          ))}
          {!booted && (
            <div className="text-cyber-cyan">
              Loading... <span className="terminal-cursor" />
            </div>
          )}
        </div>

        {/* Boot Progress Bar */}
        <div className="w-full mb-6">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-cyber-cyan glow-text-cyan">DECK LOAD SYSTEM</span>
            <span className="text-cyber-magenta glow-text-magenta">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-cyber-blue/30">
            <div 
              className="h-full bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-magenta transition-all duration-300 shadow-[0_0_10px_rgba(0,245,212,0.5)]" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Enter command deck trigger button */}
        <div className={`transition-all duration-500 ${booted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
          <button
            onClick={onBootComplete}
            className="w-full py-3 bg-transparent text-cyber-cyan border border-cyber-cyan hover:bg-cyber-cyan hover:text-black rounded font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(0,245,212,0.2)] hover:shadow-[0_0_25px_rgba(0,245,212,0.6)] glow-text-cyan hover:scale-[1.02]"
          >
            Enter Cybernetic Deck
          </button>
        </div>
      </div>
    </div>
  );
}
