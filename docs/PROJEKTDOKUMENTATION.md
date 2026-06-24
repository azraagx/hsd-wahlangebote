# Projektdokumentation – HSD Wahlangebote

## 1. Zweck der Anwendung

**HSD Wahlangebote** ist eine React-basierte Progressive Web App (PWA) für den Fachbereich Medien der Hochschule Düsseldorf. Der Prototyp zeigt zwei Perspektiven desselben Prozesses:

- **Lehrenden-Portal (`/lehrender`)**: Lehrende erstellen, prüfen, veröffentlichen und bearbeiten Projekt- sowie Vertiefungsangebote.
- **Studierenden-Portal (`/student`)**: Studierende sehen Studiengänge, Modulangebote, Bewerbungen, Kurse und ihren Stundenplan und können sich auf Angebote bewerben.

Die Anwendung ist ein **Frontend-Prototyp**. Es gibt keine Server-API und keine Datenbank. Angebotsdaten im Lehrenden-Portal werden im Browser gespeichert; die Daten des Studierenden-Portals liegen derzeit als Beispieldaten im Quellcode.

## 2. Technologien und Start

| Bereich | Verwendete Technik | Aufgabe |
| --- | --- | --- |
| Sprache | TypeScript | Typisierte React-Anwendung |
| UI | React 18 | Komponenten, Zustand und Darstellung |
| Routing | React Router | Routen für Lehrenden- und Studierenden-Portal |
| Build-System | Vite | Entwicklungsserver und Produktions-Build |
| Styling | Tailwind CSS, CSS-Variablen | Responsive Layouts und HSD-nahe Gestaltung |
| Komponentenbasis | Radix UI / shadcn-orientierte Komponenten | Wiederverwendbare UI-Bausteine |
| Drag & Drop | react-dnd | Priorisierung von Bewerbungen im Studierenden-Portal |
| PWA | vite-plugin-pwa | Installierbarkeit, Service Worker und Offline-Grundlage |

```bash
npm install
npm run dev
```

Vite gibt anschließend die lokale Adresse aus, üblicherweise `http://localhost:5173`.

Für einen Produktions-Build:

```bash
npm run build
```

## 3. Projektstruktur

```text
.
├── public/                         # Öffentlich ausgelieferte PWA-Icons
├── src/
│   ├── main.tsx                    # Einstiegspunkt: mountet React
│   ├── app/                        # Schlanke App-Hülle, Routing und generische UI
│   │   ├── App.tsx                 # FormProvider + RouterProvider
│   │   ├── routes.tsx              # Zentrale Routenbeschreibung
│   │   ├── components/ui/          # Allgemeine, portalunabhängige UI-Komponenten
│   │   └── lib/utils.ts            # Hilfsfunktion cn() für CSS-Klassen
│   ├── features/
│   │   ├── teacher-portal/         # Eigenständiges Feature: Lehrenden-Portal
│   │   │   ├── pages/              # Seiten zum Erstellen und Verwalten von Angeboten
│   │   │   ├── components/         # Lehrenden-Layout
│   │   │   └── context/            # Gemeinsamer Formular- und Speicherzustand
│   │   └── student-portal/         # Eigenständiges Feature: Studierenden-Portal
│   │       ├── pages/              # Ansichten des Portals
│   │       ├── components/         # Fachliche UI-Bausteine
│   │       ├── data/               # Statische Beispieldaten
│   │       ├── services/           # Zentraler Datenzugriff für Seiten
│   │       ├── styles/tokens.ts    # HSD-Farbwerte
│   │       └── types.ts            # Fachliche TypeScript-Typen
│   ├── styles/                     # Globale Styles, Tailwind und Schriftarten
│   └── imports/                    # Bildmaterial und Modulhandbücher (PDF)
├── docs/                           # Projektdokumentation
├── vite.config.ts                  # Vite-, Alias- und PWA-Konfiguration
└── package.json                    # Abhängigkeiten und NPM-Skripte
```

### Einstieg und Datenfluss

1. `src/main.tsx` importiert die globalen Styles und rendert `App` in das HTML-Element `#root`.
2. `src/app/App.tsx` umschließt den Router mit dem `FormProvider` aus `features/teacher-portal`. Dadurch stehen alle Daten des Lehrenden-Workflows in dessen Seiten zur Verfügung.
3. `src/app/routes.tsx` entscheidet anhand der URL, welches Portal geöffnet wird.
4. Das Studierenden-Portal verwaltet seinen Bildschirmzustand lokal in `StudentPortalPage.tsx`; das Lehrenden-Portal verwendet den globalen `FormContext`.

