# SMTP-Konfiguration für E-Mail-Versand

Das Kontaktformular benötigt eine SMTP-Konfiguration, um E-Mails zu senden.

## Schnellstart

1. Erstellen Sie eine `.env.local` Datei im Hauptverzeichnis des Projekts
2. Fügen Sie folgende Umgebungsvariablen hinzu:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=ihre-email@gmail.com
SMTP_PASSWORD=ihr-app-passwort
SMTP_FROM=ihre-email@gmail.com
```

## Gmail-Konfiguration

### Schritt 1: App-Passwort erstellen

1. Gehen Sie zu Ihrem Google-Konto: https://myaccount.google.com/
2. Navigieren Sie zu "Sicherheit"
3. Aktivieren Sie die "2-Schritt-Verifizierung" (falls noch nicht aktiviert)
4. Gehen Sie zu "App-Passwörter"
5. Erstellen Sie ein neues App-Passwort für "Mail"
6. Kopieren Sie das generierte Passwort (16 Zeichen)

### Schritt 2: .env.local konfigurieren

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=ihre-email@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx  # Das App-Passwort (ohne Leerzeichen)
SMTP_FROM=ihre-email@gmail.com
```

## Alternative E-Mail-Anbieter

### Outlook/Office 365

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=ihre-email@outlook.com
SMTP_PASSWORD=ihr-passwort
SMTP_FROM=ihre-email@outlook.com
```

### SendGrid

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=ihr-sendgrid-api-key
SMTP_FROM=noreply@unitrail.in
```

### Andere Anbieter

Für andere E-Mail-Anbieter finden Sie die SMTP-Einstellungen normalerweise in den Kontoeinstellungen oder in der Dokumentation des Anbieters.

## Server neu starten

Nach dem Erstellen oder Ändern der `.env.local` Datei müssen Sie den Entwicklungsserver neu starten:

```bash
# Stoppen Sie den Server (Ctrl+C)
# Starten Sie ihn erneut
npm run dev
```

## Fehlerbehebung

### "SMTP credentials are missing"
- Stellen Sie sicher, dass die `.env.local` Datei im Hauptverzeichnis existiert
- Überprüfen Sie, ob alle Variablen korrekt gesetzt sind
- Starten Sie den Server neu

### "SMTP verification failed"
- Überprüfen Sie Ihre SMTP-Anmeldedaten
- Stellen Sie sicher, dass die 2-Schritt-Verifizierung für Gmail aktiviert ist
- Verwenden Sie ein App-Passwort, nicht Ihr normales Passwort

### "Connection timeout"
- Überprüfen Sie Ihre Firewall-Einstellungen
- Stellen Sie sicher, dass Port 587 nicht blockiert ist
- Versuchen Sie einen anderen Port (z.B. 465 mit secure: true)

## Testen

Nach der Konfiguration können Sie das Kontaktformular testen. Die E-Mail sollte an `housing@unitrail.in` gesendet werden.

Überprüfen Sie die Server-Logs für detaillierte Fehlermeldungen.

