export interface PhrasalVerbIn {
  id: number;
  word: string;
  pronunciation: string;
  spanish: string;
  meaning: string;
  category: string;
}

export const PHRASAL_VERBS_IN: PhrasalVerbIn[] = [
  // MUDARSE / ENTRAR (MOVIMIENTO FÍSICO)
  { id: 1, word: 'Move in', pronunciation: '/muːv ɪn/', spanish: 'Mudarse (llegar)', meaning: 'Empezar a vivir en una nueva casa.', category: 'MUDARSE / ENTRAR' },
  { id: 2, word: 'Come in', pronunciation: '/kʌm ɪn/', spanish: 'Entrar', meaning: 'El acto de pasar al interior de una habitación.', category: 'MUDARSE / ENTRAR' },
  { id: 3, word: 'Get in', pronunciation: '/ɡet ɪn/', spanish: 'Entrar / Llegar', meaning: 'Entrar en un lugar o vehículo pequeño (como un carro).', category: 'MUDARSE / ENTRAR' },
  { id: 4, word: 'Step in', pronunciation: '/step ɪn/', spanish: 'Entrar (de un paso)', meaning: 'Poner un pie dentro de un lugar.', category: 'MUDARSE / ENTRAR' },
  { id: 5, word: 'Break in', pronunciation: '/breɪk ɪn/', spanish: 'Ingresar a la fuerza', meaning: 'Entrar ilegalmente.', category: 'MUDARSE / ENTRAR' },
  { id: 6, word: 'Slip in', pronunciation: '/slɪp ɪn/', spanish: 'Meterse / Deslizarse', meaning: 'Entrar con cuidado o de forma discreta.', category: 'MUDARSE / ENTRAR' },
  { id: 7, word: 'Let in', pronunciation: '/let ɪn/', spanish: 'Permitir entrar', meaning: 'Dar paso a alguien hacia el interior.', category: 'MUDARSE / ENTRAR' },

  // INCLUSIÓN / LLEGAR A UN GRUPO O ESPACIO
  { id: 8, word: 'Drop in', pronunciation: '/drɒp ɪn/', spanish: 'Llegar de sorpresa', meaning: 'Visitar a alguien sin haber avisado antes.', category: 'INCLUSIÓN' },
  { id: 9, word: 'Check in', pronunciation: '/tʃek ɪn/', spanish: 'Registrar llegada', meaning: 'Reportarse en un hotel, aeropuerto o evento.', category: 'INCLUSIÓN' },
  { id: 10, word: 'Join in', pronunciation: '/dʒɔɪn ɪn/', spanish: 'Unirse', meaning: 'Empezar a participar en una actividad grupal.', category: 'INCLUSIÓN' },
  { id: 11, word: 'Add in', pronunciation: '/æd ɪn/', spanish: 'Agregar', meaning: 'Incluir un elemento extra dentro de un conjunto.', category: 'INCLUSIÓN' },
  { id: 12, word: 'Invite in', pronunciation: '/ɪnˈvaɪt ɪn/', spanish: 'Incluir a alguien', meaning: 'Hacer que alguien pase a formar parte del grupo.', category: 'INCLUSIÓN' },
  { id: 13, word: 'Cut in', pronunciation: '/kʌt ɪn/', spanish: 'Interrumpir', meaning: '"Entrar" en una conversación ajena de repente.', category: 'INCLUSIÓN' },

  // INICIAR (PROCESOS Y SISTEMAS)
  { id: 14, word: 'Log in', pronunciation: '/lɒɡ ɪn/', spanish: 'Iniciar sesión', meaning: 'Entrar a tu cuenta con usuario y clave.', category: 'TECNOLOGÍA' },
  { id: 15, word: 'Sign in', pronunciation: '/saɪn ɪn/', spanish: 'Iniciar sesión', meaning: 'Registrar tu entrada en un sistema o plataforma.', category: 'TECNOLOGÍA' },
  { id: 16, word: 'Tune in', pronunciation: '/tjuːn ɪn/', spanish: 'Sintonizar', meaning: 'Empezar a escuchar o ver una transmisión.', category: 'TECNOLOGÍA' },
  { id: 17, word: 'Kick in', pronunciation: '/kɪk ɪn/', spanish: 'Empezar a funcionar', meaning: 'Cuando algo (como un código o medicina) hace efecto.', category: 'TECNOLOGÍA' },
  { id: 18, word: 'Settle in', pronunciation: '/ˈsetl ɪn/', spanish: 'Empezar a instalarse', meaning: 'Ponerse cómodo después de llegar a un lugar.', category: 'TECNOLOGÍA' },
  { id: 19, word: 'Fill in', pronunciation: '/fɪl ɪn/', spanish: 'Empezar a llenar', meaning: 'Completar los espacios vacíos de un formulario.', category: 'TECNOLOGÍA' }
];