## 4. Routing

| URL | Komponente | Zweck |
| --- | --- | --- |
| `/` | Inline-Weiterleitung | Leitet zum Studierenden-Portal weiter. |
| `/student` | `StudentPortalPage` | Einstieg in die Studierendenansicht. |
| `/lehrender` | `Layout` + `Dashboard` | Einstieg in das Lehrenden-Portal. |
| `/lehrender/select-type` | `TypeSelect` | Angebotsart und Projektmodus wählen. |
| `/lehrender/create-project` | `ProjectForm` | Projekt erstellen oder bearbeiten. |
| `/lehrender/import-specialization` | `SpecializationForm` | Vertiefungsangebot konfigurieren. |
| `/lehrender/preview` | `Preview` | Angebotsdaten vor dem Veröffentlichen prüfen. |
| `/lehrender/success` | `Success` | Erfolgreiche Speicherung/Veröffentlichung bestätigen. |
| `/lehrender/published` | `PublishedList` | Gespeicherte bzw. veröffentlichte Angebote auflisten. |
| `/lehrender/published/:id` | `PublishedDetail` | Detailansicht eines Angebots. |

Die Lehrenden-Routen liegen unter einem gemeinsamen `Layout`. Dessen `<Outlet />` rendert jeweils die aktive Unterseite. Eine unbekannte Unterroute unter `/lehrender` leitet zurück zum Dashboard.

## 5. Lehrenden-Portal

### Gemeinsame Bestandteile

| Datei | Aufgabe |
| --- | --- |
| `features/teacher-portal/components/Layout.tsx` | Baut Kopfzeile, HSD-Branding, Lehrenden-Kennung und den zentralen Inhaltsbereich auf. |
| `features/teacher-portal/context/FormContext.tsx` | Hält alle Formular- und Semesterdaten während des Workflows; kapselt Speichern, Laden und Zurücksetzen. |
| `app/lib/utils.ts` | `cn()` kombiniert bedingte Klassen mit `clsx` und löst Tailwind-Konflikte mit `tailwind-merge`. |
| `app/components/ui.tsx` | Kompakte, projektinterne Basisversionen von Button, Card, Input, Select, Alert, Badge usw. |

### Seiten und Funktionen

| Seite | Datei | Funktion |
| --- | --- | --- |
| Dashboard | `features/teacher-portal/pages/Dashboard.tsx` | Startseite mit den zwei Einstiegen „Neues Wahlangebot erstellen“ und „Veröffentlichte ansehen“. `resetFlow()` verhindert, dass die Angebotsart eines vorherigen Ablaufs übernommen wird. |
| Angebotsart | `features/teacher-portal/pages/TypeSelect.tsx` | Auswahl zwischen Projekt und Vertiefung. Für Projekte kann zusätzlich „neu“ oder „vorhandenes Projekt fortführen“ gewählt werden. Der Modus wird als Query-Parameter an das Projektformular übergeben. |
| Projektformular | `features/teacher-portal/pages/ProjectForm.tsx` | Erfasst Projekt-, Modul-, Studiengangs-, Inhalts-, Platz-, Termin- und Bewerbungsdaten. Unterstützt Beispielprojekte und lokal gespeicherte Projekte als Vorlage. Es prüft u. a. Kombinationen aus Bachelor- und Masterstudiengängen und fordert dann einen Mehraufwand für Masterstudierende. Ein Moodle-Import ist im Prototyp simuliert und erzeugt aus einer Moodle-ID einen Beispiel-Link. |
| Vertiefungsformular | `features/teacher-portal/pages/SpecializationForm.tsx` | Konfiguriert ein Wahlpflicht-/Vertiefungsangebot. Es bietet Auswahl bzw. Übernahme vorhandener Modulhandbuchdaten, Studiengänge, Kapazität, Moodle-Link, Termine, Bewerbungsart und Hinweise. |
| Vorschau | `features/teacher-portal/pages/Preview.tsx` | Zeigt die Daten abhängig vom ausgewählten Angebotstyp in einer studierendennahen Ansicht. Von hier aus werden `saveProject()` oder `saveSpecialization()` ausgelöst und danach die Erfolgsseite geöffnet. |
| Erfolg | `features/teacher-portal/pages/Success.tsx` | Bestätigung nach dem Speichern/Veröffentlichen. Bietet den Weg zur Angebotsdetailseite oder zum Dashboard. |
| Veröffentlichte Angebote | `features/teacher-portal/pages/PublishedList.tsx` | Liest gespeicherte Einträge aus dem Context, erlaubt Suche und Filter nach Art und führt in die Detailansicht. |
| Angebotsdetail | `features/teacher-portal/pages/PublishedDetail.tsx` | Stellt Kennzahlen und Detaildaten eines gespeicherten Projekts bzw. einer Vertiefung dar. Über „Angebot bearbeiten“ wird das passende Formular erneut geöffnet. |

