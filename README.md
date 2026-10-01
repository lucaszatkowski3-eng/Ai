# LernAI

Eine deutschsprachige, interaktive KI-Lernplattform für alle Fächer.

## Enthalten
- KI-Lernchat mit kontextbezogenen Schnellaktionen
- Arbeitsblatt-Generator
- direkt bearbeitbarer Arbeitsblatt-Editor
- lokale Speicherung im Browser
- Export der Arbeitsblätter als HTML
- interaktives Quiz mit sofortigem Feedback
- vorbereitete Grafik-Funktion
- responsive Oberfläche für PC, Tablet und Smartphone
- Dark-/Light-Mode
- optionaler Serverless-KI-Endpunkt

## Start
Für die reine Oberfläche kann `index.html` direkt geöffnet oder über GitHub Pages veröffentlicht werden.

Für echte KI-Antworten braucht die App einen Server/API-Endpunkt. Der mitgelieferte `api/ai.js` ist für eine Vercel-artige Serverless-Umgebung vorbereitet. Dort wird `OPENAI_API_KEY` als geheime Umgebungsvariable gesetzt.

**Wichtig:** Niemals einen API-Key in `app.js` oder andere Dateien des Frontends schreiben.

## Nächste Ausbaustufe
- echte KI-generierte Arbeitsblätter und Quizze
- Diagramm-/Grafik-Generator
- PDF-Export
- GoodNotes-ähnliche Zeichen-/Schreibfläche
- Benutzerkonten und Cloud-Synchronisation
- Lernfortschritt, Fächerprofile und personalisierte Wiederholung
- Datei-/Bild-Upload für Aufgaben und Notizen
