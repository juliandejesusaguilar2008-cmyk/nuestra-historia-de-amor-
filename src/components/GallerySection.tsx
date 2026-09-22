import React, { useRef, useState } from 'react';
import { Camera, Heart, X, ZoomIn, Calendar, Upload } from 'lucide-react';
import { PhotoMemory } from '../types';

interface GallerySectionProps {
  title: string;
  subtitle: string;
  photos: PhotoMemory[];
  onPhotoUpload?: (photoId: string, dataUrl: string) => void;
}

const GalleryCardItem: React.FC<{
  photo: PhotoMemory;
  rotationClass: string;
  onSelect: () => void;
  onPhotoUpload?: (photoId: string, dataUrl: string) => void;
}> = ({ photo, rotationClass, onSelect, onPhotoUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result && onPhotoUpload) {
        onPhotoUpload(photo.id, result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
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
      onClick={onSelect}
      className={`polaroid-card rounded-2xl cursor-pointer group transition-all duration-300 ${rotationClass} hover:rotate-0 hover:z-20 border ${
        isDragging ? 'border-[#7a1c34] ring-2 ring-[#f3c1cb]' : 'border-[#f5d9df]'
      }`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) processFile(file);
        }}
        accept="image/*"
        className="hidden"
        aria-label={`Cambiar foto de ${photo.caption}`}
      />

      {/* Imagen con contenedor */}
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#fce8ec]">
        <img
          src={photo.url}
          alt={photo.caption}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#7a1c34] shadow-md transform scale-75 group-hover:scale-100 transition-transform">
            <ZoomIn className="w-5 h-5" />
          </div>
        </div>

        {/* Botón flotante para cambiar foto */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="absolute top-2.5 right-2.5 z-20 px-2.5 py-1 rounded-full bg-black/65 hover:bg-black/85 text-white text-[11px] font-medium flex items-center gap-1 shadow-md backdrop-blur-xs transition-all opacity-85 hover:opacity-100 cursor-pointer"
          title="Cambiar esta foto"
        >
          <Camera className="w-3 h-3 text-[#f3c1cb]" />
          <span>Cambiar foto</span>
        </button>

        {isDragging && (
          <div className="absolute inset-0 bg-[#7a1c34]/85 text-white flex flex-col items-center justify-center p-2 z-30">
            <Upload className="w-8 h-8 mb-1 animate-bounce" />
            <p className="text-xs font-semibold">Suelta aquí tu foto</p>
          </div>
        )}
      </div>

      {/* Frase poética / recuerdo debajo de la foto */}
      <div className="pt-3.5 pb-1 px-1">
        <p className="font-script-romantic text-xl text-[#7a1c34] text-center font-semibold leading-tight mb-1">
          "{photo.caption}"
        </p>
        {photo.date && (
          <p className="text-[11px] text-center text-[#7a1c34]/60 flex items-center justify-center gap-1">
            <Calendar className="w-3 h-3 text-[#d9778a]" />
            {photo.date}
          </p>
        )}
      </div>
    </div>
  );
};

export const GallerySection: React.FC<GallerySectionProps> = ({
  title,
  subtitle,
  photos,
  onPhotoUpload,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMemory | null>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  return (
    <section
      id="nuestras-fotos"
      aria-label="Galería de recuerdos"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      {/* Encabezado */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce8ec] text-[#7a1c34] text-xs font-semibold mb-3">
          <Camera className="w-3.5 h-3.5 text-[#d9778a]" />
          <span>ÁLBUM DE RECUERDOS</span>
        </div>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#521323] mb-3">
          {title}
        </h2>
        <p className="text-base sm:text-lg text-[#7a1c34]/80 font-normal leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Cuadrícula tipo álbum de fotos / polaroids */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {photos.map((photo, index) => {
          // Ligera rotación alternada para estilo scrapbook
          const rotations = ['rotate-1', '-rotate-1', 'rotate-0', '-rotate-2', 'rotate-2'];
          const rotationClass = rotations[index % rotations.length];

          return (
            <GalleryCardItem
              key={photo.id}
              photo={photo}
              rotationClass={rotationClass}
              onSelect={() => setSelectedPhoto(photo)}
              onPhotoUpload={onPhotoUpload}
            />
          );
        })}
      </div>

      {/* Modal / Lightbox al hacer clic en una foto */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Detalle de fotografía"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 border border-[#f3c1cb] animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input oculto para cambiar foto desde el modal */}
            <input
              type="file"
              ref={modalFileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && selectedPhoto) {
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    const result = ev.target?.result as string;
                    if (result && onPhotoUpload) {
                      onPhotoUpload(selectedPhoto.id, result);
                      setSelectedPhoto({ ...selectedPhoto, url: result });
                    }
                  };
                  reader.readAsDataURL(file);
                }
              }}
              accept="image/*"
              className="hidden"
            />

            {/* Botón cerrar */}
            <button
              onClick={() => setSelectedPhoto(null)}
              type="button"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 text-[#7a1c34] hover:bg-[#fce8ec] flex items-center justify-center shadow-md transition-colors"
              aria-label="Cerrar vista previa"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Imagen grande */}
            <div className="relative rounded-xl overflow-hidden max-h-[65vh] bg-[#fce8ec] flex items-center justify-center group">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full max-h-[65vh] object-contain"
              />

              {/* Botón cambiar foto en el modal */}
              <button
                type="button"
                onClick={() => modalFileInputRef.current?.click()}
                className="absolute bottom-3 right-3 z-10 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 text-white text-xs font-medium flex items-center gap-1.5 shadow-md backdrop-blur-xs transition-all opacity-85 hover:opacity-100 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-[#f3c1cb]" />
                <span>Cambiar esta foto</span>
              </button>
            </div>

            {/* Detalle y frase */}
            <div className="pt-4 text-center">
              <div className="inline-flex items-center justify-center gap-1.5 mb-2 text-[#d9778a]">
                <Heart className="w-4 h-4 fill-[#d9778a]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#7a1c34]">
                  {selectedPhoto.date || 'Recuerdo especial'}
                </span>
              </div>
              <p className="font-serif-cormorant text-xl sm:text-2xl font-bold text-[#521323] italic">
                "{selectedPhoto.caption}"
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