### Zustand und lokale Speicherung

`FormContext.tsx` stellt mit `useFormState()` eine Hook für alle Lehrenden-Seiten bereit. Der Kontext enthält insbesondere:

- `offerType`: ausgewählte Angebotsart (`project`, `specialization` oder `null`)
- `projectData` und `specializationData`: aktuelle Formulareingaben
- `semesterData`: Semester und Status
- `validationStatus` und `autoSave`: UI-Zustand des Prototyps
- `lastSavedItemId`: ID des zuletzt gespeicherten Angebots

Die Funktionen `updateProjectData()` und `updateSpecializationData()` aktualisieren nur die übergebenen Felder und behalten alle anderen Felder bei. `resetFlow()` setzt die Ablaufsteuerung zurück.

Beim Speichern legt `saveProject()` bzw. `saveSpecialization()` ein `SavedItem` in `localStorage` unter dem Schlüssel `savedItems_v2` ab. Ein Schutz gegen Doppel-Klicks erkennt gleiche Angebote desselben Semesters innerhalb von fünf Sekunden. Zusätzlich migriert `getSavedItems()` alte Daten vom Schlüssel `savedProjects` in das neue Format.

**Wichtig:** Local Storage ist browser- und gerätebezogen. Ein gespeichertes Angebot erscheint daher nicht automatisch bei anderen Nutzenden oder auf einem anderen Gerät. Für eine produktive Anwendung müssten diese Context-Funktionen durch API-Aufrufe und eine persistente Datenbank ergänzt werden.

## 6. Studierenden-Portal

Das Studierenden-Portal ist als eigenständiges Feature in `src/features/student-portal/` organisiert. Es verwendet innerhalb von `/student` keinen URL-Router: `StudentPortalPage.tsx` speichert die aktive Ansicht im lokalen State `page` und rendert die passende Page-Komponente.

### Zentrale Steuerung

`pages/StudentPortalPage.tsx` ist der Container des Features. Er verwaltet:

- die aktive Seite (`page`),
- die gewählte Angebotskategorie,
- das aktuell ausgewählte Angebot,
- das Anwendungsmodal sowie dessen Motivationstext,
- ein Sprungziel für das Scrollen nach einem Seitenwechsel.

Der `DndProvider` mit `HTML5Backend` aktiviert Drag & Drop für die Prioritätenliste. Die Bewerbung wird im aktuellen Prototyp nach erfolgreicher Bestätigung per Browser-Dialog quittiert; sie wird nicht dauerhaft gespeichert.

### Seiten

| Seite | Datei | Funktion |
| --- | --- | --- |
| Startseite | `pages/HomePage.tsx` | Zeigt Studiengangskarten und führt zu Studienverlaufsplan, Studiengangsansicht oder den Wahlangeboten. |
| Meine Bewerbungen | `pages/BewerbungenPage.tsx` | Stellt vorhandene Bewerbungen, den aktuellen Status und die Module eines ausgewählten Semesters dar. Wahlmodule führen gefiltert zur Modulwahl. |
| Stundenplan | `pages/StundenplanPage.tsx` | Visualisiert die Termine aus `data/schedule.ts` in einem Wochenraster. |
| Meine Kurse | `pages/MeineKursePage.tsx` | Listet zugewiesene Kurse aus den Beispieldaten auf. |
| Modulwahl | `pages/ModulwahlPage.tsx` | Zeigt verfügbare Angebote und eine Prioritätenliste. Neue Bewerbungen können hinzugefügt, entfernt und per Drag & Drop umsortiert werden. |
| Angebotdetails | `pages/AngebotDetailPage.tsx` | Zeigt Beschreibung, Ziele, Voraussetzungen, Organisation und Bewerbungsregeln eines gewählten Angebots. |
| Studiengang BMI | `pages/BMI2018Page.tsx` | Zeigt die ausgewählte Studiengangs-/Prüfungsordnungsansicht. |
| Studienverlaufsplan | `pages/StudienverlaufsplanPage.tsx` | Zeigt Module nach Semester und ermöglicht den Übergang zur Modulwahl. |

