export interface PrefixSuffix {
  part: string;
  meaning: string;
  example: string;
  translation: string;
}

export interface WordRoot {
  root: string;
  meaning: string;
  examples: string;
  deduction: string;
}

export interface Collocation {
  word: string;
  combination: string;
  translation: string;
  wrongUsage: string;
}

export const PREFIXES: PrefixSuffix[] = [
  { part: "un-", meaning: "No, lo opuesto", example: "unpredictable", translation: "Impredecible" },
  { part: "in-, im-, ir-, il-", meaning: "No, negativo", example: "implausible", translation: "Inverosímil / Implausible" },
  { part: "dis-", meaning: "Falta de, opuesto", example: "discontinue", translation: "Interrumpir / Suspender" },
  { part: "mis-", meaning: "Mal, incorrectamente", example: "misinterpret", translation: "Malinterpretar" },
  { part: "anti-", meaning: "Contra", example: "antisocial", translation: "Antisocial" },
  { part: "de-", meaning: "Revertir, quitar", example: "devalue", translation: "Devaluar" },
  { part: "non-", meaning: "No, ausencia de", example: "nonexistent", translation: "Inexistente" },
  { part: "re-", meaning: "De nuevo, repetición", example: "reiterate", translation: "Reiterar" },
  { part: "pre-", meaning: "Antes de", example: "prerequisite", translation: "Prerrequisito" },
  { part: "post-", meaning: "Después de", example: "postpone", translation: "Posponer" },
  { part: "over-", meaning: "En exceso, demasiado", example: "overestimate", translation: "Sobreestimar" },
  { part: "under-", meaning: "Insuficiente, por debajo", example: "undermine", translation: "Socavar" },
  { part: "out-", meaning: "Superar, más que", example: "outperform", translation: "Superar (en rendimiento)" },
  { part: "sub-", meaning: "Debajo de", example: "subsequent", translation: "Subsiguiente" }
];

export const SUFFIXES: PrefixSuffix[] = [
  { part: "-ment", meaning: "Acción o proceso", example: "assessment", translation: "Evaluación" },
  { part: "-tion, -sion", meaning: "Estado o acción", example: "implementation", translation: "Implementación" },
  { part: "-ness", meaning: "Estado o cualidad", example: "awareness", translation: "Conciencia / Conocimiento" },
  { part: "-ity, -ty", meaning: "Condición o cualidad", example: "feasibility", translation: "Factibilidad" },
  { part: "-ance, -ence", meaning: "Acción, estado o cualidad", example: "compliance", translation: "Cumplimiento" },
  { part: "-er, -or", meaning: "Persona que realiza la acción", example: "facilitator", translation: "Facilitador" },
  { part: "-ist", meaning: "Persona que practica algo", example: "pragmatist", translation: "Pragmático (persona)" },
  { part: "-able, -ible", meaning: "Capaz de ser, posible", example: "plausible", translation: "Verosímil" },
  { part: "-ful", meaning: "Lleno de, que tiene", example: "insightful", translation: "Perspicaz" },
  { part: "-less", meaning: "Sin, que carece de", example: "flawless", translation: "Impecable / Sin defectos" },
  { part: "-ous, -ious", meaning: "Posee la cualidad de", example: "meticulous", translation: "Meticuloso" },
  { part: "-ive", meaning: "Que tiene la naturaleza de", example: "cohesive", translation: "Cohesivo" },
  { part: "-ic, -ical", meaning: "Relacionado con", example: "empirical", translation: "Empírico" },
  { part: "-ize, -ise", meaning: "Causar que sea, convertirse", example: "scrutinize", translation: "Escrutar / Examinar" },
  { part: "-en", meaning: "Hacerse o volverse", example: "strengthen", translation: "Fortalecer" },
  { part: "-ify", meaning: "Hacer o causar", example: "clarify", translation: "Aclarar" },
  { part: "-ly", meaning: "Adverbio de modo", example: "inadvertently", translation: "Inadvertidamente" }
];

export const ROOTS: WordRoot[] = [
  { root: "-spect-", meaning: "Mirar, observar", examples: "retrospective, perspective", deduction: "Retrospectiva (mirar atrás), Perspectiva" },
  { root: "-dict-", meaning: "Decir, hablar", examples: "contradict, predictable", deduction: "Contradecir (decir en contra), Predecible" },
  { root: "-ject-", meaning: "Lanzar, arrojar", examples: "conjecture, trajectory", deduction: "Conjetura (idea lanzada), Trayectoria" },
  { root: "-tract-", meaning: "Tirar, arrastrar", examples: "protracted, extract", deduction: "Prolongado (tirado en el tiempo), Extraer" },
  { root: "-bene- / -mal-", meaning: "Bien / Mal", examples: "beneficial, malicious", deduction: "Beneficioso, Malicioso" },
  { root: "-chron-", meaning: "Tiempo", examples: "chronological, anachronism", deduction: "Cronológico, Anacronismo (fuera de tiempo)" }
];

export const COLLOCATIONS: Collocation[] = [
  { word: "Mitigate", combination: "To mitigate the impact/risk", translation: "Mitigar el impacto / el riesgo", wrongUsage: "Reduce the impact" },
  { word: "Utterly", combination: "Utterly ridiculous / exhausted", translation: "Completamente ridículo / exhausto", wrongUsage: "Very ridiculous" },
  { word: "Foster", combination: "To foster a relationship/growth", translation: "Fomentar una relación / crecimiento", wrongUsage: "Make a relationship grow" },
  { word: "Conceive", combination: "Cannot conceive of (something)", translation: "No poder concebir (algo)", wrongUsage: "Cannot imagine about" },
  { word: "Detrimental", combination: "To have a detrimental effect on", translation: "Tener un efecto perjudicial en", wrongUsage: "Have a bad effect in" }
];
