export interface PhrasalVerbAboutFor {
  id: number;
  word: string;
  pronunciation: string;
  spanish: string;
  meaning: string;
  category: 'ABOUT' | 'FOR';
}

export const PHRASAL_VERBS_ABOUT_FOR: PhrasalVerbAboutFor[] = [
  // ABOUT (El Tema Central)
  {
    id: 1,
    word: "Worry about",
    pronunciation: "/ˈwʌri əˈbaʊt/",
    spanish: "Preocuparse por",
    meaning: "¿En torno a qué gira tu preocupación? (Tema central)",
    category: 'ABOUT'
  },
  {
    id: 2,
    word: "Think about",
    pronunciation: "/θɪŋk əˈbaʊt/",
    spanish: "Pensar en",
    meaning: "¿Cuál es el tema de tus pensamientos? (Orbitando una idea)",
    category: 'ABOUT'
  },
  {
    id: 3,
    word: "Complain about",
    pronunciation: "/kəmˈpleɪn əˈbaʊt/",
    spanish: "Quejarse por",
    meaning: "¿Sobre qué tema te estás quejando? (La temática de la queja)",
    category: 'ABOUT'
  },
  {
    id: 4,
    word: "Learn about",
    pronunciation: "/lɜːrn əˈbaʊt/",
    spanish: "Aprender sobre",
    meaning: "¿Cuál es el tema de estudio? (Inmersión en un tema)",
    category: 'ABOUT'
  },
  {
    id: 5,
    word: "Forget about",
    pronunciation: "/fərˈɡet əˈbaʊt/",
    spanish: "Olvidar sobre / Olvidarse de",
    meaning: "Dejar de tener un tema en la mente.",
    category: 'ABOUT'
  },
  {
    id: 6,
    word: "Dream about",
    pronunciation: "/driːm əˈbaʊt/",
    spanish: "Soñar con",
    meaning: "¿De qué trataba el sueño? (El contenido temático)",
    category: 'ABOUT'
  },
  
  // FOR (El Objetivo o el Futuro)
  {
    id: 7,
    word: "Ask for",
    pronunciation: "/æsk fɔːr/",
    spanish: "Pedir",
    meaning: "Hablas con el objetivo de obtener algo (Flecha al objetivo)",
    category: 'FOR'
  },
  {
    id: 8,
    word: "Wait for",
    pronunciation: "/weɪt fɔːr/",
    spanish: "Esperar",
    meaning: "Te quedas esperando con la esperanza de que algo llegue (Hacia el futuro)",
    category: 'FOR'
  },
  {
    id: 9,
    word: "Look for",
    pronunciation: "/lʊk fɔːr/",
    spanish: "Buscar",
    meaning: "Revisas con el objetivo de encontrar algo (Buscando un resultado)",
    category: 'FOR'
  },
  {
    id: 10,
    word: "Apply for",
    pronunciation: "/əˈplaɪ fɔːr/",
    spanish: "Solicitar",
    meaning: "Acción hoy para obtener un puesto o cupo mañana (Objetivo)",
    category: 'FOR'
  },
  {
    id: 11,
    word: "Care for",
    pronunciation: "/keər fɔːr/",
    spanish: "Cuidar",
    meaning: "Atender a alguien con el deseo de su bienestar futuro.",
    category: 'FOR'
  },
  {
    id: 12,
    word: "Prepare for",
    pronunciation: "/prɪˈpeər fɔːr/",
    spanish: "Prepararse",
    meaning: "Entrenar hoy para un evento en el futuro (Propósito)",
    category: 'FOR'
  }
];
