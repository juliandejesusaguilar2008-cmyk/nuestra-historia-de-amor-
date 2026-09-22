import React, { useEffect, useState, useRef } from 'react';
import { Heart, Sparkles, Calendar, Clock, Camera, Upload } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FinalSectionProps {
  herName: string;
  startDate: string;
  mainPhotoUrl: string;
  topText: string;
  middleText: string;
  bottomText: string;
  buttonConfettiText: string;
  onPhotoUpload?: (dataUrl: string) => void;
}

export const FinalSection: React.FC<FinalSectionProps> = ({
  herName,
  startDate,
  mainPhotoUrl,
  topText,
  middleText,
  bottomText,
  buttonConfettiText,
  onPhotoUpload,
}) => {
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  const sectionRef = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result && onPhotoUpload) {
        onPhotoUpload(result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Calcular días juntos
  useEffect(() => {
    const updateTime = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);

      setTimeTogether({ days, hours, minutes });
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [startDate]);

  // Lluvia de corazones automática al llegar al final
  const launchHeartShower = () => {
    // Ráfaga lateral izquierda
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.85, x: 0.3 },
      colors: ['#7a1c34', '#d9778a', '#f3c1cb', '#ffffff', '#ff4d6d'],
      shapes: ['circle'],
    });

    // Ráfaga lateral derecha
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.85, x: 0.7 },
      colors: ['#7a1c34', '#d9778a', '#f3c1cb', '#ffffff', '#ff4d6d'],
      shapes: ['circle'],
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            launchHeartShower();
          }
        });
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={sectionRef}
      id="cierre-final"
      aria-label="Cierre de nuestra historia"
      className="relative pt-16 pb-28 px-4 sm:px-6 max-w-5xl mx-auto text-center"
    >
      {/* Marco de fotografía grande destacada */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) processFile(file);
        }}
        accept="image/*"
        className="hidden"
        aria-label="Cambiar foto de cierre"
      />
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) processFile(file);
        }}
        className={`relative rounded-3xl overflow-hidden shadow-2xl border mb-12 group bg-[#521323] transition-all duration-300 ${
          isDragging ? 'border-[#7a1c34] ring-4 ring-[#f3c1cb] scale-[1.01]' : 'border-[#f3c1cb]'
        }`}
      >
        {/* Imagen principal */}
        <div className="aspect-[4/3] sm:aspect-[16/9] w-full">
          <img
            src={mainPhotoUrl}
            alt="Nosotros dos"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Capa de degradado oscuro romántico para máxima legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25 flex flex-col justify-between p-6 sm:p-12 text-white pointer-events-none">
          {/* Texto superior solicitado: "Gracias por estos 7 meses." y botón para cambiar foto */}
          <div className="pt-2 flex items-center justify-between w-full pointer-events-auto">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2 border border-white/30">
              <Heart className="w-3.5 h-3.5 fill-[#ff4d6d] text-[#ff4d6d]" />
              {topText}
            </span>

            {/* Botón flotante para cambiar foto */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white text-xs font-medium flex items-center gap-1.5 shadow-md backdrop-blur-xs transition-all opacity-80 hover:opacity-100 cursor-pointer border border-white/20 mb-2"
              title="Cambiar foto de cierre"
            >
              <Camera className="w-3.5 h-3.5 text-[#f3c1cb]" />
              <span>Cambiar foto</span>
            </button>
          </div>

          {/* Textos central y final solicitados */}
          <div className="space-y-3 pb-2">
            {/* Texto inferior solicitado: "Feliz cumpleaños a la persona..." */}
            <p className="font-serif-cormorant text-xl sm:text-3xl md:text-4xl font-bold leading-tight drop-shadow-md text-white/95 max-w-3xl mx-auto">
              "{middleText}"
            </p>

            {/* "Te amo, [NOMBRE DE ELLA] ❤️" */}
            <p className="font-script-romantic text-3xl sm:text-5xl md:text-6xl text-[#fce8ec] drop-shadow-lg font-bold tracking-wide pt-2">
              Te amo, {herName} ❤️
            </p>
          </div>
        </div>

        {isDragging && (
          <div className="absolute inset-0 bg-[#7a1c34]/85 text-white flex flex-col items-center justify-center p-4 z-30 pointer-events-none">
            <Upload className="w-12 h-12 mb-2 animate-bounce" />
            <p className="text-base font-semibold">Suelta aquí tu foto para este recuerdo</p>
          </div>
        )}
      </div>

      {/* Contador de tiempo juntos */}
      <div className="bg-white/90 rounded-2xl p-6 border border-[#f3c1cb] shadow-md max-w-md mx-auto mb-8">
        <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#7a1c34] mb-3">
          <Clock className="w-3.5 h-3.5 text-[#d9778a]" />
          <span>Tiempo construyendo nuestra historia</span>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-[#faf6f3] p-3 rounded-xl border border-[#fce8ec]">
            <span className="block text-2xl sm:text-3xl font-bold text-[#521323]">
              {timeTogether.days}
            </span>
            <span className="text-[11px] text-[#7a1c34]/70 font-medium uppercase">
              Días
            </span>
          </div>

          <div className="bg-[#faf6f3] p-3 rounded-xl border border-[#fce8ec]">
            <span className="block text-2xl sm:text-3xl font-bold text-[#521323]">
              {timeTogether.hours}
            </span>
            <span className="text-[11px] text-[#7a1c34]/70 font-medium uppercase">
              Horas
            </span>
          </div>

          <div className="bg-[#faf6f3] p-3 rounded-xl border border-[#fce8ec]">
            <span className="block text-2xl sm:text-3xl font-bold text-[#521323]">
              {timeTogether.minutes}
            </span>
            <span className="text-[11px] text-[#7a1c34]/70 font-medium uppercase">
              Minutos
            </span>
          </div>
        </div>

        <p className="text-xs text-[#7a1c34]/70 mt-3 flex items-center justify-center gap-1">
          <Heart className="w-3 h-3 fill-[#d9778a] text-[#d9778a]" />
          <span>Y cada segundo a tu lado vale la pena</span>
        </p>
      </div>

      {/* Botón de lluvia interactiva de corazones */}
      <button
        id="celebrate-btn"
        onClick={launchHeartShower}
        type="button"
        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#7a1c34] hover:bg-[#601427] text-white text-sm sm:text-base font-semibold shadow-md shadow-[#7a1c34]/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        <Sparkles className="w-4 h-4 text-[#fce8ec]" />
        <span>{buttonConfettiText}</span>
        <Heart className="w-4 h-4 fill-white text-white" />
      </button>

      <div className="mt-8 text-xs text-[#7a1c34]/50">
        Hecho con todo el amor del mundo para ti ✨
      </div>
    </footer>
  );
};
