const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '..', '1000words.txt');
const outputFile = path.join(__dirname, '..', 'src', 'constants', 'thousandWords.ts');

const content = fs.readFileSync(inputFile, 'utf-8');
const lines = content.split('\n').map(l => l.trim()).filter(l => l.length > 0);

const words = lines.map((line, index) => {
    // Format is usually "word - translation" or "word / word - translation"
    const parts = line.split(' - ');
    const english = parts[0] ? parts[0].trim() : '';
    const spanish = parts[1] ? parts[1].trim() : '';
    
    return {
        id: index + 1,
        english,
        spanish,
        grammar: '', // To be filled by Gemma
        phonetic: '', // To be filled by Gemma
        definition: '' // To be filled by Gemma
    };
});

const tsContent = `// Auto-generated from 1000words.txt
export interface ThousandWord {
    id: number;
    english: string;
    spanish: string;
    grammar?: string;
    phonetic?: string;
    definition?: string;
}

export const THOUSAND_WORDS: ThousandWord[] = ${JSON.stringify(words, null, 2)};
`;

fs.writeFileSync(outputFile, tsContent, 'utf-8');
console.log(`Generated ${words.length} words to src/constants/thousandWords.ts`);
