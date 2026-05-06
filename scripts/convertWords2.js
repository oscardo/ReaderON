import fs from 'fs';
import path from 'path';

const inputPath = 'c:/Users/Usuario/Documents/GitHub/ReaderON/1001-2000word.txt';
const outputPath = 'c:/Users/Usuario/Documents/GitHub/ReaderON/src/constants/thousandWords2.ts';

const content = fs.readFileSync(inputPath, 'utf8');
const lines = content.split('\n').filter(l => l.trim().length > 0);

const words = lines.map((line, index) => {
    const parts = line.split(';');
    // Format: English;Spanish;IPA;Grammar
    return {
        id: index + 1001,
        english: parts[0]?.trim() || '',
        spanish: parts[1]?.trim() || '',
        phonetic: parts[2]?.trim().replace(/[()]/g, '') || '', // Remove parentheses if any
        grammar: parts[3]?.trim() || '',
        definition: ''
    };
});

const tsContent = `// Auto-generated from 1001-2000word.txt
import { ThousandWord } from './thousandWords';

export const THOUSAND_WORDS_2: ThousandWord[] = ${JSON.stringify(words, null, 2)};
`;

fs.writeFileSync(outputPath, tsContent);
console.log('Conversion complete!');
