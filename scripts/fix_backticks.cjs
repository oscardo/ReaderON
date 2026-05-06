const fs = require('fs');
let content = fs.readFileSync('src/components/SuaveSection.tsx', 'utf8');
content = content.replace(/\\`/g, '`');
fs.writeFileSync('src/components/SuaveSection.tsx', content);
