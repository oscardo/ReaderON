/**
 * generate_suave_data.cjs
 * Generates src/constants/suaveData.ts with ONLY tense formulas.
 * Questions are generated at runtime by Gemma AI.
 * Version 0.0.1 feature 0.0.26
 */
const fs = require('fs');
const path = require('path');

// ─────────────────────────────────────────────
//  12 TENSES WITH 4 FORMS EACH
// ─────────────────────────────────────────────
const tenses = [
  {
    id: 'past_simple',
    nameEs: 'Pasado Simple',
    nameEn: 'Past Simple',
    aux: 'Did',
    category: 'Acciones completadas en el pasado',
    formulas: [
      'Afirmativo:            S + V-ed  (ej: She walked)',
      'Negativo:              S + Did not + Verb  (ej: She did not walk)',
      'Interrogativo:         Did + S + Verb?  (ej: Did she walk?)',
      'Negativo-Interrogativo: Did not + S + Verb?  (ej: Did not she walk?)'
    ]
  },
  {
    id: 'present_simple',
    nameEs: 'Presente Simple',
    nameEn: 'Present Simple',
    aux: 'Do / Does',
    category: 'Hábitos, hechos y verdades generales',
    formulas: [
      'Afirmativo:            S + Verb(s)  (ej: He walks)',
      'Negativo:              S + Do/Does not + Verb  (ej: He does not walk)',
      'Interrogativo:         Do/Does + S + Verb?  (ej: Does he walk?)',
      'Negativo-Interrogativo: Do/Does not + S + Verb?  (ej: Does not he walk?)'
    ]
  },
  {
    id: 'future_simple',
    nameEs: 'Futuro Simple',
    nameEn: 'Future Simple',
    aux: 'Will',
    category: 'Acciones o decisiones futuras',
    formulas: [
      'Afirmativo:            S + Will + Verb  (ej: I will go)',
      'Negativo:              S + Will not + Verb  (ej: I will not go)',
      'Interrogativo:         Will + S + Verb?  (ej: Will you go?)',
      'Negativo-Interrogativo: Will not + S + Verb?  (ej: Will not you go?)'
    ]
  },
  {
    id: 'past_perfect',
    nameEs: 'Pasado Perfecto',
    nameEn: 'Past Perfect',
    aux: 'Had',
    category: 'Acción terminada antes de otra en el pasado',
    formulas: [
      'Afirmativo:            S + Had + V-pp  (ej: She had eaten)',
      'Negativo:              S + Had not + V-pp  (ej: She had not eaten)',
      'Interrogativo:         Had + S + V-pp?  (ej: Had she eaten?)',
      'Negativo-Interrogativo: Had not + S + V-pp?  (ej: Had not she eaten?)'
    ]
  },
  {
    id: 'present_perfect',
    nameEs: 'Presente Perfecto',
    nameEn: 'Present Perfect',
    aux: 'Have / Has',
    category: 'Acción pasada con resultado presente',
    formulas: [
      'Afirmativo:            S + Have/Has + V-pp  (ej: I have lived)',
      'Negativo:              S + Have/Has not + V-pp  (ej: I have not lived)',
      'Interrogativo:         Have/Has + S + V-pp?  (ej: Have you lived?)',
      'Negativo-Interrogativo: Have/Has not + S + V-pp?  (ej: Have not you lived?)'
    ]
  },
  {
    id: 'future_perfect',
    nameEs: 'Futuro Perfecto',
    nameEn: 'Future Perfect',
    aux: 'Will have',
    category: 'Acción que habrá terminado antes de un punto futuro',
    formulas: [
      'Afirmativo:            S + Will have + V-pp  (ej: I will have finished)',
      'Negativo:              S + Will not have + V-pp  (ej: I will not have finished)',
      'Interrogativo:         Will + S + have + V-pp?  (ej: Will you have finished?)',
      'Negativo-Interrogativo: Will not + S + have + V-pp?  (ej: Will not you have finished?)'
    ]
  },
  {
    id: 'past_progressive',
    nameEs: 'Pasado Progresivo',
    nameEn: 'Past Progressive',
    aux: 'Was / Were',
    category: 'Acción en progreso en un momento del pasado',
    formulas: [
      'Afirmativo:            S + Was/Were + V-ing  (ej: She was running)',
      'Negativo:              S + Was/Were not + V-ing  (ej: She was not running)',
      'Interrogativo:         Was/Were + S + V-ing?  (ej: Was she running?)',
      'Negativo-Interrogativo: Was/Were not + S + V-ing?  (ej: Was not she running?)'
    ]
  },
  {
    id: 'present_progressive',
    nameEs: 'Presente Progresivo',
    nameEn: 'Present Progressive',
    aux: 'Am / Is / Are',
    category: 'Acción en progreso ahora mismo',
    formulas: [
      'Afirmativo:            S + Am/Is/Are + V-ing  (ej: I am studying)',
      'Negativo:              S + Am/Is/Are not + V-ing  (ej: I am not studying)',
      'Interrogativo:         Am/Is/Are + S + V-ing?  (ej: Are you studying?)',
      'Negativo-Interrogativo: Am/Is/Are not + S + V-ing?  (ej: Are not you studying?)'
    ]
  },
  {
    id: 'future_progressive',
    nameEs: 'Futuro Progresivo',
    nameEn: 'Future Progressive',
    aux: 'Will be',
    category: 'Acción en progreso en un momento futuro',
    formulas: [
      'Afirmativo:            S + Will be + V-ing  (ej: I will be working)',
      'Negativo:              S + Will not be + V-ing  (ej: I will not be working)',
      'Interrogativo:         Will + S + be + V-ing?  (ej: Will you be working?)',
      'Negativo-Interrogativo: Will not + S + be + V-ing?  (ej: Will not you be working?)'
    ]
  },
  {
    id: 'past_perfect_progressive',
    nameEs: 'Pasado Perfecto Progresivo',
    nameEn: 'Past Perfect Progressive',
    aux: 'Had been',
    category: 'Acción continua que ocurrió antes de otra en el pasado',
    formulas: [
      'Afirmativo:            S + Had been + V-ing  (ej: She had been crying)',
      'Negativo:              S + Had not been + V-ing  (ej: She had not been crying)',
      'Interrogativo:         Had + S + been + V-ing?  (ej: Had she been crying?)',
      'Negativo-Interrogativo: Had not + S + been + V-ing?  (ej: Had not she been crying?)'
    ]
  },
  {
    id: 'present_perfect_progressive',
    nameEs: 'Presente Perfecto Progresivo',
    nameEn: 'Present Perfect Progressive',
    aux: 'Have been / Has been',
    category: 'Acción que empezó en el pasado y continúa ahora',
    formulas: [
      'Afirmativo:            S + Have/Has been + V-ing  (ej: I have been waiting)',
      'Negativo:              S + Have/Has not been + V-ing  (ej: I have not been waiting)',
      'Interrogativo:         Have/Has + S + been + V-ing?  (ej: Has she been waiting?)',
      'Negativo-Interrogativo: Have/Has not + S + been + V-ing?  (ej: Has not she been waiting?)'
    ]
  },
  {
    id: 'future_perfect_progressive',
    nameEs: 'Futuro Perfecto Progresivo',
    nameEn: 'Future Perfect Progressive',
    aux: 'Will have been',
    category: 'Acción continua que habrá ocurrido antes de un punto futuro',
    formulas: [
      'Afirmativo:            S + Will have been + V-ing  (ej: I will have been working)',
      'Negativo:              S + Will not have been + V-ing  (ej: I will not have been working)',
      'Interrogativo:         Will + S + have been + V-ing?  (ej: Will you have been working?)',
      'Negativo-Interrogativo: Will not + S + have been + V-ing?  (ej: Will not you have been working?)'
    ]
  }
];

