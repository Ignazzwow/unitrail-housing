# UniTrail Housing – Projekt-Roadmap

Stand: 2026-07-14

## 1. Was ist das Projekt?

UniTrail Housing ist eine Wohnungs-/WG-Vermittlungsplattform für internationale Studierende in Deutschland (Next.js 15 App Router, Prisma/SQLite, NextAuth, Tailwind). **Hosting: Vercel** (Serverless-Deploy) – das ist für einige Punkte unten direkt relevant (Dateisystem ist nicht persistent, SQLite läuft im `/tmp`).

**Kernflüsse, die heute schon funktionieren:**
- Öffentliche Angebotsseite (`/angebote`, `/for-students/accommodation`) mit Filtern (Ort, Typ, Preis, Zimmer), Detailseite und Anfrageformular (`/angebote/[slug]/anfrage`), das eine E-Mail an Admin/Vermieter auslöst.
- Admin-Bereich (`/admin`) zur Pflege von Immobilien (inkl. Bilder-Upload), Anfragen-Übersicht und einem eigenständigen "Rental Property Analyzer" (Rendite-/Break-Even-Rechner).
- Login nur für Admins (NextAuth Credentials), kein Nutzerkonto für Studierende/Vermieter.
- Mehrsprachigkeit (DE/EN/+ weitere) über einen einfachen Client-Context.
- Cookie-Consent-Banner + Google-Analytics-Consent-Kopplung.
- Rechtstexte (Impressum, Datenschutz) sind manuell im Code gepflegt; **es gibt noch keine AGB-Seite**.

## 2. Heute erledigt: Cleanup

- Entfernt: 3 stray `console.log`-Aufrufe in `lib/ensure-production-db.ts`, `lib/email.ts`, `lib/ensure-db-env.ts` (echte Fehlerpfade/`console.error`/`warn` bleiben, die sind legitim).
- Entfernt: doppelte, ungenutzte `styles/globals.css` (die aktive ist `app/globals.css`) – hätte künftig zu Verwirrung geführt, welche Datei die richtige ist.
- Entfernt: leere `pnpm-lock.yaml` neben dem echten `package-lock.json` (zwei Lockfiles für zwei Package-Manager sind ein Risiko für Dependency-Drift).
- Entfernt: **`node-portable/` (85 MB) + `node.zip` (28 MB)** – ein komplettes Windows-Node-Binary war fest im Git-Repo eingecheckt. Jetzt in `.gitignore`.
- Farben vereinheitlicht: Admin-Bereich (`admin-shell.tsx`, `login-form.tsx`) nutzte hartcodierte `gray-*`/`red-*`-Klassen statt der Design-Tokens (`text-foreground`, `border-border`, `bg-muted`, `text-destructive`) – jetzt konsistent mit der öffentlichen Seite. Gleiches in `components/ui/toast.tsx` (destructive-Variante nutzte rohe `red-*`-Werte statt `destructive-foreground`).
- **Bug gefixt:** `nodemailer` war auf `^9.0.1` gepinnt, obwohl `next-auth@4` nur `^7.0.7` als Peer-Dependency akzeptiert – ein sauberes `npm install` schlug dadurch fehl (`ERESOLVE`). Auf `^7.0.7` zurückgestuft (die genutzte API ist stabil, kein Verhaltensunterschied für den SMTP-Versand).
- **Bug gefixt:** `lib/auth.ts` setzte `trustHost: true` in den NextAuth-Optionen – das Feld existiert in NextAuth v4 gar nicht (ist ein v5/Auth.js-Konzept), war also totes, wirkungsloses Konfigurationsfeld und ließ `tsc` fehlschlagen. Entfernt.
- Verifiziert: `npm install`, `tsc --noEmit` und `next build` laufen jetzt sauber durch.

