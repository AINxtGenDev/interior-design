import base64, json, os, sys, urllib.request, wave, re

def load_key():
    for p in ('/home/nuc8/05_development/55_laulau/.env', '/home/nuc8/.env'):
        if os.path.exists(p):
            for line in open(p):
                m = re.match(r'\s*(?:export\s+)?GEMINI_API_KEY\s*=\s*"?([^"\s]+)"?', line)
                if m: return m.group(1)
    raise SystemExit('no GEMINI_API_KEY found')

def tts(text, out, voice='Sulafat', model='gemini-2.5-flash-preview-tts', style=None):
    key = load_key()
    prompt = f'{style}\n\n{text}' if style else text
    body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voice}}},
        },
    }
    url = f'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent'
    req = urllib.request.Request(url, data=json.dumps(body).encode(),
        headers={'Content-Type': 'application/json', 'x-goog-api-key': key})
    try:
        r = json.load(urllib.request.urlopen(req, timeout=180))
    except urllib.error.HTTPError as e:
        print('HTTP', e.code, e.read().decode()[:500]); raise SystemExit(1)
    part = r['candidates'][0]['content']['parts'][0]['inlineData']
    pcm = base64.b64decode(part['data'])
    with wave.open(out, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(24000); w.writeframes(pcm)
    print(f'OK {out}  mime={part["mimeType"]}  {len(pcm)/2/24000:.2f}s  voice={voice}')

if __name__ == '__main__':
    tts(sys.argv[1], sys.argv[2], voice=(sys.argv[3] if len(sys.argv) > 3 else 'Sulafat'))
