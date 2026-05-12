export interface AtInOnItem {
  id: number;
  word: string;
  spanish: string;
  category: string;
  type: 'AT' | 'IN' | 'ON';
  context: string;
}

export const AT_IN_ON_DATA: AtInOnItem[] = [
  // AT - El "Punto Láser"
  { id: 1, word: "Look at", spanish: "Mirar", category: "Punto Láser", type: 'AT', context: "Dirección de la mirada" },
  { id: 2, word: "Stare at", spanish: "Mirar fijamente", category: "Punto Láser", type: 'AT', context: "Dirección de la mirada" },
  { id: 3, word: "Glance at", spanish: "Dar un vistazo", category: "Punto Láser", type: 'AT', context: "Mirar rápidamente" },
  { id: 4, word: "Smile at", spanish: "Sonreír a", category: "Punto Láser", type: 'AT', context: "Enfoque emocional" },
  { id: 5, word: "Laugh at", spanish: "Reír a / Burlarse de", category: "Punto Láser", type: 'AT', context: "Enfoque emocional" },
  { id: 6, word: "Point at", spanish: "Señalar a", category: "Punto Láser", type: 'AT', context: "Dirección física" },
  { id: 7, word: "Shout at", spanish: "Gritar a", category: "Punto Láser", type: 'AT', context: "Dirección de voz" },
  { id: 8, word: "Yell at", spanish: "Gritar a", category: "Punto Láser", type: 'AT', context: "Lanzar un grito" },
  { id: 9, word: "Aim at", spanish: "Apuntar a", category: "Punto Láser", type: 'AT', context: "Objetivo láser" },
  // AT - Habilidades
  { id: 10, word: "Good at", spanish: "Bueno para / en", category: "Habilidades", type: 'AT', context: "Punto de referencia" },
  { id: 11, word: "Bad at", spanish: "Malo para", category: "Habilidades", type: 'AT', context: "Punto de referencia" },
  { id: 12, word: "Excellent at", spanish: "Excelente en", category: "Habilidades", type: 'AT', context: "Punto de referencia" },
  { id: 13, word: "Brilliant at", spanish: "Brillante en", category: "Habilidades", type: 'AT', context: "Punto de referencia" },
  { id: 14, word: "Terrible at", spanish: "Terrible en", category: "Habilidades", type: 'AT', context: "Punto de referencia" },
  { id: 15, word: "Awful at", spanish: "Pésimo en", category: "Habilidades", type: 'AT', context: "Punto de referencia" },
  { id: 16, word: "Hopeless at", spanish: "Sin esperanza", category: "Habilidades", type: 'AT', context: "Punto de referencia" },
  // AT - Tiempo
  { id: 17, word: "At 5 p.m.", spanish: "A las 5 p.m.", category: "Tiempo", type: 'AT', context: "Hora exacta" },
  { id: 18, word: "At noon", spanish: "Al mediodía", category: "Tiempo", type: 'AT', context: "Punto temporal" },
  { id: 19, word: "At midnight", spanish: "A medianoche", category: "Tiempo", type: 'AT', context: "Punto temporal" },
  { id: 20, word: "At the same time", spanish: "Al mismo tiempo", category: "Tiempo", type: 'AT', context: "Punto temporal" },
  { id: 21, word: "At the moment", spanish: "En este momento", category: "Tiempo", type: 'AT', context: "Instante preciso" },
  { id: 22, word: "At first", spanish: "Al principio", category: "Tiempo", type: 'AT', context: "Punto temporal" },
  { id: 23, word: "At the beginning", spanish: "Al principio", category: "Tiempo", type: 'AT', context: "Punto temporal" },
  { id: 24, word: "At the end", spanish: "Al final", category: "Tiempo", type: 'AT', context: "Punto temporal" },
  // AT - Espacio
  { id: 25, word: "At home", spanish: "En casa", category: "Espacio", type: 'AT', context: "Coordenada" },
  { id: 26, word: "At work", spanish: "En el trabajo", category: "Espacio", type: 'AT', context: "Coordenada" },
  { id: 27, word: "At school", spanish: "En la escuela", category: "Espacio", type: 'AT', context: "Coordenada" },
  { id: 28, word: "At the office", spanish: "En la oficina", category: "Espacio", type: 'AT', context: "Coordenada" },
  { id: 29, word: "At the door", spanish: "En la puerta", category: "Espacio", type: 'AT', context: "Punto exacto" },
  { id: 30, word: "At the top", spanish: "En la cima", category: "Espacio", type: 'AT', context: "Punto exacto" },
  { id: 31, word: "At the bottom", spanish: "En el fondo", category: "Espacio", type: 'AT', context: "Punto exacto" },
  { id: 32, word: "At the station", spanish: "En la estación", category: "Espacio", type: 'AT', context: "Punto de referencia" },
  { id: 33, word: "At the airport", spanish: "En el aeropuerto", category: "Espacio", type: 'AT', context: "Punto de referencia" },
  { id: 34, word: "At the party", spanish: "En la fiesta", category: "Espacio", type: 'AT', context: "Evento" },
  { id: 35, word: "At the meeting", spanish: "En la reunión", category: "Espacio", type: 'AT', context: "Evento" },
  { id: 36, word: "At the table", spanish: "En la mesa", category: "Espacio", type: 'AT', context: "Ubicación" },
  { id: 37, word: "At a restaurant", spanish: "En un restaurante", category: "Espacio", type: 'AT', context: "Ubicación" },
  // AT - Fijas
  { id: 38, word: "At least", spanish: "Al menos", category: "Fijas", type: 'AT', context: "Estado" },
  { id: 39, word: "At full speed", spanish: "A toda velocidad", category: "Fijas", type: 'AT', context: "Estado" },
  { id: 40, word: "At random", spanish: "Al azar", category: "Fijas", type: 'AT', context: "Estado" },

  // IN - Inmersión
  { id: 41, word: "Believe in", spanish: "Creer en", category: "Inmersión", type: 'IN', context: "Compromiso" },
  { id: 42, word: "Specialize in", spanish: "Especializarse en", category: "Inmersión", type: 'IN', context: "Involucrarse" },
  { id: 43, word: "Succeed in", spanish: "Tener éxito en", category: "Inmersión", type: 'IN', context: "Involucrarse" },
  { id: 44, word: "Engage in", spanish: "Participar / Comprometerse", category: "Inmersión", type: 'IN', context: "Involucrarse" },
  { id: 45, word: "Participate in", spanish: "Participar en", category: "Inmersión", type: 'IN', context: "Involucrarse" },
  { id: 46, word: "Invest in", spanish: "Invertir en", category: "Inmersión", type: 'IN', context: "Involucrarse" },
  { id: 47, word: "Be involved in", spanish: "Involucrarse en", category: "Inmersión", type: 'IN', context: "Involucrarse" },
  // IN - Entornos 3D
  { id: 48, word: "In the car", spanish: "En el auto", category: "Espacio 3D", type: 'IN', context: "Contención" },
  { id: 49, word: "In prison", spanish: "En la cárcel", category: "Espacio 3D", type: 'IN', context: "Contención" },
  { id: 50, word: "In the army", spanish: "En el ejército", category: "Espacio 3D", type: 'IN', context: "Contención" },
  { id: 51, word: "In the city", spanish: "En la ciudad", category: "Espacio 3D", type: 'IN', context: "Límites" },
  { id: 52, word: "In the country", spanish: "En el campo", category: "Espacio 3D", type: 'IN', context: "Límites" },
  { id: 53, word: "In public", spanish: "En público", category: "Espacio 3D", type: 'IN', context: "Entorno conceptual" },
  { id: 54, word: "In private", spanish: "En privado", category: "Espacio 3D", type: 'IN', context: "Entorno conceptual" },
  // IN - Estado Temporal
  { id: 55, word: "In trouble", spanish: "En problemas", category: "Estado", type: 'IN', context: "Inmersión emocional" },
  { id: 56, word: "In love", spanish: "Enamorado", category: "Estado", type: 'IN', context: "Inmersión emocional" },
  { id: 57, word: "In a hurry", spanish: "Apurado", category: "Estado", type: 'IN', context: "Inmersión emocional" },
  { id: 58, word: "In charge", spanish: "A cargo", category: "Estado", type: 'IN', context: "Situación" },
  { id: 59, word: "In danger", spanish: "En peligro", category: "Estado", type: 'IN', context: "Situación" },
  { id: 60, word: "In control", spanish: "En control", category: "Estado", type: 'IN', context: "Situación" },
  { id: 61, word: "In pain", spanish: "Con dolor", category: "Estado", type: 'IN', context: "Situación" },

  // ON - Bases
  { id: 62, word: "Depend on", spanish: "Depender de", category: "Bases", type: 'ON', context: "Apoyo conceptual" },
  { id: 63, word: "Rely on", spanish: "Confiar en", category: "Bases", type: 'ON', context: "Apoyo conceptual" },
  { id: 64, word: "Focus on", spanish: "Enfocarse en", category: "Bases", type: 'ON', context: "Contacto conceptual" },
  { id: 65, word: "Concentrate on", spanish: "Concentrarse en", category: "Bases", type: 'ON', context: "Contacto conceptual" },
  { id: 66, word: "Work on", spanish: "Trabajar en", category: "Bases", type: 'ON', context: "Contacto conceptual" },
  { id: 67, word: "Base on", spanish: "Basarse en", category: "Bases", type: 'ON', context: "Base firme" },
  { id: 68, word: "Reflect on", spanish: "Reflexionar sobre", category: "Bases", type: 'ON', context: "Contacto conceptual" },
  // ON - Listas
  { id: 69, word: "On the list", spanish: "En la lista", category: "Superficie", type: 'ON', context: "Documentos" },
  { id: 70, word: "On the menu", spanish: "En el menú", category: "Superficie", type: 'ON', context: "Documentos" },
  // ON - Transporte
  { id: 71, word: "On the bus", spanish: "En el autobús", category: "Transporte", type: 'ON', context: "Plataforma" },
  { id: 72, word: "On the airplane", spanish: "En el avión", category: "Transporte", type: 'ON', context: "Plataforma" },
  { id: 73, word: "On the train", spanish: "En el tren", category: "Transporte", type: 'ON', context: "Plataforma" },
  { id: 74, word: "On a ship", spanish: "En un barco", category: "Transporte", type: 'ON', context: "Plataforma" },
  // ON - Caminos
  { id: 75, word: "On the way", spanish: "En camino", category: "Trayectos", type: 'ON', context: "Sobre la ruta" }
];
