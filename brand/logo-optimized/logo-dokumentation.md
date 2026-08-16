# Claudia Plessl Logo – optimierte Website-Dateien

Das Logo wurde für die Verwendung auf Websites sowie auf iPhones, iPads, Android-Smartphones und Android-Tablets optimiert.

Die überarbeitete Version wurde originalgetreu neu gezeichnet, entpixelt, kontrastreicher ausgearbeitet und mit einem echten transparenten Hintergrund exportiert. Die charakteristischen Bestandteile des ursprünglichen Logos bleiben erhalten:

- quadratischer Grundrissrahmen
- olivfarbener, geschwungener Bogen
- dunkelgraues Monogramm
- ursprüngliche Anordnung und Wiedererkennbarkeit

## Dateien

### Masterdateien

- [wpl-logo-master.png](wpl-logo-master.png) – transparente PNG-Masterdatei, 1024 × 1024 px
- [wpl-logo.webp](wpl-logo.webp) – verlustfreie, platzsparende WebP-Masterdatei, 1024 × 1024 px

### Responsive Website-Größen

- [wpl-logo-512.png](wpl-logo-512.png) – PNG, 512 × 512 px
- [wpl-logo-256.png](wpl-logo-256.png) – PNG, 256 × 256 px
- [wpl-logo-64.png](wpl-logo-64.png) – PNG, 64 × 64 px
- [wpl-logo-32.png](wpl-logo-32.png) – PNG, 32 × 32 px
- [wpl-logo-512.webp](wpl-logo-512.webp) – verlustfreies WebP, 512 × 512 px
- [wpl-logo-256.webp](wpl-logo-256.webp) – verlustfreies WebP, 256 × 256 px

### Favicons und Geräte-Icons

- [favicon.ico](favicon.ico) – enthält 16, 32, 48, 64, 128 und 256 px
- [apple-touch-icon.png](apple-touch-icon.png) – 180 × 180 px für iPhone und iPad
- [android-chrome-192x192.png](android-chrome-192x192.png) – 192 × 192 px für Android
- [android-chrome-512x512.png](android-chrome-512x512.png) – 512 × 512 px für Android und Web-App-Manifeste

## Prüfung der Lesbarkeit

![Logo-Größenprüfung](wpl-logo-size-preview.png)

Das Logo bleibt bei 192, 128 und 64 px sehr gut erkennbar. Bei 32 px ist das Monogramm weiterhin lesbar; die feinen Grundrissdetails treten bei dieser sehr kleinen Darstellung erwartungsgemäß etwas zurück.

## Empfohlene Einbindung auf der Website

Die Dateipfade `/assets/` müssen gegebenenfalls an die tatsächliche Ordnerstruktur der Website angepasst werden.

```html
<picture>
  <source
    type="image/webp"
    srcset="
      /assets/wpl-logo-256.webp 256w,
      /assets/wpl-logo-512.webp 512w,
      /assets/wpl-logo.webp 1024w
    "
  >
  <img
    src="/assets/wpl-logo-256.png"
    srcset="
      /assets/wpl-logo-256.png 256w,
      /assets/wpl-logo-512.png 512w,
      /assets/wpl-logo-master.png 1024w
    "
    sizes="(max-width: 600px) 96px, 140px"
    width="140"
    height="140"
    alt="Claudia Plessl Logo"
  >
</picture>
```

Mit `srcset` und `sizes` kann der Browser abhängig von Bildschirmgröße und Pixeldichte eine passende Bildauflösung auswählen.

## Favicons im HTML-Kopfbereich

```html
<link rel="icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

## Option für ein Web-App-Manifest

Wenn die Website ein `manifest.webmanifest` verwendet, können die Android-Dateien folgendermaßen eingebunden werden:

```json
{
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## Gestaltungshinweise

- Der transparente Hintergrund ermöglicht die flexible Platzierung auf hellen und mittelhellen Flächen.
- Die vorhandene Farbvariante ist für helle bis mittelhelle Website-Hintergründe optimiert.
- Für einen sehr dunklen Header oder einen Dark Mode empfiehlt sich eine separate helle Negativversion.
- Das Logo sollte nicht verzerrt werden. Breite und Höhe immer proportional skalieren.
- Für reguläre Website-Header ist eine sichtbare Breite von ungefähr 90 bis 150 px sinnvoll; die konkrete Größe hängt vom Header, den Abständen und der restlichen Navigation ab.
- Rund um das Logo sollte ausreichend Freiraum bleiben, damit Grundrissrahmen und Monogramm optisch wirken können.

## Technische Umsetzung

Die Neuzeichnung wurde im integrierten Bildbearbeitungsmodus erstellt. Der finale Bildauftrag war eine originalgetreue, flache und vektorähnliche Rekonstruktion mit:

- sauberem Alphakanal
- geglätteten Kanten
- leicht verstärkten Feinstrichen
- hoher Erkennbarkeit bei 32 bis 64 px
- unveränderter Grundidentität
- keinen zusätzlichen Buchstaben oder Symbolen
- keinen Verläufen, Schatten, 3D-Effekten oder Wasserzeichen

## Quellen

- [MDN: Responsive Images](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images)
- [MDN: HTML-Element `<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/link)
