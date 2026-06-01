export interface VerbGenerally {
  id: number;
  verb: string;
  tense: string;
  form: string;
  example: string;
  translation: string;
  category: 'BE' | 'GET' | 'HAVE' | 'DO';
}

export const GENERALLY_VERBS: VerbGenerally[] = [
  // TO BE
  {
    id: 1,
    verb: "To Be",
    tense: "Present",
    form: "am / is / are",
    example: "I am in Bogotá.",
    translation: "Yo estoy en Bogotá.",
    category: 'BE'
  },
  {
    id: 2,
    verb: "To Be",
    tense: "Past",
    form: "was / were",
    example: "He was a developer.",
    translation: "Él era desarrollador.",
    category: 'BE'
  },
  {
    id: 3,
    verb: "To Be",
    tense: "Future",
    form: "will be",
    example: "We will be ready.",
    translation: "Nosotros estaremos listos.",
    category: 'BE'
  },
  // TO GET
  {
    id: 4,
    verb: "To Get",
    tense: "Present",
    form: "get / gets",
    example: "I get the logs.",
    translation: "Yo obtengo los logs.",
    category: 'GET'
  },
  {
    id: 5,
    verb: "To Get",
    tense: "Past",
    form: "got",
    example: "She got on the bus.",
    translation: "Ella se subió al bus.",
    category: 'GET'
  },
  {
    id: 6,
    verb: "To Get",
    tense: "Future",
    form: "will get",
    example: "You will get a C1.",
    translation: "Obtendrás un C1.",
    category: 'GET'
  },
  // TO HAVE
  {
    id: 7,
    verb: "To Have",
    tense: "Present",
    form: "have / has",
    example: "I have a meeting.",
    translation: "Tengo una reunión.",
    category: 'HAVE'
  },
  {
    id: 8,
    verb: "To Have",
    tense: "Past",
    form: "had",
    example: "We had a problem.",
    translation: "Tuvimos un problema.",
    category: 'HAVE'
  },
  {
    id: 9,
    verb: "To Have",
    tense: "Future",
    form: "will have",
    example: "It will have impact.",
    translation: "Tendrá impacto.",
    category: 'HAVE'
  },
  // TO DO
  {
    id: 10,
    verb: "To Do",
    tense: "Present",
    form: "do / does",
    example: "I do my job.",
    translation: "Hago mi trabajo.",
    category: 'DO'
  },
  {
    id: 11,
    verb: "To Do",
    tense: "Past",
    form: "did",
    example: "They did the test.",
    translation: "Ellos hicieron el test.",
    category: 'DO'
  },
  {
    id: 12,
    verb: "To Do",
    tense: "Future",
    form: "will do",
    example: "I will do the demo.",
    translation: "Haré la demostración.",
    category: 'DO'
  }
];
