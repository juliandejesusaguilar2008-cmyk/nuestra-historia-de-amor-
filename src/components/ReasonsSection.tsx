import React from 'react';
import {
  Heart,
  Smile,
  Sparkles,
  HeartHandshake,
  Clock,
  Star,
  Eye,
  Crown,
  Sun,
  Flame,
  Music,
} from 'lucide-react';
import { ReasonToLove } from '../types';

interface ReasonsSectionProps {
  title: string;
  subtitle: string;
  list: ReasonToLove[];
}

const getIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Smile':
      return <Smile className="w-5 h-5" />;
    case 'Heart':
      return <Heart className="w-5 h-5 fill-current" />;
    case 'Sparkles':
      return <Sparkles className="w-5 h-5" />;
    case 'HeartHandshake':
      return <HeartHandshake className="w-5 h-5" />;
    case 'Clock':
      return <Clock className="w-5 h-5" />;
    case 'Star':
      return <Star className="w-5 h-5 fill-current" />;
    case 'Eye':
      return <Eye className="w-5 h-5" />;
    case 'Crown':
      return <Crown className="w-5 h-5" />;
    case 'Sun':
      return <Sun className="w-5 h-5" />;
    case 'Flame':
      return <Flame className="w-5 h-5" />;
    case 'Music':
      return <Music className="w-5 h-5" />;
    default:
      return <Heart className="w-5 h-5 fill-current" />;
  }
};

export const ReasonsSection: React.FC<ReasonsSectionProps> = ({
  title,
  subtitle,
  list,
}) => {
  return (
    <section
      id="cosas-que-amo"
      aria-label="Cosas que amo de ti"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      {/* Encabezado */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce8ec] text-[#7a1c34] text-xs font-semibold mb-3">
          <Heart className="w-3.5 h-3.5 fill-[#d9778a] text-[#d9778a]" />
          <span>DESDE EL FONDO DE MI CORAZÓN</span>
        </div>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#521323] mb-3">
          {title}
        </h2>
        <p className="text-base sm:text-lg text-[#7a1c34]/80 font-normal leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Grid de tarjetas interactivas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {list.map((item, index) => (
          <div
            key={item.id}
            className="group relative bg-white/95 rounded-2xl p-6 border border-[#f3c1cb]/70 shadow-sm hover:shadow-xl hover:border-[#d9778a] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
          >
            {/* Número / Badge de orden */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#fce8ec] text-[#7a1c34] flex items-center justify-center group-hover:bg-[#7a1c34] group-hover:text-white transition-colors duration-300 shadow-xs">
                {getIcon(item.iconName)}
              </div>
              <span className="text-xs font-serif-cormorant italic text-[#7a1c34]/50 font-bold">
                #{index + 1}
              </span>
            </div>

            {/* Título de la razón */}
            <div>
              <h3 className="font-serif-cormorant text-xl font-bold text-[#521323] mb-2 group-hover:text-[#7a1c34] transition-colors">
                {item.title}
              </h3>
              {/* Descripción */}
              <p className="text-sm text-[#5c4046] leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Pequeño detalle de corazón inferior */}
            <div className="mt-4 pt-3 border-t border-[#fce8ec] flex items-center justify-between text-xs text-[#d9778a]">
              <span className="font-script-romantic text-base text-[#7a1c34]">
                Para siempre
              </span>
              <Heart className="w-3.5 h-3.5 fill-[#fce8ec] text-[#d9778a] group-hover:fill-[#d9778a] transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
