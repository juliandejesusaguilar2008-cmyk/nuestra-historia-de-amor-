import React from 'react';
import { Mail, Heart, Feather } from 'lucide-react';

interface LetterSectionProps {
  title: string;
  subtitle?: string;
  salutation: string;
  paragraphs: string[];
  farewell: string;
  closingPhrase: string;
  signature: string;
  author?: string;
}

export const LetterSection: React.FC<LetterSectionProps> = ({
  title,
  subtitle,
  salutation,
  paragraphs,
  farewell,
  closingPhrase,
  signature,
  author,
}) => {
  return (
    <section
      id="carta-de-amor"
      aria-label="Una carta para ti"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto"
    >
      {/* Encabezado */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce8ec] text-[#7a1c34] text-xs font-semibold mb-3">
          <Mail className="w-3.5 h-3.5 text-[#d9778a]" />
          <span>DE MI CORAZÓN AL TUYO</span>
        </div>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#521323] mb-3">
          {title}
        </h2>
        <p className="text-base sm:text-lg text-[#7a1c34]/80 font-normal leading-relaxed">
          {subtitle || "jamás lograrías terminar de leer"}
        </p>
      </div>

      {/* Contenedor de la carta artesanal */}
      <div className="letter-paper rounded-3xl p-6 sm:p-12 md:p-14 relative overflow-hidden">
        {/* Sello de cera decorativo superior */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[#7a1c34] text-white flex items-center justify-center shadow-lg shadow-[#7a1c34]/30 border-2 border-[#d9778a]">
            <Heart className="w-6 h-6 fill-current text-[#fce8ec]" />
          </div>
        </div>

        {/* Saludo caligráfico */}
        <div className="mb-6">
          <p className="font-script-romantic text-3xl sm:text-4xl text-[#7a1c34] font-bold">
            {salutation}
          </p>
        </div>

        {/* Párrafos de la carta */}
        <div className="space-y-4 sm:space-y-5 text-base sm:text-lg text-[#3d2b2f] leading-relaxed font-normal">
          {paragraphs.map((p, idx) => (
            <p key={idx} className="text-justify sm:text-left indent-4 sm:indent-6">
              {p}
            </p>
          ))}
        </div>

        {/* Despedida y firma solicitadas */}
        <div className="mt-10 pt-6 border-t border-[#f3c1cb]/60 flex flex-col items-center sm:items-end text-center sm:text-right">
          {farewell && (
            <p className="text-sm sm:text-base text-[#7a1c34] italic mb-2 font-medium">
              {farewell}
            </p>
          )}

          {/* "Te amo ❤️" */}
          <p className="font-script-romantic text-3xl sm:text-4xl text-[#7a1c34] font-bold mb-1">
            {signature}
          </p>

          {/* "Felices 7 meses y feliz cumpleaños, mi amor bonito." */}
          <p className="font-serif-cormorant text-lg sm:text-xl font-bold text-[#521323]">
            {closingPhrase}
          </p>

          <div className="mt-4 flex items-center gap-1.5 text-xs sm:text-sm text-[#7a1c34]/80 font-medium">
            <Feather className="w-4 h-4 text-[#d9778a]" />
            <span>{author || "Escrito y llorado con amor — Julián Esquivel"}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
