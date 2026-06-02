"use client";

import React, { useState } from "react";
import MatrixRain from "@/components/matrix-rain";
import CyberBoot from "@/components/cyber-boot";
import CyberDashboard from "@/components/cyber-dashboard";
import CyberTerminal from "@/components/cyber-terminal";
import { Monitor, Terminal as TermIcon } from "lucide-react";

type ViewModeType = "hud" | "cli";

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [viewMode, setViewMode] = useState<ViewModeType>("hud");

  // Handle boot completes
  const handleBootComplete = () => {
    setBooted(true);
  };

  if (!booted) {
    return <CyberBoot onBootComplete={handleBootComplete} />;
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-between py-6 px-4 md:px-8 z-10 select-none overflow-hidden bg-black">
      
      {/* Matrix rain canvas background */}
      <MatrixRain color="mixed" opacity={0.18} />

      {/* Global cockpit navigation controls */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-6 z-20 font-mono text-xs">
        <div className="flex gap-2.5 items-center">
          <span className="text-[10px] text-cyber-cyan glow-text-cyan font-bold uppercase tracking-widest animate-pulse">
            SYS_SHELL // ONLINE
          </span>
        </div>

        {/* HUD vs CLI view selector toggle */}
        <div className="flex bg-slate-950/90 border border-cyber-blue/30 rounded p-1 shadow-[0_0_12px_rgba(0,119,182,0.15)]">
          <button
            onClick={() => setViewMode("hud")}
            className={`flex items-center gap-2 py-1.5 px-4 rounded text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              viewMode === "hud"
                ? "bg-cyber-cyan text-black font-black"
                : "text-slate-400 hover:text-cyber-cyan"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>VISUAL_HUD</span>
          </button>
          
          <button
            onClick={() => setViewMode("cli")}
            className={`flex items-center gap-2 py-1.5 px-4 rounded text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              viewMode === "cli"
                ? "bg-cyber-cyan text-black font-black"
                : "text-slate-400 hover:text-cyber-cyan"
            }`}
          >
            <TermIcon className="w-3.5 h-3.5" />
            <span>TERMINAL_CLI</span>
          </button>
        </div>

        <div className="hidden md:flex gap-4 text-slate-500 font-bold">
          <span>COGNITIVE: SECURED</span>
          <span>LATENCY: 12ms</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="w-full max-w-6xl flex-1 flex flex-col justify-center z-10">
        {viewMode === "hud" ? (
          /* Graphical System HUD */
          <div className="animate-fade-in duration-500">
            <CyberDashboard />
          </div>
        ) : (
          /* Interactive CLI shell terminal */
          <div className="w-full max-w-4xl mx-auto h-[460px] cyber-glass border border-cyber-blue/35 rounded-lg relative overflow-hidden flex flex-col shadow-[0_0_30px_rgba(0,119,182,0.15)] animate-fade-in duration-500">
            <div className="scan-line" />
            
            {/* Window control chrome header */}
            <div className="flex justify-between items-center bg-slate-950/90 border-b border-cyber-blue/20 p-3 font-mono text-[10px]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-slate-400 font-bold">nhutanhmc@xavia-deck:~ (zsh)</span>
              <span className="text-cyber-cyan glow-text-cyan font-bold blink">SHELL_ACTIVE</span>
            </div>

            {/* CLI Console */}
            <div className="flex-1 overflow-hidden">
              <CyberTerminal />
            </div>
          </div>
        )}
      </div>

      {/* Footer copyright */}
      <div className="w-full max-w-6xl mt-6 border-t border-cyber-blue/20 pt-4 text-center z-20">
        <p className="font-mono text-[9px] text-slate-600 tracking-wider">
          COCKPIT SYSTEM PORTAL v2.0 // HAND-CODED BY ANH NGUYEN (XAVIA) // ALL RIGHTS RESERVED
        </p>
      </div>

    </main>
  );
}
