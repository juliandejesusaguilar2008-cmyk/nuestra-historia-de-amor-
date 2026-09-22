import React from 'react';
import { Heart, Sparkles, ChevronDown, Calendar, Cake } from 'lucide-react';

interface HeroSectionProps {
  herName: string;
  badge: string;
  headline: string;
  subheadline: string;
  quote: string;
  anniversaryMonths: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  herName,
  badge,
  headline,
  subheadline,
  quote,
  anniversaryMonths,
}) => {
  return (
    <header
      id="hero-section"
      className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 py-16 text-center overflow-hidden"
    >
      {/* Fondo con degradado delicado de tonos crema a rosado pálido */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#faf6f3] via-[#fdf0f2] to-[#faf6f3] -z-10"
        aria-hidden="true"
      />

      {/* Círculos de luz ambiental difuminada */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-[#f7d6dc]/50 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Badge superior romántico */}
        <div
          id="hero-badge"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-[#f3c1cb] text-[#7a1c34] text-xs sm:text-sm font-medium shadow-xs mb-5 backdrop-blur-sm"
        >
          <Heart className="w-3.5 h-3.5 fill-[#d9778a] text-[#d9778a] animate-pulse" />
          <span>{badge}</span>
          <Sparkles className="w-3.5 h-3.5 text-[#d9778a]" />
        </div>

        {/* Nombre personalizado destacado */}
        {herName && (
          <p className="font-script-romantic text-3xl sm:text-4xl md:text-5xl text-[#7a1c34] mb-3 tracking-wide">
            Para ti, mi amor {herName ? `(${herName})` : ''}
          </p>
        )}

        {/* Frase principal solicitada por el usuario */}
        <h1
          id="hero-headline"
          className="font-serif-cormorant text-3xl sm:text-5xl md:text-6xl font-bold text-[#521323] leading-tight mb-4"
        >
          {headline}
        </h1>

        {/* Subtítulo: tu cumpleaños y nuestros 7 meses juntos */}
        <p
          id="hero-subheadline"
          className="text-lg sm:text-xl md:text-2xl text-[#7a1c34]/90 font-medium max-w-2xl leading-relaxed mb-6"
        >
          {subheadline}
        </p>

        {/* Badges de las dos celebraciones */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#f3c1cb] text-sm text-[#7a1c34] shadow-xs">
            <Cake className="w-4 h-4 text-[#d9778a]" />
            <span className="font-semibold">Feliz Cumpleaños</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#f3c1cb] text-sm text-[#7a1c34] shadow-xs">
            <Calendar className="w-4 h-4 text-[#7a1c34]" />
            <span className="font-semibold">{anniversaryMonths} Meses de Novios</span>
          </div>
        </div>

        {/* Cita o frase poética */}
        {quote && (
          <p className="font-serif-cormorant italic text-base sm:text-lg text-[#7a1c34]/80 max-w-xl mb-6 px-4">
            {quote}
          </p>
        )}

        {/* Flecha sutil hacia abajo */}
        <div className="mt-4 text-[#7a1c34]/40 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>
    </header>
  );
};
