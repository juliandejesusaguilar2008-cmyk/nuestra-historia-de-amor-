import React, { useRef, useState } from 'react';
import { Heart, Calendar, Clock, MapPin, Camera, Upload } from 'lucide-react';
import { TimelineEvent } from '../types';

interface TimelineSectionProps {
  title: string;
  subtitle: string;
  events: TimelineEvent[];
  onSelectPhoto?: (photo: { url: string; caption: string }) => void;
  onPhotoUpload?: (eventId: string, dataUrl: string) => void;
}

const TimelinePhotoItem: React.FC<{
  event: TimelineEvent;
  onSelectPhoto?: (photo: { url: string; caption: string }) => void;
  onPhotoUpload?: (eventId: string, dataUrl: string) => void;
}> = ({ event, onSelectPhoto, onPhotoUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result && onPhotoUpload) {
        onPhotoUpload(event.id, result);
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
      onClick={() =>
        onSelectPhoto?.({
          url: event.photoUrl,
          caption: `${event.title} — ${event.date}`,
        })
      }
      className={`relative rounded-xl overflow-hidden aspect-[16/10] bg-[#fce8ec] cursor-pointer group/photo border transition-all duration-300 ${
        isDragging ? 'border-[#7a1c34] ring-2 ring-[#f3c1cb]' : 'border-[#fce8ec]'
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
        aria-label={`Cambiar foto de ${event.title}`}
      />
      <img
        src={event.photoUrl}
        alt={event.title}
        loading="lazy"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-105"
      />

      {/* Botón flotante para cambiar foto */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          fileInputRef.current?.click();
        }}
        className="absolute top-2.5 right-2.5 z-20 px-2.5 py-1 rounded-full bg-black/65 hover:bg-black/85 text-white text-[11px] font-medium flex items-center gap-1 shadow-md backdrop-blur-xs transition-all opacity-85 hover:opacity-100 cursor-pointer"
        title="Cambiar foto de este recuerdo"
      >
        <Camera className="w-3 h-3 text-[#f3c1cb]" />
        <span>Cambiar foto</span>
      </button>

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-end p-3 pointer-events-none">
        <span className="text-white text-xs font-medium flex items-center gap-1">
          <Heart className="w-3 h-3 fill-white" />
          Ver foto en grande
        </span>
      </div>

      {isDragging && (
        <div className="absolute inset-0 bg-[#7a1c34]/85 text-white flex flex-col items-center justify-center p-2 z-30">
          <Upload className="w-6 h-6 mb-1 animate-bounce" />
          <p className="text-xs font-semibold">Suelta aquí tu foto</p>
        </div>
      )}
    </div>
  );
};

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  title,
  subtitle,
  events,
  onSelectPhoto,
  onPhotoUpload,
}) => {
  return (
    <section
      id="nuestra-historia"
      aria-label="Línea del tiempo de nuestra relación"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto"
    >
      {/* Encabezado */}
      <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce8ec] text-[#7a1c34] text-xs font-semibold mb-3">
          <Clock className="w-3.5 h-3.5 text-[#d9778a]" />
          <span>NUESTRO VIAJE JUNTOS</span>
        </div>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#521323] mb-3">
          {title}
        </h2>
        <p className="text-base sm:text-lg text-[#7a1c34]/80 font-normal leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Contenedor de la línea del tiempo */}
      <div className="relative">
        {/* Línea central (en móvil a la izquierda, en desktop al centro) */}
        <div
          className="absolute top-2 bottom-2 left-6 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#f3c1cb] via-[#d9778a] to-[#7a1c34]"
          aria-hidden="true"
        />

        <div className="space-y-12 sm:space-y-16">
          {events.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={event.id}
                className="relative flex flex-col md:flex-row items-start md:items-center group"
              >
                {/* Nodo / Corazón en la línea central */}
                <div
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-[#d9778a] shadow-md flex items-center justify-center text-[#7a1c34] z-10 group-hover:scale-110 group-hover:border-[#7a1c34] transition-all duration-300"
                  aria-hidden="true"
                >
                  <Heart className="w-4 h-4 fill-[#fce8ec] text-[#d9778a] group-hover:fill-[#d9778a] group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Tarjeta de contenido */}
                <div
                  className={`pl-14 md:pl-0 w-full md:w-1/2 ${
                    isEven
                      ? 'md:pr-12 md:text-right md:self-start'
                      : 'md:pl-12 md:ml-auto md:self-start'
                  }`}
                >
                  <article className="bg-white/95 rounded-2xl p-5 sm:p-6 border border-[#f3c1cb]/70 shadow-md shadow-[#7a1c34]/5 hover:shadow-xl hover:border-[#d9778a] transition-all duration-300 text-left">
                    {/* Badge de fecha y etiqueta */}
                    <div
                      className={`flex items-center gap-2 mb-3 flex-wrap ${
                        isEven ? 'md:justify-start' : 'md:justify-start'
                      }`}
                    >
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fce8ec] text-[#7a1c34] text-xs font-semibold">
                        <Calendar className="w-3 h-3 text-[#d9778a]" />
                        {event.date}
                      </span>
                      {event.tag && (
                        <span className="inline-flex items-center gap-1 text-xs text-[#7a1c34]/70 font-medium">
                          <MapPin className="w-3 h-3 text-[#d9778a]" />
                          {event.tag}
                        </span>
                      )}
                    </div>

                    {/* Título */}
                    <h3 className="font-serif-cormorant text-xl sm:text-2xl font-bold text-[#521323] mb-2">
                      {event.title}
                    </h3>

                    {/* Descripción */}
                    <p className="text-sm sm:text-base text-[#4a3439] leading-relaxed mb-4">
                      {event.description}
                    </p>

                    {/* Fotografía del momento con opción para ver y cambiar foto */}
                    {event.photoUrl && (
                      <TimelinePhotoItem
                        event={event}
                        onSelectPhoto={onSelectPhoto}
                        onPhotoUpload={onPhotoUpload}
                      />
                    )}
                  </article>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
