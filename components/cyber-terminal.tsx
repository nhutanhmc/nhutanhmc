"use client";

import React, { useState, useEffect, useRef } from "react";

interface CommandOutput {
  command: string;
  response: string | React.ReactNode;
}

export default function CyberTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const initialResponse = (
    <div className="text-slate-300">
      <p className="text-cyber-cyan glow-text-cyan font-bold mb-1">XAVIA TERMINAL ENGINE [Version 2.0.5]</p>
      <p className="text-slate-500 mb-2">Type "help" to list all available cockpit commands.</p>
    </div>
  );

  useEffect(() => {
    // Add welcome log
    setHistory([{ command: "boot", response: initialResponse }]);
  }, []);

  useEffect(() => {
    // Auto scroll to bottom
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response: string | React.ReactNode = "";

    switch (trimmed) {
      case "help":
        response = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyber-cyan font-bold">AVAILABLE SHELL COMMANDS:</p>
            <p>  <span className="text-cyber-magenta">about</span>      - Load developer bio-specifications</p>
            <p>  <span className="text-cyber-magenta">skills</span>     - Map core libraries &amp; competencies</p>
            <p>  <span className="text-cyber-magenta">projects</span>   - Query visual archive of developments</p>
            <p>  <span className="text-cyber-magenta">contact</span>    - Establish communications channels</p>
            <p>  <span className="text-cyber-magenta">clear</span>      - Flush buffer screen</p>
            <p>  <span className="text-cyber-magenta">hack</span>       - Launch central core decryption simulation</p>
          </div>
        );
        break;

      case "about":
        response = (
          <div className="text-slate-300 max-w-xl space-y-2">
            <p><span className="text-cyber-cyan font-bold">ALIAS:</span> Anh Nguyen (Xavia)</p>
            <p><span className="text-cyber-cyan font-bold">CLASS:</span> Full-Stack Developer &amp; AI Integration Explorer</p>
            <p><span className="text-cyber-cyan font-bold">DIRECTIVE:</span> Build scale infrastructures with absolute type-safety, visual layout polish, and microsecond response budgets.</p>
            <p className="text-slate-400 italic">"I build next-generation applications with clean, high-performance architecture and modern UI/UX design. Let's make things that wow."</p>
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="text-slate-300 space-y-2">
            <p className="text-cyber-cyan font-bold">CORE EXPERTISE BluePrint:</p>
            <p className="text-cyber-magenta font-bold">Languages &amp; Core Tech:</p>
            <p>  JavaScript, TypeScript, HTML5, CSS3, Java, Dart, Python</p>
            <p className="text-cyber-magenta font-bold">Frontend Frameworks &amp; Styling:</p>
            <p>  React, Next.js, Vue, Flutter, TailwindCSS, Sass</p>
            <p className="text-cyber-magenta font-bold">Backend &amp; Database Arrays:</p>
            <p>  Node.js, Express, Spring Boot, GraphQL, PostgreSQL, MongoDB, Prisma, Redis</p>
            <p className="text-cyber-magenta font-bold">DevOps &amp; Infrastructure:</p>
            <p>  Docker, Git, GitHub Actions, Vercel, AWS, Supabase, Firebase</p>
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="text-slate-300 space-y-3">
            <p className="text-cyber-cyan font-bold">PROJECT QUERY MATCHES [3 RESULTS]:</p>
            <div className="border-l-2 border-cyber-cyan pl-3">
              <p className="font-bold text-cyber-magenta">1. Cybernetic OS Portal (This web deck)</p>
              <p className="text-xs text-slate-400">Stack: Next.js 16, React 19, Tailwind CSS v4, HTML5 Canvas</p>
              <p className="text-xs text-slate-300">Features: Interactive boot flow, mock CLI console shell, lo-fi audio engine, decrypt minigames.</p>
            </div>
            <div className="border-l-2 border-cyber-cyan pl-3">
              <p className="font-bold text-cyber-magenta">2. Cross-Platform Mobile Suite (Health &amp; IoT)</p>
              <p className="text-xs text-slate-400">Stack: Flutter, Dart, Bluetooth BLE, Firebase</p>
              <p className="text-xs text-slate-300">Features: Realtime telemetry sync, biometric graph representations, background syncing.</p>
            </div>
            <div className="border-l-2 border-cyber-cyan pl-3">
              <p className="font-bold text-cyber-magenta">3. Microservice Sync Engine (Real-Time API)</p>
              <p className="text-xs text-slate-400">Stack: Node.js, NestJS, Redis Pub/Sub, PostgreSQL, Docker</p>
              <p className="text-xs text-slate-300">Features: Real-time messaging sync, web sockets, scalable clusters with balancing.</p>
            </div>
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="text-slate-300 space-y-1">
            <p className="text-cyber-cyan font-bold">COMMUNICATION VECTOR LINKAGES:</p>
            <p>📧 Gmail:    <a href="mailto:nhutanhmc@gmail.com" className="text-cyber-magenta hover:underline">nhutanhmc@gmail.com</a></p>
            <p>🐙 GitHub:   <a href="https://github.com/nhutanhmc" target="_blank" rel="noreferrer" className="text-cyber-magenta hover:underline">github.com/nhutanhmc</a></p>
            <p>🔗 LinkedIn: <a href="https://www.linkedin.com/in/anh-nguyen-296b53333/" target="_blank" rel="noreferrer" className="text-cyber-magenta hover:underline">linkedin.com/in/anh-nguyen</a></p>
            <p>👥 Facebook: <a href="https://www.facebook.com/Xavia0205?locale=vi_VN" target="_blank" rel="noreferrer" className="text-cyber-magenta hover:underline">facebook.com/Xavia0205</a></p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "hack":
        response = (
          <div className="text-cyber-magenta glow-text-magenta animate-pulse font-bold space-y-1">
            <p>[ALERT] ATTEMPTING DECRYPTION STAGE ON HOST CORE REACTOR...</p>
            <p>[SYS] SECURE CODE INJECTION LOADED...</p>
            <p>[INFO] Transitioning terminal command line to Decryption Minigame. Please navigate to the "DEC_DECK" tab in the visual HUD console to complete the link bypass!</p>
          </div>
        );
        break;

      default:
        response = `bash: command not found: ${trimmed}. Type "help" for a list of valid terminal commands.`;
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, response }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <div className="w-full h-full flex flex-col font-mono text-xs text-slate-300 p-4">
      {/* Log Output Buffer */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin text-left">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            {item.command !== "boot" && (
              <div className="text-cyber-cyan">
                <span>xavia@nhutanhmc-deck:~$ </span>
                <span className="text-white">{item.command}</span>
              </div>
            )}
            <div className="pl-2 leading-relaxed whitespace-pre-wrap">{item.response}</div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* CLI Command Input bar */}
      <div className="flex items-center border-t border-cyber-blue/20 pt-3 mt-2">
        <span className="text-cyber-cyan mr-1.5 font-bold">xavia@nhutanhmc-deck:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-white text-xs select-all font-mono"
          placeholder='Type commands here... (try "help")'
          autoFocus
        />
        <span className="terminal-cursor ml-1" />
      </div>
    </div>
  );
}
