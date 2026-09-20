import subprocess, time, json, urllib.request, os

# Test simple script injection by creating a small HTML test wrapper that has auto-scroll on load
html_test = """
<!DOCTYPE html>
<html>
<body>
<script>
window.location.href = 'index.html#atelierFinale';
</script>
</body>
</html>
"""
with open("test_nav.html", "w") as f:
    f.write(html_test)

edge = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
out = os.path.abspath("scratch/test_finale_cdp.png")

# Start http server
import http.server, socketserver, threading
PORT = 8008
httpd = socketserver.TCPServer(('', PORT), http.server.SimpleHTTPRequestHandler)
threading.Thread(target=httpd.serve_forever, daemon=True).start()

# Load index.html?scroll=bottom
cmd = [edge, "--headless=new", "--disable-gpu", f"--screenshot={out}", "--window-size=1440,1100", f"http://localhost:{PORT}/index.html?scroll=bottom"]
subprocess.run(cmd, timeout=15)
print("File created:", os.path.exists(out))
httpd.shutdown()
