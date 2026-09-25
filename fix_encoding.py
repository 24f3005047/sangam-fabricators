import os
import re

file_path = 'index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Fix Marquee bullets
text = re.sub(r'<span>[^<]*?Royal Wedding Gates</span>', '<span>&bull; Royal Wedding Gates</span>', text)
text = re.sub(r'<span class="text-\[\#3b82f6\]">[^<]*?Divine God Statues</span>', '<span class="text-[#3b82f6]">&bull; Divine God Statues</span>', text)
text = re.sub(r'<span>[^<]*?Theme Park Sculptures</span>', '<span>&bull; Theme Park Sculptures</span>', text)
text = re.sub(r'<span class="text-\[\#3b82f6\]">[^<]*?3D Portrait Busts</span>', '<span class="text-[#3b82f6]">&bull; 3D Portrait Busts</span>', text)
text = re.sub(r'<span>[^<]*?Architectural Relief Domes</span>', '<span>&bull; Architectural Relief Domes</span>', text)
text = re.sub(r'<span class="text-\[\#3b82f6\]">[^<]*?Event Mandap Columns</span>', '<span class="text-[#3b82f6]">&bull; Event Mandap Columns</span>', text)
text = re.sub(r'<span>[^<]*?Lightweight Composite Castings</span>', '<span>&bull; Lightweight Composite Castings</span>', text)
text = re.sub(r'<span class="text-\[\#3b82f6\]">[^<]*?Custom Reference Fabrication</span>', '<span class="text-[#3b82f6]">&bull; Custom Reference Fabrication</span>', text)

# Fix coordinates
text = re.sub(r'26\.8467[^<]*? N, 80\.9462[^<]*? E', '26.8467&deg; N, 80.9462&deg; E', text)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Fixed encoding issues safely.")
