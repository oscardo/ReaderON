export interface PhrasalVerbBack {
  id: number;
  word: string;
  pronunciation: string;
  spanish: string;
  meaning: string;
  category: string;
}

export const PHRASAL_VERBS_BACK: PhrasalVerbBack[] = [
  // PHYSICAL
  { id: 1, word: 'Come back', pronunciation: '/kʌm bæk/', spanish: 'Regresar', meaning: 'Volver hacia donde está la persona que habla.', category: 'REGRESAR / RETROCEDER' },
  { id: 2, word: 'Go back', pronunciation: '/ɡəʊ bæk/', spanish: 'Regresar', meaning: 'Volver a un lugar donde estuviste antes.', category: 'REGRESAR / RETROCEDER' },
  { id: 3, word: 'Turn back', pronunciation: '/tɜːrn bæk/', spanish: 'Regresar / Dar la vuelta', meaning: 'Cambiar de dirección para volver por donde viniste.', category: 'REGRESAR / RETROCEDER' },
  { id: 4, word: 'Run back', pronunciation: '/rʌn bæk/', spanish: 'Regresar corriendo', meaning: 'Volver al punto de origen con prisa.', category: 'REGRESAR / RETROCEDER' },
  { id: 5, word: 'Step back', pronunciation: '/step bæk/', spanish: 'Retroceder', meaning: 'Dar un paso hacia atrás (físico o para analizar algo).', category: 'REGRESAR / RETROCEDER' },
  { id: 6, word: 'Get back', pronunciation: '/ɡet bæk/', spanish: 'Regresar / Volver', meaning: 'Retornar a casa o a una posición anterior.', category: 'REGRESAR / RETROCEDER' },
  
  // RESPONSE / DEVOLVER
  { id: 7, word: 'Give back', pronunciation: '/ɡɪv bæk/', spanish: 'Devolver (dar)', meaning: 'Entregar algo a su dueño original.', category: 'DEVOLVER / RESPONDER' },
  { id: 8, word: 'Bring back', pronunciation: '/brɪŋ bæk/', spanish: 'Devolver (traer)', meaning: 'Traer algo de vuelta de un lugar.', category: 'DEVOLVER / RESPONDER' },
  { id: 9, word: 'Take back', pronunciation: '/teɪ k bæk/', spanish: 'Devolver (llevar)', meaning: 'Llevar algo de regreso (ej. a una tienda).', category: 'DEVOLVER / RESPONDER' },
  { id: 10, word: 'Call back', pronunciation: '/kɔːl bæk/', spanish: 'Devolver (llamar)', meaning: 'Llamar de vuelta a alguien que te marcó antes.', category: 'DEVOLVER / RESPONDER' },
  { id: 11, word: 'Send back', pronunciation: '/send bæk/', spanish: 'Devolver (enviar)', meaning: 'Reenviar algo al remitente (ej. un pedido mal hecho).', category: 'DEVOLVER / RESPONDER' },
  { id: 12, word: 'Pay back', pronunciation: '/peɪ bæk/', spanish: 'Devolver (pagar)', meaning: 'Pagar una deuda; devolver dinero prestado.', category: 'DEVOLVER / RESPONDER' },
  { id: 13, word: 'Write back', pronunciation: '/raɪt bæk/', spanish: 'Responder (escribir)', meaning: 'Contestar una carta o mensaje de texto.', category: 'DEVOLVER / RESPONDER' },
  { id: 14, word: 'Speak back', pronunciation: '/spiːk bæk/', spanish: 'Responder (hablar)', meaning: 'Contestar a alguien, a veces de forma insolente.', category: 'DEVOLVER / RESPONDER' },
];
