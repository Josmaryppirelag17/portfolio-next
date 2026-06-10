class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;
  private activeWave: OscillatorType = "triangle";
  private ctxReady: Promise<void> | null = null;
  private noiseWorker: Worker | null = null;

  private getNoiseWorker(): Worker | null {
    if (typeof window === "undefined") return null;
    if (this.noiseWorker) return this.noiseWorker;
    try {
      this.noiseWorker = new Worker(
        new URL("../../workers/noiseBuffer.worker.ts", import.meta.url),
        { type: "module" }
      );
    } catch {
      this.noiseWorker = null;
    }
    return this.noiseWorker;
  }

  setWaveType(type: OscillatorType) {
    this.activeWave = type;
  }

  getWaveType(): OscillatorType {
    return this.activeWave;
  }

  private ensureCtx(): Promise<void> {
    if (this.ctxReady) return this.ctxReady;

    this.ctxReady = (async () => {
      if (!this.ctx && typeof window !== "undefined") {
        try {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          this.ctx = new AudioCtx();
        } catch {
          return;
        }
      }
      if (this.ctx?.state === "suspended") {
        try {
          await this.ctx.resume();
        } catch {
          return;
        }
      }
    })();

    return this.ctxReady;
  }

  toggle(on?: boolean): boolean {
    if (on !== undefined) {
      this.enabled = on;
    } else {
      this.enabled = !this.enabled;
    }
    if (this.enabled) {
      this.ensureCtx();
    }
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  playToggleSound() {
    if (!this.enabled) return;
    this.ensureCtx().then(() => {
      if (!this.ctx) return;
      this.playTone(220, "triangle", 0.1, 0.15);
      setTimeout(() => {
        this.playTone(440, "sine", 0.15, 0.15);
      }, 80);
    });
  }

  playHover() {
    if (!this.enabled) return;
    this.ensureCtx().then(() => {
      if (!this.ctx) return;
      this.playTone(784, "sine", 0.04, 0.05);
    });
  }

  playClick() {
    if (!this.enabled) return;
    this.ensureCtx().then(() => {
      if (!this.ctx) return;
      this.playTone(440, "triangle", 0.08, 0.15);
      setTimeout(() => {
        this.playTone(880, "sine", 0.05, 0.1);
      }, 40);
    });
  }

  playError() {
    if (!this.enabled) return;
    this.ensureCtx().then(() => {
      if (!this.ctx) return;
      this.playTone(150, "sawtooth", 0.25, 0.2);
    });
  }

  playSuccess() {
    if (!this.enabled) return;
    this.ensureCtx().then(() => {
      if (!this.ctx) return;
      const scale = [523.25, 659.25, 783.99, 1046.5];
      scale.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, "sine", 0.18, 0.1);
        }, idx * 60);
      });
    });
  }

  playSynthKey(frequency: number) {
    if (!this.enabled) return;
    this.ensureCtx().then(() => {
      if (!this.ctx) return;
      this.playTone(frequency, this.activeWave, 0.25, 0.12);
    });
  }

  private playNoiseBuffer(bufferSize: number, sampleRate: number): AudioBuffer | null {
    if (!this.ctx) return null;
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  playRadioStatic() {
    if (!this.enabled) return;
    this.ensureCtx().then(() => {
      if (!this.ctx) return;
      try {
        const ctx = this.ctx;
        const bufferSize = ctx.sampleRate * 0.45;
        const sampleRate = ctx.sampleRate;

        const worker = this.getNoiseWorker();
        const playNoise = (buffer: AudioBuffer | null) => {
          if (!buffer) return;
          const noiseNode = ctx.createBufferSource();
          noiseNode.buffer = buffer;

          const filter = ctx.createBiquadFilter();
          filter.type = "bandpass";
          filter.frequency.setValueAtTime(1200, ctx.currentTime);
          filter.Q.setValueAtTime(2.0, ctx.currentTime);
          filter.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.45);

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.09, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);

          noiseNode.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          noiseNode.start();
          noiseNode.stop(ctx.currentTime + 0.45);
        };

        if (worker) {
          worker.onmessage = (e: MessageEvent<{ data: Float32Array }>) => {
            const noiseBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
            noiseBuffer.getChannelData(0).set(e.data.data);
            playNoise(noiseBuffer);
          };
          worker.postMessage({ bufferSize, sampleRate });
        } else {
          const noiseBuffer = this.playNoiseBuffer(bufferSize, sampleRate);
          playNoise(noiseBuffer);
        }

        setTimeout(() => {
          this.playTone(950, "sine", 0.08, 0.04);
        }, 40);
        setTimeout(() => {
          this.playTone(1900, "sine", 0.05, 0.03);
        }, 120);
      } catch {
        this.playTone(650, "sawtooth", 0.35, 0.06);
      }
    });
  }

  private playTone(
    freq: number,
    type: OscillatorType,
    duration: number,
    volume: number = 0.1
  ) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        this.ctx.currentTime + duration
      );

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      return;
    }
  }
}

export const soundEngine = new SoundEngine();