### Fachliche Komponenten

| Komponente | Datei | Funktion |
| --- | --- | --- |
| `NavBar` | `components/NavBar.tsx` | Fixierte Hauptnavigation mit Startseite und Dropdown „Mein Bereich“. |
| `MeinBereichSubNav` | `components/MeinBereichSubNav.tsx` | Wiederverwendbare Unter-Navigation für Bewerbungen, Stundenplan und Kurse. |
| `CourseCard` | `components/CourseCard.tsx` | Stellt ein Modul mit ECTS, Beschreibung und optionaler Aktion dar. |
| `StatusBadge` | `components/StatusBadge.tsx` | Übersetzt Bewerbungsstatus in farbige Labels. |
| `DraggableApplicationCard` | `components/DraggableApplicationCard.tsx` | Einzelne priorisierbare Bewerbungskarte; verbindet `useDrag` und `useDrop`. |
| `ApplicationModal` | `components/ApplicationModal.tsx` | Erfasst und bestätigt die Bewerbung. Bei erforderlichem Motivationsschreiben ist Absenden unter 50 Zeichen deaktiviert. |
| `AlertBanner` | `components/AlertBanner.tsx` | Informiert über die Wahlphase und die Frist. |

### Daten, Service und Typen

Die Page-Komponenten lesen nicht direkt aus allen Datenfiles, sondern greifen überwiegend über `services/studentPortalService.ts` zu. Der Service bildet die spätere Schnittstelle zu einem Backend nach:

| Datenquelle | Inhalt |
| --- | --- |
| `data/applications.ts` | Beispielbewerbungen und zugewiesene Kurse. |
| `data/courses.ts` | Studienverlaufsdaten, nach Semester gruppiert. |
| `data/moduleOffers.ts` | Detailreiche Beispielangebote inklusive Status und Bewerbungsregeln. |
| `data/schedule.ts` | Kalendertermine sowie Zeit- und Tagesraster. |
| `types.ts` | Gemeinsame Domänentypen wie `ModulAngebot`, `Course`, `Bewerbung` und `StudentApplication`. |

Um später ein Backend einzuführen, sollten zuerst die Methoden des `studentPortalService` (`getApplications`, `getCoursesBySemester`, `getModuleOffers` usw.) asynchron werden. Die Seiten können dann bei nahezu gleicher Oberfläche Daten über diese eine Schicht laden.

## 7. Styling und Assets

- `styles/index.css` bündelt Schriftarten, Tailwind und das Theme.
- `styles/tailwind.css` aktiviert Tailwind CSS 4 sowie `tw-animate-css`.
- `styles/theme.css` definiert CSS-Variablen für Farben, Abstände, Formelemente und Typografie.
- `features/student-portal/styles/tokens.ts` enthält die konkreten HSD-Farbtokens, damit die Portal-Komponenten keine unterschiedlichen Farbwerte erfinden.
- `imports/` enthält exportiertes Bildmaterial und Modulhandbücher als PDF. Die PDFs werden aktuell als Referenzmaterial mitgeführt, aber nicht zur Laufzeit ausgelesen.

Die Vite-Konfiguration definiert außerdem den Alias `@` für `src`. Ein Import wie `@/features/student-portal/types` entspricht somit `src/features/student-portal/types`.

## 8. PWA-Verhalten

`vite.config.ts` registriert `vite-plugin-pwa` mit automatischer Aktualisierung. Das Manifest definiert Name, Kurzname, Theme-Farbe, Standalone-Darstellung sowie Icons aus `public/`. Beim Build erzeugt das Plugin die benötigten Service-Worker-Dateien.

## 9. Erweiterungshinweise

Für den Weg vom Prototyp zur produktiven Anwendung sind besonders diese Schritte sinnvoll:

1. Eine Authentifizierung und rollenbasierte Rechte für Studierende und Lehrende einführen.
2. `localStorage` und statische Daten durch ein API-Backend mit Datenbank ersetzen.
3. Speichern, Veröffentlichen, Bewerben und Benachrichtigen als echte Serveroperationen umsetzen.
4. Formulare mit klaren fachlichen Validierungsregeln und Fehlermeldungen ergänzen.
5. Tests für Context, Service und zentrale Benutzerflüsse hinzufügen.
6. Zeichencodierung der Quelltexte konsistent auf UTF-8 prüfen, damit Umlaute in allen Umgebungen korrekt angezeigt werden.
