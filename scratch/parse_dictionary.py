import json
import re

txt_path = "public/Sources/spanishenglishen00macduoft.txt"
json_path = "public/Sources/dictionary.json"

entries = []
# Pattern: Word, [abbrev], translation
# Example: Abacería,  /.,  grocery.
# Pattern: ^([A-ZÁÉÍÓÚÑa-zñáéíóú\s-]+),\s*([a-z\.]+),\s*(.+)$
entry_re = re.compile(r'^([A-ZÁÉÍÓÚÑa-zñáéíóú\s-]+),\s*([a-z\.]+),\s*(.+)$')

with open(txt_path, "r", encoding="utf-8") as f:
    for i, line in enumerate(f):
        line = line.strip()
        if not line: continue
        
        match = entry_re.match(line)
        if match:
            word = match.group(1).strip()
            abbrev = match.group(2).strip()
            meaning = match.group(3).strip()
            
            entries.append({
                "id_dictionary": f"dict_{len(entries)}",
                "word": word,
                "word_lowercase": word.lower(),
                "list_of_abbreviations": abbrev,
                "word_in_spanish": meaning
            })

print(f"Extracted {len(entries)} valid dictionary entries.")

with open(json_path, "w", encoding="utf-8") as f:
    json.dump(entries, f, ensure_ascii=False, indent=2)

print(f"Saved to {json_path}")
