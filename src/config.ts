import { LoveAppConfig } from './types';

/**
 * =========================================================================
 * 💖 PANEL DE CONFIGURACIÓN PRINCIPAL — NUESTRA HISTORIA DE AMOR 💖
 * =========================================================================
 * 
 * ¡Hola! Aquí puedes personalizar absolutamente TODO para tu novia de manera
 * fácil y rápida sin tener que buscar entre el código.
 * 
 * 📌 CÓMO CAMBIAR FOTOS:
 *    - Puedes pegar enlaces directos de fotos (ej: de Google Drive público, Imgur, etc.)
 *    - O puedes colocar tus fotos en la carpeta `/public/images/` y escribir
 *      la ruta como: `/images/mi-foto.jpg`.
 * 
 * 📌 CÓMO CAMBIAR LA MÚSICA:
 *    - Coloca tu archivo MP3 en la carpeta `/public/music/nuestra-cancion.mp3`
 *    - O pega un enlace directo en `audioUrl`.
 *    - Si dejas el enlace por defecto, se reproducirá una hermosa melodía
 *      suave de piano romántico generada en tiempo real.
 * =========================================================================
 */

export const DEFAULT_CONFIG: LoveAppConfig = {
  // -------------------------------------------------------------
  // 🌸 NOMBRES Y DATOS BÁSICOS
  // -------------------------------------------------------------
  herName: "Mi Amor", // Escribe aquí el nombre o apodo cariñoso de tu novia (ej: "Sofía", "Mi Princesa")
  hisName: "Julián Esquivel", // Escribe aquí tu nombre (ej: "Alejandro", "Tu amor")

  // Fecha en que iniciaron la relación (Año-Mes-Día). Se usa para calcular los días exactos juntos.
  relationshipStartDate: "2026-02-22", 
  birthdayDate: "Hoy es tu día", // Texto o fecha de su cumpleaños (ej: "21 de Septiembre")
  anniversaryMonths: 7, // Cantidad de meses juntos

  // -------------------------------------------------------------
  // 🎵 MÚSICA DE FONDO (PLAYLIST ROMÁNTICA EN BUCLE)
  // -------------------------------------------------------------
  music: {
    title: "Te quiero tanto",
    artist: "Kevin Kaarl",
    audioUrl: "/music/1-te-quiero-tanto.mp3",
    playlist: [
      {
        id: "track-1",
        title: "Te quiero tanto",
        artist: "Kevin Kaarl",
        audioUrl: "/music/1-te-quiero-tanto.mp3",
      },
      {
        id: "track-2",
        title: "La mujer que bota fuego",
        artist: "Manuel Medrano",
        audioUrl: "/music/2-la-mujer-que-bota-fuego.mp3",
      },
      {
        id: "track-3",
        title: "Es que yo te quiero a ti",
        artist: "Kevin Kaarl",
        audioUrl: "/music/3-es-que-yo-te-quiero-a-ti.mp3",
      },
      {
        id: "track-4",
        title: "Hasta donde te quiero",
        artist: "La Rondalla de Saltillo",
        audioUrl: "/music/4-hasta-donde-te-quiero.mp3",
      },
    ],
  },

  // -------------------------------------------------------------
  // ✨ PANTALLA DE INICIO (BIENVENIDA)
  // -------------------------------------------------------------
  hero: {
    badge: "Para el amor de mi vida ❤️",
    headline: "Hoy celebramos dos cosas muy especiales:",
    subheadline: "Tu cumpleaños y nuestros 7 maravillosos meses juntos.",
    // Espacio para la foto de portada: foto de nuestro abrazo con flores
    photoUrl: "/images/portada.jpg",
    photoCaption: "",
    actionButtonText: "Abre para ver nuestra historia ❤️",
    quote: "«Encontrarte ha sido el regalo más hermoso que la vida me ha dado.»",
  },

  // -------------------------------------------------------------
  // 🎂 SECCIÓN 1: FELIZ CUMPLEAÑOS
  // -------------------------------------------------------------
  birthday: {
    title: "Feliz cumpleaños, mi amor ❤️",
    subtitle: "Hoy le doy gracias a Dios por darme la oportunidad de celebrar tu cumpleaños 18.",
    // Foto de ella o de ambos sonriendo:
    photoUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop",
    photoCaption: "Celebrando tus 18 años, mi niña hermosa ✨",
    // Tu carta personal de cumpleaños:
    letterMessage: [
      "Hoy en este día tan especial quiero recordarte lo muy afortunado que me siento por poder compartir mi vida a tu lado. Muchas veces te he mencionado que llegaste a mi vida para transformar mis días normales a fenomenales, llenos de amor, risas y mucha ternura.",
      "Deseo de todo corazón que Diosito te tenga un año más de vida lleno de sueños cumplidos, que yo logre darte mucha paz, y que mi amor sea esa luz que ilumine tu vida.",
      "Gracias por ser tú, por existir y porque con el simple acto de existir, ya me das todo lo que siempre deseé. ¡Feliz cumpleaños, mi amor!"
    ],
    wishes: [
      "Que tus 18 años sean el inicio de una etapa llena de bendiciones.",
      "Que nunca te falten motivos para sonreír.",
      "Que cada meta que tengas en mente se vuelva realidad.",
      "Y que podamos seguir festejando muchos cumpleaños más juntos."
    ]
  },

  // -------------------------------------------------------------
  // ⏳ SECCIÓN 2: NUESTROS 7 MESES (LÍNEA DEL TIEMPO)
  // -------------------------------------------------------------
  timeline: {
    title: "7 meses contigo ❤️",
    subtitle: "Cada día a tu lado es una página de una historia que nunca me cansaré de leer.",
    events: [
      {
        id: "t1",
        date: "El comienzo",
        title: "El día que nos conocimos",
        description: "Aunque no hay una foto de la primera vez que nos vimos, hay algunos recuerdos que siento como la primera vez, donde mi corazón latía por ti.",
        photoUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=900&auto=format&fit=crop",
        tag: "El principio"
      },
      {
        id: "t2",
        date: "Nuestra primera cita",
        title: "Nuestra primera cita: esas noches a solas",
        description: "Aunque cita se puede interpretar de muchas formas para mí, esas noches en tus escaleras eran una mezcla mágica de mucha felicidad y pena, donde cada noche se pasaba volando y se nos hacía tarde sin darnos cuenta.",
        photoUrl: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=900&auto=format&fit=crop",
        tag: "Tus escaleras"
      },
      {
        id: "t3",
        date: "El comienzo oficial",
        title: "El día que dijimos 'Sí'",
        description: "Fui obvio, lo sé, pero aun así la emoción que sentí al llevarte al lugar, hablarte y hacerte esa pregunta que me cambiaría la vida, la cual te haría siempre: ¿quieres ser mi novia?",
        photoUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=900&auto=format&fit=crop",
        tag: "¿Quieres ser mi novia?"
      },
      {
        id: "t4",
        date: "Mes 1",
        title: "Nuestro primer mes",
        description: "Recuerdo bien que sentía que el tiempo pasaba tan rápido y tan lento porque vivíamos muchas cosas nuevas en tan poco tiempo, donde nuestro amor solo se hacía más fuerte.",
        photoUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=900&auto=format&fit=crop",
        tag: "Creciendo juntos"
      },
      {
        id: "t5",
        date: "Nuestra salida especial",
        title: "Un viaje / paseo a recordar",
        description: "Aunque el de Isla Mujeres es especial por un motivo, ese a Bacalar lo siento muy especial porque pude expresarte tanto y abrirte mi corazón como a nadie más.",
        photoUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=900&auto=format&fit=crop",
        tag: "Bacalar e Isla Mujeres"
      },
      {
        id: "t6",
        date: "Momento divertido",
        title: "Risas hasta que nos dolió el estómago",
        description: "Muchos momentos han sido súper graciosos y llenos de risa, pero esa noche el llevarnos tan natural incluso siendo novios fue de las más divertidas porque jugamos como niños a pesar de todo.",
        photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900&auto=format&fit=crop",
        tag: "Como niños"
      },
      {
        id: "t7",
        date: "Una fecha especial",
        title: "Un día grabado en mi corazón",
        description: "Hay muchos momentos que podría poner en este apartado, pero sin duda, este viaje me marcó, porque a pesar de saber que serían nuestros últimos días juntos, los gozamos, los vivimos, los disfrutamos como debía ser, y sin duda alguna siempre estaré agradecido por esperarme tanto.",
        photoUrl: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=900&auto=format&fit=crop",
        tag: "Grabado en mi corazón"
      },
      {
        id: "t8",
        date: "7 meses después",
        title: "Nuestro séptimo mes",
        description: "Este mes fue el primero sin estar juntos y a pesar de eso hemos construido un amor con paciencia, entendimiento y mucha ternura, y yo sé que esto es el principio de algo muy grande.",
        photoUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=900&auto=format&fit=crop",
        tag: "Amor a distancia y para siempre"
      }
    ]
  },

  // -------------------------------------------------------------
  // 📸 SECCIÓN 3: NUESTRAS FOTOS (ÁLBUM DE RECUERDOS)
  // -------------------------------------------------------------
  gallery: {
    title: "Nuestros momentos favoritos 📸",
    subtitle: "de los momentos que se llevan en el corazon",
    photos: [
      {
        id: "p1",
        url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=900&auto=format&fit=crop",
        caption: "Uno de mis días favoritos contigo.",
        date: "Un recuerdo inolvidable",
        aspect: "portrait"
      },
      {
        id: "p2",
        url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=900&auto=format&fit=crop",
        caption: "Este momento siempre tendrá un lugar especial en mi corazón.",
        date: "Tardes mágicas",
        aspect: "landscape"
      },
      {
        id: "p3",
        url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=900&auto=format&fit=crop",
        caption: "Contigo hasta los momentos más simples se vuelven especiales.",
        date: "Tu sonrisa infinita",
        aspect: "square"
      },
      {
        id: "p4",
        url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=900&auto=format&fit=crop",
        caption: "Tomar tu mano hace que todo valga la pena.",
        date: "Paz a tu lado",
        aspect: "portrait"
      },
      {
        id: "p5",
        url: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=900&auto=format&fit=crop",
        caption: "Cada café, cada paseo y cada mirada tuya me enamora más.",
        date: "Tiempo a tu lado",
        aspect: "landscape"
      },
      {
        id: "p6",
        url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=900&auto=format&fit=crop",
        caption: "Bajo las estrellas o bajo el sol, siempre quiero estar contigo.",
        date: "Noches juntos",
        aspect: "square"
      }
    ]
  },

  // -------------------------------------------------------------
  // 💖 SECCIÓN 4: COSAS QUE AMO DE TI
  // -------------------------------------------------------------
  reasons: {
    title: "Pequeñas cosas que AMO de ti ✨",
    subtitle: "en ti cada cosa es algo que mi corazon le gusta amar",
    list: [
      {
        id: "r1",
        title: "Tu sonrisa",
        description: "esa linda sonrisa que me enamoro desde el dia uno en el que con esos dientes pequeñitos y blanquitos me hacia volar a las nubes",
        iconName: "Smile"
      },
      {
        id: "r2",
        title: "Tu forma de amarme",
        description: "me has ensañado que el amor se puede demostrar de muchas formas y lo has hecho en cada mensaje, en cada beso, abrazo, incluso en las segundas oportunidades, por que tu forma de amar viene en distintas formas, pero tu corazon ama de una forma genial.",
        iconName: "Heart"
      },
      {
        id: "r3",
        title: "Cómo me haces reír",
        description: "sin duda felicidad y risas jamas me han faltado, pero tienes una forma tan especial de hacerme reir que incluso en esos momentos donde solemos estar molestos, logras sacarme esa carcajada que me cambia el dia",
        iconName: "Sparkles"
      },
      {
        id: "r4",
        title: "Tus abrazos",
        description: "en cada abrazo tuyo, hay un chingo de paz, con tus brazos me siento seguro, me siento feliz y tanquilo, mi mundo se detiene para disfrutar ese abrazo,",
        iconName: "HeartHandshake"
      },
      {
        id: "r5",
        title: "Cada momento que compartimos",
        description: "Desde el plan mas simple hasta el mas puerco, desde platicar acostados,jugar telefono juntos o jugar a molesrnos cada momento es unico y me hace inmensamente feliz.",
        iconName: "Clock"
      },
      {
        id: "r6",
        title: "Tu inteligencia y valentía",
        description: "muchas veces te he querido dar a entender que eres una persona que enfrenta la vida con el coorazon,por que me consta que has pasado por mucho, pero eso jamas ha cambiado la forma en la que tu ves la vida",
        iconName: "Star"
      },
      {
        id: "r7",
        title: "Tu voz y tus ojos",
        description: "y como no mencinar esos dos sentimientos, escucharte es la calma que mi vida necesita por que cuando tu voz esta en mi todo lo demas es silencio.",
        iconName: "Eye"
      },
      {
        id: "r8",
        title: "Simplemente tú",
        description: "existen mil motivos por los cuales te escogo a ti dia tras dia, pero yo te amo y te admiro por el hecho de ser TU",
        iconName: "Crown"
      }
    ]
  },

  // -------------------------------------------------------------
  // ✉️ SECCIÓN 5: UNA CARTA PARA TI
  // -------------------------------------------------------------
  letter: {
    title: "Si pudiera decirte todo lo que siento...",
    subtitle: "jamas lograrias terminar de leer",
    salutation: "Amor de mi vida:",
    paragraphs: [
      "aveces expresarme con palabras no es mi fuerte pero en cada oportunidad que he tenido te he dicho cuanto te amo y me siento muy feliz de ser tu novio, las palabras que diria se quedan cortas para expresar todo lo que siento en el corazon, desde que llegaste a mi vida, siete meses luego, podran sonar muy pocos per se sienten como una eternidad, y en ese timpo ha sido sufiente para desubrir que el amor verdadero se construye con paciencia,ternura,complicidad,comunicacion y mucho de amor del que tu me das.",
      "hoy en tu cumpleraños 18 quiero agradecerte por ser mi lugar seguro, gracias por tantas experiencias juntos, por cada sonrisa compartida y por escucharme cuando no podia hablar con naide, por abrazarme cada vez que sentia que el mundo se desmoronaba, por enseñarme lo bonito que es querer sin miedo",
      "ver como cada dia creces,, sueñas y verte luchas por esos sueñps, me hacen sentir muy orgulloso de ti, eres una persona extraordinaria, con una luz, que no se apaga, y un corazon tan noble, que merece todo lo bueno que este universo pueda dar",
      "prometo cada dia seguir cuidando de ti, celebrando cada logro, aoyandote en cada dia triste y recordandote todos los dias lo hermosa y especial que eres"
    ],
    farewell: "siempre tu y yo",
    signature: "te amo",
    closingPhrase: "felices 7 meses y feliz cumpleaños, mi amor bonito.",
    author: "escrito y llorado con amor — Julian Esquivel"
  },

  // -------------------------------------------------------------
  // 🌟 SECCIÓN 6: NUESTRO FUTURO
  // -------------------------------------------------------------
  future: {
    title: "Y esto apenas comienza...",
    subtitle: "Estos 7 meses son tan solo el primer capítulo del libro que quiero escribir contigo.",
    promises: [
      {
        title: "Coleccionar recuerdos",
        text: "quiero seguir llenando mi celular con fotos nuestras, de viajes y de experiencias imborrables a tu lado"
      },
      {
        title: "Más aventuras y risas",
        text: "quiero mas noches a tu lado, mas platicas sin sentido y momentos donde semoas tu y yo y el tiempo se nos olvide"
      },
      {
        title: "Abrazos infinitos",
        text: "En cada abrazo tuyo encontrar la paz y ser ese refugio seguro para ti siempre."
      },
      {
        title: "Escribir nuestra historia",
        text: "Paso a paso, construyendo un amor con paciencia, entendimiento y ternura, que esto es solo el principio de algo muy grande."
      }
    ],
    finalQuote: "«No sé hacia dónde va el mundo, pero sí sé con quién quiero caminar: contigo.»"
  },

  // -------------------------------------------------------------
  // 🌹 CIERRE EMOCIONAL DE LA PÁGINA
  // -------------------------------------------------------------
  closing: {
    mainPhotoUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop",
    topText: "Gracias por estos 7 meses.",
    middleText: "Feliz cumpleaños a la persona que hace mis días mucho más bonitos.",
    bottomText: "Te amo con todo mi corazón ❤️",
    buttonConfettiText: "¡Presiona para celebrar nuestro amor! 💖"
  },

  // -------------------------------------------------------------
  // 🎨 PALETA DE COLORES Y ESTILOS
  // -------------------------------------------------------------
  theme: {
    primaryColor: "#7a1c34", // Vino romántico
    accentColor: "#d9778a",  // Rosa suave
    backgroundColor: "#faf6f3" // Crema delicado
  }
};
