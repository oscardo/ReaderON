export interface SubCategory {
  title: string;
  descriptionEn: string;
  descriptionEs: string;
  examples: string[];
}

export interface SuperCategory {
  id: string;
  title: string;
  description: string;
  subCategories: SubCategory[];
}

export const STUDY_DATA: SuperCategory[] = [
  {
    id: 'adjectives',
    title: 'ADJECTIVES',
    description: 'Adjectives in English are words that modify or describe nouns and pronouns, adding detail to appearance, size, condition, or personality.',
    subCategories: [
      {
        title: 'Descriptive (Appearance/Quality)',
        descriptionEn: 'Adjectives that describe the look, character, or quality of someone or something.',
        descriptionEs: 'Adjetivos que describen el aspecto, el carácter o la calidad de alguien o algo.',
        examples: ['Beautiful', 'Ugly', 'Clean', 'Dirty', 'Smart', 'Stupid', 'Kind', 'Cruel', 'Nice', 'Lovely', 'Brilliant', 'Talented', 'Honest', 'Polite']
      },
      {
        title: 'Size and Shape',
        descriptionEn: 'Adjectives used to specify how large or what form something has.',
        descriptionEs: 'Adjetivos utilizados para especificar qué tamaño o qué forma tiene algo.',
        examples: ['Big', 'Small', 'Tall', 'Short', 'High', 'Low', 'Thick', 'Thin', 'Wide', 'Narrow', 'Huge', 'Tiny', 'Round', 'Square', 'Long']
      },
      {
        title: 'Condition and Emotion',
        descriptionEn: 'Adjectives describing the physical state or emotional feelings of a person.',
        descriptionEs: 'Adjetivos que describen el estado físico o los sentimientos emocionales de una persona.',
        examples: ['Happy', 'Sad', 'Angry', 'Hungry', 'Tired', 'Scared', 'Excited', 'Brave', 'Calm', 'Proud']
      },
      {
        title: 'Combining',
        descriptionEn: 'Using multiple adjectives together to provide layered descriptions.',
        descriptionEs: 'Uso de múltiples adjetivos juntos para proporcionar descripciones en capas.',
        examples: ['A big red car', 'A old wooden house', 'A small beautiful flower']
      },
      {
        title: 'Comparatives',
        descriptionEn: 'Used to compare differences between the two objects they modify.',
        descriptionEs: 'Utilizados para comparar diferencias entre los dos objetos que modifican.',
        examples: ['Bigger', 'Smaller', 'Taller', 'Further', 'More beautiful']
      },
      {
        title: 'Modifying',
        descriptionEn: 'Words that change or add to the meaning of another word.',
        descriptionEs: 'Palabras que cambian o añaden al significado de otra palabra.',
        examples: ['Extremely hot', 'Very cold', 'Quite interesting', 'Slightly better']
      },
      {
        title: 'Position',
        descriptionEn: 'The correct placement of adjectives within a sentence.',
        descriptionEs: 'La colocación correcta de los adjetivos dentro de una oración.',
        examples: ['Attribute position (before noun)', 'Predicative position (after verb)']
      },
      {
        title: 'Superlatives',
        descriptionEn: 'Used to describe an object which is at the upper or lower limit of a quality.',
        descriptionEs: 'Utilizados para describir un objeto que está en el límite superior o inferior de una cualidad.',
        examples: ['The biggest', 'The smallest', 'The most expensive', 'The best']
      }
    ]
  },
  {
    id: 'adverbs',
    title: 'ADVERBS',
    description: 'Adverbs modify verbs, adjectives, or other adverbs, usually indicating manner, place, time, or frequency.',
    subCategories: [
      {
        title: 'Adverb phrases – form',
        descriptionEn: 'Groups of words that function as an adverb or adverb phrase.',
        descriptionEs: 'Grupos de palabras que funcionan como un adverbio o frase adverbial.',
        examples: ['Very quickly', 'In the morning', 'At the park']
      },
      {
        title: 'Adverbs and adverb phrases: types and meanings',
        descriptionEn: 'Categorizing adverbs by the type of information they provide (manner, place, time).',
        descriptionEs: 'Categorización de adverbios según el tipo de información que proporcionan (manera, lugar, tiempo).',
        examples: ['Slowly', 'Here', 'Yesterday', 'Always', 'Completely']
      },
      {
        title: 'Adverbs as modifiers',
        descriptionEn: 'Using adverbs to change the meaning of adjectives or other adverbs.',
        descriptionEs: 'Uso de adverbios para cambiar el significado de adjetivos u otros adverbios.',
        examples: ['Very happy', 'Too fast', 'Almost finished']
      },
      {
        title: 'Position',
        descriptionEn: 'Where to place adverbs in a sentence for correct grammar.',
        descriptionEs: 'Dónde colocar los adverbios en una oración para una gramática correcta.',
        examples: ['Initial position', 'Mid position', 'End position']
      }
    ]
  },
  {
    id: 'clauses',
    title: 'CLAUSES',
    description: 'A clause is a group of words that contains a subject and a verb. These are the building blocks of sentences.',
    subCategories: [
      {
        title: 'Comparatives',
        descriptionEn: 'Clauses used to compare one thing to another.',
        descriptionEs: 'Cláusulas utilizadas para comparar una cosa con otra.',
        examples: ['He is taller than I am', 'It was more difficult than I expected']
      },
      {
        title: 'Conditional',
        descriptionEn: 'Discuss hypothetical situations and their results.',
        descriptionEs: 'Discuten situaciones hipotéticas y sus resultados.',
        examples: ['If it rains, we will stay', 'If I had known, I would have come']
      },
      {
        title: 'Coordinated',
        descriptionEn: 'Two main clauses joined by a coordinating conjunction.',
        descriptionEs: 'Dos cláusulas principales unidas por una conjunción de coordinación.',
        examples: ['I like tea and she likes coffee', 'He was tired but he kept working']
      },
      {
        title: 'Imperatives',
        descriptionEn: 'Clauses used to give commands or make requests.',
        descriptionEs: 'Cláusulas utilizadas para dar órdenes o hacer peticiones.',
        examples: ['Close the door', 'Please sit down', 'Don\'t move']
      },
      {
        title: 'Interrogatives',
        descriptionEn: 'Clauses that ask a question.',
        descriptionEs: 'Cláusulas que hacen una pregunta.',
        examples: ['Is he coming?', 'What are you doing?', 'How old are you?']
      },
      {
        title: 'Phrases/exclamations',
        descriptionEn: 'Short clauses expressing strong emotion.',
        descriptionEs: 'Cláusulas cortas que expresan una emoción fuerte.',
        examples: ['What a day!', 'How wonderful!', 'Oh no!']
      },
      {
        title: 'Relative',
        descriptionEn: 'Describe or give more information about a noun.',
        descriptionEs: 'Describen o dan más información sobre un sustantivo.',
        examples: ['The man who lives there', 'The car that I bought']
      },
      {
        title: 'Subordinated',
        descriptionEn: 'Dependent clauses that need a main clause to make sense.',
        descriptionEs: 'Cláusulas dependientes que necesitan una cláusula principal para tener sentido.',
        examples: ['Because it was late', 'When the movie ended']
      }
    ]
  },
  {
    id: 'conjunctions',
    title: 'CONJUNCTIONS',
    description: 'Connection words used to join phrases, clauses, or sentences.',
    subCategories: [
      {
        title: 'Coordinating',
        descriptionEn: 'Connect words or clauses of equal weight.',
        descriptionEs: 'Conectan palabras o cláusulas de igual importancia.',
        examples: ['And', 'But', 'Or', 'Nor', 'For', 'Yet', 'So']
      },
      {
        title: 'Subordinating',
        descriptionEn: 'Connect a dependent clause to an independent clause.',
        descriptionEs: 'Conectan una cláusula dependiente a una cláusula independiente.',
        examples: ['Because', 'After', 'If', 'Although', 'While', 'Unless']
      }
    ]
  },
  {
    id: 'determiners',
    title: 'DETERMINERS',
    description: 'Words used at the beginning of noun phrases to provide context.',
    subCategories: [
      {
        title: 'Articles',
        descriptionEn: 'A, an, and the - showing specificity.',
        descriptionEs: 'A, an, y the - mostrando especificidad.',
        examples: ['A cat', 'An egg', 'The moon']
      },
      {
        title: 'Demonstratives',
        descriptionEn: 'Pointing to specific things.',
        descriptionEs: 'Señalando cosas específicas.',
        examples: ['This', 'That', 'These', 'Those']
      },
      {
        title: 'Possessives',
        descriptionEn: 'Showing ownership.',
        descriptionEs: 'Mostrando propiedad.',
        examples: ['My', 'Your', 'His', 'Her', 'Its', 'Our', 'Their']
      },
      {
        title: 'Quantity',
        descriptionEn: 'Words showing how much or how many.',
        descriptionEs: 'Palabras que muestran cuánto o cuántos.',
        examples: ['Some', 'Any', 'Few', 'Little', 'Many', 'Much']
      }
    ]
  },
  {
    id: 'discourse-markers',
    title: 'DISCOURSE MARKERS',
    description: 'Words and phrases used to manage the flow of conversation or writing.',
    subCategories: [
      {
        title: 'Discourse markers in writing',
        descriptionEn: 'Formal connectors used in essays and letters.',
        descriptionEs: 'Conectores formales utilizados en ensayos y cartas.',
        examples: ['Furthermore', 'Consequently', 'In contrast', 'Overall']
      }
    ]
  },
  {
    id: 'focus',
    title: 'FOCUS',
    description: 'Methods to draw attention to specific parts of a message.',
    subCategories: [
      {
        title: 'Focus',
        descriptionEn: 'Structural emphasis within a sentence.',
        descriptionEs: 'Énfasis estructural dentro de una oración.',
        examples: ['What he needs is a job', 'It is the truth that matters']
      }
    ]
  },
  {
    id: 'future',
    title: 'FUTURE',
    description: 'Expressing time that has not yet happened.',
    subCategories: [
      {
        title: 'Future Continuous',
        descriptionEn: 'Actions in progress at a time in the future.',
        descriptionEs: 'Acciones en curso en un momento del futuro.',
        examples: ['I will be working', 'They will be traveling']
      },
      {
        title: 'Future expressions with be',
        descriptionEn: 'Using "be to" or "be about to" for future events.',
        descriptionEs: 'Uso de "be to" o "be about to" para eventos futuros.',
        examples: ['The meeting is to start at 10', 'I am about to leave']
      },
      {
        title: 'Future in the past',
        descriptionEn: 'Expressing a past intention about the relative future.',
        descriptionEs: 'Expresar una intención pasada sobre el futuro relativo.',
        examples: ['I was going to call you', 'He was about to win']
      },
      {
        title: 'Future perfect continuous',
        descriptionEn: 'Continuity up to a point in the future.',
        descriptionEs: 'Continuidad hasta un punto en el futuro.',
        examples: ['I will have been waiting for two hours']
      },
      {
        title: 'Future perfect simple',
        descriptionEn: 'Completion by a point in the future.',
        descriptionEs: 'Finalización en un punto del futuro.',
        examples: ['I will have finished by tomorrow']
      },
      {
        title: 'Future simple (with will and shall)',
        descriptionEn: 'Decisions, predictions, and promises.',
        descriptionEs: 'Decisiones, predicciones y promesas.',
        examples: ['It will rain', 'I shall return']
      },
      {
        title: 'Future with be going to',
        descriptionEn: 'Plans and evidence-based predictions.',
        descriptionEs: 'Planes y predicciones basadas en evidencia.',
        examples: ['I am going to study', 'Look at those clouds, it\'s going to rain']
      },
      {
        title: 'Present continuous for future use',
        descriptionEn: 'Personal arrangements.',
        descriptionEs: 'Arreglos personales.',
        examples: ['I am meeting him tonight', 'We are leaving on Monday']
      },
      {
        title: 'Present simple for future use',
        descriptionEn: 'Timetables and schedules.',
        descriptionEs: 'Horarios y calendarios.',
        examples: ['The train leaves at 5', 'The show starts soon']
      }
    ]
  },
  {
    id: 'modality',
    title: 'MODALITY',
    description: 'Using auxiliary verbs to show possibility, necessity, or ability.',
    subCategories: [
      {
        title: 'Adjectives',
        descriptionEn: 'Adjectives that express modal meaning like probability.',
        descriptionEs: 'Adjetivos que expresan un significado modal como probabilidad.',
        examples: ['Likely', 'Possible', 'Probable', 'Certain']
      },
      {
        title: 'Adverbs',
        descriptionEn: 'Adverbs like "maybe" or "perhaps" that show modality.',
        descriptionEs: 'Adverbios como "maybe" o "perhaps" que muestran modalidad.',
        examples: ['Maybe', 'Perhaps', 'Possibly', 'Definitely']
      },
      {
        title: 'Can',
        descriptionEn: 'Ability, possibility, or permission.',
        descriptionEs: 'Habilidad, posibilidad o permiso.',
        examples: ['I can jump', 'Can I leave?']
      },
      {
        title: 'Could',
        descriptionEn: 'Past ability, suggestions, or polite requests.',
        descriptionEs: 'Habilidad pasada, sugerencias o peticiones amables.',
        examples: ['I could swim when I was five', 'Could you help me?']
      },
      {
        title: 'Dare',
        descriptionEn: 'Having the courage to do something.',
        descriptionEs: 'Tener el valor de hacer algo.',
        examples: ['How dare you!', 'I dare not speak']
      },
      {
        title: 'Expressions with be',
        descriptionEn: 'Be able to, be allowed to, etc.',
        descriptionEs: 'Be able to, be allowed to, etc.',
        examples: ['I am able to go', 'You are allowed to stay']
      },
      {
        title: 'Have (got) to',
        descriptionEn: 'Expressing strong obligation.',
        descriptionEs: 'Expresar una obligación fuerte.',
        examples: ['I have to leave', 'You\'ve got to see this']
      },
      {
        title: 'May',
        descriptionEn: 'Possibility or formal permission.',
        descriptionEs: 'Posibilidad o permiso formal.',
        examples: ['It may snow', 'May I enter?']
      },
      {
        title: 'Might',
        descriptionEn: 'Slight possibility or very polite requests.',
        descriptionEs: 'Ligera posibilidad o peticiones muy educadas.',
        examples: ['He might be late']
      },
      {
        title: 'Must',
        descriptionEn: 'Obligation or logical deduction.',
        descriptionEs: 'Obligación o deducción lógica.',
        examples: ['You must wait', 'It must be him']
      },
      {
        title: 'Need',
        descriptionEn: 'Necessity or lack thereof.',
        descriptionEs: 'Necesidad o falta de ella.',
        examples: ['Do you need help?', 'You needn\'t go']
      },
      {
        title: 'Ought',
        descriptionEn: 'Moral obligation or strong advice.',
        descriptionEs: 'Obligación moral o consejo fuerte.',
        examples: ['You ought to apologize']
      },
      {
        title: 'Shall',
        descriptionEn: 'Formal future or suggestions.',
        descriptionEs: 'Futuro formal o sugerencias.',
        examples: ['We shall see', 'Shall we dance?']
      },
      {
        title: 'Should',
        descriptionEn: 'Advice, recommendation, or probability.',
        descriptionEs: 'Consejo, recomendación o probabilidad.',
        examples: ['You should eat more', 'He should be here soon']
      },
      {
        title: 'Used to',
        descriptionEn: 'Past habits or states that are no longer true.',
        descriptionEs: 'Hábitos pasados o estados que ya no son ciertos.',
        examples: ['I used to smoke', 'She used to live in Paris']
      },
      {
        title: 'Will',
        descriptionEn: 'Future intent, certain predictions, or willingness.',
        descriptionEs: 'Intención futura, predicciones seguras o voluntad.',
        examples: ['I will help you', 'The sun will rise']
      },
      {
        title: 'Would',
        descriptionEn: 'Hypothetical situations, past habits, or polite requests.',
        descriptionEs: 'Situaciones hipotéticas, hábitos pasados o peticiones educadas.',
        examples: ['I would go if I could', 'Would you like some tea?']
      }
    ]
  },
  {
    id: 'negation',
    title: 'NEGATION',
    description: 'Transforming positive statements into negative ones.',
    subCategories: [
      {
        title: 'Negation',
        descriptionEn: 'Standard rules for using not, no, never, etc.',
        descriptionEs: 'Reglas estándar para usar not, no, never, etc.',
        examples: ['I am not happy', 'No entry', 'Nothing works']
      }
    ]
  },
  {
    id: 'nouns',
    title: 'NOUNS',
    description: 'Naming words for everything in the world.',
    subCategories: [
      {
        title: 'Noun phrases',
        descriptionEn: 'Building complex descriptions around a core noun.',
        descriptionEs: 'Construir descripciones complejas alrededor de un sustantivo central.',
        examples: ['The big old tree', 'A beautiful day']
      },
      {
        title: 'Noun phrases – grammatical functions',
        descriptionEn: 'How noun phrases function as subject or object.',
        descriptionEs: 'Cómo funcionan las frases nominales como sujeto u objeto.',
        examples: ['The cat (subject) chased the mouse (object)']
      },
      {
        title: 'Plural',
        descriptionEn: 'Regular and irregular plural forms.',
        descriptionEs: 'Formas plurales regulares e irregulares.',
        examples: ['Dogs', 'Cities', 'Children', 'Teeth']
      },
      {
        title: 'Types',
        descriptionEn: 'Proper, common, abstract, and concrete nouns.',
        descriptionEs: 'Sustantivos propios, comunes, abstractos y concretos.',
        examples: ['London (proper)', 'Love (abstract)', 'Table (concrete)']
      },
      {
        title: 'Uncountable',
        descriptionEn: 'Nouns that cannot be numbered.',
        descriptionEs: 'Sustantivos que no se pueden numerar.',
        examples: ['Rice', 'Electricity', 'Information', 'Advice']
      }
    ]
  },
  {
    id: 'passives',
    title: 'PASSIVES',
    description: 'Shifting focus from the person doing the action to the action itself.',
    subCategories: [
      {
        title: 'Get and have',
        descriptionEn: 'Causative passives showing someone doing something for us.',
        descriptionEs: 'Pasivos causativos que muestran a alguien haciendo algo por nosotros.',
        examples: ['I got my hair cut', 'We had the house painted']
      },
      {
        title: 'Passives: form',
        descriptionEn: 'Structure using be + past participle.',
        descriptionEs: 'Estructura usando be + participio pasado.',
        examples: ['The road was built in 1990']
      }
    ]
  },
  {
    id: 'past',
    title: 'PAST',
    description: 'Talking about time that is finished.',
    subCategories: [
      {
        title: 'Past continuous',
        descriptionEn: 'Scenario-setting or actions in progress in the past.',
        descriptionEs: 'Escenario o acciones en curso en el pasado.',
        examples: ['I was walking when it started raining']
      },
      {
        title: 'Past perfect continuous',
        descriptionEn: 'Action ongoing up to another point in the past.',
        descriptionEs: 'Acción en curso hasta otro punto en el pasado.',
        examples: ['I had been waiting for an hour before he arrived']
      },
      {
        title: 'Past perfect simple',
        descriptionEn: 'The "past of the past".',
        descriptionEs: 'El "pasado del pasado".',
        examples: ['He had already left when I called']
      },
      {
        title: 'Past simple',
        descriptionEn: 'Finished actions at a specific time.',
        descriptionEs: 'Acciones terminadas en un momento específico.',
        examples: ['I visited Rome last year', 'She died in 1980']
      },
      {
        title: 'Present perfect continuous',
        descriptionEn: 'Starting in the past and continuing up to now.',
        descriptionEs: 'Empezando en el pasado y continuando hasta ahora.',
        examples: ['I have been studying all day']
      },
      {
        title: 'Present perfect simple',
        descriptionEn: 'Past action with present result or unspecified time.',
        descriptionEs: 'Acción pasada con resultado presente o tiempo no especificado.',
        examples: ['I have lost my keys', 'Have you ever been to Spain?']
      }
    ]
  },
  {
    id: 'prepositions',
    title: 'PREPOSITIONS',
    description: 'Words showing relationship in space, time, or direction.',
    subCategories: [
      {
        title: 'Prepositions',
        descriptionEn: 'The logic of in, on, at, by, through, etc.',
        descriptionEs: 'La lógica de in, on, at, by, through, etc.',
        examples: ['At 5:00', 'In July', 'By the river']
      }
    ]
  },
  {
    id: 'present',
    title: 'PRESENT',
    description: 'Talking about now and general status.',
    subCategories: [
      {
        title: 'Present continuous',
        descriptionEn: 'Right now or temporary situations.',
        descriptionEs: 'Ahora mismo o situaciones temporales.',
        examples: ['I am typing', 'She is staying with us for a week']
      },
      {
        title: 'Present simple',
        descriptionEn: 'Habits, facts, and permanent states.',
        descriptionEs: 'Hábitos, hechos y estados permanentes.',
        examples: ['I live in Paris', 'Water boils at 100 degrees']
      }
    ]
  },
  {
    id: 'pronouns',
    title: 'PRONOUNS',
    description: 'Short words that replace nouns to avoid repetition.',
    subCategories: [
      {
        title: 'Demonstratives',
        descriptionEn: 'This, that, these, those used as pronouns.',
        descriptionEs: 'This, that, these, those usados como pronombres.',
        examples: ['This is good', 'I like those']
      },
      {
        title: 'Generic Use',
        descriptionEn: 'Using you, they, or one to speak generally.',
        descriptionEs: 'Uso de you, they, o one para hablar de forma general.',
        examples: ['One should be careful', 'They say it\'s good']
      },
      {
        title: 'Indefinite -thing, - one, -body etc',
        descriptionEn: 'Something, anyone, nobody.',
        descriptionEs: 'Something, anyone, nobody.',
        examples: ['Nobody called', 'Is anyone home?']
      },
      {
        title: 'Possessive',
        descriptionEn: 'Mine, yours, hers, theirs.',
        descriptionEs: 'Mine, yours, hers, theirs.',
        examples: ['The book is mine']
      },
      {
        title: 'Quantity',
        descriptionEn: 'Pronouns showing amount.',
        descriptionEs: 'Pronombres que muestran cantidad.',
        examples: ['Many are gone', 'Some were lost']
      },
      {
        title: 'Reciprocal',
        descriptionEn: 'Each other and one another.',
        descriptionEs: 'Each other y one another.',
        examples: ['They like each other']
      },
      {
        title: 'Reflexive',
        descriptionEn: 'Myself, yourself, etc.',
        descriptionEs: 'Myself, yourself, etc.',
        examples: ['I hurt myself']
      },
      {
        title: 'Subject/object',
        descriptionEn: 'I vs me, he vs him.',
        descriptionEs: 'I vs me, he vs him.',
        examples: ['He saw me']
      },
      {
        title: 'Substitution, one, ones, none',
        descriptionEn: 'Using one/ones to avoid repeating a noun.',
        descriptionEs: 'Uso de one/ones para evitar repetir un sustantivo.',
        examples: ['Which one do you want?']
      }
    ]
  },
  {
    id: 'questions',
    title: 'QUESTIONS',
    description: 'Structure for inquiring and gathering information.',
    subCategories: [
      {
        title: 'Alternatives',
        descriptionEn: 'Offering a choice within a question.',
        descriptionEs: 'Ofrecer una opción dentro de una pregunta.',
        examples: ['Tea or coffee?', 'Will you go or stay?']
      },
      {
        title: 'Tags',
        descriptionEn: 'Checking for confirmation at the end of a sentence.',
        descriptionEs: 'Comprobar la confirmación al final de una frase.',
        examples: ['You are ready, aren\'t you?']
      },
      {
        title: 'Wh-',
        descriptionEn: 'Information-seeking questions.',
        descriptionEs: 'Preguntas de búsqueda de información.',
        examples: ['Why now?', 'Who is it?']
      },
      {
        title: 'Yes/no',
        descriptionEn: 'Questions requiring a simple affirmation or denial.',
        descriptionEs: 'Preguntas que requieren una simple afirmación o negación.',
        examples: ['Are you happy?', 'Does he smoke?']
      }
    ]
  },
  {
    id: 'reported-speech',
    title: 'REPORTED SPEECH',
    description: 'Summarizing or retelling message from others.',
    subCategories: [
      {
        title: 'Reported speech',
        descriptionEn: 'Shifting tenses to report past conversations.',
        descriptionEs: 'Cambio de tiempos verbales para relatar conversaciones pasadas.',
        examples: ['He said he loved her']
      }
    ]
  },
  {
    id: 'verbs',
    title: 'VERBS',
    description: 'The engine of the sentence: showing action and state.',
    subCategories: [
      {
        title: 'Linking',
        descriptionEn: 'Connecting subject to identity/quality.',
        descriptionEs: 'Conectando el sujeto con su identidad/cualidad.',
        examples: ['He is a doctor', 'She seems sad']
      },
      {
        title: 'Patterns that clauses',
        descriptionEn: 'Verbs followed by a "that" clause.',
        descriptionEs: 'Verbos seguidos de una cláusula "that".',
        examples: ['He said that he was busy']
      },
      {
        title: 'Patterns with to and –ing',
        descriptionEn: 'Gerund vs Infinitive usage after verbs.',
        descriptionEs: 'Uso de gerundio vs infinitivo después de los verbos.',
        examples: ['I like swimming', 'I hope to see you']
      },
      {
        title: 'Phrasal',
        descriptionEn: 'Combinations of verb + particle.',
        descriptionEs: 'Combinaciones de verbo + partícula.',
        examples: ['Give up', 'Get along']
      },
      {
        title: 'Phrasal-prepositional',
        descriptionEn: 'Triple combinations (verb + adverb + preposition).',
        descriptionEs: 'Combinaciones triples (verbo + adverbio + preposición).',
        examples: ['Look forward to', 'Get away with']
      },
      {
        title: 'Prepositional',
        descriptionEn: 'Verbs that require a specific preposition.',
        descriptionEs: 'Verbos que requieren una preposición específica.',
        examples: ['Wait for', 'Listen to']
      },
      {
        title: 'There is/are',
        descriptionEn: 'Stating existence.',
        descriptionEs: 'Afirmando la existencia.',
        examples: ['There is a cat']
      },
      {
        title: 'Types',
        descriptionEn: 'Transitive, intransitive, stative, dynamic.',
        descriptionEs: 'Transitivos, intransitivos, estáticos, dinámicos.',
        examples: ['Sleep (intransitive)', 'Hit (transitive)']
      }
    ]
  },
  {
    id: 'vocabulary',
    title: 'VOCABULARY',
    description: 'Expanding your expressive power through new words.',
    subCategories: [
      {
        title: 'Word Formation (Prefixes & Suffixes)',
        descriptionEn: 'Morphology - changing word classes.',
        descriptionEs: 'Morfología - cambio de clases de palabras.',
        examples: ['Unhappy', 'Slowly', 'Careful']
      },
      {
        title: 'Word Families',
        descriptionEn: 'Groups of related words sharing a root.',
        descriptionEs: 'Grupos de palabras relacionadas que comparten una raíz.',
        examples: ['Act, actor, action, active']
      },
      {
        title: 'Compound Words',
        descriptionEn: 'Joining two words to make one.',
        descriptionEs: 'Unir dos palabras para formar una sola.',
        examples: ['Notebook', 'Fireman']
      }
    ]
  },
  {
    id: 'lexical-resource',
    title: 'LEXICAL RESOURCE',
    description: 'Academic and professional range of vocabulary.',
    subCategories: [
      {
        title: 'Collocations',
        descriptionEn: 'Pairing words that sound natural to native speakers.',
        descriptionEs: 'Agrupar palabras que suenan naturales para los hablantes nativos.',
        examples: ['Make a choice', 'Do your homework']
      },
      {
        title: 'Idioms & Phrasal Verbs (Avanzados)',
        descriptionEn: 'Non-literal native expressions.',
        descriptionEs: 'Expresiones nativas no literales.',
        examples: ['Bite the bullet', 'The elephant in the room']
      },
      {
        title: 'Register (Formal, Informal, Slang)',
        descriptionEn: 'Adjusting language to the social context.',
        descriptionEs: 'Ajustar el lenguaje al contexto social.',
        examples: ['Yo! (Slang)', 'Good morning (Formal)']
      }
    ]
  },
  {
    id: 'advanced-syntax',
    title: 'ADVANCED SYNTAX',
    description: 'Sophisticated structures for high-level proficiency.',
    subCategories: [
      {
        title: 'Inversion',
        descriptionEn: 'Auxiliary before subject for emphasis.',
        descriptionEs: 'Auxiliar antes del sujeto para dar énfasis.',
        examples: ['Never have I seen such a thing']
      },
      {
        title: 'Participle Clauses',
        descriptionEn: 'Using clauses starting with -ing or -ed to save words.',
        descriptionEs: 'Uso de cláusulas que empiezan por -ing o -ed para ahorrar palabras.',
        examples: ['Exhausted by the heat, we stopped']
      },
      {
        title: 'Cleft Sentences',
        descriptionEn: 'Splitting sentences to focus on one part.',
        descriptionEs: 'Dividir frases para centrarse en una parte.',
        examples: ['It was John who broke it']
      }
    ]
  },
  {
    id: 'spoken-english',
    title: 'SPOKEN ENGLISH',
    description: 'Phonology and natural spoken style.',
    subCategories: [
      {
        title: 'Connected Speech',
        descriptionEn: 'Liaison, intrusion, and elision in fast speech.',
        descriptionEs: 'Enlace, intrusión y elisión en el habla rápida.',
        examples: ['"Whataya" doing?']
      },
      {
        title: 'Intonation',
        descriptionEn: 'Using pitch to show emotion or intent.',
        descriptionEs: 'Uso del tono para mostrar emoción o intención.',
        examples: ['Rising pitch for questions']
      },
      {
        title: 'Word Stress',
        descriptionEn: 'Correct emphasis on syllables.',
        descriptionEs: 'Énfasis correcto en las sílabas.',
        examples: ['RE-cord (noun) vs re-CORD (verb)']
      }
    ]
  },
  {
    id: 'phrasal-verbs',
    title: 'PHRASAL VERBS',
    description: 'Verbs combined with particles to create new meanings.',
    subCategories: [
      {
        title: 'Type 1: Intransitive',
        descriptionEn: 'No direct object required.',
        descriptionEs: 'No requiere objeto directo.',
        examples: ['Wake up', 'Get up', 'Sit down']
      },
      {
        title: 'Type 2: Separable',
        descriptionEn: 'Object can go between the verb and particle.',
        descriptionEs: 'El objeto puede ir entre el verbo y la partícula.',
        examples: ['Turn it off', 'Pick them up']
      },
      {
        title: 'Type 3: Inseparable',
        descriptionEn: 'Object must come after the particle.',
        descriptionEs: 'El objeto debe venir después de la partícula.',
        examples: ['Look for a job', 'Run into a friend']
      }
    ]
  }
];

