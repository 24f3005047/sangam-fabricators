import urllib.request, re

url = 'https://www.pinterest.com/pin/955748352150564605/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        t = re.search(r'<title>(.*?)</title>', html)
        print('Title:', t.group(1) if t else 'None')
        desc = re.search(r'"description":"([^"]*)"', html)
        print('Description:', desc.group(1) if desc else 'None')
except Exception as e:
    print('Error:', e)
