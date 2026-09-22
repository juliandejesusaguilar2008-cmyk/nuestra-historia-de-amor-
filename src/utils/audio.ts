import { SongTrack } from '../types';

/**
 * Gestor de Audio Romántico para la página de regalo.
 * 
 * Soporta:
 * 1. Lista de reproducción (Playlist) de canciones en secuencia
 * 2. Transición automática a la siguiente canción al terminar cada una
 * 3. Bucle infinito de toda la lista para que nunca pare la música mientras explore la web
 * 4. Control de reproducción, pausa, avanzar y retroceder canción
 * 5. Si ocurre cualquier error de red, sintetiza automáticamente una melodía romántica
 *    de piano en Web Audio API para que nunca quede en silencio y siempre sea mágico.
 */

export interface AudioState {
  isPlaying: boolean;
  currentTrackIndex: number;
  currentTrack: SongTrack | null;
  playlist: SongTrack[];
}

class RomanticAudioController {
  private audioElement: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private isPlayingSynth = false;
  private synthTimer: number | null = null;
  private isCurrentlyPlaying = false;
  private playlist: SongTrack[] = [];
  private currentTrackIndex = 0;
  private listeners: ((state: AudioState) => void)[] = [];

  constructor() {
    // Inicialización perezosa para respetar las políticas del navegador
  }

  public subscribe(cb: (state: AudioState) => void) {
    this.listeners.push(cb);
    // Notificación inmediata del estado actual
    cb(this.getState());
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  public getState(): AudioState {
    return {
      isPlaying: this.isCurrentlyPlaying,
      currentTrackIndex: this.currentTrackIndex,
      currentTrack: this.playlist[this.currentTrackIndex] || null,
      playlist: this.playlist,
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach(cb => cb(state));
  }

  public isPlaying(): boolean {
    return this.isCurrentlyPlaying;
  }

  public setPlaylist(tracks: SongTrack[], autoStartTrackIndex?: number) {
    this.playlist = tracks;
    if (typeof autoStartTrackIndex === 'number' && autoStartTrackIndex >= 0 && autoStartTrackIndex < tracks.length) {
      this.currentTrackIndex = autoStartTrackIndex;
    } else if (this.currentTrackIndex >= tracks.length) {
      this.currentTrackIndex = 0;
    }
    this.notify();
  }

  public getPlaylist(): SongTrack[] {
    return this.playlist;
  }

  public getCurrentTrack(): SongTrack | null {
    return this.playlist[this.currentTrackIndex] || null;
  }

  public getCurrentTrackIndex(): number {
    return this.currentTrackIndex;
  }

  public async togglePlay(audioUrl?: string) {
    if (this.isCurrentlyPlaying) {
      this.pause();
    } else {
      await this.play(audioUrl);
    }
  }

  public async playTrack(index: number) {
    if (index >= 0 && index < this.playlist.length) {
      this.currentTrackIndex = index;
      const track = this.playlist[index];
      await this.play(track.audioUrl);
    }
  }

  public async nextTrack() {
    if (this.playlist.length === 0) return;
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
    const track = this.playlist[this.currentTrackIndex];
    await this.play(track.audioUrl);
  }

  public async prevTrack() {
    if (this.playlist.length === 0) return;
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
    const track = this.playlist[this.currentTrackIndex];
    await this.play(track.audioUrl);
  }

  public async play(audioUrl?: string) {
    const track = this.playlist[this.currentTrackIndex];
    const url = audioUrl || (track ? track.audioUrl : '/music/1-te-quiero-tanto.mp3');

    try {
      if (!this.audioElement) {
        this.audioElement = new Audio();
        this.audioElement.volume = 0.75;

        // Cuando termina una canción: avanza automáticamente a la siguiente en bucle infinito
        this.audioElement.addEventListener('ended', () => {
          this.handleTrackEnded();
        });

        this.audioElement.addEventListener('error', () => {
          // Si el archivo local da error, avanzamos o activamos respaldo
          console.info('Aviso: Error cargando archivo de audio. Reproduciendo siguiente pista o respaldo.');
          if (this.playlist.length > 1) {
            this.nextTrack().catch(() => this.playSyntheticPiano());
          } else {
            this.playSyntheticPiano();
          }
        });
      }

      // No usar .loop en el audio individual si hay lista, para que dispare 'ended' y avance a la siguiente
      this.audioElement.loop = this.playlist.length <= 1;

      const fullUrl = url.startsWith('http') ? url : window.location.origin + url;
      if (this.audioElement.src !== fullUrl && !this.audioElement.src.endsWith(url)) {
        this.audioElement.src = url;
      }
      
      await this.audioElement.play();
      this.stopSyntheticPiano();
      this.isCurrentlyPlaying = true;
      this.notify();
    } catch {
      // Fallback a Web Audio API si falla la carga o autoplay
      this.playSyntheticPiano();
    }
  }

  private handleTrackEnded() {
    if (this.playlist.length > 0) {
      // Siguiente canción en la lista, volviendo al inicio (bucle infinito)
      this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
      const nextSong = this.playlist[this.currentTrackIndex];
      if (nextSong) {
        this.play(nextSong.audioUrl).catch(() => {});
        return;
      }
    }

    // Si es una sola canción, reiniciar
    if (this.audioElement) {
      this.audioElement.currentTime = 0;
      this.audioElement.play().catch(() => {});
      this.isCurrentlyPlaying = true;
      this.notify();
    }
  }

  public pause() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopSyntheticPiano();
    this.isCurrentlyPlaying = false;
    this.notify();
  }

  /**
   * Generador de melodía de piano suave (pentatónica romántica) de respaldo
   */
  private playSyntheticPiano() {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.isPlayingSynth = true;
      this.isCurrentlyPlaying = true;
      this.notify();

      const chords = [
        [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj9
        [130.81, 164.81, 196.00, 246.94, 293.66], // Cmaj7
        [146.83, 174.61, 220.00, 261.63, 329.63], // Dm7
        [110.00, 130.81, 164.81, 196.00, 246.94], // Am7
      ];

      let chordIndex = 0;
      let noteIndex = 0;

      const playNextNote = () => {
        if (!this.isPlayingSynth || !this.audioCtx) return;

        const currentChord = chords[chordIndex];
        const freq = currentChord[noteIndex];

        this.triggerChime(freq);

        noteIndex++;
        if (noteIndex >= currentChord.length) {
          noteIndex = 0;
          chordIndex = (chordIndex + 1) % chords.length;
        }

        const delay = 600 + Math.random() * 200;
        this.synthTimer = window.setTimeout(playNextNote, delay);
      };

      playNextNote();
    } catch {
      this.isCurrentlyPlaying = false;
      this.notify();
    }
  }

  private triggerChime(freq: number) {
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 2.6);
  }

  private stopSyntheticPiano() {
    this.isPlayingSynth = false;
    if (this.synthTimer !== null) {
      clearTimeout(this.synthTimer);
      this.synthTimer = null;
    }
  }
}

export const romanticAudio = new RomanticAudioController();
