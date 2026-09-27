import os

html_path = 'index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Add Security and SEO Meta tags
meta_additions = '''  <!-- Security & SEO Meta Tags -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://unpkg.com https://static.sketchfab.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; frame-src 'self' https://sketchfab.com; connect-src 'self' https://*.sketchfab.com;">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta name="theme-color" content="#020204">
  
'''
if 'Content-Security-Policy' not in text:
    text = text.replace('  <!-- Open Graph / Social Meta Tags', meta_additions + '  <!-- Open Graph / Social Meta Tags')

# 2. Add Maxlengths to inputs for security against long-payload attacks
if 'maxlength="100"' not in text:
    text = text.replace('id="clientName" required', 'id="clientName" required maxlength="100"')
    text = text.replace('id="clientCity" required', 'id="clientCity" required maxlength="100"')
    text = text.replace('id="projectDetails" rows="3"', 'id="projectDetails" rows="3" maxlength="1000"')

# Write HTML back
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(text)

# 3. Add UX Improvements to CSS
css_path = 'assets/css/luxury.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css_text = f.read()

ux_css = '''
/* Custom Luxury Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: var(--bg-dark); 
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15); 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--accent-blue); 
}

/* Prevent iOS Zoom on Inputs & Textareas */
@media screen and (-webkit-min-device-pixel-ratio:0) { 
  input[type="text"], textarea {
    font-size: 16px;
  }
}
'''

if '::-webkit-scrollbar' not in css_text:
    css_text = css_text.replace('html {\n  scroll-behavior: smooth;', 'html {\n  scroll-behavior: smooth;\n  scroll-padding-top: 100px; /* Offset for sticky header */')
    css_text += ux_css

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css_text)

# 4. Check JS for missing noopener,noreferrer
js_path = 'assets/js/luxury.js'
with open(js_path, 'r', encoding='utf-8') as f:
    js_text = f.read()

if "'noopener,noreferrer'" not in js_text:
    js_text = js_text.replace("window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(waMsg), '_blank');", "window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(waMsg), '_blank', 'noopener,noreferrer');")
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js_text)

print("Improvements and security measures applied.")
