import React, { useRef, useState } from 'react';
import { Cake, Sparkles, Heart, Gift, Star, Camera, Upload } from 'lucide-react';

interface BirthdaySectionProps {
  title: string;
  subtitle: string;
  photoUrl: string;
  photoCaption: string;
  letterMessage: string[];
  wishes: string[];
  onPhotoUpload?: (dataUrl: string) => void;
}

export const BirthdaySection: React.FC<BirthdaySectionProps> = ({
  title,
  subtitle,
  photoUrl,
  photoCaption,
  letterMessage,
  wishes,
  onPhotoUpload,
}) => {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };
  return (
    <section
      id="cumpleanos"
      aria-label="Feliz Cumpleaños"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto"
    >
      {/* Encabezado de la sección */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce8ec] text-[#7a1c34] text-xs font-semibold mb-3">
          <Cake className="w-3.5 h-3.5 text-[#d9778a]" />
          <span>UN DÍA INOLVIDABLE</span>
        </div>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#521323] mb-3">
          {title}
        </h2>
        <p className="text-base sm:text-lg text-[#7a1c34]/80 font-normal leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Tarjeta principal con Fotografía y Mensaje de Cumpleaños */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white/90 rounded-3xl p-6 sm:p-10 border border-[#f3c1cb]/60 shadow-xl shadow-[#7a1c34]/5">
        {/* Columna de Fotografía (Polaroid elegante) */}
        <div className="md:col-span-5 flex flex-col items-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            aria-label="Cambiar foto de cumpleaños"
          />
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`polaroid-card rounded-2xl w-full max-w-sm border transition-all duration-300 ${
              isDragging
                ? 'border-[#7a1c34] ring-4 ring-[#f3c1cb] scale-[1.02]'
                : 'border-[#f5d9df] hover:border-[#d9778a]'
            }`}
          >
            <div className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-[#fce8ec]">
              <img
                src={photoUrl}
                alt="Foto de cumpleaños"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs p-1.5 rounded-full text-[#7a1c34] shadow-xs z-10">
                <Sparkles className="w-4 h-4 text-[#d9778a]" />
              </div>

              {/* Botón flotante para cambiar foto */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2.5 right-2.5 z-20 px-3 py-1.5 rounded-full bg-black/65 hover:bg-black/85 text-white text-xs font-medium flex items-center gap-1.5 shadow-md backdrop-blur-xs transition-all opacity-85 hover:opacity-100 cursor-pointer"
                title="Selecciona una foto desde tu dispositivo"
              >
                <Camera className="w-3.5 h-3.5 text-[#f3c1cb]" />
                <span>Cambiar foto</span>
              </button>

              {isDragging && (
                <div className="absolute inset-0 bg-[#7a1c34]/80 text-white flex flex-col items-center justify-center p-4 z-30">
                  <Upload className="w-10 h-10 mb-2 animate-bounce" />
                  <p className="text-sm font-semibold">Suelta aquí tu foto</p>
                </div>
              )}
            </div>
            {photoCaption && (
              <p className="font-script-romantic text-center text-xl text-[#7a1c34] mt-3 font-semibold">
                {photoCaption}
              </p>
            )}
          </div>
        </div>

        {/* Columna del Mensaje Personal (Carta de Cumpleaños) */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-4">
          <div className="flex items-center gap-2 text-[#d9778a]">
            <Gift className="w-5 h-5 text-[#7a1c34]" />
            <span className="text-xs uppercase tracking-wider font-semibold text-[#7a1c34]">
              Mi mensaje para ti en tu día
            </span>
          </div>

          <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#521323]">
            Que la vida te devuelva toda la alegría que me das
          </h3>

          {/* Párrafos del mensaje personal */}
          <div className="space-y-3.5 text-base sm:text-lg text-[#4a3439] leading-relaxed">
            {letterMessage.map((paragraph, index) => (
              <p key={index} className="text-justify sm:text-left">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Deseos para su nuevo año */}
          {wishes && wishes.length > 0 && (
            <div className="pt-4 border-t border-[#fce8ec]">
              <p className="text-xs font-semibold text-[#7a1c34] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-[#d9778a] fill-[#d9778a]" />
                Mis deseos para tu nuevo año:
              </p>
              <ul className="space-y-2">
                {wishes.map((wish, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm sm:text-base text-[#5c4046]"
                  >
                    <Heart className="w-4 h-4 text-[#d9778a] fill-[#fce8ec] shrink-0 mt-1" />
                    <span>{wish}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
