import React, { useEffect, useState } from 'react';
import { Play, Pause, Music, Heart, Repeat, SkipForward, SkipBack, ListMusic, X } from 'lucide-react';
import { romanticAudio, AudioState } from '../utils/audio';
import { SongTrack } from '../types';

interface MusicPlayerProps {
  playlist?: SongTrack[];
  defaultSongTitle?: string;
  defaultArtist?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  playlist = [],
  defaultSongTitle = 'Te quiero tanto',
  defaultArtist = 'Kevin Kaarl',
}) => {
  const [audioState, setAudioState] = useState<AudioState>(() => romanticAudio.getState());
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((state) => {
      setAudioState(state);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    romanticAudio.togglePlay();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    romanticAudio.nextTrack();
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    romanticAudio.prevTrack();
  };

  const handleSelectTrack = (index: number) => {
    romanticAudio.playTrack(index);
    setShowPlaylist(false);
  };

  const currentTrack = audioState.currentTrack || (playlist[0] ?? null);
  const currentTitle = currentTrack?.title || defaultSongTitle;
  const currentArtist = currentTrack?.artist || defaultArtist;
  const tracks = audioState.playlist.length > 0 ? audioState.playlist : playlist;
  const totalTracks = tracks.length;
  const currentIndex = audioState.currentTrackIndex;

  return (
    <aside
      id="music-player-widget"
      aria-label="Reproductor de música de nuestra historia"
      className="fixed bottom-4 right-4 z-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mini Menú desplegable con la lista de canciones */}
      {showPlaylist && (
        <div className="absolute bottom-full right-0 mb-3 w-72 sm:w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#f3c1cb] p-4 text-[#521323] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#fce8ec]">
            <div className="flex items-center gap-1.5">
              <ListMusic className="w-4 h-4 text-[#7a1c34]" />
              <span className="font-serif-cormorant font-bold text-base text-[#7a1c34]">
                Nuestras Canciones
              </span>
            </div>
            <button
              onClick={() => setShowPlaylist(false)}
              className="w-6 h-6 rounded-full hover:bg-[#fce8ec] text-[#7a1c34] flex items-center justify-center transition-colors"
              aria-label="Cerrar lista"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {tracks.map((track, idx) => {
              const isThisTrack = idx === currentIndex && audioState.isPlaying;
              return (
                <button
                  key={track.id || idx}
                  onClick={() => handleSelectTrack(idx)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-all ${
                    idx === currentIndex
                      ? 'bg-[#fce8ec] text-[#7a1c34] font-semibold border border-[#f3c1cb]'
                      : 'hover:bg-[#faf6f3] text-[#3d2b2f]'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="w-4 text-[10px] text-[#7a1c34]/60 font-mono text-center">
                      {idx + 1}
                    </span>
                    <div className="truncate">
                      <p className="truncate leading-tight">{track.title}</p>
                      <p className="text-[10px] text-[#7a1c34]/70 font-normal">{track.artist}</p>
                    </div>
                  </div>
                  {isThisTrack && (
                    <Heart className="w-3 h-3 text-[#d9778a] fill-current animate-pulse shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#fce8ec] text-[10px] text-[#7a1c34]/80 flex items-center justify-center gap-1">
            <Repeat className="w-3 h-3 text-[#d9778a]" />
            <span>Se reproducen en orden y bucle continuo</span>
          </div>
        </div>
      )}

      {/* Barra principal flotante */}
      <div className="flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full shadow-xl border border-[#f3c1cb]/80 transition-all duration-300 hover:shadow-2xl hover:border-[#d9778a]">
        {/* Botón pista anterior (si hay más de 1) */}
        {totalTracks > 1 && (
          <button
            onClick={handlePrev}
            type="button"
            aria-label="Canción anterior"
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#7a1c34]/70 hover:text-[#7a1c34] hover:bg-[#fce8ec] transition-colors focus:outline-none"
            title="Canción anterior"
          >
            <SkipBack className="w-3.5 h-3.5 fill-current" />
          </button>
        )}

        {/* Botón principal Play / Pause */}
        <button
          id="toggle-music-btn"
          onClick={handleToggle}
          type="button"
          aria-label={audioState.isPlaying ? 'Pausar música' : 'Reproducir música'}
          className="flex items-center gap-2 text-xs md:text-sm font-medium text-[#7a1c34] focus:outline-none rounded-full"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
              audioState.isPlaying
                ? 'bg-[#7a1c34] text-white shadow-md shadow-[#7a1c34]/25 scale-105'
                : 'bg-[#fce8ec] text-[#7a1c34] hover:bg-[#f3c1cb]'
            }`}
          >
            {audioState.isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </div>

          <div className="flex flex-col text-left pr-1 max-w-[130px] sm:max-w-[170px]">
            <span className="flex items-center gap-1 font-semibold text-[#7a1c34] text-xs">
              {audioState.isPlaying ? 'Música activa' : 'Nuestra música'}
              {audioState.isPlaying && (
                <Heart className="w-2.5 h-2.5 text-[#d9778a] fill-current animate-pulse" />
              )}
            </span>
            <div className="flex items-center gap-1 text-[10px] text-[#7a1c34]/80 truncate">
              <span className="font-medium text-[#521323] truncate">{currentTitle}</span>
              <span className="shrink-0">•</span>
              <span className="text-[#7a1c34]/70 truncate">{currentArtist}</span>
            </div>
          </div>
        </button>

        {/* Botón pista siguiente (si hay más de 1) */}
        {totalTracks > 1 && (
          <button
            onClick={handleNext}
            type="button"
            aria-label="Siguiente canción"
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#7a1c34]/70 hover:text-[#7a1c34] hover:bg-[#fce8ec] transition-colors focus:outline-none"
            title="Siguiente canción"
          >
            <SkipForward className="w-3.5 h-3.5 fill-current" />
          </button>
        )}

        {/* Botón para ver lista de canciones */}
        {totalTracks > 1 && (
          <button
            onClick={() => setShowPlaylist(!showPlaylist)}
            type="button"
            aria-label="Ver lista de canciones"
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors focus:outline-none ${
              showPlaylist
                ? 'bg-[#7a1c34] text-white'
                : 'text-[#7a1c34]/70 hover:text-[#7a1c34] hover:bg-[#fce8ec]'
            }`}
            title="Ver las 4 canciones"
          >
            <ListMusic className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Indicador de ondas sonoras cuando está en reproducción */}
        {audioState.isPlaying && (
          <div className="hidden sm:flex items-center gap-0.5 pl-0.5" aria-hidden="true">
            <span className="w-0.5 bg-[#d9778a] h-2.5 rounded-full animate-pulse" />
            <span className="w-0.5 bg-[#7a1c34] h-4 rounded-full animate-pulse [animation-delay:150ms]" />
            <span className="w-0.5 bg-[#d9778a] h-3 rounded-full animate-pulse [animation-delay:300ms]" />
          </div>
        )}
      </div>

      {/* Tooltip explicativo al pasar el cursor si no está sonando */}
      {isHovered && !audioState.isPlaying && !showPlaylist && (
        <div className="absolute bottom-full right-0 mb-2 w-60 p-2.5 bg-[#7a1c34] text-white text-[11px] rounded-xl shadow-xl pointer-events-none text-center leading-tight">
          Toca para escuchar las 4 canciones en bucle continuo mientras lees nuestra historia ❤️
        </div>
      )}
    </aside>
  );
};
