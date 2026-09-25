import os
import re

file_path = 'index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Fix encoding artifacts
text = text.replace('? ', '&bull; ')
text = text.replace('A', '&deg;')
text = text.replace('Â°', '&deg;')
text = text.replace('°', '&deg;')

# Portfolio text updates
replacements = [
    ('Religious Sacred Idol', 'FRP God Statue'),
    ('Historical Archway', 'Event & Wedding Gate'),
    ('Architectural & Murals', 'Custom Relief & Mural'),
    
    ('Monumental Mahadev Shiva Idol', 'Monumental Shiva Statue (Mahadev)'),
    ('Triple-layer E-glass fibre composite matrix with antique bronze lacquer. Built for outdoor riverbanks, temple courtyards, and open sanctums. 100% monsoonal proof.', 'Triple-layer E-glass fibre composite finished in antique bronze lacquer. Weatherproof design built for outdoor riverbanks, temple courtyards, and open sanctums.'),
    
    ('Ancient Temple Gateway', 'Royal Palatial Wedding Gate'),
    ('High-durability interlocking lightweight fibre archway with gold fluted pillars. Built for rapid 90-minute setup by tent house decorators; re-usable for 150+ wedding seasons.', 'High-durability interlocking fibre archway featuring gold fluted pillars. Engineered for rapid 90-minute setup by event decorators; built to withstand 150+ wedding seasons.'),
    
    ('Intricate filigree ornaments, modak hand detail, and high-gloss metallic gilding with UV-resistant clearcoat. Ideal for public pandals, temples, and luxury residences.', 'Intricate filigree ornamentation, detailed modak sculpting, and high-gloss metallic gilding with a UV-resistant clearcoat. Ideal for public pandals and temples.'),
    
    ('Relic of the Royal Palace', 'Nawabi Heritage Entrance Gate'),
    ("Inspired by Lucknow's historic architectural gateways. Features ornate jali archways, royal spires, and reinforced steel-core FRP frames engineered for high wind load stability.", "Inspired by Lucknow's historic architecture. Features ornate jali patterns, royal spires, and a reinforced steel-core FRP frame engineered for high wind load stability."),
    
    ('Vibrant sindoori ochre finish over resin composite matrix. Sculpted with divine muscular anatomy and protective gada weapon for ashrams, roadside sanctums, and temples.', 'Vibrant sindoori ochre finish applied over a durable resin composite. Sculpted with powerful muscular anatomy and a protective gada, perfect for ashrams and temples.'),
    
    ('Sacred Floral Archway', 'Botanical Theme Event Portal'),
    ('Engineered with built-in hollow structural channels for LED wash lights, hanging floral chandeliers, and quick-clip banner frames. Easy transport on standard utility pickups.', 'Engineered with hollow structural channels to support LED wash lights and floral chandeliers. Lightweight modular design ensures easy transport on standard utility vehicles.'),
    
    ('Ten-armed divine idol sculpted with traditional weaponry, lion vahana, and gold foil embossed mukut. Lightweight composite enables effortless ceremonial positioning.', 'Ten-armed divine idol complete with traditional weaponry, lion vahana, and a gold-foil embossed mukut. The lightweight composite allows for effortless ceremonial positioning.'),
    
    ('Fine marble-dust and poly-resin composite with lifelike divine expressions, flowing apparel drapery, and brass flute detail. Retains permanent showroom luster.', 'Cast in a premium marble-dust and poly-resin composite, featuring lifelike expressions, flowing drapery, and brass flute detailing. Retains a permanent, maintenance-free luster.'),
    
    ('Serene Buddha Sanctuary Sculpture', 'Serene Buddha Wall Relief'),
    ('Architectural meditative sculpture and ornamental wall relief carved in textured stone-patina fibre composite. Favored by luxury resorts, wellness sanctuaries, and villa facades.', 'An architectural meditative wall relief finished in a textured stone patina. A favored focal point for luxury resorts, wellness sanctuaries, and modern villa facades.'),
    
    ('alt="Client Reference Photo of Deity"', 'alt="Client\'s Reference Sketch or Photo"'),
    ("[Right] Client's Reference Photo", "[Right] Your Reference Photo"),
    ('alt="Finished Handcrafted Fibre Sculpture"', 'alt="Our Finished FRP Composite Fabrication"'),
    ('[Left] Our Finished Fibre Sculpture', '[Left] Final Manufactured Setup'),
    
    ('Event Planners & Tent House <span class="font-serif italic font-normal text-accent-gradient">Wholesale Guild</span>', 'Event Planners & Tent House <span class="font-serif italic font-normal text-accent-gradient">Bulk Supply</span>'),
    ('We operate large curing bays in Lucknow capable of fulfilling 20+ grand entrance sets simultaneously. Get priority batch manufacturing, modular transport packaging, and unbranded catalogue support for your event agency.', 'We operate expansive curing bays in Lucknow, capable of fulfilling 20+ grand entrance sets simultaneously. Get priority batch manufacturing and modular transport packaging for your event agency.'),
    
    ('The Reference <span class="font-serif italic font-normal text-accent-gradient">Concierge</span>', 'Get a Custom <span class="font-serif italic font-normal text-accent-gradient">Workshop Quote</span>')
]

for old, new in replacements:
    text = text.replace(old, new)

# Fix double replacements or missed bullet points
text = re.sub(r'[^a-zA-Z0-9\s<>\-\="\'/&;,.!?:#\(\)\[\]{}_|+]&bull;', '&bull;', text)
text = text.replace('?', '&bull;')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

print('Copy text updates applied.')
