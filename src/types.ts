export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  photoUrl: string;
  tag?: string;
}

export interface PhotoMemory {
  id: string;
  url: string;
  caption: string;
  date?: string;
  aspect?: 'portrait' | 'landscape' | 'square';
}

export interface ReasonToLove {
  id: string;
  title: string;
  description: string;
  iconName?: string;
}

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
}

export interface LoveAppConfig {
  // Nombres principales
  herName: string;          // Nombre o apodo de ella (ej. "Mi princesa", "Sofía")
  hisName: string;          // Tu nombre o apodo (ej. "Tu amor", "Carlos")
  
  // Fechas clave
  relationshipStartDate: string; // Formato YYYY-MM-DD para calcular días juntos
  birthdayDate: string;          // Fecha de su cumpleaños (ej. "24 de Septiembre")
  anniversaryMonths: number;     // 7 meses

  // Música
  music: {
    title: string;               // Nombre de la canción principal
    artist: string;              // Artista principal
    audioUrl: string;            // Ruta local o enlace web
    playlist: SongTrack[];       // Lista ordenada de canciones que se reproducen en secuencia y bucle
  };

  // Pantalla de inicio
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    photoUrl?: string;           // Foto especial en la portada
    photoCaption?: string;       // Pie de foto opcional
    actionButtonText: string;
    quote: string;
  };

  // Sección 1: Feliz Cumpleaños
  birthday: {
    title: string;
    subtitle: string;
    photoUrl: string;
    photoCaption: string;
    letterMessage: string[];
    wishes: string[];
  };

  // Sección 2: Nuestros 7 meses (Timeline)
  timeline: {
    title: string;
    subtitle: string;
    events: TimelineEvent[];
  };

  // Sección 3: Galería de fotos
  gallery: {
    title: string;
    subtitle: string;
    photos: PhotoMemory[];
  };

  // Sección 4: Cosas que amo de ti
  reasons: {
    title: string;
    subtitle: string;
    list: ReasonToLove[];
  };

  // Sección 5: Una carta para ti
  letter: {
    title: string;
    subtitle?: string;
    salutation: string;
    paragraphs: string[];
    farewell: string;
    closingPhrase: string;
    signature: string;
    author?: string;
  };

  // Sección 6: Nuestro futuro
  future: {
    title: string;
    subtitle: string;
    promises: { title: string; text: string }[];
    finalQuote: string;
  };

  // Final de la página
  closing: {
    mainPhotoUrl: string;
    topText: string;
    middleText: string;
    bottomText: string;
    buttonConfettiText: string;
  };

  // Estilos y detalles
  theme: {
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
  };
}
