# LernAI

LernAI ist eine deutschsprachige KI-Lernplattform für Schule und selbstständiges Lernen.

## Plattform-Funktionen
- moderne öffentliche Startseite
- Lern-Dashboard
- KI-Lernchat mit Gesprächskontext
- KI-Arbeitsblatt-Generator
- direkt bearbeitbarer Editor mit Seiten-Trennung
- Speichern im Browser
- Export als HTML / über den Browser als PDF druckbar
- KI-Quiz-Generator mit Auswertung
- Lernfortschritt und letzte Aktivitäten
- Dark-/Light-Mode
- responsive für Smartphone, Tablet und PC
- API-Key bleibt serverseitig

## Hosting

**Ja, die Website kann über GitHub Pages veröffentlicht werden.** Das funktioniert für die öffentliche Oberfläche. Die echten KI-Funktionen aus `/api` benötigen zusätzlich eine Serverless-Umgebung wie Vercel, weil GitHub Pages kein serverseitiges JavaScript ausführt.

Für die komplette Plattform ist Vercel mit dem GitHub-Repository am einfachsten:

1. Repository auf GitHub behalten.
2. Projekt mit Vercel verbinden.
3. `OPENAI_API_KEY` als geheime Environment Variable bei Vercel setzen.
4. Optional `OPENAI_MODEL` setzen; Standard ist `gpt-5.6-luna`.
5. Änderungen an `main` können automatisch neu veröffentlicht werden.

Für eine rein statische Demo kann weiterhin GitHub Pages verwendet werden; dann bleiben KI-API-Funktionen ohne Backend deaktiviert.

## Sicherheit

Niemals den API-Key in `index.html`, `app.js` oder andere Frontend-Dateien schreiben. Er gehört ausschließlich in die Server-Umgebung.

## Weitere Ausbaustufen
- Login und Benutzerkonten
- Cloud-Speicherung
- echter PDF-Export
- GoodNotes-ähnliches Zeichnen mit Stift/Touch
- Bilder und Aufgaben hochladen
- Lernpläne und personalisierte Wiederholungen
- weitere Diagrammtypen und interaktive Lernvisualisierungen