**Nachtrag (2026-07-15) – UI-Bugs:**
- **Header-Sprung beim Menü-Öffnen:** Radix (Sheet/Dialog/Dropdown) sperrt beim Öffnen das Scrollen und kompensiert die verschwindende Scrollbar selbst per `margin-right` auf `<body>` – das erreicht aber nie den `fixed`-positionierten Header (der ist relativ zum Viewport positioniert, nicht zur Body-Box). Erster Versuch mit `scrollbar-gutter: stable` behob das zwar für den Header, kollidierte aber mit Radix' eigener Kompensation und verursachte eine neue, doppelte Verschiebung beim Öffnen des "For Students"-Dropdowns. Endgültiger Fix: `scrollbar-gutter` wieder entfernt, stattdessen koppelt eine gezielte CSS-Regel (`body[data-scroll-locked] [data-site-header] { right: var(--removed-body-scroll-bar-size) }`) nur den Header an Radix' eigene, bereits vorhandene Kompensation (`app/globals.css`, `components/navigation.tsx`).
- **Fehlender Pointer-Cursor:** Die shadcn `Button`-Komponente (`components/ui/button.tsx`) hatte kein `cursor-pointer` in ihren Basis-Klassen – Browser zeigen bei `<button>`-Elementen standardmäßig `cursor: default` (anders als bei Links), das sah dadurch überall "nicht klickbar" aus, u.a. bei den zwei Icon-Buttons oben rechts (Sprache, Dark/Light-Mode). Zentral in `button.tsx` gefixt (wirkt automatisch auf alle Buttons im Projekt) plus am rohen `<button>`-Trigger für "For Students" im Desktop-Menü (`components/navigation.tsx`).

**Nachtrag (2026-07-15) – Datenbank/Uploads live geschaltet + Admin-Formular-Bugs:**
- Prisma auf Postgres (Neon, via Vercel Storage) umgestellt, alle SQLite-Workarounds entfernt (siehe Abschnitt 3, Punkt 1 war damit erledigt).
- Uploads auf Vercel Blob umgestellt (`app/api/upload/route.ts`), inkl. sauberem Löschen der Blobs beim Entfernen eines Bildes oder einer ganzen Property (vorher Karteileichen).
- Property-Formular: "Area/Neighborhood" ist jetzt eine Textarea, Enter in einem Textfeld sendet das Formular nicht mehr versehentlich ab, Drag-and-Drop für Fotos funktioniert jetzt tatsächlich (gab es vorher nur als Text-Behauptung, kein Code dafür).
- **Status-System für Properties**: neue Properties starten jetzt als Entwurf (nicht live), erst "Save & Publish" schaltet sie frei – vorher hing das von einer leicht zu übersehenden, zusätzlich inkonsistenten Checkbox ab. "Available From" wird bei neuen Properties automatisch mit dem heutigen Datum vorausgefüllt.
- Properties-Liste im Admin: Löschen-Button ergänzt (gab es im Backend schon, aber keinen Button im UI), Filter um Verfügbarkeitsstatus und Property-Typ erweitert.

**Nicht angefasst (bewusst):**
- Die manuelle JS-Filterung in `nuremberg-wg-section.tsx` (Nürnberg-Schreibweisen) sieht auf den ersten Blick wie unnötige Dopplung zum DB-Filter aus, deckt aber Case-Insensitivity + drei Schreibweisen ab, was der einfache `location`-Contains-Filter nicht kann. Ein blindes "Vereinfachen" wäre ein funktionaler Rückschritt – gehört stattdessen sauber in die Listings-Konsolidierung (siehe Phase 2).
- Die Farbpalette im Rental-Property-Analyzer (eigene slate/amber-Werte für Recharts) ist in sich konsistent und Chart-Bibliotheken brauchen ohnehin literale Farbwerte – niedrige Priorität, kein echter Bug.
- `next.config.mjs` hat `typescript.ignoreBuildErrors: true` und `eslint.ignoreDuringBuilds: true` gesetzt – dadurch wurde der `trustHost`-Bug oben nie sichtbar. Es existiert außerdem noch gar keine ESLint-Konfiguration (`next lint` fragt danach). Empfehlung: in einer ruhigen Phase einmal beides aktivieren und die dann sichtbaren Fehler in einem Rutsch abarbeiten, statt sie weiter zu maskieren.

