export interface DetailContent {
  titleEn: string;
  descEn: string;
  descEs: string;
  characteristics: string[];
  examples: { original: string; transformed?: string; note?: string }[];
}

export interface BookPoint {
  text: string;
  detail?: DetailContent;
}

export interface BookSummary {
  speaking: BookPoint[];
  grammar: BookPoint[];
  pronunciation: BookPoint[];
  writing: BookPoint[];
  reading: BookPoint[];
}

export interface EBook {
  id: string;
  title: string;
  level: string;
  description: string;
  summary: BookSummary;
}

export const EBOOKS_DATA: EBook[] = [
  {
    id: 'interchange-1',
    title: 'Interchange 1',
    level: 'A1 - Beginner',
    description: 'The foundation of English communication. Covers essential social interactions, work-life balance, and physical environments.',
    summary: {
      speaking: [
        { 
          text: "Self-introductions: 'Hi, I'm Maria. Nice to meet you.'",
          detail: {
            titleEn: "Self-Introductions",
            descEn: "Basic social interaction for meeting new people, sharing your name, and polite greetings.",
            descEs: "Interacción social básica para conocer gente nueva, compartir tu nombre y saludos corteses.",
            characteristics: [
              "Use 'I am' or 'My name is'.",
              "Common responses: 'Nice to meet you', 'Pleasure to meet you'.",
              "Informal vs Formal contexts."
            ],
            examples: [
              { original: "I Maria.", transformed: "I am Maria.", note: "Always use the verb 'to be'." },
              { original: "Nice meet you.", transformed: "Nice to meet you.", note: "Include the 'to' before the verb." }
            ]
          }
        },
        { 
          text: "Daily routines: 'I usually wake up at 6:30 and have coffee.'",
          detail: {
            titleEn: "Daily Routines",
            descEn: "Describing everyday activities using the simple present tense and adverbs of frequency.",
            descEs: "Descripción de actividades cotidianas utilizando el presente simple y adverbios de frecuencia.",
            characteristics: [
              "Subject + Adverb + Verb + Complement.",
              "Common adverbs: always, usually, often, sometimes, never.",
              "Time expressions: 'at 7:00', 'in the morning'."
            ],
            examples: [
              { original: "I eat breakfast always.", transformed: "I always eat breakfast.", note: "Adverbs of frequency usually come before the main verb." }
            ]
          }
        },
        { 
          text: "Work and School: 'What do you do for a living?'",
          detail: {
            titleEn: "Work & School",
            descEn: "Discussing occupations, workplaces, and study subjects. Using the simple present for permanent states.",
            descEs: "Hablar sobre ocupaciones, lugares de trabajo y materias de estudio. Uso del presente simple para estados permanentes.",
            characteristics: [
              "Question: 'Where do you work?' vs 'What do you do?'",
              "Prepositions of place: 'at a bank', 'in an office'.",
              "Subject-Verb agreement for occupations ('He is a doctor')."
            ],
            examples: [
              { original: "What is your job?", transformed: "What do you do?", note: "'What do you do?' is the most common way to ask about someone's career." }
            ]
          }
        },
        { 
          text: "Shopping: 'How much does this jacket cost?'",
          detail: {
            titleEn: "Shopping & Prices",
            descEn: "Inquiring about prices, sizes, and colors. Using demonstratives (this/that/these/those).",
            descEs: "Consultar precios, tallas y colores. Uso de demostrativos (this/that/these/those).",
            characteristics: [
              "Singular vs Plural questions ('How much is?' vs 'How much are?').",
              "Demonstrative pronouns based on distance.",
              "Payment methods and vocabulary."
            ],
            examples: [
              { original: "How much cost this shoes?", transformed: "How much are these shoes?", note: "'Shoes' is plural, so use 'are' and 'these'." }
            ]
          }
        },
        { 
          text: "Likes/Dislikes: 'I really love pop music but I hate jazz.'",
          detail: {
            titleEn: "Expressing Likes & Dislikes",
            descEn: "Using a variety of verbs to express preferences and intensities of feeling.",
            descEs: "Uso de diversos verbos para expresar preferencias e intensidades de sentimiento.",
            characteristics: [
              "Degrees of preference: love > like > don't mind > dislike > hate.",
              "Gerunds after preference verbs ('I like swimming').",
              "Using 'really' and 'quite' for emphasis."
            ],
            examples: [
              { original: "I like play guitar.", transformed: "I like playing guitar.", note: "Use the -ing form after 'like'." }
            ]
          }
        },
        { 
          text: "Habits: 'I go to the gym three times a week.'",
          detail: {
            titleEn: "Describing Habits",
            descEn: "Talking about regular activities using adverbs and expressions of frequency.",
            descEs: "Hablar sobre actividades regulares utilizando adverbios y expresiones de frecuencia.",
            characteristics: [
              "Frequency expressions: 'once a week', 'every day', 'twice a month'.",
              "Position of frequency adverbs (before the main verb).",
              "Simple present for recurring actions."
            ],
            examples: [
              { original: "I gym every day.", transformed: "I go to the gym every day.", note: "Always include the action verb." }
            ]
          }
        },
        { 
          text: "Past events: 'I saw a great movie last weekend.'",
          detail: {
            titleEn: "Talking about Past Events",
            descEn: "Describing completed actions in the past using the simple past tense.",
            descEs: "Descripción de acciones completadas en el pasado utilizando el tiempo pasado simple.",
            characteristics: [
              "Regular verbs (-ed) vs. Irregular verbs (saw, went, ate).",
              "Time markers: 'last night', 'yesterday', 'two days ago'.",
              "Negative form with 'didn't' + base verb."
            ],
            examples: [
              { original: "I seed a movie.", transformed: "I saw a movie.", note: "'See' is an irregular verb." }
            ]
          }
        }
      ],
      grammar: [
        { 
          text: "Be-verb (am/is/are) for identity and location.",
          detail: {
            titleEn: "The Be-Verb",
            descEn: "The most fundamental verb in English, used to identify people, describe characteristics, and state locations.",
            descEs: "El verbo más fundamental en inglés, utilizado para identificar personas, describir características y expresar ubicaciones.",
            characteristics: [
              "Three forms: am (I), is (he/she/it), are (you/we/they).",
              "Contractions: I'm, you're, she's.",
              "Negative form with 'not'."
            ],
            examples: [
              { original: "I no is teacher.", transformed: "I am not a teacher.", note: "Use 'am' with 'I' and place 'not' after the verb." }
            ]
          }
        },
        { 
          text: "Wh-questions (What, Where, Who) in simple present.",
          detail: {
            titleEn: "Wh-Questions",
            descEn: "Information questions that require more than a yes/no answer.",
            descEs: "Preguntas de información que requieren más que una respuesta de sí/no.",
            characteristics: [
              "What: Things/Actions.",
              "Where: Places.",
              "Who: People.",
              "Word Order: Wh-word + do/does + subject + verb."
            ],
            examples: [
              { original: "Live where you?", transformed: "Where do you live?", note: "Always put the Wh-word at the beginning." }
            ]
          }
        },
        { 
          text: "Possessives: My, Your, His, Her.",
          detail: {
            titleEn: "Possessive Adjectives",
            descEn: "Words used to indicate ownership or belonging, corresponding to the subject.",
            descEs: "Palabras utilizadas para indicar propiedad o pertenencia, correspondientes al sujeto.",
            characteristics: [
              "My (I), Your (You), His (He), Her (She), Its (It), Our (We), Their (They).",
              "They come before a noun.",
              "They do not change for plural nouns (e.g., 'My books')."
            ],
            examples: [
              { original: "The his car is blue.", transformed: "His car is blue.", note: "Do not use 'the' before possessive adjectives." }
            ]
          }
        },
        { 
          text: "Count/Non-count nouns (Coffee vs. Apples).",
          detail: {
            titleEn: "Count & Non-count Nouns",
            descEn: "Distinguishing between items that can be counted individually and those that are viewed as a mass.",
            descEs: "Distinción entre elementos que pueden contarse individualmente y aquellos que se ven como una masa.",
            characteristics: [
              "Countable: Have singular and plural forms (apple/apples).",
              "Non-count: No plural form (water, advice, money).",
              "Use of 'some' and 'any' with both types."
            ],
            examples: [
              { original: "I have two furnitures.", transformed: "I have two pieces of furniture.", note: "'Furniture' is non-count." }
            ]
          }
        },
        { 
          text: "Simple Present vs. Present Continuous.",
          detail: {
            titleEn: "Present Tenses Comparison",
            descEn: "Contrasting habits and permanent states with actions happening right now.",
            descEs: "Contrastar hábitos y estados permanentes con acciones que están ocurriendo en este momento.",
            characteristics: [
              "Simple Present: General truths, habits ('I work every day').",
              "Present Continuous: Temporary actions, now ('I am working now').",
              "Stative verbs usually only take the simple form (love, know, believe)."
            ],
            examples: [
              { original: "I'm always working in this office.", transformed: "I work in this office.", note: "Use simple present for permanent work locations." }
            ]
          }
        },
        { 
          text: "Simple Past: Regular and irregular verbs.",
          detail: {
            titleEn: "Simple Past Tense",
            descEn: "Mastering the formation of past tense for both consistent and unique verb patterns.",
            descEs: "Dominar la formación del tiempo pasado tanto para patrones de verbos consistentes como únicos.",
            characteristics: [
              "Regular: Add -d or -ed (walked, liked).",
              "Irregular: Completely change form (buy -> bought, go -> went).",
              "The verb 'to be' has two past forms: was/were."
            ],
            examples: [
              { original: "He speaked with me.", transformed: "He spoke with me.", note: "'Speak' is an irregular verb." }
            ]
          }
        }
      ],
      pronunciation: [
        { 
          text: "Linked sounds: 'An orange' -> 'A-norange'.",
          detail: {
            titleEn: "Liaison & Sound Linking",
            descEn: "Learning how English speakers connect the final sound of one word to the first sound of the next.",
            descEs: "Aprender cómo los hablantes de inglés conectan el sonido final de una palabra con el sonido inicial de la siguiente.",
            characteristics: [
              "Consonant to Vowel linking ('Hold on' -> Hol-don).",
              "Helps with natural flow and understanding native speakers.",
              "Crucial for high-speed comprehension."
            ],
            examples: [
              { original: "Get up.", transformed: "Ge-tup.", note: "The 't' attaches to the 'u'." }
            ]
          }
        },
        { 
          text: "Syllable stress: CO-lors, PHO-to, COM-pu-ter.",
          detail: {
            titleEn: "Word Stress Patterns",
            descEn: "Identifying which syllable carries the most emphasis in a word, which is key to being understood.",
            descEs: "Identificar qué sílaba lleva más énfasis en una palabra, lo cual es clave para ser entendido.",
            characteristics: [
              "One syllable = One heart-beat.",
              "Stressed syllables are longer, louder, and higher in pitch.",
              "Vowels in unstressed syllables often become 'schwa' /ə/."
            ],
            examples: [
              { original: "banana", transformed: "ba-NA-na", note: "The middle syllable is stressed." }
            ]
          }
        },
        { 
          text: "Sentence intonation: Rising for Yes/No questions.",
          detail: {
            titleEn: "Intonation Curves",
            descEn: "Using the rise and fall of your voice to signal a question vs. a statement.",
            descEs: "Uso del ascenso y descenso de la voz para señalar una pregunta frente a una declaración.",
            characteristics: [
              "Rising intonation: Used for Yes/No questions.",
              "Falling intonation: Used for Wh-questions and statements.",
              "Conveys emotion and certainty."
            ],
            examples: [
              { original: "Do you like coffee?", transformed: "Do you like coffee? ↑", note: "The pitch rises at the end." }
            ]
          }
        },
        { 
          text: "Reduction of 'did you': 'Did-ja (did you) go?'",
          detail: {
            titleEn: "Conversational Reductions",
            descEn: "How auxiliary verbs and pronouns blend together in casual speech.",
            descEs: "Cómo los verbos auxiliares y los pronombres se mezclan en el habla informal.",
            characteristics: [
              "Did you -> Didja.",
              "What are you -> Whatcha.",
              "Going to -> Gonna."
            ],
            examples: [
              { original: "What are you doing?", transformed: "Whatcha doin'?", note: "Common in informal, fast conversations." }
            ]
          }
        }
      ],
      writing: [
        { 
          text: "Filling out personal contact forms.",
          detail: {
            titleEn: "Form Completion",
            descEn: "Navigating common administrative documents, ensuring names, addresses, and details are formatted correctly.",
            descEs: "Navegar por documentos administrativos comunes, asegurando que los nombres, direcciones y detalles tengan el formato correcto.",
            characteristics: [
              "First name vs Last name (Surname).",
              "Zip code / Postal code formats.",
              "Emergency contact terminology."
            ],
            examples: [
              { original: "Address: New York", transformed: "Address: 123 Main St, New York, NY 10001", note: "Forms require specific, full details." }
            ]
          }
        },
        { 
          text: "Writing a short biography about a classmate.",
          detail: {
            titleEn: "Writing Biographies",
            descEn: "Synthesizing interview information into a cohesive third-person paragraph.",
            descEs: "Sintetizar la información de la entrevista en un párrafo coherente en tercera persona.",
            characteristics: [
              "Using 'He' or 'She' correctly.",
              "Present simple for current facts.",
              "Linking sentences with 'also', 'and', and 'but'."
            ],
            examples: [
              { original: "She live in Peru. She is student.", transformed: "She lives in Peru and she is a student.", note: "Combine related ideas for better flow." }
            ]
          }
        },
        { 
          text: "Sending text messages for invitations.",
          detail: {
            titleEn: "Digital Invitations",
            descEn: "Crafting brief, informal messages to invite friends to events and social gatherings.",
            descEs: "Redacción de mensajes breves e informales para invitar a amigos a eventos y reuniones sociales.",
            characteristics: [
              "Informal openings ('Hey', 'Hi').",
              "Clearly stating time and place.",
              "Requesting a reply (RSVP)."
            ],
            examples: [
              { original: "Come my house tonight.", transformed: "Hey! Do you want to come to my house tonight for pizza?", note: "Social invitations usually start with a friendly greeting." }
            ]
          }
        },
        { 
          text: "Writing a family update email.",
          detail: {
            titleEn: "Personal Emails",
            descEn: "Sharing news and personal updates with relatives in a semi-formal or informal style.",
            descEs: "Compartir noticias y actualizaciones personales con familiares en un estilo semiformal o informal.",
            characteristics: [
              "Closing phrases ('Love', 'Take care').",
              "Mixing present and past tenses for news.",
              "Paragraphing for different topics."
            ],
            examples: [
              { original: "I writing to say hi.", transformed: "I'm writing to tell you about my new job.", note: "Use 'I'm writing' to state the purpose of the email." }
            ]
          }
        },
        { 
          text: "Posting vacation photos with captions.",
          detail: {
            titleEn: "Social Media Captions",
            descEn: "Writing engaging and descriptive summaries for visual content on social platforms.",
            descEs: "Escribir resúmenes atractivos y descriptivos para contenido visual en plataformas sociales.",
            characteristics: [
              "Use of present continuous for actions in photos ('Having fun!').",
              "Adding emojis and hashtags.",
              "Short, punchy sentences."
            ],
            examples: [
              { original: "I am in beach.", transformed: "Chilling at the beach! #VacationMode", note: "Active, present descriptions work best for social media." }
            ]
          }
        }
      ],
      reading: [
        { 
          text: "Scanning for names in short articles.",
          detail: {
            titleEn: "Scanning Skills",
            descEn: "Learning how to quickly look for specific keywords without reading every word of a text.",
            descEs: "Aprender a buscar rápidamente palabras clave específicas sin leer cada palabra de un texto.",
            characteristics: [
              "Looking for capital letters (Names/Places).",
              "Moving your eyes in a 'Z' pattern.",
              "Identifying specific dates and numbers."
            ],
            examples: [
              { original: "Read word by word.", transformed: "Glance quickly for the name 'Robert'.", note: "Scanning is about speed, not deep understanding." }
            ]
          }
        },
        { 
          text: "Identifying specific information in job ads.",
          detail: {
            titleEn: "Reading Job Advertisements",
            descEn: "Finding critical details like required experience, contact info, and job titles in brief layouts.",
            descEs: "Encontrar detalles críticos como la experiencia requerida, la información de contacto y los títulos de los puestos en diseños breves.",
            characteristics: [
              "Salary vs Benefits terminology.",
              "Requirements vs Preferred skills.",
              "Call-to-action (How to apply)."
            ],
            examples: [
              { original: "What is this?", transformed: "Needed: Two years of experience in sales.", note: "Look for bullet points and bold text." }
            ]
          }
        },
        { 
          text: "Reading comparison price lists for tools.",
          detail: {
            titleEn: "Navigating Tables & Lists",
            descEn: "Comparing data between columns to find the best value or specific item characteristics.",
            descEs: "Comparación de datos entre columnas para encontrar el mejor valor o las características específicas del artículo.",
            characteristics: [
              "Header identification.",
              "Row/Column navigation.",
              "Sorting information mentally."
            ],
            examples: [
              { original: "Tool A is $50. Tool B is $30.", transformed: "Tool B is cheaper than Tool A.", note: "Comparison reading helps in making purchasing decisions." }
            ]
          }
        },
        { 
          text: "Understanding daily schedules and flyers.",
          detail: {
            titleEn: "Reading Everyday Documents",
            descEn: "Interpreting event times, locations, and special offers from diverse visual media.",
            descEs: "Interpretación de horarios de eventos, ubicaciones y ofertas especiales de diversos medios visuales.",
            characteristics: [
              "Decoding abbreviations (Mon, Tue, pm/am).",
              "Understanding expiration dates on flyers.",
              "Mapping locations mentioned to real-world context."
            ],
            examples: [
              { original: "Starts 8.", transformed: "The event begins at 8:00 PM.", note: "Context (like evening vs morning) often comes from the type of event." }
            ]
          }
        }
      ]
    }
  },
  {
    id: 'interchange-2',
    title: 'Interchange 2',
    level: 'A2 - Elementary',
    description: 'Expands communication to past experiences, future plans, and logical connections in daily life.',
    summary: {
      speaking: [
        { 
          text: "Childhood memories: 'I used to play hide and seek.'",
          detail: {
            titleEn: "Childhood Memories",
            descEn: "Talking about past habits and states that are no longer true using 'used to'.",
            descEs: "Hablar sobre hábitos y estados pasados que ya no son ciertos utilizando 'used to'.",
            characteristics: [
              "Structure: used to + base verb.",
              "Negative: didn't use to.",
              "Question: Did you use to...?"
            ],
            examples: [
              { original: "I played soccer before.", transformed: "I used to play soccer.", note: "'Used to' emphasizes that you don't play anymore." }
            ]
          }
        },
        { 
          text: "Travel issues: 'My flight was delayed for two hours.'",
          detail: {
            titleEn: "Travel Issues",
            descEn: "Describing problems encountered while traveling, focusing on the past tense and passive descriptions.",
            descEs: "Descripción de los problemas encontrados durante el viaje, centrándose en el tiempo pasado y las descripciones pasivas.",
            characteristics: [
              "Vocabulary: delayed, canceled, overbooked, lost luggage.",
              "Using 'couldn't' for inability in the past.",
              "Time durations with 'for'."
            ],
            examples: [
              { original: "My flight delay.", transformed: "My flight was delayed.", note: "Use the passive structure (was + past participle) for flight status." }
            ]
          }
        },
        { 
          text: "Technology: 'How do you turn on this printer?'",
          detail: {
            titleEn: "Talking about Technology",
            descEn: "Giving and following instructions for using modern devices and software.",
            descEs: "Dar y seguir instrucciones para usar dispositivos y software modernos.",
            characteristics: [
              "Imperative verbs (Press, Click, Open).",
              "Sequential markers (First, Then, After that).",
              "Phrasal verbs (Turn on, Shut down, Log in)."
            ],
            examples: [
              { original: "Turn out the computer.", transformed: "Turn off the computer.", note: "'Turn off' is used for electronic devices." }
            ]
          }
        },
        { 
          text: "Future Plans: 'I'm going to visit my aunt next month.'",
          detail: {
            titleEn: "Expressing Future Intentions",
            descEn: "Talking about planned future events and personal goals.",
            descEs: "Hablar sobre eventos futuros planeados y metas personales.",
            characteristics: [
              "Be going to + base verb (Prior plans).",
              "Will + base verb (Sudden decisions).",
              "Present continuous for fixed arrangements ('I'm meeting her at 5')."
            ],
            examples: [
              { original: "I visit her tomorrow.", transformed: "I'm going to visit her tomorrow.", note: "Use 'be going to' for planned actions." }
            ]
          }
        },
        { 
          text: "Requests: 'Could you please pass the salt?'",
          detail: {
            titleEn: "Making Polished Requests",
            descEn: "Using modal verbs to ask for things or favors politely.",
            descEs: "Uso de verbos modales para pedir cosas o favores cortésmente.",
            characteristics: [
              "Can (Informal) vs Could (Formal/Polite).",
              "Would you mind + -ing...?",
              "Opening with 'Excuse me'."
            ],
            examples: [
              { original: "Give me that.", transformed: "Could you please give me that?", note: "Adding 'Could you please' makes it a request rather than an order." }
            ]
          }
        },
        { 
          text: "Cultural festivals: 'We celebrate with fireworks.'",
          detail: {
            titleEn: "Talking about Culture",
            descEn: "Describing traditions, holidays, and social celebrations.",
            descEs: "Descripción de tradiciones, días festivos y celebraciones sociales.",
            characteristics: [
              "Vocabulary: holiday, tradition, celebrate, custom.",
              "Using the simple present for annual events.",
              "Passive expressions ('It is celebrated in...')."
            ],
            examples: [
              { original: "People does fireworks.", transformed: "People set off fireworks.", note: "Specific collocations like 'set off' work best with fireworks." }
            ]
          }
        }
      ],
      grammar: [
        { 
          text: "Past Tense vs. Used To for past habits.",
          detail: {
            titleEn: "Past Continuous vs Used To",
            descEn: "Differentiating between specific past actions and broad past habits.",
            descEs: "Diferenciación entre acciones pasadas específicas y hábitos pasados generales.",
            characteristics: [
              "Simple Past: One-time events ('Yesterday I went to the park').",
              "Used To: Repeated habits ('I used to go to the park every day').",
              "States vs Actions: Both work with 'used to'."
            ],
            examples: [
              { original: "I used to go to Paris last year.", transformed: "I went to Paris last year.", note: "Use Simple Past for one-time trips with a specific date." }
            ]
          }
        },
        { 
          text: "Quantity expressions: Too many, not enough.",
          detail: {
            titleEn: "Quantity Expressions",
            descEn: "Expressing sufficiency and excess in daily life.",
            descEs: "Expresión de suficiencia y exceso en la vida cotidiana.",
            characteristics: [
              "Too many: Countable nouns (excess).",
              "Too much: Uncountable nouns (excess).",
              "(Not) enough: Sufficiency."
            ],
            examples: [
              { original: "There is too many noise.", transformed: "There is too much noise.", note: "'Noise' is uncountable, so use 'much'." }
            ]
          }
        },
        { 
          text: "Modals for necessity: Must, have to, need to.",
          detail: {
            titleEn: "Modals of Necessity",
            descEn: "Expressing obligations, requirements, and personal needs.",
            descEs: "Expresión de obligaciones, requisitos y necesidades personales.",
            characteristics: [
              "Must: Strong personal obligation or rule.",
              "Have to: External obligation (official rules).",
              "Need to: Personal requirement or desire."
            ],
            examples: [
              { original: "I must to go.", transformed: "I must go.", note: "Do not use 'to' after 'must'." }
            ]
          }
        },
        { 
          text: "Future with 'be going to' and 'will'.",
          detail: {
            titleEn: "Future Structures",
            descEn: "Refining when to use specific future markers based on certainty and timing.",
            descEs: "Refinar cuándo usar marcadores de futuro específicos basados en la certeza y el tiempo.",
            characteristics: [
              "Will: Predictions, promises, instant decisions.",
              "Be going to: Plans, intentions, evidence-based predictions.",
              "Won't: Refusal or negative prediction."
            ],
            examples: [
              { original: "It's clouds. It will rain.", transformed: "Look at the clouds. It's going to rain.", note: "Use 'going to' for predictions with current evidence." }
            ]
          }
        },
        { 
          text: "Infinitives and gerunds for uses and purposes.",
          detail: {
            titleEn: "Infinitives vs Gerunds",
            descEn: "Connecting verbs to explain the goal or function of an action.",
            descEs: "Conectar verbos para explicar el objetivo o la función de una acción.",
            characteristics: [
              "To + Verb (Infinitive of purpose).",
              "For + -ing (Function of an object).",
              "Gerunds after certain verbs (enjoy, finish, avoid)."
            ],
            examples: [
              { original: "I go gym for exercise.", transformed: "I go to the gym to exercise.", note: "Use 'to + verb' to express your personal purpose." }
            ]
          }
        },
        { 
          text: "Relative clauses: 'The person who lives there...'",
          detail: {
            titleEn: "Defining Relative Clauses",
            descEn: "Using clauses to identify or provide essential information about a noun.",
            descEs: "Uso de cláusulas para identificar o proporcionar información esencial sobre un sustantivo.",
            characteristics: [
              "Who: For people.",
              "Which/That: For things.",
              "Where: For places."
            ],
            examples: [
              { original: "The man which is here.", transformed: "The man who is here.", note: "Use 'who' for people." }
            ]
          }
        }
      ],
      pronunciation: [
        { 
          text: "Reduction of 'used to' to 'use-ta'.",
          detail: {
            titleEn: "Phonetic Reductions",
            descEn: "How the pronunciation of 'used to' softens in natural conversation.",
            descEs: "Cómo se suaviza la pronunciación de 'used to' en una conversación natural.",
            characteristics: [
              "The /d/ sound is often silent.",
              "The /u/ becomes a short /ə/ (schwa).",
              "Helps in sounding more fluent and less rigid."
            ],
            examples: [
              { original: "I used to.", transformed: "I use-ta.", note: "Pronounced as one unit." }
            ]
          }
        },
        { 
          text: "Complex syllable stress patterns.",
          detail: {
            titleEn: "Advanced Word Stress",
            descEn: "Navigating longer words and how stress shifts between related words (e.g., photograph vs. photography).",
            descEs: "Navegar por palabras más largas y cómo el acento cambia entre palabras relacionadas.",
            characteristics: [
              "Recognizing suffixes that affect stress.",
              "Primary vs secondary stress.",
              "Maintaining vowel quality in stressed syllables."
            ],
            examples: [
              { original: "economy", transformed: "e-CON-o-my", note: "The second syllable is stressed." }
            ]
          }
        },
        { 
          text: "Unpronounced vowels in words like 'chocolate'.",
          detail: {
            titleEn: "Silent Vowels (Elision)",
            descEn: "Identifying vowels that are written but not spoken in native English speed.",
            descEs: "Identificación de vocales que se escriben pero no se pronuncian a la velocidad del inglés nativo.",
            characteristics: [
              "Every-day -> Ev-ry-day.",
              "Camera -> Cam-ra.",
              "Vegetable -> Veg-ta-ble."
            ],
            examples: [
              { original: "Interesting", transformed: "In-tris-ting", note: "The second 'e' is usually silent." }
            ]
          }
        },
        { 
          text: "Stress in two-part verbs (phrasal verbs).",
          detail: {
            titleEn: "Phrasal Verb Stress",
            descEn: "Learning which part of a phrasal verb to emphasize to sound natural.",
            descEs: "Aprender qué parte de un verbo frasal enfatizar para sonar natural.",
            characteristics: [
              "Stress usually falls on the particle (the second word).",
              "Turn ON, Put AWAY, Take OFF.",
              "Changing stress can sometimes change meaning (noun vs verb)."
            ],
            examples: [
              { original: "Log in.", transformed: "Log IN.", note: "The emphasis is on 'in'." }
            ]
          }
        }
      ],
      writing: [
        { 
          text: "Writing a detailed paragraph about childhood.",
          detail: {
            titleEn: "Childhood Narratives",
            descEn: "Describing past life stages with sensory details and descriptive adjectives.",
            descEs: "Descripción de las etapas de la vida pasada con detalles sensoriales y adjetivos descriptivos.",
            characteristics: [
              "Chronological ordering.",
              "Emotional vocabulary ('exciting', 'lonely', 'wonderful').",
              "Using 'When I was young...' openings."
            ],
            examples: [
              { original: "I was small. I played toy.", transformed: "When I was seven, I used to play with wooden toys every afternoon.", note: "Adding specific ages and frequencies makes writing more engaging." }
            ]
          }
        },
        { 
          text: "Posting informative messages on community boards.",
          detail: {
            titleEn: "Community Writing",
            descEn: "Writing clear, public notices or advice for local groups or online forums.",
            descEs: "Redacción de avisos públicos claros o consejos para grupos locales o foros en línea.",
            characteristics: [
              "Objectivity and clarity.",
              "Bullet points for readability.",
              "Polite and helpful tone."
            ],
            examples: [
              { original: "No parking.", transformed: "Please be aware that parking is restricted on Mondays for street cleaning.", note: "Community messages should be polite and explain the 'why'." }
            ]
          }
        },
        { 
          text: "Writing formal request emails.",
          detail: {
            titleEn: "Professional Requests",
            descEn: "Structuring emails to ask for information or assistance in a business or academic setting.",
            descEs: "Estructurar correos electrónicos para solicitar información o asistencia en un entorno empresarial o académico.",
            characteristics: [
              "Formal salutations ('Dear Mr. Smith').",
              "Clear subject lines.",
              "I am writing to request... phrases."
            ],
            examples: [
              { original: "Send me the file.", transformed: "I would appreciate it if you could send me the requested file at your earliest convenience.", note: "Use 'I would appreciate it' for a soft, formal request." }
            ]
          }
        },
        { 
          text: "Documenting step-by-step recipes.",
          detail: {
            titleEn: "Process Writing",
            descEn: "Using imperatives and sequence markers to guide a reader through a task.",
            descEs: "Uso de imperativos y marcadores de secuencia para guiar al lector a través de una tarea.",
            characteristics: [
              "Verb-first sentences.",
              "Specific measurements (cups, grams, liters).",
              "Logical progression."
            ],
            examples: [
              { original: "You put egg in bowl.", transformed: "First, crack the eggs into a large mixing bowl.", note: "Use direct action verbs for instructions." }
            ]
          }
        },
        { 
          text: "Writing travel suggestions based on experience.",
          detail: {
            titleEn: "Giving Travel Recommendations",
            descEn: "Providing advice on destinations, what to bring, and what to see.",
            descEs: "Proporcionar asesoramiento sobre los destinos, qué llevar y qué ver.",
            characteristics: [
              "Using 'You should...' or 'Don't miss...'",
              "Adjectives like 'breath-taking', 'vibrant', 'historic'.",
              "Conditional advice ('If you go in summer...')."
            ],
            examples: [
              { original: "Paris is good.", transformed: "I highly recommend visiting the Louvre; it is truly breath-taking.", note: "Use stronger adjectives than 'good' to describe travel experiences." }
            ]
          }
        }
      ],
      reading: [
        { 
          text: "Reading biographies of famous celebrities.",
          detail: {
            titleEn: "Analyzing Biographies",
            descEn: "Extracting key milestones and life achievements from a narrative text.",
            descEs: "Extraer hitos clave y logros de la vida de un texto narrativo.",
            characteristics: [
              "Distinguishing between facts and opinions.",
              "Understanding time-based transitions.",
              "Identifying the theme of a person's life."
            ],
            examples: [
              { original: "He was born 1990.", transformed: "In 1990, the future star was born in a small town.", note: "Biographies often use descriptive openings." }
            ]
          }
        },
        { 
          text: "Articles on innovative community inventions.",
          detail: {
            titleEn: "Reading about Innovation",
            descEn: "Understanding how new ideas solve specific local problems.",
            descEs: "Entender cómo las nuevas ideas resuelven problemas locales específicos.",
            characteristics: [
              "Problem-solution text structure.",
              "Identifying the benefits of a new product.",
              "Understanding the 'who, what, why' of an invention."
            ],
            examples: [
              { original: "They made a tool.", transformed: "This device uses solar power to purify water for the entire village.", note: "Focus on the positive impact described." }
            ]
          }
        },
        { 
          text: "Understanding unique travel lodging (capsule hotels).",
          detail: {
            titleEn: "Travel Reading Skills",
            descEn: "Parsing descriptions of unusual places to stay, focusing on practical details.",
            descEs: "Analizar descripciones de lugares inusuales para alojarse, centrándose en los detalles prácticos.",
            characteristics: [
              "Vocabulary of amenities (Wi-Fi, lockers, shared bath).",
              "Interpreting pros and cons.",
              "Identifying target markets ('Ideal for budget travelers')."
            ],
            examples: [
              { original: "Small room.", transformed: "Each sound-proof capsule includes a bed, a television, and controlled lighting.", note: "Technical descriptions provide specific details." }
            ]
          }
        },
        { 
          text: "Scientific reports on how food impacts mood.",
          detail: {
            titleEn: "Reading Informational Reports",
            descEn: "Interpreting Cause-and-Effect relationships in non-fiction texts.",
            descEs: "Interpretar las relaciones de causa y efecto en textos de no ficción.",
            characteristics: [
              "Connective words: 'leads to', 'result in', 'because of'.",
              "Identifying the main hypothesis.",
              "Understanding basic research results."
            ],
            examples: [
              { original: "Chocolate is happy.", transformed: "Dark chocolate has been shown to increase serotonin levels in the brain.", note: "Scientific reports use more precise vocabulary for effects." }
            ]
          }
        }
      ]
    }
  },
  {
    id: 'interchange-3',
    title: 'Interchange 3',
    level: 'B1 - Intermediate',
    description: 'Developing fluency for complex social and professional situations, problem-solving, and personal perspectives.',
    summary: {
      speaking: [
        { 
          text: "Personalities: 'He's the kind of person who is always late.'",
          detail: {
            titleEn: "Describing Personalities",
            descEn: "Using relative clauses and specific adjectives to describe character traits and habits.",
            descEs: "Uso de cláusulas relativas y adjetivos específicos para describir rasgos de carácter y hábitos.",
            characteristics: [
              "Relative pronouns 'who' or 'that' to link the person to the trait.",
              "Positive vs Negative personality adjectives.",
              "Adverbs of frequency ('always', 'never') for habits."
            ],
            examples: [
              { original: "He is late person.", transformed: "He is the kind of person who is always late.", note: "Using a relative clause adds more descriptive depth." }
            ]
          }
        },
        { 
          text: "Problem-solving: 'If I were you, I'd apologize.'",
          detail: {
            titleEn: "Giving Advice (Second Conditional)",
            descEn: "Using the second conditional to provide hypothetical advice and solve problems.",
            descEs: "Uso del segundo condicional para dar consejos hipotéticos y resolver problemas.",
            characteristics: [
              "Structure: If + past simple, would + verb.",
              "Fixed phrase for advice: 'If I were you...'",
              "Softening advice with 'I'd probably...' or 'Maybe you could...'"
            ],
            examples: [
              { original: "If I was you, I apologize.", transformed: "If I were you, I would apologize.", note: "In the second conditional, 'were' is used for all subjects in the 'if' clause for advice." }
            ]
          }
        },
        { 
          text: "Inventions: 'The internet has changed how we live.'",
          detail: {
            titleEn: "Discussing Inventions",
            descEn: "Describing how technological advances impact society, using the present perfect for ongoing effects.",
            descEs: "Describir cómo los avances tecnológicos impactan en la sociedad, utilizando el presente perfecto para los efectos actuales.",
            characteristics: [
              "Present perfect (has changed, has improved).",
              "Verbs of impact: influence, revolutionize, enable.",
              "Discussing pros and cons of modern tools."
            ],
            examples: [
              { original: "The phone change my life.", transformed: "The smartphone has changed the way I communicate with my family.", note: "Use present perfect to show the change started in the past and continues to be true." }
            ]
          }
        },
        { 
          text: "Environmental issues: 'We should recycle more paper.'",
          detail: {
            titleEn: "Environmental Awareness",
            descEn: "Discussing ecology, sustainability, and personal actions to protect the planet.",
            descEs: "Discutir sobre ecología, sostenibilidad y acciones personales para proteger el planeta.",
            characteristics: [
              "Modals of advice (should, ought to).",
              "Ecology vocabulary: global warming, pollution, renewable energy.",
              "Using 'first conditional' for environmental predictions ('If we don't act...')."
            ],
            examples: [
              { original: "We must clean.", transformed: "We should implement stricter recycling programs in our city.", note: "'Should' is used for giving strong recommendations for improvement." }
            ]
          }
        },
        { 
          text: "Life Skills: 'Learning how to manage time is vital.'",
          detail: {
            titleEn: "Soft Skills & Life Skills",
            descEn: "Explaining the importance of non-technical skills like time management and communication.",
            descEs: "Explicar la importancia de las habilidades no técnicas como la gestión del tiempo y la comunicación.",
            characteristics: [
              "Gerunds as subjects ('Learning...', 'Managing...').",
              "Adjectives of importance: vital, essential, crucial.",
              "Talking about personal growth and professional development."
            ],
            examples: [
              { original: "Manage time is good.", transformed: "Effective time management is a key skill for professional success.", note: "Turning the action into a naming noun (Gerund) makes the point stronger." }
            ]
          }
        },
        { 
          text: "Storytelling: 'It all started when I was at the park...'",
          detail: {
            titleEn: "Narrative Techniques",
            descEn: "Using varied past tenses to build interest and set the scene in personal anecdotes.",
            descEs: "Uso de variados tiempos pasados para generar interés y ambientar anécdotas personales.",
            characteristics: [
              "Setting the scene (Past Continuous: 'The sun was shining').",
              "The main event (Simple Past: 'Suddenly, I saw...').",
              "Logical sequence markers (First, Soon after, Eventually)."
            ],
            examples: [
              { original: "I went park and I see dog.", transformed: "I was walking in the park when I suddenly saw a stray dog.", note: "The background action (walking) uses continuous, the interruption (saw) uses simple." }
            ]
          }
        }
      ],
      grammar: [
        { 
          text: "Passive Voice: 'The project was completed on time.'",
          detail: {
            titleEn: "The Passive Voice",
            descEn: "Shifting focus from the person who does the action to the action itself or the receiver of the action.",
            descEs: "Cambiar el enfoque de la persona que realiza la acción a la acción misma o al receptor de la acción.",
            characteristics: [
              "Formed with 'to be' + past participle.",
              "Used when the doer is unknown or unimportant.",
              "Common in formal and technical writing."
            ],
            examples: [
              { original: "They finished the building.", transformed: "The building was finished.", note: "The building (the object) becomes the subject." }
            ]
          }
        },
        { 
          text: "Relative pronouns as subjects and objects.",
          detail: {
            titleEn: "Advanced Relative Clauses",
            descEn: "Differentiating when a relative pronoun can be omitted and how it functions within a sub-clause.",
            descEs: "Diferenciar cuándo se puede omitir un pronombre relativo y cómo funciona dentro de una cláusula subordinada.",
            characteristics: [
              "Subject pronoun: Cannot be omitted ('The man who called').",
              "Object pronoun: Can be omitted ('The film (that) I saw').",
              "Using 'whom' in very formal contexts."
            ],
            examples: [
              { original: "The car I bought it.", transformed: "The car (that) I bought is very fast.", note: "Do not repeat the object pronoun 'it' if using a relative clause." }
            ]
          }
        },
        { 
          text: "Gerund phrases as subjects and objects.",
          detail: {
            titleEn: "Gerund Phrases",
            descEn: "Using action phrases as the grammatical backbone of a sentence.",
            descEs: "Uso de frases de acción como la columna vertebral gramatical de una oración.",
            characteristics: [
              "Gerund as Subject: 'Swimming is healthy'.",
              "Gerund as Object: 'I enjoy reading novels'.",
              "Followed by a singular verb when used as a subject."
            ],
            examples: [
              { original: "Eat vegetables are good.", transformed: "Eating vegetables is good for your health.", note: "The gerund phrase takes a singular verb ('is')." }
            ]
          }
        },
        { 
          text: "Indirect requests: 'Can you tell me if...?'",
          detail: {
            titleEn: "Polite Indirect Questions",
            descEn: "Softening questions by embedding them within a polite introductory phrase.",
            descEs: "Suavizar las preguntas incrustándolas dentro de una frase introductoria de cortesía.",
            characteristics: [
              "Word order changes to statement order (Sub + Verb).",
              "Using 'if' or 'whether' for yes/no questions.",
              "No 'do/does/did' in the embedded question."
            ],
            examples: [
              { original: "Do you know where is the bank?", transformed: "Do you know where the bank is?", note: "Change the order of 'is' and 'the bank' in indirect questions." }
            ]
          }
        },
        { 
          text: "Past Continuous vs. Simple Past stories.",
          detail: {
            titleEn: "Narrative Tense Contrast",
            descEn: "Balancing background descriptions with chronological events in storytelling.",
            descEs: "Equilibrar las descripciones de fondo con los eventos cronológicos en la narración de historias.",
            characteristics: [
              "Past Continuous: Longer, background actions.",
              "Simple Past: Shorter, completed actions that move the plot.",
              "Using 'while' (continuous) vs 'when' (simple)."
            ],
            examples: [
              { original: "I studied when he called.", transformed: "I was studying when he called.", note: "The continuous action started before the simple action." }
            ]
          }
        },
        { 
          text: "Expectations: 'Be supposed to / Be expected to'.",
          detail: {
            titleEn: "Expressing Expectations",
            descEn: "Talking about rules, social norms, and what people believe should happen.",
            descEs: "Hablar sobre reglas, normas sociales y lo que la gente cree que debería suceder.",
            characteristics: [
              "Be supposed to: Used for social rules or common beliefs.",
              "Be expected to: Often used in professional or formal settings.",
              "Note: Often implies that the expectation was not met."
            ],
            examples: [
              { original: "I must arrive at 8.", transformed: "I'm supposed to arrive at 8:00, but I'm often late.", note: "'Supposed to' hints at a scheduled rule." }
            ]
          }
        }
      ],
      pronunciation: [
        { 
          text: "Stress in compound nouns: 'ICE cream' vs. 'HOT dog'.",
          detail: {
            titleEn: "Compound Noun Pronunciation",
            descEn: "Learning where the emphasis falls in nouns created from two words.",
            descEs: "Aprender dónde cae el énfasis en los sustantivos creados a partir de dos palabras.",
            characteristics: [
              "Rule: Stress usually falls on the first noun.",
              "Helps distinguish compound nouns from adjective+noun pairs.",
              "Example: Green HOUSE (a house that is green) vs GREENhouse (for plants)."
            ],
            examples: [
              { original: "post office", transformed: "POST office", note: "Stress the first word of the compound noun." }
            ]
          }
        },
        { 
          text: "Contrastive stress to clarify meaning.",
          detail: {
            titleEn: "Contrastive Sentence Stress",
            descEn: "Shifting emphasis in a sentence to correct a misunderstanding or highlight a specific fact.",
            descEs: "Cambio de énfasis en una oración para corregir un malentendido o resaltar un hecho específico.",
            characteristics: [
              "No, I SAID blue (not red).",
              "Any word in a sentence can be stressed for contrast.",
              "Changes the focus of the conversation dynamically."
            ],
            examples: [
              { original: "I didn't sell the car.", transformed: "I didn't SELL the car (I rented it).", note: "The stress changes which part of the statement is being corrected." }
            ]
          }
        },
        { 
          text: "Reduction of auxiliary verbs (I've/You're).",
          detail: {
            titleEn: "Auxiliary Verb Reductions",
            descEn: "Using standard contractions to improve the rhythm and natural sound of your English.",
            descEs: "Uso de contracciones estándar para mejorar el ritmo y el sonido natural de tu inglés.",
            characteristics: [
              "I have -> I've.",
              "We are -> We're.",
              "He would -> He'd."
            ],
            examples: [
              { original: "I have seen it.", transformed: "I've seen it.", note: "Native speakers use contractions about 90% of the time in speech." }
            ]
          }
        },
        { 
          text: "Intonation in complex choice questions.",
          detail: {
            titleEn: "Choice Question Intonation",
            descEn: "Using specific pitch patterns when offering lists of options.",
            descEs: "Uso de patrones de tono específicos al ofrecer listas de opciones.",
            characteristics: [
              "Rise on the first choices.",
              "Fall on the final choice.",
              "Signals that the list of options is complete."
            ],
            examples: [
              { original: "Tea, coffee, or water?", transformed: "Tea ↑, coffee ↑, or water? ↓", note: "The rise-rise-fall pattern is the standard for lists/choices." }
            ]
          }
        }
      ],
      writing: [
        { 
          text: "Analytical descriptions of personality types.",
          detail: {
            titleEn: "Descriptive Personality Analysis",
            descEn: "Writing in-depth paragraphs that analyze and justify personal character traits.",
            descEs: "Redacción de párrafos detallados que analizan y justifican los rasgos del carácter personal.",
            characteristics: [
              "Topic sentence naming the trait.",
              "Supporting evidence/examples ('For instance...').",
              "Conclusion summarizing impact on life."
            ],
            examples: [
              { original: "I am honest.", transformed: "I consider myself a highly reliable individual; for instance, I have never missed a deadline in five years.", note: "Professional descriptions provide proof for the traits they claim." }
            ]
          }
        },
        { 
          text: "Pamphlets for tourists describing local sights.",
          detail: {
            titleEn: "Persuasive Tourist Guides",
            descEn: "Creating engaging, short-form copy designed to attract and inform visitors.",
            descEs: "Creación de textos breves y atractivos diseñados para atraer e informar a los visitantes.",
            characteristics: [
              "Inviting language ('Discover...', 'Uncover...').",
              "Focus on unique selling points.",
              "Practical info (hours, cost) integrated into descriptions."
            ],
            examples: [
              { original: "The museum is old.", transformed: "Step back in time at our historic museum, featuring artifacts from the early 18th century.", note: "Use 'Step back in time' to evoke more emotion than 'old'." }
            ]
          }
        },
        { 
          text: "Critical reviews of online services.",
          detail: {
            titleEn: "Service Reviews",
            descEn: "Objectively evaluating a business or service with constructive feedback.",
            descEs: "Evaluación objetiva de una empresa o servicio con comentarios constructivos.",
            characteristics: [
              "Balanced reporting (Pros & Cons).",
              "Rating systems.",
              "Specific detail over general statements ('The UI is laggy' vs 'It's bad')."
            ],
            examples: [
              { original: "Bad app.", transformed: "While the interface is beautiful, the slow load times make it frustrating to use.", note: "Use 'while' to provide a balanced context." }
            ]
          }
        },
        { 
          text: "Personal accounts of cultural shock experiences.",
          detail: {
            titleEn: "Cultural Narratives",
            descEn: "Sharing deeply personal stories of adapting to new environments and social norms.",
            descEs: "Compartir historias profundamente personales de adaptación a nuevos entornos y normas sociales.",
            characteristics: [
              "Reflective vocabulary ('Initially I felt...', 'I gradually realized...').",
              "Specific cultural contrasts.",
              "Focus on internal transformation."
            ],
            examples: [
              { original: "It was different there.", transformed: "I was initially overwhelmed by the fast pace of the city, but I eventually learned to appreciate its energy.", note: "Use 'overwhelmed' to describe intense cultural emotions." }
            ]
          }
        },
        { 
          text: "Professional career goal statements.",
          detail: {
            titleEn: "Career Objective Writing",
            descEn: "Writing concise summaries for resumes or LinkedIn profiles about your professional future.",
            descEs: "Redacción de resúmenes concisos para currículums o perfiles de LinkedIn sobre tu futuro profesional.",
            characteristics: [
              "Action-oriented verbs (Seek, Aim, Deliver).",
              "Linking skills to future value.",
              "Professional and ambitious tone."
            ],
            examples: [
              { original: "I want to be manager.", transformed: "Seeking a management role where I can utilize my five years of experience in project coordination.", note: "Start with a participle like 'Seeking' for a modern resume style." }
            ]
          }
        }
      ],
      reading: [
        { 
          text: "Articles explaining social network dynamics.",
          detail: {
            titleEn: "Analyzing Social Media Texts",
            descEn: "Understanding sociological explanations of how people interact online.",
            descEs: "Entender las explicaciones sociológicas de cómo interactúan las personas en línea.",
            characteristics: [
              "Identifying main arguments. ",
              "Interpreting cause and effect of digital behavior.",
              "Vocabulary of community and influence."
            ],
            examples: [
              { original: "Likes are fun.", transformed: "The study highlights how digital affirmation, such as 'likes', impacts self-esteem.", note: "Academic reading requires identifying the 'study' or 'source'." }
            ]
          }
        },
        { 
          text: "Career guidance articles for young adults.",
          detail: {
            titleEn: "Reading Professional Advice",
            descEn: "Synthesizing tips and strategies for job searching and career growth.",
            descEs: "Sintetizar consejos y estrategias para la búsqueda de empleo y el crecimiento profesional.",
            characteristics: [
              "Imperative advice structures.",
              "Identifying market trends.",
              "Understanding employer expectations."
            ],
            examples: [
              { original: "Get a job.", transformed: "Networking remains the most effective strategy for accessing the hidden job market.", note: "Identify 'strategies' in advice texts." }
            ]
          }
        },
        { 
          text: "Reports on cultural shock and adaptation.",
          detail: {
            titleEn: "Reading about Adaptation",
            descEn: "Understanding the psychological stages of living in a foreign country.",
            descEs: "Comprensión de las etapas psicológicas de vivir en un país extranjero.",
            characteristics: [
              "Timeline vocabulary (stages, phases, duration).",
              "Emotional descriptors.",
              "Scientific explanations of social behavior."
            ],
            examples: [
              { original: "Move is hard.", transformed: "Cultural adaptation typically follows a 'U-shaped' curve of emotional highs and lows.", note: "Informational texts often use metaphors like 'curves' to explain data." }
            ]
          }
        },
        { 
          text: "Persuasive texts on environmental conservation.",
          detail: {
            titleEn: "Environmental Reading",
            descEn: "Identifying an author's bias and their calls to action regarding nature protection.",
            descEs: "Identificar el sesgo de un autor y sus llamados a la acción con respecto a la protección de la naturaleza.",
            characteristics: [
              "Persuasive techniques (rhetorical questions, emotional appeals).",
              "Fact vs. Opinion identification.",
              "Proposed solutions comprehension."
            ],
            examples: [
              { original: "Save the trees.", transformed: "The author advocates for aggressive reforestation to combat carbon emissions.", note: "Look for strong verbs like 'advocate' to identify the author's goal." }
            ]
          }
        }
      ]
    }
  },
  {
    id: 'passages-1',
    title: 'Passages 1',
    level: 'B2 - Upper Intermediate',
    description: 'Bridging the gap to advanced proficiency. Focuses on social trends, consumer culture, and sophisticated interactions.',
    summary: {
      speaking: [
        { 
          text: "Friendship: 'What defines a true friend today?'",
          detail: {
            titleEn: "Defining Friendship",
            descEn: "Exploring the evolution of relationships in the digital age and the qualities of long-lasting bonds.",
            descEs: "Explorar la evolución de las relaciones en la era digital y las cualidades de los vínculos duraderos.",
            characteristics: [
              "Abstract nouns: loyalty, trust, reliability.",
              "Comparative structures ('more/less significant than').",
              "Phrasal verbs for relationships (drift apart, stick together)."
            ],
            examples: [
              { original: "A friend is good person.", transformed: "A true friend is someone you can count on in any situation.", note: "Abstract definitions require more complex syntax." }
            ]
          }
        },
        { 
          text: "Superstitions: 'Do you believe in lucky charms?'",
          detail: {
            titleEn: "Superstitions & Beliefs",
            descEn: "Discussing cultural myths, luck, and the psychological impact of superstitions.",
            descEs: "Discutir mitos culturales, la suerte y el impacto psicológico de las supersticiones.",
            characteristics: [
              "Degrees of belief: skeptic, believer, superstitious.",
              "Conditional structures for cause/effect ('If you break a mirror...').",
              "Abstract nouns: coincidence, fate, ritual."
            ],
            examples: [
              { original: "Black cat is bad.", transformed: "Many people believe that crossing paths with a black cat brings bad luck.", note: "Use 'believe that' to introduce a cultural myth." }
            ]
          }
        },
        { 
          text: "Consumer choices: 'Why do we buy things we don't need?'",
          detail: {
            titleEn: "Consumer Culture",
            descEn: "Analyzing purchasing habits, the influence of advertising, and the psychology behind consumption.",
            descEs: "Analizar los hábitos de compra, la influencia de la publicidad y la psicología que hay detrás del consumo.",
            characteristics: [
              "Vocabulary of marketing: impulse buying, target audience, brand loyalty.",
              "Modals of possibility (might, could).",
              "Cause and effect connectives (consequently, as a result)."
            ],
            examples: [
              { original: "Ads make me buy.", transformed: "Clever marketing often triggers impulse buying in consumers.", note: "Formal analysis uses more sophisticated verbs like 'trigger'." }
            ]
          }
        },
        { 
          text: "Social trends: 'The rise of the digital nomad.'",
          detail: {
            titleEn: "Social Trends & Lifestyles",
            descEn: "Evaluating shifts in how people work and live in a globally connected world.",
            descEs: "Evaluación de los cambios en la forma en que las personas trabajan y viven en un mundo conectado globalmente.",
            characteristics: [
              "Describing trends: rise, decline, shift, surge.",
              "Vocabulary: remote work, work-life balance, flexibility.",
              "Evaluating pros and cons of modern societal shifts."
            ],
            examples: [
              { original: "Work home is popular.", transformed: "The surge in remote work has paved the way for the digital nomad lifestyle.", note: "Use 'paved the way' to show how one trend enabled another." }
            ]
          }
        },
        { 
          text: "Ethical dilemmas: 'What would you do if you found...?'",
          detail: {
            titleEn: "Ethical Dilemmas",
            descEn: "Navigating complex moral situations using the second conditional for hypothetical results.",
            descEs: "Navegar por situaciones morales complejas utilizando el segundo condicional para resultados hipotéticos.",
            characteristics: [
              "Hypothetical reasoning ('Suppose...', 'Imagine...').",
              "Vocabulary of ethics: integrity, conscience, dilemma.",
              "Expressing value judgments."
            ],
            examples: [
              { original: "If I find money, I keep it.", transformed: "If I found a large sum of money, I would probably experience a moral dilemma.", note: "Second conditional (found/would) is used for unlikely or purely hypothetical events." }
            ]
          }
        }
      ],
      grammar: [
        { 
          text: "Complex phrasal verbs for relationships.",
          detail: {
            titleEn: "Relational Phrasal Verbs",
            descEn: "Understanding verbs with multiple parts that describe human connections (e.g., grow apart, take after).",
            descEs: "Entender verbos con varias partes que describen conexiones humanas.",
            characteristics: [
              "Transitive vs. Intransitive uses.",
              "Separable vs. Inseparable particles.",
              "Nuanced meanings in romantic vs professional contexts."
            ],
            examples: [
              { original: "I look my father.", transformed: "I really take after my father in terms of personality.", note: "'Take after' means to resemble a relative." }
            ]
          }
        },
        { 
          text: "Gerund vs. Infinitive: Subtle meaning changes.",
          detail: {
            titleEn: "Gerund/Infinitive Nuance",
            descEn: "Mastering verbs that change meaning depending on whether they are followed by -ing or to (e.g., stop, forget, remember).",
            descEs: "Dominar verbos que cambian de significado según vayan seguidos de -ing o de to.",
            characteristics: [
              "Stop doing (quit an action) vs. Stop to do (pause to perform a new action).",
              "Remember doing (Past memory) vs. Remember to do (Future task).",
              "Try doing (Experiment) vs. Try to do (Effort)."
            ],
            examples: [
              { original: "I stopped to smoke.", transformed: "I stopped smoking last year for my health.", note: "'Stopped smoking' means you quit the habit entirely." }
            ]
          }
        },
        { 
          text: "Past modals for speculation: 'He must have left.'",
          detail: {
            titleEn: "Modals for Past Deduction",
            descEn: "Expressing varying degrees of certainty about events that already happened.",
            descEs: "Expresión de diversos grados de certeza sobre sucesos que ya han ocurrido.",
            characteristics: [
              "Must have: High certainty (90%).",
              "Could/Might/May have: Possibility (40-50%).",
              "Can't have: Negative certainty.",
              "Should have: Regret or unfulfilled expectation."
            ],
            examples: [
              { original: "Maybe he left.", transformed: "He might have left already since his car is gone.", note: "Use 'might have' + past participle for speculation." }
            ]
          }
        },
        { 
          text: "Subject-Verb agreement with complex phrases.",
          detail: {
            titleEn: "Complex Agreement",
            descEn: "Ensuring the verb matches the true subject when separated by prepositional phrases or clauses.",
            descEs: "Asegurarse de que el verbo coincide con el sujeto real cuando está separado por frases preposicionales o cláusulas.",
            characteristics: [
              "The group of students IS (not ARE).",
              "Neither/Either structures.",
              "Agreement with collective nouns in different dialects."
            ],
            examples: [
              { original: "The list of items are long.", transformed: "The list of items is very long.", note: "The subject is 'list' (singular), not 'items'." }
            ]
          }
        },
        { 
          text: "Mixed passive voice for formal reports.",
          detail: {
            titleEn: "Mixed Passive Structures",
            descEn: "Combining different tenses in the passive voice to describe complex processes or history.",
            descEs: "Combinar diferentes tiempos en la voz pasiva para describir procesos complejos o historia.",
            characteristics: [
              "Present perfect passive ('has been done').",
              "Modal passive ('should be finished').",
              "Integrating passive clauses into active sentences."
            ],
            examples: [
              { original: "The city built the bridge.", transformed: "The bridge is believed to have been built in the 1920s.", note: "Passive voice with an infinitive ('to have been') is highly formal." }
            ]
          }
        }
      ],
      pronunciation: [
        { 
          text: "Advanced sentence stress for emphasis.",
          detail: {
            titleEn: "Emphatic Sentence Stress",
            descEn: "Using extra-strong stress to highlight new information or correct important facts in complex sentences.",
            descEs: "Uso de un énfasis extra fuerte para resaltar información nueva o corregir hechos importantes en oraciones complejas.",
            characteristics: [
              "Stressing auxiliary verbs for contradiction ('I DID do it!').",
              "Higher pitch peaks on emphasized words.",
              "Controlling the listener's focus through prosody."
            ],
            examples: [
              { original: "I am happy.", transformed: "I AM happy (despite what you think).", note: "Stress the auxiliary to emphasize the truth of the statement." }
            ]
          }
        },
        { 
          text: "Intonation patterns in debating and arguing.",
          detail: {
            titleEn: "Debating Intonation",
            descEn: "Mastering the rise and fall of professional disagreement to remain persuasive and polite.",
            descEs: "Dominar el ascenso y descenso del desacuerdo profesional para seguir siendo persuasivo y educado.",
            characteristics: [
              "Steep falls for finality and confidence.",
              "Slight rises to signal 'I'm not finished talking yet'.",
              "Avoiding flat/monotone delivery during arguments."
            ],
            examples: [
              { original: "That's wrong.", transformed: "That's ↑ wrong! ↓", note: "A sharp fall at the end conveys strong conviction." }
            ]
          }
        },
        { 
          text: "Linguistic reductions in fast-paced professional speech.",
          detail: {
            titleEn: "Professional Reductions",
            descEn: "Identifying how formal phrases blend together in high-speed business or academic contexts.",
            descEs: "Identificación de cómo las frases formales se mezclan en contextos empresariales o académicos de alta velocidad.",
            characteristics: [
              "Would have -> Would've / Woulda.",
              "What do you -> Whadaya.",
              "I don't know -> Idunno (even in some business settings)."
            ],
            examples: [
              { original: "I would have told you.", transformed: "I would've told you earlier if I'd known.", note: "Professional speech often uses standard contractions for speed." }
            ]
          }
        }
      ],
      writing: [
        { 
          text: "Formal personal statements for applications.",
          detail: {
            titleEn: "Formal Application Essays",
            descEn: "Writing persuasive documents that highlight your strengths and fit for a specific role or institution.",
            descEs: "Redacción de documentos persuasivos que resalten tus puntos fuertes y tu idoneidad para un puesto o institución específica.",
            characteristics: [
              "Authentic voice vs. professional distance.",
              "Structuring 'Growth over time'.",
              "Conveying motivation and future goals clearly."
            ],
            examples: [
              { original: "I am a good worker.", transformed: "My professional background demonstrates a consistent commitment to excellence and teamwork.", note: "Use 'demonstrates a commitment' for a more formal impact." }
            ]
          }
        },
        { 
          text: "Detailed persuasive essays with supporting evidence.",
          detail: {
            titleEn: "Academic Persuasive Writing",
            descEn: "Constructing logical arguments backed by data, research, and analysis.",
            descEs: "Construcción de argumentos lógicos respaldados por datos, investigación y análisis.",
            characteristics: [
              "Thesis statement clarity.",
              "Using 'Counter-arguments' to strengthen your case.",
              "Transitioning between abstract points smoothly."
            ],
            examples: [
              { original: "I think cars are bad.", transformed: "It is widely argued that urban reliance on private vehicles contributes significantly to environmental degradation.", note: "Base arguments on 'widely argued' instead of personal 'I think' for academic weight." }
            ]
          }
        },
        { 
          text: "News summaries for business presentations.",
          detail: {
            titleEn: "Executive Summaries",
            descEn: "Synthesizing large amounts of information into brief, actionable bullet points or short paragraphs.",
            descEs: "Sintetizar grandes cantidades de información en viñetas o párrafos cortos y prácticos.",
            characteristics: [
              "Identifying the 'Lead' (most important info first).",
              "Removing fluff and filler.",
              "Focusing on business impact."
            ],
            examples: [
              { original: "Many things happened at the meeting.", transformed: "Quarterly earnings exceeded expectations by 5%, primarily due to strong international sales.", note: "Be specific with numbers and causes in summaries." }
            ]
          }
        },
        { 
          text: "Email responses to complex customer complaints.",
          detail: {
            titleEn: "Handling Complaints via Email",
            descEn: "Using diplomatic language to de-escalate problems and offer solutions effectively.",
            descEs: "Uso de un lenguaje diplomático para reducir los problemas y ofrecer soluciones con eficacia.",
            characteristics: [
              "Empathy statements ('I understand your frustration').",
              "Clear explanation without making excuses.",
              "Providing a timeline for resolution."
            ],
            examples: [
              { original: "Sorry for the delay.", transformed: "Please accept our sincere apologies for the inconvenience caused by the delivery delay.", note: "Use 'significant apologies' and 'inconvenience caused' for professional tone." }
            ]
          }
        }
      ],
      reading: [
        { 
          text: "Sociological studies on digital friendship.",
          detail: {
            titleEn: "Reading Sociological Texts",
            descEn: "Interpreting academic research on how social media impacts human connection.",
            descEs: "Interpretar investigaciones académicas sobre cómo impactan las redes sociales en la conexión humana.",
            characteristics: [
              "Understanding methodology terminology (sample size, correlation).",
              "Identifying abstract concepts (social capital, weak ties).",
              "Summarizing key findings."
            ],
            examples: [
              { original: "More friends is good.", transformed: "The study explores the concept of 'weak ties' and their role in information sharing.", note: "Academic texts use specific terminology like 'weak ties'." }
            ]
          }
        },
        { 
          text: "Articles on ethics in the modern workplace.",
          detail: {
            titleEn: "Workplace Ethics Reading",
            descEn: "Analyzing complex texts about transparency, fairness, and accountability in professional settings.",
            descEs: "Analizar textos complejos sobre transparencia, equidad y rendición de cuentas en entornos profesionales.",
            characteristics: [
              "Identifying ethical frameworks (utilitarianism, rights-based).",
              "Understanding corporate responsibility.",
              "Parsing logical arguments for/against certain policies."
            ],
            examples: [
              { original: "Boss should be fair.", transformed: "The article raises concerns about the ethical implications of using AI for performance monitoring.", note: "Look for 'implications' and 'concerns' in ethical analysis." }
            ]
          }
        },
        { 
          text: "Future technology predictions and impacts.",
          detail: {
            titleEn: "Predictive Reading",
            descEn: "Interpreting expert forecasts about AI, automation, and the future of work.",
            descEs: "Interpretar las previsiones de los expertos sobre la IA, la automatización y el futuro del trabajo.",
            characteristics: [
              "Speculative language (foresee, predict, likely).",
              "Differentiating between optimistic and pessimistic viewpoints.",
              "Understanding the 'Ripple effect' of technology."
            ],
            examples: [
              { original: "AI will do my job.", transformed: "Experts predict that automation will complement human labor rather than replace it entirely.", note: "Future predictions often distinguish between 'completing' and 'replacing'." }
            ]
          }
        },
        { 
          text: "Complex narratives on cultural heritage.",
          detail: {
            titleEn: "Cultural Heritage Texts",
            descEn: "Reading evocative, high-level narratives about tradition, history, and identity.",
            descEs: "Lectura de narrativas evocadoras y de alto nivel sobre la tradición, la historia y la identidad.",
            characteristics: [
              "Metaphorical and descriptive language.",
              "Historical context integration.",
              "Themes of belonging and loss."
            ],
            examples: [
              { original: "People have history.", transformed: "The narrative weaves together personal anecdotes with broader historical movements to explore cultural identity.", note: "Use 'weaves together' to describe how complex stories are structured." }
            ]
          }
        }
      ]
    }
  },
  {
    id: 'passages-2',
    title: 'Passages 2',
    level: 'C1 - Advanced',
    description: 'Mastering the nuances of English for academic, professional, and complex social contexts at a high level.',
    summary: {
      speaking: [
        { 
          text: "Professional Negotiations: 'We propose a flexible timeline.'",
          detail: {
            titleEn: "Professional Negotiations",
            descEn: "Formulating offers, counter-offers, and agreements in a business context using diplomatic and persuasive language.",
            descEs: "Formulación de ofertas, contraofertas y acuerdos en un contexto empresarial utilizando un lenguaje diplomático y persuasivo.",
            characteristics: [
              "Use of conditional language (would, could).",
              "Signaling movement: 'We might be willing to...'",
              "Focus on win-win outcomes."
            ],
            examples: [
              { original: "I want a lower price.", transformed: "We would be open to a lower price if the volume increases.", note: "Using 'would be open' sounds more professional." }
            ]
          }
        },
        { 
          text: "Academic Debates: 'The evidence suggests a correlation.'",
          detail: {
            titleEn: "Academic Debates",
            descEn: "Participating in formal discussions using evidence-based reasoning and academic register to support claims or refute arguments.",
            descEs: "Participación en discusiones formales utilizando razonamiento basado en evidencias y un registro académico para respaldar afirmaciones o refutar argumentos.",
            characteristics: [
              "Hedges (suggests, indicates, appears to be) to avoid overgeneralization.",
              "Citing sources: 'According to...', 'As noted by...'",
              "Logical connectives: 'Furthermore', 'Conversely'."
            ],
            examples: [
              { original: "It is true that...", transformed: "The available evidence strongly suggests that...", note: "Academic language prefers precision over blanket statements." }
            ]
          }
        },
        { 
          text: "Social Critiques: 'The media's role in public opinion.'",
          detail: {
            titleEn: "Social Critiques",
            descEn: "Analyzing and evaluating societal structures, media influence, and cultural norms using high-level vocabulary.",
            descEs: "Analizar y evaluar las estructuras sociales, la influencia de los medios y las normas culturales utilizando un vocabulario de alto nivel.",
            characteristics: [
              "Critical thinking verbs: scrutinize, evaluate, critique.",
              "Noun phrases for complex concepts.",
              "Rhetorical questions for impact."
            ],
            examples: [
              { original: "Media is bad.", transformed: "The media often shapes public perception through selective reporting.", note: "Use 'shapes perception' for a more analytical tone." }
            ]
          }
        },
        { 
          text: "Complex Narratives: 'The historical context of the movement.'",
          detail: {
            titleEn: "Advanced Storytelling",
            descEn: "Crafting non-linear or multi-layered stories that integrate historical background and complex motives.",
            descEs: "Creación de historias no lineales o de varias capas que integran antecedentes históricos y motivos complejos.",
            characteristics: [
              "Using the past perfect for background events ('Had already happened').",
              "Embedded clauses for extra detail.",
              "Thematic consistency throughout the narrative."
            ],
            examples: [
              { original: "The movement started 1960.", transformed: "The movement, which had been gaining momentum for years, finally erupted in 1960.", note: "Use 'which had been gaining' to show progress before a specific date." }
            ]
          }
        },
        { 
          text: "Philosophical Discussions: 'The nature of artificial intelligence.'",
          detail: {
            titleEn: "Philosophical Inquiry",
            descEn: "Engaging in abstract reasoning about consciousness, ethics, and the future of humanity.",
            descEs: "Participar en el razonamiento abstracto sobre la conciencia, la ética y el futuro de la humanidad.",
            characteristics: [
              "Abstract nouns: consciousness, existence, perception, morality.",
              "Hypothetical scenarios ('Imagine a world where...').",
              "Linking abstract theories to practical examples."
            ],
            examples: [
              { original: "Is AI alive?", transformed: "One must consider whether artificial intelligence truly possesses consciousness or merely simulates it.", note: "Use 'One must consider' for a more formal, philosophical tone." }
            ]
          }
        }
      ],
      grammar: [
        { 
          text: "Inversion after negative adverbs: 'Never have I seen...'",
          detail: {
            titleEn: "Inversion with negative adverbs",
            descEn: "Using negative or restrictive adverbs at the beginning of a sentence to add emphasis, requiring an auxiliary verb before the subject.",
            descEs: "Uso de adverbios negativos o restrictivos al principio de una oración para añadir énfasis, lo que requiere un verbo auxiliar antes del sujeto.",
            characteristics: [
              "Formality: High academic and literary register.",
              "Common adverbs: Never, Seldom, Rarely, Hardly.",
              "Note: Requires subject-auxiliary inversion."
            ],
            examples: [
              { original: "I have never seen such competence.", transformed: "Never have I seen such competence.", note: "Used for dramatic effect in business/legal settings." }
            ]
          }
        },
        { 
            text: "Cleft sentences: 'It was the CEO who decided...'",
            detail: {
                titleEn: "Cleft Sentences",
                descEn: "A cleft sentence is a complex sentence structure that splits a single idea into two clauses to emphasize a specific part of the sentence, such as the subject, object, or adverbial phrase. It converts a simple sentence into a main clause (often starting with 'It is/was' or 'What') and a relative clause to highlight new information.",
                descEs: "Una oración hendida es una estructura sintáctica compleja que divide una sola idea en dos cláusulas para enfatizar una parte específica de la oración, como el sujeto, el objeto o un complemento. Convierte una oración simple en una cláusula principal (que suele empezar con 'It is/was' o 'What') y una cláusula relativa para resaltar información nueva.",
                characteristics: [
                    "Purpose: To focus on new information or contrast information while connecting it to what is already understood.",
                    "Common structures: 'It-Clefts' (It + be + emphasized part + that/who) and 'What-Clefts' (What + subject + verb + be + emphasized part).",
                    "Usage: Commonly used to emphasize time, place, or specific people."
                ],
                examples: [
                    { original: "John stole the cookie.", transformed: "It was John who stole the cookie.", note: "Emphasizes it was John, not someone else." },
                    { original: "I need a coffee.", transformed: "What I need is a coffee.", note: "Emphasizes the need is coffee." },
                    { original: "I lost my keys in the park.", transformed: "It was in the park that I lost my keys.", note: "Emphasizes the location." }
                ]
            }
        },
        { 
          text: "Advanced conditional structures for hypothetical scenarios.",
          detail: {
            titleEn: "Advanced Conditionals",
            descEn: "Exploring hybrid conditional structures and inversion in conditionals for sophisticated speculation.",
            descEs: "Exploración de estructuras condicionales híbridas e inversión en condicionales para especulaciones sofisticadas.",
            characteristics: [
              "Omitted 'if' inversion: 'Should you require...', 'Were they to...'",
              "Mixed timeline conditionals.",
              "Hypothetical future precision."
            ],
            examples: [
              { original: "If you need help, let me know.", transformed: "Should you require assistance, please inform us.", note: "Highly professional/formal alternative." }
            ]
          }
        },
        { 
          text: "Precise relative clause usage for clarity and nuance.",
          detail: {
            titleEn: "Precise Relative Clauses",
            descEn: "Using non-defining relative clauses and prepositions to add detail without ambiguity.",
            descEs: "Uso de cláusulas relativas explicativas y preposiciones para añadir detalles sin ambigüedad.",
            characteristics: [
              "Relative clauses with prepositions ('The company for which I work').",
              "Differentiating between defining and non-defining information.",
              "Using 'whose' for possession in complex subjects."
            ],
            examples: [
              { original: "The city I live in it.", transformed: "The city in which I reside offers a high quality of life.", note: "Use 'in which' for a very formal tone." }
            ]
          }
        },
        { 
          text: "Subjunctive mood in formal recommendations.",
          detail: {
            titleEn: "The Subjunctive Mood",
            descEn: "Using the base form of a verb after specific triggers (suggest, recommend, insist) to express necessity or urgency.",
            descEs: "Uso de la forma base de un verbo tras desencadenantes específicos para expresar necesidad o urgencia.",
            characteristics: [
              "Base verb usage (e.g., 'I suggest he STAY', not 'stays').",
              "High formal register.",
              "Common in legal, medical, and high-level business writing."
            ],
            examples: [
              { original: "I suggest he goes home.", transformed: "I suggest he go home immediately.", note: "In the subjunctive, the third-person 's' is removed." }
            ]
          }
        }
      ],
      pronunciation: [
        { 
          text: "Liaison in connected speech at high speeds.",
          detail: {
            titleEn: "Liaison & Connected Speech",
            descEn: "The smooth linking of words in natural speech, where the boundary between words becomes blurred.",
            descEs: "La vinculación fluida de palabras en el habla natural, donde el límite entre las palabras se vuelve difuso.",
            characteristics: [
              "Consonant to Vowel linking.",
              "Vowel to Vowel linking (with glide sounds /w/ or /j/).",
              "Intrusion and Elision."
            ],
            examples: [
              { original: "Pick it up.", transformed: "Pi-ki-tup.", note: "Final consonants link to initial vowels." }
            ]
          }
        },
        { 
          text: "Precision in word stress for academic terms.",
          detail: {
            titleEn: "Academic Word Stress",
            descEn: "Mastering the rhythmic patterns of multi-syllabic Latinate words common in professional English.",
            descEs: "Dominio de los patrones rítmicos de las palabras latinas de varias sílabas comunes en el inglés profesional.",
            characteristics: [
              "Identifying the primary stress in words like 'Methodology', 'Phenomenon'.",
              "Vowel reduction in unstressed academic syllables.",
              "Consistency in technical delivery."
            ],
            examples: [
              { original: "methodology", transformed: "meth-o-DOL-o-gy", note: "The fourth syllable is the primary stress." }
            ]
          }
        },
        { 
          text: "Nuanced intonation for irony and sarcasm.",
          detail: {
            titleEn: "Irony & Sarcasm Intonation",
            descEn: "Using flat or exaggerated pitch ranges to convey meanings opposite to the literal words used.",
            descEs: "Uso de rangos de tono planos o exagerados para transmitir significados opuestos a las palabras literales utilizadas.",
            characteristics: [
              "Slight delay before speaking.",
              "Lowered pitch for deadpan delivery.",
              "Exaggerated rising-falling curves for emphasis."
            ],
            examples: [
              { original: "Great idea.", transformed: "GRAAAAA-t idea.", note: "Lengthening and exaggerating the first word can signal sarcasm." }
            ]
          }
        }
      ],
      writing: [
        { 
          text: "Academic research abstracts and methodologies.",
          detail: {
            titleEn: "Academic Research Abstracts",
            descEn: "Summarizing research goals, methods, and findings in a concise, formal paragraph.",
            descEs: "Resumen de los objetivos, métodos y hallazgos de la investigación en un párrafo formal y conciso.",
            characteristics: [
              "Brevity and clarity.",
              "Passive voice for objectivity.",
              "Specific keyword inclusion."
            ],
            examples: [
              { original: "We studied how people talk.", transformed: "An analysis of sociolinguistic patterns was conducted.", note: "Formal academic tone." }
            ]
          }
        },
        { 
          text: "Professional analytical reports for stakeholders.",
          detail: {
            titleEn: "Reporting for Stakeholders",
            descEn: "Writing high-level reports that combine data analysis with strategic recommendations for decision-makers.",
            descEs: "Redacción de informes de alto nivel que combinan el análisis de datos con recomendaciones estratégicas para los responsables de la toma de decisiones.",
            characteristics: [
              "Objective, data-driven tone.",
              "Using hedging for precision ('The results suggest...', 'This may indicate...').",
              "Executive summary inclusion."
            ],
            examples: [
              { original: "The company had good year.", transformed: "The fiscal year was characterized by significant growth in domestic markets.", note: "Use 'characterized by significant growth' for a more analytical tone." }
            ]
          }
        },
        { 
          text: "Complex literary and cultural critiques.",
          detail: {
            titleEn: "Critical Reviews & Critiques",
            descEn: "Analyzing works of art or social phenomena by evaluating their themes, techniques, and impact.",
            descEs: "Analizar obras de arte o fenómenos sociales evaluando sus temas, técnicas e impacto.",
            characteristics: [
              "Analytical verbs: scrutinize, juxtapose, deconstruct.",
              "Integrating evidence from the text/media.",
              "Exploring metaphorical meanings."
            ],
            examples: [
              { original: "The movie was sad.", transformed: "The film's melancholic score juxtaposes beautifully with its vibrant visual aesthetic.", note: "Critiques use specific technical verbs like 'juxtapose'." }
            ]
          }
        },
        { 
          text: "Policy recommendations and formal proposals.",
          detail: {
            titleEn: "Writing Policy Proposals",
            descEn: "Drafting formal documents that propose new rules or actions for an organization or government.",
            descEs: "Redacción de documentos formales que proponen nuevas reglas o acciones para una organización o gobierno.",
            characteristics: [
              "Problem Statement -> Proposed Solution -> Expected Outcome.",
              "Persuasive but professional vocabulary.",
              "Using 'shall' or 'will' for regulatory requirements."
            ],
            examples: [
              { original: "We should change the rule.", transformed: "We propose an amendment to the existing remote work policy to increase flexibility.", note: "Use 'propose an amendment' for a formal procedural tone." }
            ]
          }
        }
      ],
      reading: [
        { 
          text: "Dense academic journals on technology and society.",
          detail: {
            titleEn: "Reading Academic Journals",
            descEn: "Strategies for navigating complex, peer-reviewed texts, identifying thesis statements, and interpreting data.",
            descEs: "Estrategias para navegar por textos complejos revisados por pares, identificar tesis e interpretar datos.",
            characteristics: [
              "Structure: Introduction, Methodology, Results, Discussion.",
              "Identifying key arguments through topic sentences.",
              "Vocabulary: Domain-specific and high-level academic terms."
            ],
            examples: [
              { original: "The app is good.", transformed: "The application demonstrates high utility in urban environments.", note: "Journal-style precision vs informal observation." }
            ]
          }
        },
        { 
          text: "Literary analysis of contemporary globally-recognized texts.",
          detail: {
            titleEn: "Academic Literary Reading",
            descEn: "Critically evaluating modern literature for themes of globalization, identity, and social change.",
            descEs: "Evaluación crítica de la literatura moderna en busca de temas de globalización, identidad y cambio social.",
            characteristics: [
              "Identifying symbolism and motif.",
              "Analyzing historical and cultural context.",
              "Understanding complex narrative structures."
            ],
            examples: [
              { original: "The story is about travel.", transformed: "The protagonist's journey serves as an allegory for the broader experience of diaspora.", note: "Academic reading looks for themes like 'allegory' and 'diaspora'." }
            ]
          }
        },
        { 
          text: "Professional reports on global economic trends.",
          detail: {
            titleEn: "Reading Economic Reports",
            descEn: "Interpreting dense texts containing economic data, predictions, and terminology.",
            descEs: "Interpretación de textos densos que contienen datos económicos, previsiones y terminología.",
            characteristics: [
              "Vocabulary: inflation, GDP, fiscal policy, market volatility.",
              "Interpreting charts and tables integrated with text.",
              "Understanding macro vs micro trends."
            ],
            examples: [
              { original: "Prices are going up.", transformed: "The report attributes the current inflationary trend to supply chain disruptions.", note: "Identify 'attributions' or causes for economic trends." }
            ]
          }
        },
        { 
          text: "Complex policy documents and legal summaries.",
          detail: {
            titleEn: "Reading Policy & Law",
            descEn: "Navigating formal language, clauses, and regulations to extract essential legal or operational rules.",
            descEs: "Navegar por el lenguaje formal, las cláusulas y las regulaciones para extraer reglas legales u operativas esenciales.",
            characteristics: [
              "Identifying obligations (must, shall) vs permissions (may).",
              "Parsing logical 'if/then' legal conditions.",
              "Understanding the scope of a document."
            ],
            examples: [
              { original: "You can't do that.", transformed: "The current regulation prohibits the unauthorized redistribution of proprietary data.", note: "Policy documents use precise verbs like 'prohibits' and 'unauthorized'." }
            ]
          }
        }
      ]
    }
  }
];
