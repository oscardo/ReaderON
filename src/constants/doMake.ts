export interface DoMakeItem {
  id: number;
  word: string;
  spanish: string;
  category: string;
  type: 'DO' | 'MAKE';
  context: string;
}

export const DO_MAKE_DATA: DoMakeItem[] = [
  // DO - Académicos y Tareas
  { id: 1, word: "Do homework", spanish: "Hacer la tarea", category: "Académicos", type: 'DO', context: "Deberes de rutinas" },
  { id: 2, word: "Do research", spanish: "Hacer investigación", category: "Académicos", type: 'DO', context: "Deberes de rutinas" },
  { id: 3, word: "Do a task", spanish: "Hacer un trabajo", category: "Académicos", type: 'DO', context: "Deberes de rutinas" },
  // DO - Ejercicio Físico
  { id: 4, word: "Do yoga", spanish: "Hacer yoga", category: "Ejercicio", type: 'DO', context: "Actividades físicas" },
  { id: 5, word: "Do aerobics", spanish: "Hacer aeróbicos", category: "Ejercicio", type: 'DO', context: "Actividades físicas" },
  { id: 6, word: "Do training", spanish: "Hacer entrenamiento", category: "Ejercicio", type: 'DO', context: "Actividades físicas" },
  { id: 7, word: "Do practice", spanish: "Hacer práctica", category: "Ejercicio", type: 'DO', context: "Actividades físicas" },
  { id: 8, word: "Do exercise", spanish: "Hacer ejercicio", category: "Ejercicio", type: 'DO', context: "Actividades físicas" },
  { id: 9, word: "Do push-ups", spanish: "Hacer flexiones", category: "Ejercicio", type: 'DO', context: "Actividades físicas" },
  { id: 10, word: "Do sit-ups", spanish: "Hacer abdominales", category: "Ejercicio", type: 'DO', context: "Actividades físicas" },
  { id: 11, word: "Do squats", spanish: "Hacer sentadillas", category: "Ejercicio", type: 'DO', context: "Actividades físicas" },
  { id: 12, word: "Do cardio", spanish: "Hacer cardio", category: "Ejercicio", type: 'DO', context: "Actividades físicas" },
  { id: 13, word: "Do stretches", spanish: "Hacer estiramientos", category: "Ejercicio", type: 'DO', context: "Actividades físicas" },
  { id: 14, word: "Do a workout", spanish: "Hacer ejercicio físico", category: "Ejercicio", type: 'DO', context: "Actividades físicas" },
  { id: 15, word: "Do sports", spanish: "Practicar deportes", category: "Ejercicio", type: 'DO', context: "Actividades físicas" },
  { id: 16, word: "Do martial arts", spanish: "Practicar artes marciales", category: "Ejercicio", type: 'DO', context: "Actividades físicas" },
  { id: 17, word: "Do physical therapy", spanish: "Hacer fisioterapia", category: "Ejercicio", type: 'DO', context: "Actividades físicas" },
  // DO - Negocios
  { id: 18, word: "Do business", spanish: "Hacer negocios", category: "Negocios", type: 'DO', context: "Entorno profesional" },
  { id: 19, word: "Do a project", spanish: "Realizar un proyecto", category: "Negocios", type: 'DO', context: "Entorno profesional" },
  { id: 20, word: "Do a report", spanish: "Hacer un informe", category: "Negocios", type: 'DO', context: "Entorno profesional" },
  { id: 21, word: "Do an analysis", spanish: "Hacer un análisis", category: "Negocios", type: 'DO', context: "Entorno profesional" },
  { id: 22, word: "Do accounting", spanish: "Llevar la contabilidad", category: "Negocios", type: 'DO', context: "Entorno profesional" },
  { id: 23, word: "Do paperwork", spanish: "Hacer papeleo", category: "Negocios", type: 'DO', context: "Entorno profesional" },
  { id: 24, word: "Do a presentation", spanish: "Hacer una presentación", category: "Negocios", type: 'DO', context: "Entorno profesional" },
  { id: 25, word: "Do a meeting", spanish: "Tener una reunión", category: "Negocios", type: 'DO', context: "Entorno profesional" },
  { id: 26, word: "Do an interview", spanish: "Conceder una entrevista", category: "Negocios", type: 'DO', context: "Entorno profesional" },
  // DO - Reparaciones
  { id: 27, word: "Do repairs", spanish: "Hacer reparaciones", category: "Manual", type: 'DO', context: "Trabajo manual" },
  { id: 28, word: "Do maintenance", spanish: "Hacer mantenimiento", category: "Manual", type: 'DO', context: "Trabajo manual" },
  { id: 29, word: "Do the fixing", spanish: "Hacer arreglos", category: "Manual", type: 'DO', context: "Trabajo manual" },
  { id: 30, word: "Do adjustments", spanish: "Hacer ajustes", category: "Manual", type: 'DO', context: "Trabajo manual" },
  { id: 31, word: "Do the setup", spanish: "Hacer la configuración", category: "Manual", type: 'DO', context: "Trabajo manual" },
  { id: 32, word: "Do installation", spanish: "Hacer la instalación", category: "Manual", type: 'DO', context: "Trabajo manual" },
  { id: 33, word: "Do the work", spanish: "Hacer el trabajo", category: "Manual", type: 'DO', context: "Trabajo manual" },
  { id: 34, word: "Do construction", spanish: "Hacer obras / construcción", category: "Manual", type: 'DO', context: "Trabajo manual" },
  { id: 35, word: "Do improvements", spanish: "Hacer mejoras", category: "Manual", type: 'DO', context: "Trabajo manual" },
  { id: 36, word: "Do modifications", spanish: "Hacer modificaciones", category: "Manual", type: 'DO', context: "Trabajo manual" },
  // DO - Morales
  { id: 37, word: "Do good / Do right", spanish: "Hacer el bien", category: "Morales", type: 'DO', context: "Comportamiento" },
  { id: 38, word: "Do a favor", spanish: "Hacer un favor", category: "Morales", type: 'DO', context: "Comportamiento" },
  { id: 39, word: "Do the right thing", spanish: "Hacer lo correcto", category: "Morales", type: 'DO', context: "Comportamiento" },

  // MAKE - Manos
  { id: 40, word: "Make a sandwich", spanish: "Hacer un sándwich", category: "Comida", type: 'MAKE', context: "Creación física" },
  { id: 41, word: "Make a cake", spanish: "Hacer un pastel / torta", category: "Comida", type: 'MAKE', context: "Creación física" },
  { id: 42, word: "Make dinner", spanish: "Hacer la cena", category: "Comida", type: 'MAKE', context: "Creación física" },
  { id: 43, word: "Make breakfast", spanish: "Hacer el desayuno", category: "Comida", type: 'MAKE', context: "Creación física" },
  { id: 44, word: "Make coffee", spanish: "Hacer café", category: "Bebida", type: 'MAKE', context: "Creación física" },
  { id: 45, word: "Make a pizza", spanish: "Hacer una pizza", category: "Comida", type: 'MAKE', context: "Creación física" },
  { id: 46, word: "Make galletas", spanish: "Hacer galletas", category: "Comida", type: 'MAKE', context: "Creación física" },
  // MAKE - Cabeza
  { id: 47, word: "Make a plan", spanish: "Hacer un plan", category: "Mente", type: 'MAKE', context: "Creación abstracta" },
  { id: 48, word: "Make a suggestion", spanish: "Hacer una sugerencia", category: "Mente", type: 'MAKE', context: "Creación abstracta" },
  { id: 49, word: "Make a comment", spanish: "Hacer un comentario", category: "Mente", type: 'MAKE', context: "Creación abstracta" },
  // MAKE - Abstracto
  { id: 50, word: "Make love", spanish: "Hacer el amor", category: "Relación", type: 'MAKE', context: "Conceptos intangibles" },
  { id: 51, word: "Make an effort", spanish: "Hacer un esfuerzo", category: "Acción", type: 'MAKE', context: "Conceptos intangibles" },
  { id: 52, word: "Make a promise", spanish: "Hacer una promesa", category: "Acción", type: 'MAKE', context: "Conceptos intangibles" },
  // MAKE - Emociones
  { id: 53, word: "Make someone happy", spanish: "Hacer a alguien feliz", category: "Emociones", type: 'MAKE', context: "Causar sentimientos" },
  { id: 54, word: "Make cry", spanish: "Hacer llorar", category: "Emociones", type: 'MAKE', context: "Causar sentimientos" },
  { id: 55, word: "Make laugh", spanish: "Hacer reír", category: "Emociones", type: 'MAKE', context: "Causar sentimientos" }
];
