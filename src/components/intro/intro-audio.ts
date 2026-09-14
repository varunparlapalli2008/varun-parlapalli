// A short original synth cue, created locally after an explicit sound-button click.
// There are no audio downloads, trackers, or third-party soundtrack dependencies.
export function startIntroAudio(elapsed: number, duration: number): AudioContext | null {
  if (typeof window.AudioContext === "undefined" || elapsed >= duration) return null;
  const context = new AudioContext();
  const master = context.createGain();
  master.gain.value = 0.16;
  master.connect(context.destination);

  const tone = (frequency: number, start: number, length: number, volume: number) => {
    if (start + length <= elapsed) return;
    const when = context.currentTime + Math.max(0, start - elapsed);
    const remaining = Math.min(length, start + length - elapsed, duration - Math.max(start, elapsed));
    if (remaining <= 0.02) return;
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    oscillator.type = "triangle";
    oscillator.frequency.value = frequency;
    envelope.gain.setValueAtTime(0.0001, when);
    envelope.gain.exponentialRampToValueAtTime(volume, when + Math.min(0.12, remaining / 4));
    envelope.gain.exponentialRampToValueAtTime(0.0001, when + remaining);
    oscillator.connect(envelope);
    envelope.connect(master);
    oscillator.start(when);
    oscillator.stop(when + remaining);
  };

  tone(65.41, 0, duration, 0.45);
  [130.81, 155.56, 196, 261.63, 311.13, 392].forEach((note, i) => {
    tone(note, 0.3 + i * 0.38, 1.7, 0.25);
  });
  [130.81, 196, 261.63, 329.63].forEach((note) => tone(note, 4.25, 2.5, 0.28));
  void context.resume().catch(() => undefined);
  return context;
}
