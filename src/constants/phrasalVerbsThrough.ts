export interface PhrasalVerbThrough {
  id: number;
  word: string;
  pronunciation: string;
  spanish: string;
  meaning: string;
  category: string;
}

export const PHRASAL_VERBS_THROUGH: PhrasalVerbThrough[] = [
  // PHYSICAL
  { id: 1, word: 'Go through', pronunciation: '/ɡəʊ θruː/', spanish: 'Pasar por / Atravesar', meaning: 'Ir de un lado al otro de un lugar cerrado.', category: 'MOVIMIENTO FÍSICO' },
  { id: 2, word: 'Step through', pronunciation: '/step θruː/', spanish: 'Pasar por (una puerta)', meaning: 'Cruzar un umbral dando un paso.', category: 'MOVIMIENTO FÍSICO' },
  { id: 3, word: 'Drive through', pronunciation: '/draɪv θruː/', spanish: 'Conducir a través de', meaning: 'Cruzar un lugar en vehículo (como el servicio rápido).', category: 'MOVIMIENTO FÍSICO' },
  
  // OBSTACLES
  { id: 4, word: 'Get through', pronunciation: '/ɡet θruː/', spanish: 'Superar / Terminar', meaning: 'Lograr terminar una tarea difícil o un mal momento.', category: 'SUPERAR OBSTÁCULOS' },
  { id: 5, word: 'Pull through', pronunciation: '/pʊl θruː/', spanish: 'Salir adelante / Recuperarse', meaning: 'Sobrevivir a una enfermedad o situación crítica.', category: 'SUPERAR OBSTÁCULOS' },
  { id: 6, word: 'Come through', pronunciation: '/kʌm θruː/', spanish: 'Superar / Cumplir', meaning: 'Aparecer con la solución justo cuando se necesita.', category: 'SUPERAR OBSTÁCULOS' },
  
  // DETAIL
  { id: 7, word: 'Look through', pronunciation: '/lʊk θruː/', spanish: 'Examinar / Revisar', meaning: 'Mirar algo rápido pero cubriendo todo el contenido.', category: 'A DETALLE / EXAMINAR' },
  { id: 8, word: 'Talk through', pronunciation: '/tɔːk θruː/', spanish: 'Explicar a detalle', meaning: 'Discutir un proceso paso a paso para entenderlo bien.', category: 'A DETALLE / EXAMINAR' },
  { id: 9, word: 'Go through', pronunciation: '/ɡəʊ θruː/', spanish: 'Revisar minuciosamente', meaning: 'Analizar documentos o listas con mucho cuidado.', category: 'A DETALLE / EXAMINAR' },
];
