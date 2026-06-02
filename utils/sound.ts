"use client";

// Web Audio API Synthesizer for Retro Sci-Fi Sound Effects
let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play a short click/beep
export function playBeep(freq = 600, duration = 0.08) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + duration);
}

// Play a success sound cascade
export function playSuccessSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [400, 600, 900, 1300];
  
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now + idx * 0.08);

    gain.gain.setValueAtTime(0.1, now + idx * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.08);
    osc.stop(now + idx * 0.08 + 0.15);
  });
}

// Play a low frequency failure buzz
export function playFailSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.35);

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.35);
}

// Play a sci-fi sweep laser explosion
export function playLaserExplosion() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(1500, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.5);

  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.5);
}
