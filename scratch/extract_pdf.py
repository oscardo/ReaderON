import os
from pypdf import PdfReader

pdf_path = "sources/spanishenglishen00macduoft.pdf"
txt_path = "sources/spanishenglishen00macduoft.txt"

if not os.path.exists(pdf_path):
    print(f"Error: {pdf_path} not found")
    exit(1)

reader = PdfReader(pdf_path)
total_pages = len(reader.pages)
print(f"Extracting {total_pages} pages...")

# Extract first 50 pages for analysis first? No, let's do all as requested but save incrementally if needed.
# Actually, the user wants the WHOLE thing.
with open(txt_path, "w", encoding="utf-8") as f:
    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        if text:
            f.write(text + "\n")
        if i % 100 == 0:
            print(f"Progress: {i}/{total_pages}")

print(f"Extraction complete: {txt_path}")