## 3. Zusätzliche Risiken aus der Analyse (nicht auf deiner Liste, aber relevant)

1. **Uploads sind auf Vercel nicht persistent** (kritisch): `app/api/upload/route.ts` schreibt Bilder lokal nach `public/uploads`. Auf Vercel-Serverless ist das Dateisystem pro Invocation flüchtig – hochgeladene Bilder können nach einem Cold Start verschwinden. Deckt sich mit deinem To-Do-Punkt "Datenbank (Formular/Uploads)".
2. **Nur ein einziger Admin-Account kann je existieren**: `upsertAdminUser` läuft standardmäßig mit `replaceOthers: true` und löscht bei jedem Vercel-Cold-Start alle Admin-Accounts außer dem aus den Env-Variablen. Ein zweiter, über das Dashboard angelegter Admin würde beim nächsten Cold Start automatisch gelöscht. Relevant für "Account-/Profile-Setup".
3. **In-Memory Rate-Limiting** (`lib/rate-limit.ts`) funktioniert auf Serverless mit mehreren Instanzen nicht zuverlässig (jede Instanz hat ihren eigenen Zähler).

## 4. Roadmap (priorisiert)

### Phase 1 – Produktionsreife & Rechtssicherheit
Diese Punkte sollten vor echtem, unbeaufsichtigtem Live-Betrieb stehen.

- [ ] **SSL-Zertifikat** – auf Vercel bei eigener Domain i.d.R. automatisch; kurz prüfen, ob die Produktions-Domain korrekt verifiziert ist und HTTPS erzwungen wird.
- [ ] **Datenbank (Formular/Uploads) robust machen** – Uploads von lokalem Dateisystem auf **Vercel Blob** umstellen (naheliegend, da das Projekt ohnehin auf Vercel läuft – keine zusätzliche Infrastruktur nötig). Ohne das ist jedes hochgeladene Bild potenziell verloren, sobald eine neue Serverless-Instanz startet.
- [ ] **DSGVO/Cookie-Banner härten** – bestehenden Banner (`cookie-consent.tsx`) auf Vollständigkeit prüfen (granulare Kategorien, kein Tracking vor Consent, Widerruf jederzeit möglich).
- [ ] **IT-Recht-Kanzlei einbinden** – Impressum und Datenschutzerklärung durch die von IT-Recht-Kanzlei gepflegten Texte ersetzen/abgleichen; **AGB-Seite fehlt komplett und müsste neu angelegt werden** (`app/agb/` o.ä.); je nach gebuchtem Modul ggf. auch Update-Mechanismus/Abo-Sync einplanen.
- [ ] **Cloudflare Bot-Schutz** – Anfrage-/Kontaktformulare haben aktuell nur ein einfaches In-Memory-Rate-Limit (siehe Risiko 3 oben), keinen echten Bot-Schutz. Cloudflare Turnstile o.ä. vor `/api/inquiries` und `/api/upload` schalten.

### Phase 2 – Accounts & Angebote konsolidieren

- [ ] **Account-/Profile-Setup** – aktuell gibt es nur einen Admin-Login, keine Nutzerkonten für Studierende/Vermieter. Vorher klären: werden echte Accounts gebraucht (Login, Profil, gespeicherte Anfragen) oder bleibt der Kontakt anonym per Formular?
- [ ] **Angebote/Listings zusammenführen** – die Kern-Datenabfrage ist bereits geteilt (`getListings()`), aber die Nürnberg-Startseiten-Sektion rendert Karten mit komplett eigenem Markup statt der gemeinsamen `AngeboteListClient`-Komponente. Ziel: eine Card-Komponente mit `variant="full" | "compact"`, ein gemeinsames `ListingsSection`-Pattern für alle drei Einsatzorte (Angebote-Seite, For-Students-Seite, Startseite).
  - **Banner "Keine Angebote"**: aktuell existiert nur ein "keine Treffer für diesen Filter"-Hinweis (`angebote-no-results.tsx`); ein Banner für den Fall "aktuell 0 aktive Angebote insgesamt" fehlt.
  - **"Zuletzt vermietet" als Referenz**: das Datenmodell unterstützt `availabilityStatus: "rented"` bereits, wird aber nirgends abgefragt/angezeigt. Neue Sektion + Query nötig, die vermietete Objekte als Referenz/Social-Proof zeigt.

