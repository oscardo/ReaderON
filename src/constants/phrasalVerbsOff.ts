export interface PhrasalVerbOff {
  id: number;
  word: string;
  pronunciation: string;
  spanish: string;
  meaning: string; // Used for "Algo para recordar"
  category: string;
}

export const PHRASAL_VERBS_OFF: PhrasalVerbOff[] = [
  // 1. OFF = SEPARACIÓN FÍSICA (CAER O SALTAR)
  { id: 1, word: 'Fall off the swing', pronunciation: '/fɔːl ɒf ðə swɪŋ/', spanish: 'Caerse del columpio', meaning: 'Te "separas" del asiento del columpio.', category: 'SEPARACIÓN FÍSICA' },
  { id: 2, word: 'Fall off the bicycle', pronunciation: '/fɔːl ɒf ðə ˈbaɪsɪkl/', spanish: 'Caerse de la bicicleta', meaning: 'Pierdes el contacto con el sillín o los pedales.', category: 'SEPARACIÓN FÍSICA' },
  { id: 3, word: 'Fall off the ladder', pronunciation: '/fɔːl ɒf ðə ˈlædə/', spanish: 'Caerse de la escalera', meaning: 'Muy bien: es una caída desde un objeto móvil.', category: 'SEPARACIÓN FÍSICA' },
  { id: 4, word: 'Jump off the rock', pronunciation: '/dʒʌmp ɒf ðə rɒk/', spanish: 'Saltar de la roca', meaning: 'Un salto voluntario para "separarte" de la piedra.', category: 'SEPARACIÓN FÍSICA' },
  { id: 5, word: 'Jump off the bridge', pronunciation: '/dʒʌmp ɒf ðə brɪdʒ/', spanish: 'Saltar de un puente', meaning: 'Movimiento desde la estructura hacia el vacío.', category: 'SEPARACIÓN FÍSICA' },
  { id: 6, word: 'Jump off the building', pronunciation: '/dʒʌmp ɒf ðə ˈbɪldɪŋ/', spanish: 'Saltar de un edificio', meaning: 'Dejar la superficie del edificio.', category: 'SEPARACIÓN FÍSICA' },

  // 2. OFF = SEPARACIÓN TOTAL (CORTAR / AMPUTAR)
  { id: 7, word: 'Cut off your finger', pronunciation: '/kʌt ɒf jər ˈfɪŋɡə/', spanish: 'Cortarte un dedo', meaning: 'El dedo queda separado de la mano.', category: 'SEPARACIÓN TOTAL' },
  { id: 8, word: 'Cut off the branch', pronunciation: '/kʌt ɒf ðə bræntʃ/', spanish: 'Cortar la rama', meaning: 'La rama ya no forma parte del árbol.', category: 'SEPARACIÓN TOTAL' },
  { id: 9, word: 'Cut off her hair', pronunciation: '/kʌt ɒf hə her/', spanish: 'Cortarle el cabello', meaning: 'El cabello se desprende de la cabeza.', category: 'SEPARACIÓN TOTAL' },
  { id: 10, word: 'Cut off his leg', pronunciation: '/kʌt ɒf hɪz leɡ/', spanish: 'Cortarle la pierna', meaning: 'Separación total de la extremidad.', category: 'SEPARACIÓN TOTAL' },

  // 3 & 4. OFF = DESACTIVACIÓN / ALEJARSE / SONAR
  { id: 11, word: 'Turn off', pronunciation: '/tɜːrn ɒf/', spanish: 'Apagar / Desactivar', meaning: 'El estándar para luces y dispositivos con interruptor.', category: 'DESACTIVACIÓN' },
  { id: 12, word: 'Take off', pronunciation: '/teɪk ɒf/', spanish: 'Despegar / Quitarse', meaning: 'El avión se separa del suelo; la ropa se separa del cuerpo.', category: 'DESACTIVACIÓN' },
  { id: 13, word: 'Keep off', pronunciation: '/kiːp ɒf/', spanish: 'Mantenerse alejado', meaning: 'No entrar en contacto con una superficie (ej. el césped).', category: 'DESACTIVACIÓN' },
  { id: 14, word: 'Log off', pronunciation: '/lɒɡ ɒf/', spanish: 'Cerrar sesión', meaning: '"Desconectarse" de un sistema o computadora.', category: 'DESACTIVACIÓN' },
  { id: 15, word: 'Pull off', pronunciation: '/pʊl ɒf/', spanish: 'Desconectar / Lograr', meaning: 'Literalmente "halar" para desconectar (como un generador).', category: 'DESACTIVACIÓN' },
  { id: 16, word: 'Shut off', pronunciation: '/ʃʌt ɒf/', spanish: 'Cerrar / Bloquear', meaning: 'Se usa para flujos constantes como agua, gas o calefacción.', category: 'DESACTIVACIÓN' },
  { id: 17, word: 'Switch off', pronunciation: '/swɪtʃ ɒf/', spanish: 'Apagar (interruptor)', meaning: 'Muy similar a turn off, pero enfatiza la acción del switch.', category: 'DESACTIVACIÓN' },
  { id: 18, word: 'Cut off (Service)', pronunciation: '/kʌt ɒf/', spanish: 'Interrumpir / Cortar', meaning: 'Cuando un servicio se detiene (ej. por falta de pago).', category: 'DESACTIVACIÓN' },
  { id: 19, word: 'Call off', pronunciation: '/kɔːl ɒf/', spanish: 'Cancelar', meaning: 'Desactivar un evento o plan (una reunión, una boda).', category: 'DESACTIVACIÓN' },

  // 5. OFF = SONAR / ESTALLAR (GO OFF)
  { id: 20, word: 'Go off (Alarm)', pronunciation: '/ɡəʊ ɒf/', spanish: 'Sonar (alarma)', meaning: 'Imagina que el sonido "sale" disparado del reloj.', category: 'SONAR / ESTALLAR' },
  { id: 21, word: 'Go off (Bomb)', pronunciation: '/ɡəʊ ɒf/', spanish: 'Estallar / Explotar', meaning: 'Una liberación súbita y violenta de energía.', category: 'SONAR / ESTALLAR' },
  { id: 22, word: 'Go off (Fireworks)', pronunciation: '/ɡəʊ ɒf/', spanish: 'Estallar (fuegos artificiales)', meaning: 'Acción de dispararse y brillar en el cielo.', category: 'SONAR / ESTALLAR' },
  { id: 23, word: 'Go off (Timer)', pronunciation: '/ɡəʊ ɒf/', spanish: 'Sonar (temporizador)', meaning: 'El aviso de que algo (como las galletas) está listo.', category: 'SONAR / ESTALLAR' },
  { id: 24, word: 'Go off (Siren)', pronunciation: '/ɡəʊ ɒf/', spanish: 'Sonar (sirena)', meaning: 'Un sonido de alerta que se activa con fuerza.', category: 'SONAR / ESTALLAR' },
  { id: 25, word: 'Go off (Gun)', pronunciation: '/ɡəʊ ɒf/', spanish: 'Dispararse', meaning: 'El proyectil "sale" del cañón inesperadamente.', category: 'SONAR / ESTALLAR' },

  // 6. OFF = ALEJARSE
  { id: 26, word: 'Back off', pronunciation: '/bæk ɒf/', spanish: 'Retroceder / Alejarse', meaning: 'Dar pasos hacia atrás para alejarse de una situación o persona.', category: 'ALEJARSE' },
  { id: 27, word: 'Move off', pronunciation: '/muːv ɒf/', spanish: 'Quitarse / Apartarse', meaning: 'Dejar de ocupar un lugar físico (como un banco o asiento).', category: 'ALEJARSE' },
  { id: 28, word: 'Step off', pronunciation: '/step ɒf/', spanish: 'Bajarse / Dar un paso fuera', meaning: 'El acto de poner un pie fuera de algo (un bus, una plataforma).', category: 'ALEJARSE' },
  { id: 29, word: 'Walk off', pronunciation: '/wɔːk ɒf/', spanish: 'Irse caminando', meaning: 'Abandonar un lugar a pie, a veces de forma repentina.', category: 'ALEJARSE' },
  { id: 30, word: 'Run off', pronunciation: '/rʌn ɒf/', spanish: 'Salir corriendo / Escapar', meaning: 'Alejarse a toda velocidad, usualmente huyendo con algo.', category: 'ALEJARSE' },
  { id: 31, word: 'Drive off', pronunciation: '/draɪv ɒf/', spanish: 'Irse en coche', meaning: 'Arrancar el vehículo y marcharse del lugar.', category: 'ALEJARSE' },
  { id: 32, word: 'Come off', pronunciation: '/kʌm ɒf/', spanish: 'Salirse / Quitarse', meaning: 'Cuando algo se desprende o tú te alejas de una idea.', category: 'ALEJARSE' }
];
