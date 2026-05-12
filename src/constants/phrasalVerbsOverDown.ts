export interface PhrasalVerbOverDown {
  id: number;
  word: string;
  pronunciation: string;
  spanish: string;
  meaning: string;
  category: string;
}

export const PHRASAL_VERBS_OVER_DOWN: PhrasalVerbOverDown[] = [
  // OVER - DAR VUELTA / MOVIMIENTO
  {
    id: 1,
    word: "Turn over",
    pronunciation: "/tɜːrn ˈəʊvə/",
    spanish: "Voltear / Dar la vuelta",
    meaning: "Girar algo para ver el otro lado (ej. una hoja o un panqueque).",
    category: "OVER: DAR VUELTA"
  },
  {
    id: 2,
    word: "Fall over",
    pronunciation: "/fɔːl ˈəʊvə/",
    spanish: "Caerse (tropezar)",
    meaning: "Perder el equilibrio y terminar en el suelo.",
    category: "OVER: DAR VUELTA"
  },
  {
    id: 3,
    word: "Move over",
    pronunciation: "/muːv ˈəʊvə/",
    spanish: "Moverse / Hacerse a un lado",
    meaning: "Desplazarse para dejar espacio a otra persona.",
    category: "OVER: DAR VUELTA"
  },
  // OVER - CONTROL
  {
    id: 4,
    word: "Get over",
    pronunciation: "/ɡet ˈəʊvə/",
    spanish: "Recuperarse / Superar",
    meaning: "\"Pasar por encima\" de un problema o enfermedad.",
    category: "OVER: CONTROL"
  },
  {
    id: 5,
    word: "Take over",
    pronunciation: "/teɪk ˈəʊvə/",
    spanish: "Tomar el control",
    meaning: "Asumir la responsabilidad o el mando de algo.",
    category: "OVER: CONTROL"
  },
  {
    id: 6,
    word: "Hand over",
    pronunciation: "/hænd ˈəʊvə/",
    spanish: "Entregar algo",
    meaning: "Ceder el control de un objeto o poder a otra persona.",
    category: "OVER: CONTROL"
  },
  // OVER - AQUÍ (INVITACIÓN / PRESENCIA)
  {
    id: 7,
    word: "Bring over",
    pronunciation: "/brɪŋ ˈəʊvə/",
    spanish: "Traer aquí",
    meaning: "Traer algo a la ubicación donde está el hablante.",
    category: "OVER: AQUÍ"
  },
  {
    id: 8,
    word: "Come over",
    pronunciation: "/kʌm ˈəʊvə/",
    spanish: "Venir aquí",
    meaning: "Visitar a alguien en su casa o lugar actual.",
    category: "OVER: AQUÍ"
  },
  {
    id: 9,
    word: "Stay over",
    pronunciation: "/steɪ ˈəʊvə/",
    spanish: "Quedarse aquí (dormir)",
    meaning: "Pasar la noche en casa de otra persona.",
    category: "OVER: AQUÍ"
  },
  // OVER - DETENIDAMENTE (REVISIÓN)
  {
    id: 10,
    word: "Go over",
    pronunciation: "/ɡəʊ ˈəʊvə/",
    spanish: "Revisar / Examinar",
    meaning: "Repasar una información para asegurarse de que es correcta.",
    category: "OVER: REVISIÓN"
  },
  {
    id: 11,
    word: "Look over",
    pronunciation: "/lʊk ˈəʊvə/",
    spanish: "Examinar / Echar un vistazo",
    meaning: "Revisar algo de forma rápida pero atenta.",
    category: "OVER: REVISIÓN"
  },
  {
    id: 12,
    word: "Pick over",
    pronunciation: "/pɪk ˈəʊvə/",
    spanish: "Seleccionar",
    meaning: "Examinar un grupo de cosas para elegir las mejores.",
    category: "OVER: REVISIÓN"
  },
  {
    id: 13,
    word: "Check over",
    pronunciation: "/tʃek ˈəʊvə/",
    spanish: "Inspeccionar",
    meaning: "Hacer una revisión final para buscar errores.",
    category: "OVER: REVISIÓN"
  },
  // DOWN - HACIA ABAJO (MOVIMIENTO FÍSICO)
  {
    id: 14,
    word: "Throw down",
    pronunciation: "/θrəʊ daʊn/",
    spanish: "Tirar (al suelo)",
    meaning: "Lanzar algo hacia la superficie.",
    category: "DOWN: MOVIMIENTO"
  },
  {
    id: 15,
    word: "Fall down",
    pronunciation: "/fɔːl daʊn/",
    spanish: "Caerse",
    meaning: "Perder el equilibrio y terminar en el suelo (en general).",
    category: "DOWN: MOVIMIENTO"
  },
  {
    id: 16,
    word: "Sit down",
    pronunciation: "/sɪt daʊn/",
    spanish: "Sentarse",
    meaning: "Pasar de estar de pie a estar apoyado en un asiento.",
    category: "DOWN: MOVIMIENTO"
  },
  {
    id: 17,
    word: "Get down",
    pronunciation: "/ɡet daʊn/",
    spanish: "Agacharse / Bajar",
    meaning: "Bajar el cuerpo o descender de algún lugar.",
    category: "DOWN: MOVIMIENTO"
  },
  // DOWN - DETERIORO (ALGO NEGATIVO)
  {
    id: 18,
    word: "Break down",
    pronunciation: "/breɪk daʊn/",
    spanish: "Descomponerse",
    meaning: "Cuando un sistema o máquina deja de funcionar.",
    category: "DOWN: DETERIORO"
  },
  {
    id: 19,
    word: "Look down",
    pronunciation: "/lʊk daʊn/",
    spanish: "Mirar con desprecio",
    meaning: "\"Mirar hacia abajo\" a alguien sintiéndose superior.",
    category: "DOWN: DETERIORO"
  },
  {
    id: 20,
    word: "Take down",
    pronunciation: "/teɪk daʊn/",
    spanish: "Derribar / Desmontar",
    meaning: "Desarmar una estructura o hacer caer a alguien.",
    category: "DOWN: DETERIORO"
  },
  {
    id: 21,
    word: "Close down",
    pronunciation: "/kləʊz daʊn/",
    spanish: "Clausurar / Cerrar",
    meaning: "El cierre definitivo de un negocio o empresa.",
    category: "DOWN: DETERIORO"
  },
  // DOWN - REDUCIR
  {
    id: 22,
    word: "Slow down",
    pronunciation: "/sləʊ daʊn/",
    spanish: "Bajar la velocidad",
    meaning: "Reducir el ritmo de una acción o movimiento.",
    category: "DOWN: REDUCIR"
  },
  {
    id: 23,
    word: "Cut down",
    pronunciation: "/kʌt daʊn/",
    spanish: "Reducir cantidad",
    meaning: "Consumir menos de algo (ej. reducir el azúcar).",
    category: "DOWN: REDUCIR"
  },
  {
    id: 24,
    word: "Narrow down",
    pronunciation: "/ˈnærəʊ daʊn/",
    spanish: "Reducir opciones",
    meaning: "Filtrar una lista larga hasta quedarse con pocas opciones.",
    category: "DOWN: REDUCIR"
  },
  {
    id: 25,
    word: "Bring down",
    pronunciation: "/brɪŋ daʊn/",
    spanish: "Reducir / Bajar",
    meaning: "Hacer que bajen los precios, niveles o el poder de alguien.",
    category: "DOWN: REDUCIR"
  }
];
