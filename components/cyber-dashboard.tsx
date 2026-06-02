"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Terminal as TermIcon, 
  Cpu, 
  Layers, 
  Music, 
  ShieldAlert, 
  Play, 
  Pause, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  ExternalLink,
  Lock, 
  Unlock,
  Disc,
  Info,
  Flame,
  Zap,
  Globe,
  Monitor
} from "lucide-react";
import CyberGame from "./cyber-game";

// Types
type TabType = "dashboard" | "tech" | "projects" | "audio" | "hack";

interface Project {
  title: string;
  category: string;
  tags: string[];
  description: string;
  github: string;
  metrics: string;
}

export default function CyberDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [sysTime, setSysTime] = useState("");
  
  // Real-time telemetry states
  const [cpuUsage, setCpuUsage] = useState(42);
  const [ramUsage, setRamUsage] = useState(58);
  const [networkLoad, setNetworkLoad] = useState(12);
  
  // Realtime System Console Streams
  const [liveLogs, setLiveLogs] = useState<string[]>([]);
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  // Audio deck states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playlist = [
    { title: "LO-FI CYBERNETIC COGNITION", artist: "Xavia.sh", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "NEON GLOW HIGHWAYS", artist: "nhutanhmc.flac", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
    { title: "HYPERSPACE DRIFTING", artist: "Synapse.wav", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" }
  ];

  // Telemetry updates loop
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setSysTime(date.toLocaleTimeString("en-US", { hour12: false }) + ":" + String(date.getMilliseconds()).padStart(3, "0"));
      
      setCpuUsage((prev) => {
        const delta = Math.floor(Math.random() * 21) - 10;
        return Math.max(10, Math.min(prev + delta, 98));
      });
      
      setRamUsage((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(30, Math.min(prev + delta, 95));
      });

      setNetworkLoad((prev) => {
        const delta = Math.floor(Math.random() * 15) - 7;
        return Math.max(5, Math.min(prev + delta, 120));
      });
    }, 400);

    return () => clearInterval(timer);
  }, []);

  // Live diagnostic logs stream
  useEffect(() => {
    const diagnostics = [
      "[INFO] Checking compiler pipelines...",
      "[SYS] Memory defragmentation: OK",
      "[RUN] Flutter BLE socket handshake synced",
      "[OK] Postgres pool connection verified",
      "[OK] Vercel analytics deployed on edge nodes",
      "[DIAG] Cache latency: 12ms",
      "[INFO] Wakatime sync: active link established",
      "[ALERT] Synaptic engine temperature: stable at 38C",
    ];

    const stream = setInterval(() => {
      const randDiag = diagnostics[Math.floor(Math.random() * diagnostics.length)];
      const stamp = new Date().toLocaleTimeString("en-US", { hour12: false });
      setLiveLogs((prev) => [...prev.slice(-30), `[${stamp}] ${randDiag}`]);
    }, 2500);

    return () => clearInterval(stream);
  }, []);

  useEffect(() => {
    consoleBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [liveLogs]);

  // Audio handlers
  useEffect(() => {
    audioRef.current = new Audio(playlist[currentTrack].src);
    audioRef.current.volume = volume;
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentTrack]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.error("Audio playback error:", err));
    }
  };

  const skipTrack = () => {
    if (audioRef.current) audioRef.current.pause();
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        });
      }
    }, 150);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Projects data
  const projectsList: Project[] = [
    {
      title: "Interactive Cyberdeck Engine",
      category: "Fullstack / Web",
      tags: ["Next.js", "React", "Canvas", "PostCSS"],
      description: "Static visualizer with scroll-logging, custom canvas rain algorithms, and complex 3D CSS telemetry overlays.",
      github: "https://github.com/nhutanhmc",
      metrics: "PERF: 100% // CORE: MAX"
    },
    {
      title: "Cross-Platform Mobile Suite",
      category: "Mobile",
      tags: ["Flutter", "Dart", "Firebase", "BLE"],
      description: "Real-time biometrics visualizer tracking hardware nodes and synchronization channels under low battery constraints.",
      github: "https://github.com/nhutanhmc",
      metrics: "SYNC: Realtime // LATENCY: 8ms"
    },
    {
      title: "Microservice Web API Sync",
      category: "Backend",
      tags: ["NestJS", "Node.js", "Redis", "Postgres"],
      description: "Federated API endpoints handling web sockets, realtime queues, and secure database mapping.",
      github: "https://github.com/nhutanhmc",
      metrics: "THROUGHPUT: 12k/s // REDIS: OK"
    }
  ];

  const [projectFilter, setProjectFilter] = useState("all");
  const filteredProjects = projectsList.filter(p => 
    projectFilter === "all" || p.category.toLowerCase().includes(projectFilter)
  );

  return (
    <div className="w-full max-w-6xl mx-auto cyber-grid-pattern relative p-4 lg:p-6 select-none">
      
      {/* Upper Cockpit Banner Telemetry Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-cyber-slate/90 border border-cyber-blue/35 p-3 rounded-lg mb-6 shadow-[0_0_20px_rgba(0,119,182,0.15)] relative">
        <div className="scan-line" />
        <div className="flex items-center gap-3">
          <div className="relative">
            <Cpu className="w-8 h-8 text-cyber-cyan glow-text-cyan animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyber-magenta animate-ping" />
          </div>
          <div>
            <h1 className="text-sm font-black text-white font-mono tracking-widest uppercase">
              Xavia CyberDeck Terminal v2.0
            </h1>
            <p className="text-[10px] text-slate-500 font-mono">
              FIRMWARE: PEAK_CONTAINMENT // LOC: VIETNAM
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 mt-3 md:mt-0 text-xs font-mono">
          <div className="flex gap-2 items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-slate-400">MAINFRAME: <tspan className="text-green-500 font-bold">ONLINE</tspan></span>
          </div>
          <div>
            <span className="text-slate-400">UPTIME: </span>
            <span className="text-cyber-cyan glow-text-cyan font-bold">{sysTime}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Navigation tabs + Center Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Navigation Deck Tabs (3 Columns on Large Screens) */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex-1 flex items-center justify-center lg:justify-start gap-3 py-3 px-4 rounded border font-mono text-xs uppercase font-black transition-all duration-300 cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-cyber-cyan text-black border-cyber-cyan shadow-[0_0_15px_rgba(0,245,212,0.4)] scale-[1.02]"
                : "cyber-glass border-cyber-blue/30 text-slate-400 hover:text-cyber-cyan hover:border-cyber-cyan/50"
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>SYS_DECK</span>
          </button>

          <button
            onClick={() => setActiveTab("tech")}
            className={`flex-1 flex items-center justify-center lg:justify-start gap-3 py-3 px-4 rounded border font-mono text-xs uppercase font-black transition-all duration-300 cursor-pointer ${
              activeTab === "tech"
                ? "bg-cyber-cyan text-black border-cyber-cyan shadow-[0_0_15px_rgba(0,245,212,0.4)] scale-[1.02]"
                : "cyber-glass border-cyber-blue/30 text-slate-400 hover:text-cyber-cyan hover:border-cyber-cyan/50"
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>TECH_DECK</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`flex-1 flex items-center justify-center lg:justify-start gap-3 py-3 px-4 rounded border font-mono text-xs uppercase font-black transition-all duration-300 cursor-pointer ${
              activeTab === "projects"
                ? "bg-cyber-cyan text-black border-cyber-cyan shadow-[0_0_15px_rgba(0,245,212,0.4)] scale-[1.02]"
                : "cyber-glass border-cyber-blue/30 text-slate-400 hover:text-cyber-cyan hover:border-cyber-cyan/50"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>PROJ_DECK</span>
          </button>

          <button
            onClick={() => setActiveTab("audio")}
            className={`flex-1 flex items-center justify-center lg:justify-start gap-3 py-3 px-4 rounded border font-mono text-xs uppercase font-black transition-all duration-300 cursor-pointer ${
              activeTab === "audio"
                ? "bg-cyber-cyan text-black border-cyber-cyan shadow-[0_0_15px_rgba(0,245,212,0.4)] scale-[1.02]"
                : "cyber-glass border-cyber-blue/30 text-slate-400 hover:text-cyber-cyan hover:border-cyber-cyan/50"
            }`}
          >
            <Music className="w-4 h-4" />
            <span>AUDIO_DECK</span>
          </button>

          <button
            onClick={() => setActiveTab("hack")}
            className={`flex-1 flex items-center justify-center lg:justify-start gap-3 py-3 px-4 rounded border font-mono text-xs uppercase font-black transition-all duration-300 cursor-pointer ${
              activeTab === "hack"
                ? "bg-cyber-magenta text-white border-cyber-magenta shadow-[0_0_15px_rgba(255,0,127,0.4)] scale-[1.02] glow-text-magenta animate-pulse"
                : "cyber-glass border-cyber-magenta/35 text-cyber-magenta/80 hover:text-white hover:bg-cyber-magenta/20"
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>BYPASS_DECK</span>
          </button>
        </div>

        {/* Display screen window (9 Columns on Large Screens) */}
        <div className="lg:col-span-9 w-full min-h-[460px] cyber-glass rounded-lg border border-cyber-blue/35 relative p-5 flex flex-col shadow-[0_0_30px_rgba(0,119,182,0.1)]">
          <div className="scan-line" />
          
          {/* Header Indicators */}
          <div className="flex justify-between items-center border-b border-cyber-blue/30 pb-3 mb-4 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyber-cyan animate-pulse shadow-[0_0_8px_#00f5d4]" />
              <span className="text-white font-bold uppercase">{activeTab}_INTERACTION_STREAM</span>
            </div>
            <span className="text-slate-500 font-bold">SECURE // SESSION_OK</span>
          </div>

          {/* ========================================================= */}
          {/* TAB 1: SYS_DECK (SYSTEM DASHBOARD METRICS) */}
          {/* ========================================================= */}
          {activeTab === "dashboard" && (
            <div className="flex-1 flex flex-col gap-6">
              {/* Dial Panel Meters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* CPU load */}
                <div className="cyber-glass border-cyber-blue/20 rounded p-4 text-center relative overflow-hidden">
                  <span className="text-[10px] text-slate-500 font-mono block mb-2 uppercase">CPU CORE FREQUENCY</span>
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span className="text-2xl font-black font-mono text-cyber-cyan glow-text-cyan">{cpuUsage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-cyber-cyan transition-all duration-300" style={{ width: `${cpuUsage}%` }} />
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono mt-2 block">16 CORE REACTOR : PEAK</span>
                </div>

                {/* RAM load */}
                <div className="cyber-glass border-cyber-blue/20 rounded p-4 text-center relative overflow-hidden">
                  <span className="text-[10px] text-slate-500 font-mono block mb-2 uppercase">SYNAPSE RAM ALLOCATION</span>
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span className="text-2xl font-black font-mono text-cyber-magenta glow-text-magenta">{ramUsage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-cyber-magenta transition-all duration-300" style={{ width: `${ramUsage}%` }} />
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono mt-2 block">ALLOCATED: 37.6 GB / 64 GB</span>
                </div>

                {/* NET load */}
                <div className="cyber-glass border-cyber-blue/20 rounded p-4 text-center relative overflow-hidden">
                  <span className="text-[10px] text-slate-500 font-mono block mb-2 uppercase">PORT CONGESTION INDEX</span>
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span className="text-2xl font-black font-mono text-white">{networkLoad} MB/s</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-cyber-blue transition-all duration-300" style={{ width: `${Math.min((networkLoad / 120) * 100, 100)}%` }} />
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono mt-2 block">AES-256 PIPELINE: MAXIMUM</span>
                </div>
              </div>

              {/* Console waterfall logs and visual charts */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1">
                {/* Log screen */}
                <div className="md:col-span-8 flex flex-col h-60 border border-cyber-blue/30 rounded p-3 bg-slate-950/70 font-mono text-[10px] text-left">
                  <div className="border-b border-cyber-blue/20 pb-1 mb-2 text-cyber-blue flex justify-between items-center">
                    <span>SYSTEM_LOG_MONITOR.log</span>
                    <span className="animate-pulse w-2 h-2 bg-cyber-cyan rounded-full" />
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-thin text-slate-400">
                    {liveLogs.length === 0 ? (
                      <p className="text-slate-600">[SYSTEM] Awaiting stream input...</p>
                    ) : (
                      liveLogs.map((log, idx) => (
                        <div key={idx} className={log.includes("[ALERT]") ? "text-cyber-magenta font-bold" : ""}>
                          {log}
                        </div>
                      ))
                    )}
                    <div ref={consoleBottomRef} />
                  </div>
                </div>

                {/* Tech Directives HUD card */}
                <div className="md:col-span-4 border border-cyber-blue/30 rounded p-4 bg-slate-950/70 flex flex-col justify-between text-left font-mono">
                  <span className="text-[10px] text-cyber-blue font-bold tracking-widest border-b border-cyber-blue/20 pb-1.5 mb-2 block uppercase">SYNAPTIC DIRECTIVES</span>
                  <ul className="text-[10px] space-y-2.5 text-slate-300">
                    <li className="flex gap-2">
                      <Flame className="w-3.5 h-3.5 text-cyber-cyan shrink-0 animate-pulse" />
                      <span><strong>PROD READY:</strong> Deliver fast static code structures.</span>
                    </li>
                    <li className="flex gap-2">
                      <Zap className="w-3.5 h-3.5 text-cyber-magenta shrink-0 animate-pulse" />
                      <span><strong>SPEED:</strong> Millisecond load budgets and minimal footprints.</span>
                    </li>
                    <li className="flex gap-2">
                      <Globe className="w-3.5 h-3.5 text-cyber-cyan shrink-0 animate-pulse" />
                      <span><strong>AUTO STACK:</strong> Scalable backend pools and edge routing.</span>
                    </li>
                  </ul>
                  <div className="border-t border-cyber-blue/20 pt-2.5 mt-3 flex justify-between items-center text-[9px] text-slate-500">
                    <span>INDEX: nhutanhmc.sh</span>
                    <span>STABLE: 100%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: TECH_DECK (INTERACTIVE CONSTELLATION MAP) */}
          {/* ========================================================= */}
          {activeTab === "tech" && (
            <div className="flex-1 flex flex-col justify-between items-center font-mono">
              <div className="text-center max-w-lg mb-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Interactive Node Constellation. Hover or highlight node clusters to verify compiler pipelines.
                </p>
              </div>

              {/* Holographic orbital display */}
              <div className="relative w-full max-w-lg h-64 border border-cyber-blue/20 rounded-lg bg-slate-950/50 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 cyber-grid-pattern opacity-30" />
                
                {/* 3D orbits representation */}
                <div className="absolute w-80 h-28 border border-cyber-cyan/40 rounded-full transform rotate-x-[60deg] spin-slow-cw" />
                <div className="absolute w-60 h-20 border border-cyber-magenta/40 rounded-full transform rotate-x-[60deg] spin-slow-ccw" />
                <div className="absolute w-40 h-14 border border-cyber-blue/30 rounded-full transform rotate-x-[60deg]" />

                {/* Central glowing pulsar */}
                <div className="relative z-10 w-12 h-12 rounded-full border border-cyber-magenta bg-cyber-magenta/10 flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(255,0,127,0.3)]">
                  <Cpu className="w-6 h-6 text-white" />
                </div>

                {/* Nodes orbiting elements */}
                <div className="absolute top-12 left-24 px-2 py-1 rounded bg-[#020512] border border-cyber-cyan text-[9px] text-white font-bold glow-border-cyan animate-bounce">
                  React / Next.js
                </div>
                <div className="absolute bottom-16 right-20 px-2 py-1 rounded bg-[#020512] border border-cyber-magenta text-[9px] text-white font-bold glow-border-magenta">
                  Flutter / Dart
                </div>
                <div className="absolute top-16 right-28 px-2 py-1 rounded bg-[#020512] border border-cyber-blue/40 text-[9px] text-slate-400">
                  Docker / AWS
                </div>
                <div className="absolute bottom-12 left-16 px-2 py-1 rounded bg-[#020512] border border-cyber-blue/40 text-[9px] text-slate-400">
                  Node.js / Postgres
                </div>
              </div>

              <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-[10px] text-left text-slate-300">
                <div className="p-2 border border-cyber-blue/20 rounded bg-slate-950/40">
                  <span className="text-cyber-cyan font-bold block mb-1">FRONTEND:</span>
                  React, Next.js, Vue, Tailwind CSS, HTML5, CSS3
                </div>
                <div className="p-2 border border-cyber-blue/20 rounded bg-slate-950/40">
                  <span className="text-cyber-magenta font-bold block mb-1">MOBILE CORE:</span>
                  Flutter, Dart, Native Platform Bridges
                </div>
                <div className="p-2 border border-cyber-blue/20 rounded bg-slate-950/40">
                  <span className="text-cyber-cyan font-bold block mb-1">BACKEND INFRA:</span>
                  Node.js, Express, Spring Boot, GraphQL
                </div>
                <div className="p-2 border border-cyber-blue/20 rounded bg-slate-950/40">
                  <span className="text-cyber-magenta font-bold block mb-1">DATA STORES:</span>
                  PostgreSQL, Redis, MongoDB, Supabase, Firebase
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: PROJ_DECK (PROJECT PORTFOLIO CARDS) */}
          {/* ========================================================= */}
          {activeTab === "projects" && (
            <div className="flex-1 flex flex-col font-mono text-left">
              {/* Filter tabs */}
              <div className="flex gap-2.5 mb-4 border-b border-cyber-blue/20 pb-3">
                {["all", "web", "mobile", "backend"].map((filt) => (
                  <button
                    key={filt}
                    onClick={() => setProjectFilter(filt)}
                    className={`px-3 py-1.5 rounded text-[10px] uppercase font-bold cursor-pointer transition-all duration-300 ${
                      projectFilter === filt
                        ? "bg-cyber-cyan text-black"
                        : "border border-cyber-blue/30 text-slate-400 hover:text-cyber-cyan"
                    }`}
                  >
                    {filt}
                  </button>
                ))}
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredProjects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="border border-cyber-blue/30 rounded p-4 bg-slate-950/40 flex flex-col justify-between hover:border-cyber-cyan/50 hover:shadow-[0_0_15px_rgba(0,245,212,0.1)] transition-all duration-300 group"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1 text-[10px]">
                        <span className="text-cyber-cyan font-bold">{proj.category}</span>
                        <span className="text-slate-500 font-bold text-[8px]">{proj.metrics}</span>
                      </div>
                      <h3 className="font-bold text-white mb-2 group-hover:text-cyber-cyan transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-[10px] text-slate-400 mb-4 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3.5">
                        {proj.tags.map((t, i) => (
                          <span key={i} className="text-[8px] px-1.5 py-0.5 rounded bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Launch Link */}
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-[9px] text-cyber-magenta font-bold hover:underline"
                      >
                        <span>LAUNCH_ARCHIVE</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: AUDIO_DECK (LIVELY AUDIO ENGINE & EQUALIZER) */}
          {/* ========================================================= */}
          {activeTab === "audio" && (
            <div className="flex-1 flex flex-col justify-center items-center font-mono">
              <div className="w-full max-w-md border border-cyber-blue/30 rounded p-5 bg-slate-950/60 relative overflow-hidden flex flex-col md:flex-row gap-4 items-center">
                <div className="scan-line" />
                
                {/* Visualizer Spinning disc */}
                <div className="relative">
                  <div className={`w-24 h-24 rounded-full border border-cyber-blue flex items-center justify-center ${isPlaying ? "spin-slow-cw" : ""}`}>
                    {/* Ring notches */}
                    <div className="absolute inset-2 border border-dashed border-cyber-cyan/50 rounded-full" />
                    <div className="absolute inset-4 border border-cyber-magenta/40 rounded-full" />
                    <Disc className={`w-8 h-8 text-cyber-cyan ${isPlaying ? "animate-pulse" : ""}`} />
                  </div>
                </div>

                {/* Player details */}
                <div className="flex-1 text-center md:text-left text-xs space-y-1.5 w-full">
                  <span className="text-[9px] text-cyber-blue font-bold tracking-widest block uppercase">DECK SOUNDSTREAM</span>
                  <h3 className="text-cyber-cyan font-bold leading-tight">{playlist[currentTrack].title}</h3>
                  <p className="text-[10px] text-slate-500">Artist: {playlist[currentTrack].artist}</p>
                  
                  {/* Timeline progress line */}
                  <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden mt-2 border border-cyber-blue/20">
                    <div 
                      className={`h-full bg-cyber-magenta shadow-[0_0_8px_#ff007f] ${isPlaying ? "w-1/2 transition-all duration-[30s] ease-linear" : "w-1/3"}`}
                    />
                  </div>

                  {/* Audio triggers */}
                  <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                    <button 
                      onClick={togglePlay} 
                      className="p-2 border border-cyber-cyan rounded-full text-cyber-cyan hover:bg-cyber-cyan/15 hover:shadow-[0_0_10px_rgba(0,245,212,0.3)] transition-all cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-cyber-cyan" />}
                    </button>
                    <button 
                      onClick={skipTrack} 
                      className="p-2 border border-cyber-magenta rounded-full text-cyber-magenta hover:bg-cyber-magenta/15 hover:shadow-[0_0_10px_rgba(255,0,127,0.3)] transition-all cursor-pointer"
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>

                    {/* Mute toggle button */}
                    <div className="flex items-center gap-1.5 ml-2">
                      <button onClick={toggleMute} className="text-slate-400 hover:text-white cursor-pointer">
                        {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-cyber-magenta" /> : <Volume2 className="w-4 h-4 text-cyber-cyan" />}
                      </button>
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.05" 
                        value={volume} 
                        onChange={handleVolumeChange} 
                        className="w-16 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyber-cyan"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bouncing spectrum bars (visual representation of equalizer) */}
              <div className="w-full max-w-md h-20 border border-cyber-blue/20 rounded mt-4 bg-slate-950/40 p-3 flex gap-1 items-end justify-center">
                {Array(20).fill(null).map((_, i) => {
                  const animDuration = 0.5 + Math.random() * 1.2;
                  return (
                    <div
                      key={i}
                      className={`w-3.5 bg-cyber-cyan rounded-t transition-all`}
                      style={{
                        animation: `workload-${(i % 4) + 1} ${animDuration}s infinite ease-in-out`,
                        opacity: 0.8,
                        backgroundColor: i % 2 === 0 ? "var(--color-cyber-cyan)" : "var(--color-cyber-magenta)"
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: BYPASS_DECK (CYBERPUNK BREACH MINIGAME) */}
          {/* ========================================================= */}
          {activeTab === "hack" && (
            <div className="flex-1 flex flex-col items-center justify-center font-mono">
              <CyberGame />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