// ─────────────────────────────────────────────
//  EXPLANATION BUILDER (formulas only, no burned answers)
// ─────────────────────────────────────────────
function buildExplanation(tense) {
  const formulas = tense.formulas.join('\n');
  return [
    `Método SUAVE para el ${tense.nameEs} (${tense.nameEn})`,
    ``,
    `🔥 Fórmula General: S + U + A + V + E`,
    `   • S (Sujeto)   : ¿Quién hace la acción?`,
    `   • U (Uso)      : ${tense.category}`,
    `   • A (Auxiliar) : "${tense.aux}" — ¡Este es tu clave!`,
    `   • V (Verbo)    : La acción principal`,
    `   • E (Extra)    : El complemento`,
    ``,
    `✨ Las 4 Formas:`,
    formulas,
    ``,
    `💡 Tip Maestro: Domina el auxiliar "${tense.aux}" y dominarás este tiempo verbal.`
  ].join('\n');
}

// ─────────────────────────────────────────────
//  MINIMAL SEED QUESTIONS (just enough as fallback)
//  Real questions will be generated by Gemma at runtime
// ─────────────────────────────────────────────
function buildSeedQuestions(tenseId) {
  // 3 minimal seed questions per tense as fallback when Gemma is offline
  return [
    { id: `seed_${tenseId}_1`, spanish: 'Yo estudiar inglés todos los días', difficulty: 'easy' },
    { id: `seed_${tenseId}_2`, spanish: 'Mi amigo trabajar mucho la semana pasada', difficulty: 'medium' },
    { id: `seed_${tenseId}_3`, spanish: 'Nosotros aprender cosas nuevas constantemente', difficulty: 'hard' }
  ];
}

// ─────────────────────────────────────────────
//  OUTPUT GENERATION
// ─────────────────────────────────────────────
let tsOutput = `// ============================================================
// suaveData.ts — AUTO-GENERATED by generate_suave_data.cjs
// Version 0.0.1 feature 0.0.26
//
// This file contains ONLY tense formulas and 3 fallback seed
// questions per tense. All real questions are generated at
// runtime by local Gemma AI (generateSuaveQuestions in analysisService.ts).
// DO NOT add hardcoded questions here.
// ============================================================

export interface SuaveQuestion {
  id: string;
  spanish: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface SuaveTense {
  id: string;
  nameEs: string;
  nameEn: string;
  explanation: string;
  questions: SuaveQuestion[]; // Only seed fallback questions
}

export const SUAVE_DATA: SuaveTense[] = [
`;

for (const t of tenses) {
  const explanation = buildExplanation(t).replace(/`/g, '\\`').replace(/\$/g, '\\$');
  const seedQs = buildSeedQuestions(t.id);

  tsOutput += `  {
    id: '${t.id}',
    nameEs: '${t.nameEs}',
    nameEn: '${t.nameEn}',
    explanation: \`${explanation}\`,
    questions: ${JSON.stringify(seedQs, null, 4)}
  },\n`;
}

tsOutput += `];\n`;

// ─────────────────────────────────────────────
//  WRITE OUTPUT
// ─────────────────────────────────────────────
const outPath = path.join(__dirname, '..', 'src', 'constants', 'suaveData.ts');
fs.writeFileSync(outPath, tsOutput, 'utf8');
console.log(`✅ suaveData.ts generated successfully!`);
console.log(`   → ${outPath}`);
console.log(`   → 12 tenses with formulas only (no burned answers)`);
console.log(`   → 3 seed fallback questions per tense`);
console.log(`   → Real questions generated by Gemma AI at runtime`);