### Phase 3 – Engagement & Vertrauen

- [ ] **Kundenfeedback (Kommentare/Sterne)** – braucht ein neues Datenmodell (z.B. `Review`: Bezug zu Property oder zur Plattform allgemein, Sternebewertung, Kommentartext, Moderationsstatus) plus Moderation im Admin-Bereich.
- [ ] **SMTP einrichten** – ohne das wird aktuell keine Benachrichtigungsmail bei neuen Anfragen verschickt (Code fängt das sauber ab, aber es passiert nichts). Braucht: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` – entweder über den bestehenden Business-Mail-Anbieter oder einen dedizierten Dienst (z.B. Resend, Postmark). Noch offen: welcher Weg.
- [ ] **Bestätigungsmail an Interessenten** – aktuell bekommt nur der Admin eine Mail bei neuer Anfrage; der Interessent selbst bekommt keine Eingangsbestätigung ("Wir haben deine Anfrage erhalten"). Setzt SMTP voraus.
- [ ] **Mail-Protokoll (eventuell)** – Log/Übersicht verschickter Mails (Benachrichtigung, Bestätigung) zur Fehlersuche/Nachvollziehbarkeit, z.B. als eigenes Datenmodell oder simples Logging.
- [ ] **Benachrichtigungs-Center im Admin-Dashboard** – kleine Glocke mit den letzten Updates (neue Anfrage, neue Property etc.) direkt im Dashboard, unabhängig von E-Mail.
- [ ] **Benachrichtigungs-Einstellungen (spätere Aufgabenverteilung)** – ein Menü, über das konfigurierbar ist, welche E-Mail-Adresse bei welcher Art von Ereignis benachrichtigt wird (aktuell nur über Env-Variablen fest verdrahtet: `lib/email.ts` unterscheidet bereits zwischen normalen und Vermieter-Anfragen und schickt an unterschiedliche Adressen – das UI dafür fehlt noch). Sinnvoll, sobald mehrere Personen/Rollen Anfragen bearbeiten.
- [ ] **Mobile-Optimierung + "Als App nutzen"-Hinweis** – mobil optimierte Navigation (eigene Bottom-Nav o.ä.) plus ein Hinweis-Banner, dass die Seite über "Teilen → Zum Home-Bildschirm" wie eine App genutzt werden kann (PWA-artiges Verhalten ohne echten nativen App-Store-Aufwand).
- [ ] **Notification System → App/Push** – E-Mail-Benachrichtigung bei neuen Anfragen existiert bereits (`lib/email.ts`). Für In-App/Push-Benachrichtigungen wird zuerst ein Nutzerkonto-Konzept (Phase 2) gebraucht; danach Entscheidung native App vs. PWA mit Web-Push.

## 5. Offene Entscheidungen (brauche dein Go)

- Bekommen Studierende/Vermieter echte Accounts, oder bleibt der Kontaktweg anonym über das Formular?
- Push-Benachrichtigungen: native App (iOS/Android) oder PWA mit Web-Push? Das bestimmt den ganzen technischen Zuschnitt von Phase 3.
- IT-Recht-Kanzlei: welches Paket ist gebucht (nur Rechtstexte oder auch laufender Abmahnschutz/Update-Service)? Das bestimmt, ob wir nur einmalig Texte einpflegen oder einen Sync-Mechanismus brauchen.