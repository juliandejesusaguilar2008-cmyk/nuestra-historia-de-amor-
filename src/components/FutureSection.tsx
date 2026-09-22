import React from 'react';
import { Sparkles, Compass, Heart, Stars } from 'lucide-react';

interface FutureSectionProps {
  title: string;
  subtitle: string;
  promises: { title: string; text: string }[];
  finalQuote: string;
}

export const FutureSection: React.FC<FutureSectionProps> = ({
  title,
  subtitle,
  promises,
  finalQuote,
}) => {
  return (
    <section
      id="nuestro-futuro"
      aria-label="Nuestro futuro juntos"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto"
    >
      {/* Encabezado */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce8ec] text-[#7a1c34] text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5 text-[#d9778a]" />
          <span>LO QUE VIENE</span>
        </div>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#521323] mb-3">
          {title}
        </h2>
        <p className="text-base sm:text-lg text-[#7a1c34]/80 font-normal leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Tarjetas de promesas y deseos para el futuro */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {promises.map((promise, index) => (
          <div
            key={index}
            className="bg-white/90 rounded-2xl p-6 border border-[#f3c1cb]/80 shadow-sm hover:shadow-lg transition-all duration-300 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-[#fce8ec] text-[#7a1c34] flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5 text-[#d9778a]" />
            </div>
            <div>
              <h3 className="font-serif-cormorant text-xl font-bold text-[#521323] mb-1.5">
                {promise.title}
              </h3>
              <p className="text-sm sm:text-base text-[#4a3439] leading-relaxed">
                {promise.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Frase poética final con fondo cálido */}
      {finalQuote && (
        <div className="relative rounded-2xl bg-gradient-to-r from-[#7a1c34] via-[#601427] to-[#7a1c34] text-white p-8 sm:p-10 text-center shadow-xl shadow-[#7a1c34]/15 overflow-hidden">
          <div
            className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"
            aria-hidden="true"
          />
          <Stars className="w-8 h-8 text-[#f3c1cb] mx-auto mb-3 opacity-80" />
          <p className="font-serif-cormorant text-xl sm:text-2xl md:text-3xl italic max-w-2xl mx-auto leading-relaxed">
            {finalQuote}
          </p>
          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#fce8ec]/70">
            <Heart className="w-3.5 h-3.5 fill-[#f3c1cb] text-[#f3c1cb]" />
            <span>Por todos los días que vendrán</span>
          </div>
        </div>
      )}
    </section>
  );
};
