import React, { useState, useEffect } from 'react';
import { DEFAULT_CONFIG } from './config';
import { LoveAppConfig } from './types';
import { FloatingHearts } from './components/FloatingHearts';
import { MusicPlayer } from './components/MusicPlayer';
import { InitialScreen } from './components/InitialScreen';
import { HeroSection } from './components/HeroSection';
import { BirthdaySection } from './components/BirthdaySection';
import { TimelineSection } from './components/TimelineSection';
import { GallerySection } from './components/GallerySection';
import { ReasonsSection } from './components/ReasonsSection';
import { LetterSection } from './components/LetterSection';
import { FutureSection } from './components/FutureSection';
import { FinalSection } from './components/FinalSection';
import { CustomizerModal } from './components/CustomizerModal';
import { Settings, Heart, X, Sparkles } from 'lucide-react';
import { romanticAudio } from './utils/audio';

export default function App() {
  const [config, setConfig] = useState<LoveAppConfig>(() => {
    try {
      const saved = localStorage.getItem('love_app_custom_config_v6') || localStorage.getItem('love_app_custom_config_v5');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_CONFIG,
          ...parsed,
          hero: {
            ...DEFAULT_CONFIG.hero,
            ...(parsed.hero || {}),
            photoUrl: (parsed.hero?.photoUrl && !parsed.hero.photoUrl.includes('unsplash'))
              ? parsed.hero.photoUrl
              : DEFAULT_CONFIG.hero.photoUrl,
            photoCaption: parsed.hero?.photoCaption !== undefined
              ? parsed.hero.photoCaption
              : DEFAULT_CONFIG.hero.photoCaption,
          },
          gallery: {
            ...DEFAULT_CONFIG.gallery,
            ...(parsed.gallery || {}),
          },
          reasons: {
            ...DEFAULT_CONFIG.reasons,
            ...(parsed.reasons || {}),
          },
          letter: {
            ...DEFAULT_CONFIG.letter,
            ...(parsed.letter || {}),
          },
          future: {
            ...DEFAULT_CONFIG.future,
            ...(parsed.future || {}),
          },
          timeline: {
            ...DEFAULT_CONFIG.timeline,
            ...(parsed.timeline || {}),
          },
          birthday: {
            ...DEFAULT_CONFIG.birthday,
            ...(parsed.birthday || {}),
          },
          music: {
            ...DEFAULT_CONFIG.music,
            ...(parsed.music || {}),
            playlist: DEFAULT_CONFIG.music.playlist,
          },
        };
      }
    } catch {
      // Ignorar error y usar valores por defecto
    }
    return DEFAULT_CONFIG;
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isStoryOpened, setIsStoryOpened] = useState(false);
  const [selectedPreviewPhoto, setSelectedPreviewPhoto] = useState<{
    url: string;
    caption: string;
  } | null>(null);
  const [hideSettingsButton, setHideSettingsButton] = useState(false);

  // Inicializar y sincronizar playlist en el controlador de audio
  useEffect(() => {
    if (config.music.playlist && config.music.playlist.length > 0) {
      romanticAudio.setPlaylist(config.music.playlist);
    }
  }, [config.music.playlist]);

  // Guardar configuración completa en localStorage
  const saveCustomConfig = (updated: LoveAppConfig) => {
    try {
      localStorage.setItem('love_app_custom_config_v6', JSON.stringify(updated));
    } catch {
      // Manejo de cuota
    }
  };

  // 1. Cambiar foto de portada (InitialScreen)
  const handlePhotoUpload = (dataUrl: string) => {
    setConfig((prev) => {
      const updated = {
        ...prev,
        hero: {
          ...prev.hero,
          photoUrl: dataUrl,
        },
      };
      saveCustomConfig(updated);
      return updated;
    });
  };

  // 2. Cambiar foto de cumpleaños
  const handleBirthdayPhotoUpload = (dataUrl: string) => {
    setConfig((prev) => {
      const updated = {
        ...prev,
        birthday: {
          ...prev.birthday,
          photoUrl: dataUrl,
        },
      };
      saveCustomConfig(updated);
      return updated;
    });
  };

  // 3. Cambiar foto de la línea del tiempo (evento individual)
  const handleTimelinePhotoUpload = (eventId: string, dataUrl: string) => {
    setConfig((prev) => {
      const updated = {
        ...prev,
        timeline: {
          ...prev.timeline,
          events: prev.timeline.events.map((ev) =>
            ev.id === eventId ? { ...ev, photoUrl: dataUrl } : ev
          ),
        },
      };
      saveCustomConfig(updated);
      return updated;
    });
  };

  // 4. Cambiar foto de la galería de recuerdos
  const handleGalleryPhotoUpload = (photoId: string, dataUrl: string) => {
    setConfig((prev) => {
      const updated = {
        ...prev,
        gallery: {
          ...prev.gallery,
          photos: prev.gallery.photos.map((ph) =>
            ph.id === photoId ? { ...ph, url: dataUrl } : ph
          ),
        },
      };
      saveCustomConfig(updated);
      return updated;
    });
  };

  // 5. Cambiar foto del cierre final
  const handleClosingPhotoUpload = (dataUrl: string) => {
    setConfig((prev) => {
      const updated = {
        ...prev,
        closing: {
          ...prev.closing,
          mainPhotoUrl: dataUrl,
        },
      };
      saveCustomConfig(updated);
      return updated;
    });
  };

  // Al presionar el botón de la pantalla inicial:
  // 1. Empiezan a reproducirse las canciones automáticamente
  // 2. Se revela y despliega todo el resto de la historia conservada como antes
  const handleOpenStory = () => {
    if (!romanticAudio.isPlaying()) {
      romanticAudio.play(config.music.audioUrl).catch(() => {});
    }
    setIsStoryOpened(true);
    setTimeout(() => {
      const target = document.getElementById('celebracion-principal');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  return (
    <div className="relative min-h-screen bg-[#faf6f3] text-[#3d2b2f] overflow-x-hidden font-sans selection:bg-[#f3c1cb] selection:text-[#521323]">
      {/* Fondo con corazones y partículas flotantes discretas */}
      <FloatingHearts />

      {/* Botón flotante para el personalizador en vivo (discreto en esquina superior) */}
      {!hideSettingsButton && (
        <aside
          id="customizer-toggle"
          aria-label="Controles de personalización"
          className="fixed top-4 left-4 z-40 flex items-center gap-1.5"
        >
          <button
            onClick={() => setIsCustomizerOpen(true)}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 hover:bg-white text-[#7a1c34] text-xs font-semibold rounded-full shadow-md border border-[#f3c1cb] backdrop-blur-sm transition-all hover:shadow-lg"
            title="Editar textos, fotos y fechas fácilmente"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Personalizar detalles</span>
            <span className="sm:hidden">Editar</span>
          </button>
          <button
            onClick={() => setHideSettingsButton(true)}
            type="button"
            className="w-6 h-6 rounded-full bg-white/70 hover:bg-white text-gray-400 hover:text-[#7a1c34] flex items-center justify-center text-[10px] shadow-xs border border-[#f3c1cb]/60"
            title="Ocultar este botón para mostrárselo a ella"
          >
            <X className="w-3 h-3" />
          </button>
        </aside>
      )}

      {/* Reproductor de música romántico con playlist continua y en bucle */}
      <MusicPlayer
        playlist={config.music.playlist}
        defaultSongTitle={config.music.title}
        defaultArtist={config.music.artist}
      />

      {/* ========================================================================= */}
      {/* PANTALLA INICIAL: Únicamente el espacio para la foto y el botón abajo     */}
      {/* ========================================================================= */}
      <InitialScreen
        photoUrl={config.hero.photoUrl}
        photoCaption={config.hero.photoCaption}
        actionButtonText={config.hero.actionButtonText}
        onOpenStory={handleOpenStory}
        onPhotoUpload={handlePhotoUpload}
      />

      {/* ========================================================================= */}
      {/* TODO LO DEMÁS: Conservado exactamente como antes y desplegado al abrir   */}
      {/* ========================================================================= */}
      <main
        id="celebracion-principal"
        className={isStoryOpened ? "opacity-100 transition-opacity duration-1000" : "hidden"}
      >
        {/* Pantalla de inicio y celebración con la dedicatoria */}
        <HeroSection
          herName={config.herName}
          badge={config.hero.badge}
          headline={config.hero.headline}
          subheadline={config.hero.subheadline}
          quote={config.hero.quote}
          anniversaryMonths={config.anniversaryMonths}
        />

      {/* Separador romántico delicado */}
      <div className="flex items-center justify-center gap-3 my-4 opacity-50" aria-hidden="true">
        <span className="h-px w-12 bg-[#d9778a]" />
        <Heart className="w-4 h-4 fill-[#d9778a] text-[#d9778a]" />
        <span className="h-px w-12 bg-[#d9778a]" />
      </div>

      {/* Sección 1: Feliz Cumpleaños */}
      <BirthdaySection
        title={config.birthday.title}
        subtitle={config.birthday.subtitle}
        photoUrl={config.birthday.photoUrl}
        photoCaption={config.birthday.photoCaption}
        letterMessage={config.birthday.letterMessage}
        wishes={config.birthday.wishes}
        onPhotoUpload={handleBirthdayPhotoUpload}
      />

      {/* Separador */}
      <div className="flex items-center justify-center gap-3 my-8 opacity-50" aria-hidden="true">
        <span className="h-px w-16 bg-[#d9778a]" />
        <Sparkles className="w-4 h-4 text-[#d9778a]" />
        <span className="h-px w-16 bg-[#d9778a]" />
      </div>

      {/* Sección 2: Nuestros 7 meses (Línea del tiempo) */}
      <TimelineSection
        title={config.timeline.title}
        subtitle={config.timeline.subtitle}
        events={config.timeline.events}
        onSelectPhoto={(photo) => setSelectedPreviewPhoto(photo)}
        onPhotoUpload={handleTimelinePhotoUpload}
      />

      {/* Separador */}
      <div className="flex items-center justify-center gap-3 my-8 opacity-50" aria-hidden="true">
        <span className="h-px w-16 bg-[#d9778a]" />
        <Heart className="w-4 h-4 fill-[#d9778a] text-[#d9778a]" />
        <span className="h-px w-16 bg-[#d9778a]" />
      </div>

      {/* Sección 3: Nuestras fotos (Álbum de recuerdos) */}
      <GallerySection
        title={config.gallery.title}
        subtitle={config.gallery.subtitle}
        photos={config.gallery.photos}
        onPhotoUpload={handleGalleryPhotoUpload}
      />

      {/* Separador */}
      <div className="flex items-center justify-center gap-3 my-8 opacity-50" aria-hidden="true">
        <span className="h-px w-16 bg-[#d9778a]" />
        <Sparkles className="w-4 h-4 text-[#d9778a]" />
        <span className="h-px w-16 bg-[#d9778a]" />
      </div>

      {/* Sección 4: Cosas que amo de ti */}
      <ReasonsSection
        title={config.reasons.title}
        subtitle={config.reasons.subtitle}
        list={config.reasons.list}
      />

      {/* Separador */}
      <div className="flex items-center justify-center gap-3 my-8 opacity-50" aria-hidden="true">
        <span className="h-px w-16 bg-[#d9778a]" />
        <Heart className="w-4 h-4 fill-[#d9778a] text-[#d9778a]" />
        <span className="h-px w-16 bg-[#d9778a]" />
      </div>

      {/* Sección 5: Una carta para ti */}
      <LetterSection
        title={config.letter.title}
        subtitle={config.letter.subtitle}
        salutation={config.letter.salutation}
        paragraphs={config.letter.paragraphs}
        farewell={config.letter.farewell}
        closingPhrase={config.letter.closingPhrase}
        signature={config.letter.signature}
        author={config.letter.author}
      />

      {/* Separador */}
      <div className="flex items-center justify-center gap-3 my-8 opacity-50" aria-hidden="true">
        <span className="h-px w-16 bg-[#d9778a]" />
        <Sparkles className="w-4 h-4 text-[#d9778a]" />
        <span className="h-px w-16 bg-[#d9778a]" />
      </div>

      {/* Sección 6: Nuestro futuro */}
      <FutureSection
        title={config.future.title}
        subtitle={config.future.subtitle}
        promises={config.future.promises}
        finalQuote={config.future.finalQuote}
      />

        {/* Cierre final de la página */}
        <FinalSection
          herName={config.herName}
          startDate={config.relationshipStartDate}
          mainPhotoUrl={config.closing.mainPhotoUrl}
          topText={config.closing.topText}
          middleText={config.closing.middleText}
          bottomText={config.closing.bottomText}
          buttonConfettiText={config.closing.buttonConfettiText}
          onPhotoUpload={handleClosingPhotoUpload}
        />
      </main>

      {/* Modal de previsualización de fotos de timeline si se pulsa */}
      {selectedPreviewPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={() => setSelectedPreviewPhoto(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 border border-[#f3c1cb]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPreviewPhoto(null)}
              type="button"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 text-[#7a1c34] hover:bg-[#fce8ec] flex items-center justify-center shadow-md transition-colors"
              aria-label="Cerrar vista previa"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="rounded-xl overflow-hidden max-h-[70vh] bg-[#fce8ec] flex items-center justify-center">
              <img
                src={selectedPreviewPhoto.url}
                alt={selectedPreviewPhoto.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full max-h-[70vh] object-contain"
              />
            </div>
            <div className="pt-4 text-center">
              <p className="font-serif-cormorant text-xl sm:text-2xl font-bold text-[#521323]">
                {selectedPreviewPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal de personalización en vivo */}
      <CustomizerModal
        config={config}
        onUpdateConfig={(newConfig) => setConfig(newConfig)}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
      />
    </div>
  );
}
