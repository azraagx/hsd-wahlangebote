# HSD Wahlangebote - Verwaltungstool für Lehrende

Diese Progressive Web App (PWA) wurde als Prototyp für das Modul **"Interaktive Systeme"** an der Hochschule Düsseldorf (HSD) entwickelt. Sie dient Lehrenden zur einfachen Erstellung, Planung und Verwaltung von Wahlangeboten für kommende Semester.

🚀 **[Hier klicken, um die Live-App zu öffnen](https://hsd-wahlangebote.netlify.app)** *(Tipp: Die App kann über den Browser auf dem PC oder Smartphone direkt als PWA installiert werden!)*

---

## 🛠️ Features
* **PWA-Ready:** Offline-fähig und installierbar als native App via Browser.
* **Modernes UI:** Responsives Design im Corporate Design der HSD, umgesetzt mit Tailwind CSS.
* **Figma to Code:** Das ursprüngliche Design und die ersten Komponenten wurden mit Figma AI / Figma Make generiert.

## 💻 Tech-Stack
* **Frontend:** React (TypeScript)
* **Build-Tool:** Vite
* **Styling:** Tailwind CSS & shadcn/ui-Komponenten
* **Hosting:** Netlify (Continuous Deployment via GitHub)

---

## 👥 Für Gruppenmitglieder: So startest du die App lokal

Wenn du am Code mitarbeiten möchtest, befolge diese Schritte:

### 1. Repository klonen
Öffne dein Terminal und lade dir das Projekt auf deinen PC:
```bash
git clone [https://github.com/azraagx/hsd-wahlangebote.git](https://github.com/azraagx/hsd-wahlangebote.git)
```

### 2. Ordner öffnen & Abhängigkeiten installieren
Wechsle in den Projektordner (z.B. in VS Code) und installiere alle benötigten Pakete:
```bash
npm install
```

### 3. Entwicklungsserver starten
Starte die App lokal auf deinem Computer:
```bash
npm run dev
```
Die App ist nun in deinem Browser unter `http://localhost:5173` erreichbar.

---

## 🚀 Deployment (Updates veröffentlichen)

Das Projekt ist mit Netlify verknüpft. Sobald Code auf den `main`-Branch bei GitHub gepusht wird, aktualisiert sich die Live-Website automatisch.

**Workflow für Updates:**
1. Änderungen lokal speichern: `git add .`
2. Änderungen beschreiben: `git commit -m "Deine kurze Beschreibung hier"`
3. Änderungen hochladen: `git push`

---

*Original Figma-Design:* *[Hochschul-Verwaltungstool-Prototyp (Figma)](https://www.figma.com/design/C9tFbqVhxR6MU2dWamz5ap/Hochschul-Verwaltungstool-Prototyp)*
