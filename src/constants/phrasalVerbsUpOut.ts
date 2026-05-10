export interface PhrasalVerbUpOut {
  id: number;
  word: string;
  pronunciation: string;
  spanish: string;
  meaning: string; // Used for the "Algo para recordar" / hint
  category: string;
}

export const PHRASAL_VERBS_UP_OUT: PhrasalVerbUpOut[] = [
  // UP = INTENSIÓN, MÁS, TODO!
  { id: 1, word: 'Clean up', pronunciation: '/kliːn ʌp/', spanish: 'Limpiar completamente', meaning: 'Piensa en "limpieza profunda", no solo pasar el trapo.', category: 'UP' },
  { id: 2, word: 'Finish up', pronunciation: '/ˈfɪnɪʃ ʌp/', spanish: 'Terminar completamente', meaning: 'Es dar los últimos toques para cerrar un ciclo.', category: 'UP' },
  { id: 3, word: 'Wake up', pronunciation: '/weɪk ʌp/', spanish: 'Despertarse', meaning: 'El proceso de "subir" de la inconsciencia al estado alerta.', category: 'UP' },
  { id: 4, word: 'Stand up', pronunciation: '/stænd ʌp/', spanish: 'Ponerse de pie', meaning: 'Movimiento físico hacia arriba.', category: 'UP' },
  { id: 5, word: 'Sit up', pronunciation: '/sɪt ʌp/', spanish: 'Sentarse derecho', meaning: '"Subir" la postura para estar erguido.', category: 'UP' },
  { id: 6, word: 'Speed up', pronunciation: '/spiːd ʌp/', spanish: 'Acelerar', meaning: 'Ir a "más" velocidad.', category: 'UP' },
  { id: 7, word: 'Open up', pronunciation: '/ˈəʊpən ʌp/', spanish: 'Abrir completamente / Sincerarse', meaning: 'Abrir algo del todo o abrir el corazón.', category: 'UP' },
  { id: 8, word: 'Dress up', pronunciation: '/dres ʌp/', spanish: 'Vestirse elegantemente', meaning: '"Subir" el nivel de tu ropa (disfraz o gala).', category: 'UP' },
  { id: 9, word: 'Hurry up', pronunciation: '/ˈhʌri ʌp/', spanish: 'Apurarse', meaning: 'Meterle "más" prisa a lo que haces.', category: 'UP' },
  { id: 10, word: 'Fill up', pronunciation: '/fɪl ʌp/', spanish: 'Llenar completamente', meaning: 'Hasta el tope, que ya no quepa "más".', category: 'UP' },
  { id: 11, word: 'Break up', pronunciation: '/breɪk ʌp/', spanish: 'Terminar (relación)', meaning: 'Romper en pedazos algo que estaba unido.', category: 'UP' },
  { id: 12, word: 'Tie up', pronunciation: '/taɪ ʌp/', spanish: 'Atar completamente', meaning: 'Dejar algo bien asegurado con nudos.', category: 'UP' },
  { id: 13, word: 'Tidy up', pronunciation: '/ˈtaɪdi ʌp/', spanish: 'Ordenar completamente', meaning: 'Poner cada cosa en su lugar de forma impecable.', category: 'UP' },
  { id: 14, word: 'Call up', pronunciation: '/kɔːl ʌp/', spanish: 'Llamar por teléfono', meaning: 'Imagina "levantar" el teléfono para marcar.', category: 'UP' },
  { id: 15, word: 'Clear up', pronunciation: '/klɪər ʌp/', spanish: 'Aclarar (confusión/clima)', meaning: 'Cuando las nubes o dudas se "van hacia arriba" y sale el sol.', category: 'UP' },
  { id: 16, word: 'Warm up', pronunciation: '/wɔːm ʌp/', spanish: 'Calentar (antes de actividad)', meaning: '"Subir" la temperatura del cuerpo.', category: 'UP' },
  { id: 17, word: 'Lock up', pronunciation: '/lɒk ʌp/', spanish: 'Cerrar con llave / Asegurar', meaning: 'Cerrar todo para que quede totalmente protegido.', category: 'UP' },
  { id: 18, word: 'Speak up', pronunciation: '/spiːk ʌp/', spanish: 'Hablar más fuerte / Opinar', meaning: '"Subir" el volumen de tu voz.', category: 'UP' },
  { id: 19, word: 'Check up', pronunciation: '/tʃek ʌp/', spanish: 'Chequeo médico / Revisión', meaning: 'Una revisión completa de pies a cabeza.', category: 'UP' },

  // OUT = SALIR, SACAR, AFUERA
  { id: 20, word: 'Go out', pronunciation: '/ɡəʊ aʊt/', spanish: 'Salir', meaning: 'Ir de adentro hacia afuera (ej. salir de fiesta).', category: 'OUT - SALIR/AFUERA' },
  { id: 21, word: 'Get out', pronunciation: '/ɡet aʊt/', spanish: 'Salir / Escapar', meaning: 'Lograr salir de un lugar cerrado o vehículo.', category: 'OUT - SALIR/AFUERA' },
  { id: 22, word: 'Come out', pronunciation: '/kʌm aʊt/', spanish: 'Salir (hacia aquí)', meaning: 'Cuando algo sale de donde estaba escondido o guardado.', category: 'OUT - SALIR/AFUERA' },
  { id: 23, word: 'Move out', pronunciation: '/muːv aʊt/', spanish: 'Mudarse (irse)', meaning: 'Sacar tus cosas de una casa para vivir en otra.', category: 'OUT - SALIR/AFUERA' },
  { id: 24, word: 'Back out', pronunciation: '/bæk aʊt/', spanish: 'Retroceder / Arrepentirse', meaning: 'Salir de un compromiso o retroceder el auto.', category: 'OUT - SALIR/AFUERA' },
  { id: 25, word: 'Pop out', pronunciation: '/pɒp aʊt/', spanish: 'Salir de repente', meaning: 'Como una palomita de maíz saliendo de la olla.', category: 'OUT - SALIR/AFUERA' },
  { id: 26, word: 'Climb out', pronunciation: '/klaɪm aʊt/', spanish: 'Salir trepando', meaning: 'Salir de un lugar (como un pozo) usando pies y manos.', category: 'OUT - SALIR/AFUERA' },
  { id: 27, word: 'Break out', pronunciation: '/breɪk aʊt/', spanish: 'Fugarse / Estallar', meaning: 'Salir a la fuerza (ej. de una prisión o una guerra).', category: 'OUT - SALIR/AFUERA' },
  { id: 28, word: 'Bring out', pronunciation: '/brɪŋ aʊt/', spanish: 'Sacar / Hacer relucir', meaning: 'Traer algo desde adentro hacia la vista de todos.', category: 'OUT - SALIR/AFUERA' },
  { id: 29, word: 'Hand out', pronunciation: '/hænd aʊt/', spanish: 'Repartir / Entregar', meaning: 'Pasar cosas de tu mano a las manos de otros (afuera).', category: 'OUT - SALIR/AFUERA' },
  { id: 30, word: 'Take out', pronunciation: '/teɪk aʊt/', spanish: 'Sacar / Llevar fuera', meaning: 'Tomar algo y ponerlo en el exterior (ej. sacar la basura).', category: 'OUT - SALIR/AFUERA' },
  { id: 31, word: 'Throw out', pronunciation: '/θrəʊ aʊt/', spanish: 'Tirar / Expulsar', meaning: 'Lanzar algo hacia afuera porque ya no sirve.', category: 'OUT - SALIR/AFUERA' },
  { id: 32, word: 'Leave out', pronunciation: '/liːv aʊt/', spanish: 'Excluir / Omitir', meaning: 'Dejar algo fuera de una lista o de un grupo.', category: 'OUT - SALIR/AFUERA' },
  { id: 33, word: 'Eat out', pronunciation: '/iːt aʊt/', spanish: 'Comer fuera', meaning: 'Salir de casa para comer en un restaurante.', category: 'OUT - SALIR/AFUERA' },

  // OUT = DE MANERA EXTRAORDINARIA
  { id: 34, word: 'Help out', pronunciation: '/help aʊt/', spanish: 'Ayudar (en un apuro)', meaning: 'No es solo ayudar, es "echar una mano" en una situación específica.', category: 'OUT - EXTRAORDINARIA' },
  { id: 35, word: 'Hear out', pronunciation: '/hɪər aʊt/', spanish: 'Escuchar hasta el final', meaning: 'Escuchar a alguien "completamente" antes de juzgar.', category: 'OUT - EXTRAORDINARIA' },
  { id: 36, word: 'Freak out', pronunciation: '/friːk aʊt/', spanish: 'Volverse loco / Asustarse', meaning: 'Una reacción emocional que se desborda hacia afuera.', category: 'OUT - EXTRAORDINARIA' },
  { id: 37, word: 'Look out', pronunciation: '/lʊk aʊt/', spanish: 'Ver con cuidado / ¡Cuidado!', meaning: 'Proyectar la vista hacia afuera para detectar un peligro.', category: 'OUT - EXTRAORDINARIA' },
  { id: 38, word: 'Watch out', pronunciation: '/wɒtʃ aʊt/', spanish: 'Ver con cuidado / Vigilar', meaning: 'Estar en alerta máxima sobre lo que sucede afuera.', category: 'OUT - EXTRAORDINARIA' },
  { id: 39, word: 'Check out', pronunciation: '/tʃek aʊt/', spanish: 'Revisar / Mirar algo', meaning: 'Salir de la duda examinando algo con atención.', category: 'OUT - EXTRAORDINARIA' },
  { id: 40, word: 'Search out', pronunciation: '/sɜːrtʃ aʊt/', spanish: 'Investigar / Localizar', meaning: 'Buscar algo que es difícil de encontrar hasta hallarlo.', category: 'OUT - EXTRAORDINARIA' },
  { id: 41, word: 'Seek out', pronunciation: '/siːk aʊt/', spanish: 'Buscar activamente', meaning: 'Ir tras algo de manera deliberada y extraordinaria.', category: 'OUT - EXTRAORDINARIA' },
  { id: 42, word: 'Try out', pronunciation: '/traɪ aʊt/', spanish: 'Probar / Poner a prueba', meaning: 'Probar algo para ver si funciona "en el mundo exterior".', category: 'OUT - EXTRAORDINARIA' },
  { id: 43, word: 'Point out', pronunciation: '/pɔɪnt aʊt/', spanish: 'Señalar / Indicar', meaning: 'Hacer que algo destaque para que los demás lo vean.', category: 'OUT - EXTRAORDINARIA' },

  // OUT = SALIR DE TI / CON FUERZA
  { id: 44, word: 'Fill out', pronunciation: '/fɪl aʊt/', spanish: 'Completar (un formulario)', meaning: '"Sacar" la información de tu cabeza y ponerla en el papel.', category: 'OUT - CON FUERZA' },
  { id: 45, word: 'Write out', pronunciation: '/raɪt aʊt/', spanish: 'Escribir (detalladamente)', meaning: 'Escribir algo por completo, de principio a fin.', category: 'OUT - CON FUERZA' },
  { id: 46, word: 'Opt out', pronunciation: '/ɒpt aʊt/', spanish: 'Excluirse / Decidir no participar', meaning: 'La fuerza de decidir "salirse" de un grupo o plan.', category: 'OUT - CON FUERZA' },
  { id: 47, word: 'Find out', pronunciation: '/faɪnd aʊt/', spanish: 'Descubrir', meaning: 'Cuando la verdad "sale" a la luz y tú la encuentras.', category: 'OUT - CON FUERZA' },
  { id: 48, word: 'Figure out', pronunciation: '/ˈfɪɡjər aʊt/', spanish: 'Resolver / Entender', meaning: 'Sacar la solución de un problema después de mucho pensar.', category: 'OUT - CON FUERZA' },
  { id: 49, word: 'Pick out', pronunciation: '/pɪk aʊt/', spanish: 'Seleccionar / Distinguir', meaning: 'Elegir algo con fuerza entre muchas opciones.', category: 'OUT - CON FUERZA' },
  { id: 50, word: 'Sort out', pronunciation: '/sɔːrt aʊt/', spanish: 'Ordenar / Resolver un lío', meaning: 'Poner orden a un caos para que la solución "salga".', category: 'OUT - CON FUERZA' },
  { id: 51, word: 'Work out', pronunciation: '/wɜːrk aʊt/', spanish: 'Ejercitar / Funcionar', meaning: 'Sacar la energía física o lograr que un plan resulte bien.', category: 'OUT - CON FUERZA' },
  { id: 52, word: 'Scream out', pronunciation: '/skriːm aʊt/', spanish: 'Gritar (con fuerza)', meaning: 'Un grito que sale de tus pulmones con mucha potencia.', category: 'OUT - CON FUERZA' },
  { id: 53, word: 'Shout out', pronunciation: '/ʃaʊt aʊt/', spanish: 'Gritar / Dar reconocimiento', meaning: 'Proyectar la voz hacia afuera para que todos oigan.', category: 'OUT - CON FUERZA' },
  { id: 54, word: 'Cry out', pronunciation: '/kraɪ aʊt/', spanish: 'Gritar / Clamar', meaning: 'Un grito o llanto de auxilio que sale con desesperación.', category: 'OUT - CON FUERZA' },
  { id: 55, word: 'Call out', pronunciation: '/kɔːl aʊt/', spanish: 'Llamar / Exponer a alguien', meaning: 'Decir un nombre en voz alta o señalar el error de alguien.', category: 'OUT - CON FUERZA' },
  { id: 56, word: 'Speak out', pronunciation: '/spiːk aʊt/', spanish: 'Hablar abiertamente', meaning: 'Salir del silencio para defender una opinión con fuerza.', category: 'OUT - CON FUERZA' },

  // OUT = AGOTARSE, LLEGAR A SU LÍMITE, ELIMINADO
  { id: 57, word: 'Stress out', pronunciation: '/stres aʊt/', spanish: 'Estresarse', meaning: 'Cuando tu paciencia y energía mental llegan al límite.', category: 'OUT - LÍMITE/AGOTADO' },
  { id: 58, word: 'Burn out', pronunciation: '/bɜːrn aʊt/', spanish: 'Agotarse (por exceso de trabajo)', meaning: 'Como una vela que se quema hasta que no queda nada.', category: 'OUT - LÍMITE/AGOTADO' },
  { id: 59, word: 'Sell out', pronunciation: '/sel aʊt/', spanish: 'Agotarse (ventas)', meaning: 'Cuando ya no queda ni un solo producto en la tienda.', category: 'OUT - LÍMITE/AGOTADO' },
  { id: 60, word: 'Wear out', pronunciation: '/wer aʊt/', spanish: 'Desgastarse', meaning: 'Algo que se usa tanto que queda inservible (ej. unos zapatos).', category: 'OUT - LÍMITE/AGOTADO' },
  { id: 61, word: 'Run out', pronunciation: '/rʌn aʊt/', spanish: 'Agotarse (quedarse sin algo)', meaning: 'Cuando el contador llega a cero (ej. quedarse sin leche o tiempo).', category: 'OUT - LÍMITE/AGOTADO' },
  { id: 62, word: 'Knock out', pronunciation: '/nɒk aʊt/', spanish: 'Noquearse', meaning: 'Quedar fuera de combate o inconsciente (fuera de juego).', category: 'OUT - LÍMITE/AGOTADO' },
  { id: 63, word: 'Pass out', pronunciation: '/pæs aʊt/', spanish: 'Desmayarse', meaning: 'Perder el conocimiento, "salirse" de la conciencia.', category: 'OUT - LÍMITE/AGOTADO' },
  { id: 64, word: 'Blow out', pronunciation: '/bləʊ aʊt/', spanish: 'Explotar / Apagar soplando', meaning: 'Una llanta que llega a su límite o una vela que se extingue.', category: 'OUT - LÍMITE/AGOTADO' },
  { id: 65, word: 'Wipe out', pronunciation: '/waɪp aʊt/', spanish: 'Aniquilarse / Borrar del mapa', meaning: 'Eliminar algo por completo, como si nunca hubiera existido.', category: 'OUT - LÍMITE/AGOTADO' },
  { id: 66, word: 'Put out', pronunciation: '/pʊt aʊt/', spanish: 'Apagarse (fuego/luz)', meaning: 'Eliminar la llama o la fuente de luz.', category: 'OUT - LÍMITE/AGOTADO' },

  // OUT = QUITAR / SACAR
  { id: 67, word: 'Tear out', pronunciation: '/ter aʊt/', spanish: 'Rasgar / Arrancar', meaning: 'Arrancar una hoja de un cuaderno (sacándola del bloque).', category: 'OUT - QUITAR/SACAR' },
  { id: 68, word: 'Clean out', pronunciation: '/kliːn aʊt/', spanish: 'Limpiar (vaciando)', meaning: 'No solo limpiar la superficie, sino sacar todo lo que hay dentro.', category: 'OUT - QUITAR/SACAR' },
  { id: 69, word: 'Wash out', pronunciation: '/wɒʃ aʊt/', spanish: 'Lavar (para quitar mancha)', meaning: 'Usar agua para "sacar" la suciedad de un tejido.', category: 'OUT - QUITAR/SACAR' },
  { id: 70, word: 'Cut out', pronunciation: '/kʌt aʊt/', spanish: 'Recortar / Eliminar', meaning: 'Quitar una pieza de un papel o eliminar un hábito (ej. azúcar).', category: 'OUT - QUITAR/SACAR' },
  { id: 71, word: 'Dry out', pronunciation: '/draɪ aʊt/', spanish: 'Secar', meaning: 'Quitar toda la humedad de algo hasta que quede seco.', category: 'OUT - QUITAR/SACAR' }
];
