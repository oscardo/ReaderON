export interface PhrasalVerbOn {
  id: number;
  word: string;
  pronunciation: string;
  spanish: string;
  meaning: string;
  category: string;
}

export const PHRASAL_VERBS_ON: PhrasalVerbOn[] = [
  { id: 1, word: "On the move", pronunciation: "/ɒn ðə muːv/", spanish: "En movimiento", meaning: "Algo que no está estático; está fluyendo ahora.", category: "EN ESTE MOMENTO / ACTIVO AHORA" },
  { id: 2, word: "On the rise", pronunciation: "/ɒn ðə raɪz/", spanish: "En ascenso", meaning: "Algo que está subiendo (precios, niveles, éxito).", category: "EN ESTE MOMENTO / ACTIVO AHORA" },
  { id: 3, word: "On the run", pronunciation: "/ɒn ðə rʌn/", spanish: "Huyendo", meaning: "Alguien que está escapando activamente en este instante.", category: "EN ESTE MOMENTO / ACTIVO AHORA" },
  { id: 4, word: "On fire", pronunciation: "/ɒn faɪər/", spanish: "Ardiendo", meaning: "Literalmente quemándose o figuradamente 'en racha'.", category: "EN ESTE MOMENTO / ACTIVO AHORA" },
  { id: 5, word: "On duty", pronunciation: "/ɒn ˈdjuːti/", spanish: "Trabajando / De turno", meaning: "Estar conectado con tus obligaciones laborales ahora.", category: "EN ESTE MOMENTO / ACTIVO AHORA" },
  { id: 6, word: "On sale", pronunciation: "/ɒn seɪl/", spanish: "En venta / En oferta", meaning: "Un artículo que está disponible para compra ahora mismo.", category: "EN ESTE MOMENTO / ACTIVO AHORA" },

  { id: 7, word: "The cat is on the table", pronunciation: "/ðə kæt ɪz ɒn ðə ˈteɪbl/", spanish: "El gato está sobre la mesa", meaning: "Hay contacto físico entre el gato y la superficie.", category: "SOBRE / PONERSE (CONTACTO FÍSICO)" },
  { id: 8, word: "Put on a jacket", pronunciation: "/pʊt ɒn ə ˈdʒækɪt/", spanish: "Ponerse una chaqueta", meaning: "Llevar la prenda hacia tu cuerpo para que haga contacto.", category: "SOBRE / PONERSE (CONTACTO FÍSICO)" },
  { id: 9, word: "Put on makeup", pronunciation: "/pʊt ɒn ˈmeɪkʌp/", spanish: "Maquillarse", meaning: "Aplicar producto sobre la superficie de la piel.", category: "SOBRE / PONERSE (CONTACTO FÍSICO)" },
  { id: 10, word: "Put on sunscreen", pronunciation: "/pʊt ɒn ˈsʌnskriːn/", spanish: "Ponerse bloqueador", meaning: "Activar la protección sobre el cuerpo.", category: "SOBRE / PONERSE (CONTACTO FÍSICO)" },
  { id: 11, word: "Put on shoes", pronunciation: "/pʊt ɒn ʃuːz/", spanish: "Ponerse los zapatos", meaning: "Ajustar el calzado para que esté 'activo' en tus pies.", category: "SOBRE / PONERSE (CONTACTO FÍSICO)" },

  { id: 12, word: "Get on the bus", pronunciation: "/ɡet ɒn ðə bʌs/", spanish: "Subirse al bus", meaning: "Entrar en contacto con la plataforma del bus.", category: "TRANSPORTE (SUPERFICIE / MOVIMIENTO)" },
  { id: 13, word: "Get on the train", pronunciation: "/ɡet ɒn ðə treɪn/", spanish: "Subirse al tren", meaning: "Entrar al vagón (superficie grande).", category: "TRANSPORTE (SUPERFICIE / MOVIMIENTO)" },
  { id: 14, word: "Get on a plane", pronunciation: "/ɡet ɒn ə pleɪn/", spanish: "Subirse a un avión", meaning: "Abordar la aeronave.", category: "TRANSPORTE (SUPERFICIE / MOVIMIENTO)" },
  { id: 15, word: "Get on the bike", pronunciation: "/ɡet ɒn ðə baɪk/", spanish: "Montarse en la bici", meaning: "Ponerse sobre el sillín (contacto directo).", category: "TRANSPORTE (SUPERFICIE / MOVIMIENTO)" },
  { id: 16, word: "Get on the rollercoaster", pronunciation: "/ɡet ɒn ðə ˈrəʊləkəʊstə/", spanish: "Subirse a la montaña rusa", meaning: "Entrar en el coche de la atracción.", category: "TRANSPORTE (SUPERFICIE / MOVIMIENTO)" },

  { id: 17, word: "Get on", pronunciation: "/ɡet ɒn/", spanish: "Subirse", meaning: "La forma estándar para bus, tren o avión.", category: "TRANSPORTE (SUPERFICIE / MOVIMIENTO)" },
  { id: 18, word: "Hop on", pronunciation: "/hɒp ɒn/", spanish: "Subirse de un salto", meaning: "Dar un pequeño brinco para subir rápido al bus.", category: "TRANSPORTE (SUPERFICIE / MOVIMIENTO)" },
  { id: 19, word: "Climb on", pronunciation: "/klaɪm ɒn/", spanish: "Subirse trepando", meaning: "Usar fuerza para subir (ej. a la parte trasera de un camión).", category: "TRANSPORTE (SUPERFICIE / MOVIMIENTO)" },
  { id: 20, word: "Jump on", pronunciation: "/dʒʌmp ɒn/", spanish: "Saltar a", meaning: "Subir con mucha prisa o impulso (ej. al tren en marcha).", category: "TRANSPORTE (SUPERFICIE / MOVIMIENTO)" },
  { id: 21, word: "Board on", pronunciation: "/bɔːrd ɒn/", spanish: "Abordar", meaning: "Un término más formal para barcos o aviones.", category: "TRANSPORTE (SUPERFICIE / MOVIMIENTO)" },
  { id: 22, word: "Step on", pronunciation: "/step ɒn/", spanish: "Pisar / Subir de un paso", meaning: "Poner el pie en la plataforma del vehículo.", category: "TRANSPORTE (SUPERFICIE / MOVIMIENTO)" },
  { id: 23, word: "Ride on", pronunciation: "/raɪd ɒn/", spanish: "Montar en", meaning: "Ir sobre algo que se mueve (bici, moto, caballo).", category: "TRANSPORTE (SUPERFICIE / MOVIMIENTO)" },

  { id: 24, word: "Carry on", pronunciation: "/ˈkæri ɒn/", spanish: "Continuar", meaning: "Seguir adelante a pesar de las dificultades.", category: "CONTINUIDAD O SEGUIR" },
  { id: 25, word: "Keep on", pronunciation: "/kiːp ɒn/", spanish: "Seguir haciendo algo", meaning: "No dejar de realizar una acción repetitiva.", category: "CONTINUIDAD O SEGUIR" },
  { id: 26, word: "Press on", pronunciation: "/pres ɒn/", spanish: "Persistir", meaning: "Seguir avanzando con determinación y 'presión'.", category: "CONTINUIDAD O SEGUIR" },
  { id: 27, word: "Go on", pronunciation: "/ɡəʊ ɒn/", spanish: "Continuar / Suceder", meaning: "Que la vida o la acción sigan su curso.", category: "CONTINUIDAD O SEGUIR" },
  { id: 28, word: "Hang on", pronunciation: "/hæŋ ɒn/", spanish: "Continuar esperando", meaning: "Mantenerse 'colgado' de la línea o la espera.", category: "CONTINUIDAD O SEGUIR" },
  { id: 29, word: "Hold on", pronunciation: "/həʊld ɒn/", spanish: "Esperar / Mantenerse firme", meaning: "Aguantar un momento o sostenerse con fuerza.", category: "CONTINUIDAD O SEGUIR" },
  { id: 30, word: "Stay on", pronunciation: "/steɪ ɒn/", spanish: "Permanecer", meaning: "No irse, quedarse activo en un lugar o puesto.", category: "CONTINUIDAD O SEGUIR" },
  { id: 31, word: "Run on", pronunciation: "/rʌn ɒn/", spanish: "Continuar funcionando", meaning: "Seguir operando (ej. un motor o una idea).", category: "CONTINUIDAD O SEGUIR" },

  { id: 32, word: "Focus on", pronunciation: "/ˈfəʊkəs ɒn/", spanish: "Enfocarse en", meaning: "Poner toda tu 'lente' mental sobre un solo punto.", category: "ENFOCADO / ATENCIÓN / INTELIGENCIA" },
  { id: 33, word: "Concentrate on", pronunciation: "/ˈkɒnsntreɪt ɒn/", spanish: "Concentrarse en", meaning: "Mantener la atención fija, sin distracciones.", category: "ENFOCADO / ATENCIÓN / INTELIGENCIA" },
  { id: 34, word: "Insist on", pronunciation: "/ɪnˈsɪst ɒn/", spanish: "Insistir en", meaning: "Mantenerse firme en una posición o demanda.", category: "ENFOCADO / ATENCIÓN / INTELIGENCIA" },
  { id: 35, word: "Rely on", pronunciation: "/rɪˈlaɪ ɒn/", spanish: "Confiar / Depender de", meaning: "Poner tu seguridad 'sobre' alguien o algo.", category: "ENFOCADO / ATENCIÓN / INTELIGENCIA" },
  { id: 36, word: "Work on", pronunciation: "/wɜːrk ɒn/", spanish: "Trabajar en algo", meaning: "Dedicar esfuerzo activo a un proyecto o tarea.", category: "ENFOCADO / ATENCIÓN / INTELIGENCIA" },
  { id: 37, word: "Act on", pronunciation: "/ækt ɒn/", spanish: "Actuar en relación a", meaning: "Tomar medidas basadas en información recibida.", category: "ENFOCADO / ATENCIÓN / INTELIGENCIA" },
  { id: 38, word: "Agree on", pronunciation: "/əˈɡriː ɒn/", spanish: "Estar de acuerdo en", meaning: "Encontrar un punto común donde ambas mentes se 'posan'.", category: "ENFOCADO / ATENCIÓN / INTELIGENCIA" },
  { id: 39, word: "Answer on", pronunciation: "/ˈɑːnsər ɒn/", spanish: "Responder sobre algo", meaning: "Dar una explicación específica sobre un tema.", category: "ENFOCADO / ATENCIÓN / INTELIGENCIA" },
  { id: 40, word: "Bank on", pronunciation: "/bæŋk ɒn/", spanish: "Contar con / Confiar", meaning: "Apostar a que algo sucederá (como confiar en un banco).", category: "ENFOCADO / ATENCIÓN / INTELIGENCIA" },
  { id: 41, word: "Depend on", pronunciation: "/dɪˈpend ɒn/", spanish: "Depender de", meaning: "Estar condicionado por algo externo para funcionar.", category: "ENFOCADO / ATENCIÓN / INTELIGENCIA" },
  { id: 42, word: "Live on", pronunciation: "/lɪv ɒn/", spanish: "Vivir de (un recurso)", meaning: "Mantenerse activo gracias a un ingreso o alimento.", category: "ENFOCADO / ATENCIÓN / INTELIGENCIA" },
  { id: 43, word: "Count on", pronunciation: "/kaʊnt ɒn/", spanish: "Contar con alguien", meaning: "Saber que tienes el apoyo de alguien en quien confías.", category: "ENFOCADO / ATENCIÓN / INTELIGENCIA" },

  { id: 44, word: "Touch on", pronunciation: "/tʌtʃ ɒn/", spanish: "Abordar (un tema)", meaning: "Tocar un punto clave con atención.", category: "INTELIGENCIA" },
  { id: 45, word: "Check on", pronunciation: "/tʃek ɒn/", spanish: "Verificar / Revisar", meaning: "Poner atención sobre algo o alguien.", category: "INTELIGENCIA" },
  { id: 46, word: "Deal on", pronunciation: "/diːl ɒn/", spanish: "Acordar sobre algo", meaning: "Enfocarse en cerrar un trato.", category: "INTELIGENCIA" },
  
  { id: 47, word: "Turn on", pronunciation: "/tɜːrn ɒn/", spanish: "Encender", meaning: "Activar un dispositivo o luz.", category: "ENCENDER" },
  { id: 48, word: "Switch on", pronunciation: "/swɪtʃ ɒn/", spanish: "Encender (interruptor)", meaning: "Accionar el paso de energía.", category: "ENCENDER" },
  { id: 49, word: "Log on", pronunciation: "/lɒɡ ɒn/", spanish: "Iniciar sesión", meaning: "Conectarse a un sistema o red.", category: "ENCENDER" },
  
  { id: 50, word: "Move on", pronunciation: "/muːv ɒn/", spanish: "Continuar / Pasar a otro tema", meaning: "No estancarse, avanzar al siguiente punto.", category: "SEGUIR" }
];
