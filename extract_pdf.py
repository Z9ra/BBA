import fitz  # PyMuPDF
import json
from collections import Counter

def hex_to_rgb(hex_code):
    """Convert an integer representing a color into hex."""
    return f"#{hex_code:06x}"

def analyze_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    
    full_text = []
    colors = Counter()
    fonts = Counter()
    
    for page_num in range(min(doc.page_count, 10)):  # analyze first 10 pages to save time/memory
        page = doc.load_page(page_num)
        
        # Extract Text
        text = page.get_text()
        full_text.append(f"--- Page {page_num + 1} ---\n{text}")
        
        # Extract fonts and colors from text blocks
        blocks = page.get_text("dict")["blocks"]
        for b in blocks:
            if b["type"] == 0:  # text block
                for line in b["lines"]:
                    for span in line["spans"]:
                        font = span["font"]
                        color = span["color"]
                        size = span["size"]
                        
                        fonts[font] += 1
                        if isinstance(color, int):
                            hex_color = hex_to_rgb(color)
                            colors[hex_color] += 1
                            
    print("=== TOP FONTS ===")
    for f, c in fonts.most_common(5):
        print(f"{f}: {c} occurrences")
        
    print("\n=== TOP COLORS ===")
    for c, cnt in colors.most_common(5):
        print(f"{c}: {cnt} occurrences")
        
    print("\n=== EXTRACTED TEXT (First 3 Pages) ===")
    print("\n".join(full_text[:3]))

if __name__ == "__main__":
    analyze_pdf("Company_Profile_PT.Bersama-Berdikari-Abadi.pdf")
