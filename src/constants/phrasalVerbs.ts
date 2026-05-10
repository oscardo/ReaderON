export interface PhrasalVerb {
  id: number;
  word: string;
  meaning: string;
  spanish: string;
  example: string;
  category?: string;
}

export const PHRASAL_VERBS: PhrasalVerb[] = [
  // 2. Get como Proceso de Cambio (+ Adjetivo)
  { id: 1, word: 'Get hungry', meaning: 'Process of change', spanish: 'Dar hambre / Empezar a tener hambre', example: 'My baby is getting hungry.', category: 'Process of Change' },
  { id: 2, word: 'Get angry', meaning: 'Process of change', spanish: 'Enojarse / Enfadarse', example: 'Don\'t get angry.', category: 'Process of Change' },
  { id: 3, word: 'Get thirsty', meaning: 'Process of change', spanish: 'Dar sed', example: 'I am getting thirsty.', category: 'Process of Change' },
  { id: 4, word: 'Get cold', meaning: 'Process of change', spanish: 'Enfriarse / Dar frío', example: 'It\'s getting cold.', category: 'Process of Change' },
  { id: 5, word: 'Get hot', meaning: 'Process of change', spanish: 'Calentarse / Dar calor', example: 'It\'s getting hot.', category: 'Process of Change' },
  { id: 6, word: 'Get bored', meaning: 'Process of change', spanish: 'Aburrirse', example: 'I\'m getting bored.', category: 'Process of Change' },
  { id: 7, word: 'Get interested', meaning: 'Process of change', spanish: 'Interesarse', example: 'I get interested in books.', category: 'Process of Change' },
  { id: 8, word: 'Get tired', meaning: 'Process of change', spanish: 'Cansarse', example: 'I\'m getting tired of you.', category: 'Process of Change' },
  { id: 9, word: 'Get lost', meaning: 'Process of change', spanish: 'Perderse', example: 'We will get lost.', category: 'Process of Change' },
  { id: 10, word: 'Get dressed', meaning: 'Process of change', spanish: 'Vestirse', example: 'Get dressed. We\'ll go out.', category: 'Process of Change' },
  { id: 11, word: 'Get married', meaning: 'Process of change', spanish: 'Casarse', example: 'I got married 5 years ago.', category: 'Process of Change' },
  { id: 12, word: 'Get divorced', meaning: 'Process of change', spanish: 'Divorciarse', example: 'They will get divorced.', category: 'Process of Change' },
  { id: 13, word: 'Get drunk', meaning: 'Process of change', spanish: 'Emborracharse', example: 'Don\'t get drunk tonight.', category: 'Process of Change' },
  
  // 3. Get + Lugar (Movimiento)
  { id: 14, word: 'Get home', meaning: 'Movement', spanish: 'Llegar a casa', example: 'I usually get home at 6 PM.', category: 'Movement' },
  { id: 15, word: 'Get there', meaning: 'Movement', spanish: 'Llegar allá', example: 'How do we get there?', category: 'Movement' },
  { id: 16, word: 'Get back', meaning: 'Movement', spanish: 'Regresar', example: 'When do you get back?', category: 'Movement' },
  { id: 17, word: 'Get in / Get into', meaning: 'Movement', spanish: 'Entrar (ej. en un coche)', example: 'Get in the car.', category: 'Movement' },
  { id: 18, word: 'Get out', meaning: 'Movement', spanish: 'Salir', example: 'Get out of the house.', category: 'Movement' },
  { id: 19, word: 'Get on', meaning: 'Movement', spanish: 'Subirse (ej. al bus o tren)', example: 'Get on the bus.', category: 'Movement' },
  { id: 20, word: 'Get off', meaning: 'Movement', spanish: 'Bajarse', example: 'Get off at the next stop.', category: 'Movement' },
  
  // Phrasal Verbs
  { id: 21, word: 'Get away', meaning: 'Phrasal Verb', spanish: 'Escapar / Irse', example: 'I need to get away for a few days.', category: 'Phrasal Verbs' },
  { id: 22, word: 'Get along (with)', meaning: 'Phrasal Verb', spanish: 'Llevarse bien', example: 'I get along with my brother.', category: 'Phrasal Verbs' },
  { id: 23, word: 'Get over', meaning: 'Phrasal Verb', spanish: 'Superar', example: 'You will get over it.', category: 'Phrasal Verbs' },
  { id: 24, word: 'Get by', meaning: 'Phrasal Verb', spanish: 'Arreglárselas / Sobrevivir', example: 'I can get by with very little money.', category: 'Phrasal Verbs' },
  { id: 25, word: 'Get together', meaning: 'Phrasal Verb', spanish: 'Reunirse', example: 'Let\'s get together this weekend.', category: 'Phrasal Verbs' },
  { id: 26, word: 'Get through', meaning: 'Phrasal Verb', spanish: 'Terminar algo difícil / Contactar', example: 'I finally got through the exam.', category: 'Phrasal Verbs' },
  { id: 27, word: 'Get across', meaning: 'Phrasal Verb', spanish: 'Hacerse entender', example: 'It is hard to get the message across.', category: 'Phrasal Verbs' },
  { id: 28, word: 'Get ahead', meaning: 'Phrasal Verb', spanish: 'Progresar / Salir adelante', example: 'You need to work hard to get ahead.', category: 'Phrasal Verbs' },

  // Get con Sustantivos
  { id: 29, word: 'Get a job', meaning: 'With Nouns', spanish: 'Conseguir un trabajo', example: 'I need to get a job.', category: 'With Nouns' },
  { id: 30, word: 'Get a ticket', meaning: 'With Nouns', spanish: 'Comprar/Conseguir un boleto', example: 'Did you get the tickets?', category: 'With Nouns' },
  { id: 31, word: 'Get a message', meaning: 'With Nouns', spanish: 'Recibir un mensaje', example: 'I got your message last night.', category: 'With Nouns' },
  { id: 32, word: 'Get some sleep', meaning: 'With Nouns', spanish: 'Dormir un poco', example: 'Go home and get some sleep.', category: 'With Nouns' },
  { id: 33, word: 'Get permission', meaning: 'With Nouns', spanish: 'Obtener permiso', example: 'Did you get permission?', category: 'With Nouns' },
  { id: 34, word: 'Get the impression', meaning: 'With Nouns', spanish: 'Tener la impresión', example: 'I get the impression she is angry.', category: 'With Nouns' },
  { id: 35, word: 'Get a cold', meaning: 'With Nouns', spanish: 'Resfriarse', example: 'I am getting a cold.', category: 'With Nouns' },
  
  // Get como entender
  { id: 36, word: 'Get it', meaning: 'Understand', spanish: 'Entender', example: 'I get it.', category: 'Understand' },
  { id: 37, word: 'Get to work', meaning: 'Phrases', spanish: 'Llegar al trabajo / Empezar', example: 'I need to get to work.', category: 'Phrases' },
  { id: 38, word: 'Get ready', meaning: 'Phrases', spanish: 'Prepararse', example: 'Get ready to go.', category: 'Phrases' },
  { id: 39, word: 'Get dark', meaning: 'Phrases', spanish: 'Oscurecer', example: 'It is getting dark.', category: 'Phrases' },
  { id: 40, word: 'Get better', meaning: 'Phrases', spanish: 'Mejorar', example: 'I hope you get better.', category: 'Phrases' },
  { id: 41, word: 'Get worse', meaning: 'Phrases', spanish: 'Empeorar', example: 'The situation is getting worse.', category: 'Phrases' }
];
