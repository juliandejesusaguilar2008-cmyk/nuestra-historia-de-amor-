import React, { useRef, useState } from 'react';
import { Heart, Camera, Image as ImageIcon, Upload } from 'lucide-react';

interface InitialScreenProps {
  photoUrl?: string;
  photoCaption?: string;
  actionButtonText?: string;
  onOpenStory: () => void;
  onPhotoUpload?: (dataUrl: string) => void;
}

export const InitialScreen: React.FC<InitialScreenProps> = ({
  photoUrl,
  photoCaption,
  actionButtonText = 'Abre para ver nuestra historia ❤️',
  onOpenStory,
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
      id="initial-screen"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 py-8 text-center overflow-hidden bg-gradient-to-b from-[#faf6f3] via-[#fdf0f2] to-[#faf6f3]"
    >
      {/* Input oculto para seleccionar archivo de foto directamente */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-label="Cargar foto original"
      />

      {/* Círculos de luz ambiental difuminada */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-[#f7d6dc]/60 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-md w-full mx-auto flex flex-col items-center">
        {/* ======================================================== */}
        {/* 📷 FOTO DE PORTADA CON CARGA DIRECTA Y ARRASTRAR        */}
        {/* ======================================================== */}
        <div className="w-full max-w-xs sm:max-w-sm mb-6 relative">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative mx-auto rounded-3xl p-3 sm:p-4 bg-white shadow-xl shadow-[#7a1c34]/15 border transition-all duration-300 ${
              isDragging
                ? 'border-[#7a1c34] ring-4 ring-[#f3c1cb] scale-[1.02]'
                : 'border-[#f3c1cb] hover:border-[#d9778a]'
            }`}
          >
            {/* Adorno delicado de corazón en la esquina */}
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#7a1c34] text-white flex items-center justify-center shadow-md shadow-[#7a1c34]/30 border-2 border-white z-10">
              <Heart className="w-4 h-4 fill-white animate-pulse" />
            </div>

            <div className="group relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#faf6f3] border border-[#fce8ec]">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Nuestra foto especial"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[#7a1c34]/60 p-6 text-center">
                  <ImageIcon className="w-12 h-12 mb-2 text-[#d9778a]" />
                  <span className="text-xs font-medium">Espacio para nuestra foto favorita</span>
                </div>
              )}

              {/* Botón flotante para seleccionar/cambiar la foto original */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2.5 right-2.5 z-20 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white text-xs font-medium flex items-center gap-1.5 shadow-md backdrop-blur-xs transition-all opacity-80 hover:opacity-100"
                title="Selecciona la foto original desde tu dispositivo"
              >
                <Camera className="w-3.5 h-3.5 text-[#f3c1cb]" />
                <span>Cambiar foto</span>
              </button>

              {isDragging && (
                <div className="absolute inset-0 bg-[#7a1c34]/80 text-white flex flex-col items-center justify-center p-4 z-30">
                  <Upload className="w-10 h-10 mb-2 animate-bounce" />
                  <p className="text-sm font-semibold">Suelta aquí tu foto original</p>
                </div>
              )}
            </div>

            {/* Pie de foto opcional si se desea */}
            {photoCaption && (
              <p className="mt-2.5 text-xs text-[#7a1c34]/85 font-serif-cormorant italic tracking-wide">
                {photoCaption}
              </p>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* BOTÓN: "Abre para ver nuestra historia ❤️"                */}
        {/* ======================================================== */}
        <button
          id="open-story-btn"
          onClick={onOpenStory}
          type="button"
          className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-[#7a1c34] hover:bg-[#601427] text-white text-base sm:text-lg font-semibold shadow-lg shadow-[#7a1c34]/25 hover:shadow-xl hover:shadow-[#7a1c34]/35 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <span>{actionButtonText}</span>
          <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform duration-300" />
        </button>
      </div>
    </section>
  );
};
