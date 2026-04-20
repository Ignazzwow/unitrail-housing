"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

/**
 * Inhalt entspricht der Datenschutzerklärung unter
 * https://www.unitrail-housing.de/datenschutz (Stand: 5. Dezember 2025).
 */
export default function DatenschutzPage() {
  const handleShowCookieConsent = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setTimeout(() => {
      localStorage.removeItem("cookie-consent")
      window.location.reload()
    }, 100)
  }

  const handleRevokeConsent = () => {
    if (
      confirm(
        "Möchten Sie wirklich alle Einwilligungen widerrufen?"
      )
    ) {
      localStorage.removeItem("cookie-consent")
      alert("Einwilligung widerrufen. Die Seite wird neu geladen.")
      window.location.reload()
    }
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <article className="container mx-auto max-w-3xl space-y-10 px-4 py-16 text-muted-foreground">
          <header className="space-y-4" id="privacy">
            <h1 className="text-3xl font-bold text-foreground">Datenschutzerklärung</h1>
            <p className="text-sm text-muted-foreground">Stand: 5. Dezember 2025</p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Einleitung</h2>
            <p>
              Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. In dieser Datenschutzerklärung
              informieren wir Sie über die Verarbeitung personenbezogener Daten bei der Nutzung unserer Website und
              unserer Dienstleistungen gemäß der Datenschutz-Grundverordnung (DSGVO).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. Verantwortlicher</h2>
            <div className="space-y-1">
              <p>UniTrail Housing</p>
              <p>Inhaber: Paul Worlitzsch</p>
              <p>Wiesenstraße 10</p>
              <p>92353 Postbauer-Heng</p>
              <p>Deutschland</p>
            </div>
            <div className="mt-4 space-y-1">
              <p className="font-semibold text-foreground">Kontakt</p>
              <p>Telefon: +49 176 56800301</p>
              <p>E-Mail: info@unitrail-housing.de</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Erhebung und Speicherung personenbezogener Daten</h2>
            <h3 className="text-xl font-semibold text-foreground">Arten der verarbeiteten Daten</h3>
            <p>Wir erheben und verarbeiten folgende personenbezogene Daten:</p>
            <ul className="ml-4 list-disc space-y-1 pl-1">
              <li>Kontaktdaten (Name, E-Mail-Adresse, Telefonnummer)</li>
              <li>Universitätsinformationen (Name der Universität, Studienfach)</li>
              <li>Kommunikationsdaten (Nachrichten, die Sie uns senden)</li>
              <li>Nutzungsdaten (IP-Adresse, Browser-Typ, Zugriffszeiten)</li>
              <li>Bewerbungsdaten (für Unterkunftsbewerbungen)</li>
              <li>Zahlungsinformationen (sofern für die Buchung erforderlich)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Zweck der Datenverarbeitung</h2>
            <p>Wir verarbeiten Ihre personenbezogenen Daten zu folgenden Zwecken:</p>
            <ul className="ml-4 list-disc space-y-1 pl-1">
              <li>Bearbeitung Ihrer Anfragen und Kommunikation mit Ihnen</li>
              <li>Vermittlung von Unterkünften und Verwaltung von Bewerbungen</li>
              <li>Erfüllung vertraglicher Verpflichtungen</li>
              <li>Verbesserung unserer Dienstleistungen und Website</li>
              <li>Erfüllung gesetzlicher Verpflichtungen</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Rechtsgrundlage der Verarbeitung</h2>
            <p>Die Verarbeitung Ihrer personenbezogenen Daten erfolgt auf Grundlage folgender Rechtsgrundlagen:</p>
            <ul className="ml-4 list-disc space-y-1 pl-1">
              <li>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) - für freiwillige Angaben</li>
              <li>Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) - für die Bearbeitung von Buchungen</li>
              <li>Art. 6 Abs. 1 lit. f DSGVO (Berechtigtes Interesse) - für die Verbesserung unserer Dienstleistungen</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Weitergabe von Daten</h2>
            <p>Wir geben Ihre personenbezogenen Daten nur in folgenden Fällen weiter:</p>
            <ul className="ml-4 list-disc space-y-1 pl-1">
              <li>An Vermieter/Immobilienbesitzer im Rahmen der Unterkunftsvermittlung</li>
              <li>An Dienstleister, die uns bei der Erbringung unserer Leistungen unterstützen (z.B. Hosting, E-Mail-Versand)</li>
              <li>Wenn dies gesetzlich vorgeschrieben ist oder zur Durchsetzung unserer Rechte erforderlich ist</li>
            </ul>
          </section>

          <section className="space-y-4" id="cookies">
            <h2 className="text-2xl font-semibold text-foreground">7. Cookies</h2>
            <p>
              Um den Besuch unserer Website attraktiv zu gestalten und die Nutzung bestimmter Funktionen zu ermöglichen,
              verwenden wir Cookies, also kleine Textdateien, die auf Ihrem Endgerät abgelegt werden. Teilweise werden
              diese Cookies nach Schließen des Browsers automatisch wieder gelöscht (sog. &quot;Session-Cookies&quot;),
              teilweise verbleiben diese Cookies länger auf Ihrem Endgerät und ermöglichen das Speichern von
              Seiteneinstellungen (sog. &quot;persistente Cookies&quot;). Im letzteren Fall können Sie die Speicherdauer
              der Übersicht zu den Cookie-Einstellungen Ihres Webbrowsers entnehmen.
            </p>
            <p>
              Sofern durch einzelne von uns eingesetzte Cookies auch personenbezogene Daten verarbeitet werden, erfolgt
              die Verarbeitung gemäß Art. 6 Abs. 1 lit. b DSGVO entweder zur Durchführung des Vertrages, gemäß Art. 6 Abs.
              1 lit. a DSGVO im Falle einer erteilten Einwilligung oder gemäß Art. 6 Abs. 1 lit. f DSGVO zur Wahrung
              unserer berechtigten Interessen an der bestmöglichen Funktionalität der Website sowie einer
              kundenfreundlichen und effektiven Ausgestaltung des Seitenbesuchs.
            </p>
            <p>
              Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und
              einzeln über deren Annahme entscheiden oder die Annahme von Cookies für bestimmte Fälle oder generell
              ausschließen können.
            </p>
            <p>
              Bitte beachten Sie, dass bei Nichtannahme von Cookies die Funktionalität unserer Website eingeschränkt
              sein kann.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">8. Datensicherheit</h2>
            <p>
              Wir setzen technische und organisatorische Maßnahmen ein, um Ihre personenbezogenen Daten vor Verlust,
              Zerstörung, Manipulation und unberechtigtem Zugriff zu schützen. Unsere Sicherheitsmaßnahmen werden
              regelmäßig überprüft und dem technischen Fortschritt angepasst.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">9. Änderungen der Datenschutzerklärung</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen
              Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen. Für
              Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">10. Kontaktformular</h2>
            <h3 className="text-xl font-semibold text-foreground">10.1 Zweck des Kontaktformulars</h3>
            <p>
              Auf unserer Website nutzen wir ein Kontaktformular. Das Kontaktformular dient der Bearbeitung und
              Dokumentation von Nachrichten und Daten, die über das Formular eingehen. Der Kontakt dient dem Zweck
              einer direkten Kommunikation mit Besuchern von unitrail-housing.de. Beim Aufruf unserer Website wird nach
              Bestätigung der Datenschutzerklärung die IP-Adresse des Nutzers erfasst und anonymisiert übertragen.
            </p>
            <h3 className="text-xl font-semibold text-foreground">10.2 Umfang der Datenerhebung</h3>
            <p>
              Die Verarbeitung der personenbezogenen Daten erfolgt zur direkten Bearbeitung von Supportanfragen mittels
              des Kontaktformulars. Im internen System von UniTrail Housing erfolgt eine automatische Löschung der
              Daten nach 30 Tagen. Wenn Besucher von unitrail-housing.de unser Kontaktformular nutzen, werden die vom
              Nutzer mitgeteilten Daten gespeichert. Zu den gesammelten Daten gehören:
            </p>
            <ul className="ml-4 list-disc space-y-1 pl-1">
              <li>Kontaktverlauf</li>
              <li>Angegebener Name</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummer (wenn angegeben)</li>
              <li>IP-Adresse</li>
              <li>Universitätsinformationen (wenn angegeben)</li>
              <li>Weitere persönliche Informationen, sofern angegeben (z.B. Adresse, Nachricht)</li>
            </ul>
            <p>
              Die Daten werden nicht an Dritte weitergegeben und dienen nur zur Bearbeitung und Dokumentation der
              Anfragen.
            </p>
            <p>
              Die Nutzung des Kontaktformulars ist optional und dient der Verbesserung und Beschleunigung unseres
              Kunden- und Nutzerservices. Wenn Nutzer mit einer Datenerhebung nicht einverstanden sind, bieten wir ihnen
              alternative Kontaktmöglichkeiten zur Einreichung von Service-Anfragen per E-Mail oder Telefon an.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">11. Cookie-Consent-Tool</h2>
            <p>
              Diese Website nutzt zur Einholung wirksamer Nutzereinwilligungen für einwilligungspflichtige Cookies und
              cookie-basierte Anwendungen ein sog. &quot;Cookie-Consent-Tool&quot;. Das &quot;Cookie-Consent-Tool&quot;
              wird Nutzern bei Seitenaufruf in Form einer interaktiven Benutzeroberfläche angezeigt, auf welcher sich per
              Häkchensetzung Einwilligungen für bestimmte Cookies und/oder cookie-basierte Anwendungen erteilen lassen.
              Hierbei werden durch den Einsatz des Tools alle einwilligungspflichtigen Cookies/Dienste nur dann geladen,
              wenn der jeweilige Nutzer entsprechende Einwilligungen per Häkchensetzung erteilt. So wird
              sichergestellt, dass nur im Falle einer erteilten Einwilligung derartige Cookies auf dem jeweiligen
              Endgerät des Nutzers gesetzt werden.
            </p>
            <p>
              Das Tool setzt technisch notwendige Cookies, um Ihre Cookie-Präferenzen zu speichern. Personenbezogene
              Nutzerdaten werden hierbei grundsätzlich nicht verarbeitet.
            </p>
            <p>
              Kommt es im Einzelfall zum Zwecke der Speicherung, Zuordnung oder Protokollierung von Cookie-Einstellungen
              doch zur Verarbeitung personenbezogener Daten (wie etwa der IP-Adresse), erfolgt diese gemäß Art. 6 Abs. 1
              lit. f DSGVO auf Basis unseres berechtigten Interesses an einem rechtskonformen, nutzerspezifischen und
              nutzerfreundlichen Einwilligungsmanagement für Cookies und mithin an einer rechtskonformen Ausgestaltung
              unseres Internetauftritts.
            </p>
            <p>
              Weitere Rechtsgrundlage für die Verarbeitung ist ferner Art. 6 Abs. 1 lit. c DSGVO. Wir unterliegen als
              Verantwortliche der rechtlichen Verpflichtung, den Einsatz technisch nicht notwendiger Cookies von der
              jeweiligen Nutzereinwilligung abhängig zu machen.
            </p>
            <p>
              Soweit erforderlich, haben wir mit dem Anbieter einen Auftragsverarbeitungsvertrag geschlossen, der den
              Schutz der Daten unserer Seitenbesucher sicherstellt und eine unberechtigte Weitergabe an Dritte
              untersagt.
            </p>
            <p>
              Weitere Informationen zum Betreiber und den Einstellungsmöglichkeiten des Cookie-Consent-Tools finden
              Sie direkt in der entsprechenden Benutzeroberfläche auf unserer Website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">12. Rechte des Betroffenen</h2>
            <p>
              12.1 Das geltende Datenschutzrecht gewährt Ihnen gegenüber dem Verantwortlichen hinsichtlich der
              Verarbeitung Ihrer personenbezogenen Daten die nachstehenden Betroffenenrechte (Auskunfts- und
              Interventionsrechte), wobei für die jeweiligen Ausübungsvoraussetzungen auf die angeführte
              Rechtsgrundlage verwiesen wird:
            </p>
            <ul className="ml-4 list-disc space-y-1 pl-1">
              <li>Auskunftsrecht gemäß Art. 15 DSGVO;</li>
              <li>Recht auf Berichtigung gemäß Art. 16 DSGVO;</li>
              <li>Recht auf Löschung gemäß Art. 17 DSGVO;</li>
              <li>Recht auf Einschränkung der Verarbeitung gemäß Art. 18 DSGVO;</li>
              <li>Recht auf Unterrichtung gemäß Art. 19 DSGVO;</li>
              <li>Recht auf Datenübertragbarkeit gemäß Art. 20 DSGVO;</li>
              <li>Recht auf Widerruf erteilter Einwilligungen gemäß Art. 7 Abs. 3 DSGVO;</li>
              <li>Recht auf Beschwerde gemäß Art. 77 DSGVO.</li>
            </ul>
            <h3 className="pt-4 text-xl font-semibold text-foreground">12.2 WIDERSPRUCHSRECHT</h3>
            <p className="whitespace-pre-line font-semibold uppercase tracking-tight text-foreground">
              {`WENN WIR IM RAHMEN EINER INTERESSENABWÄGUNG IHRE PERSONENBEZOGENEN DATEN AUFGRUND UNSERES ÜBERWIEGENDEN BERECHTIGTEN INTERESSES VERARBEITEN, HABEN SIE DAS JEDERZEITIGE RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIESE VERARBEITUNG WIDERSPRUCH MIT WIRKUNG FÜR DIE ZUKUNFT EINZULEGEN.

MACHEN SIE VON IHREM WIDERSPRUCHSRECHT GEBRAUCH, BEENDEN WIR DIE VERARBEITUNG DER BETROFFENEN DATEN. EINE WEITERVERARBEITUNG BLEIBT ABER VORBEHALTEN, WENN WIR ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN KÖNNEN, DIE IHRE INTERESSEN, GRUNDRECHTE UND GRUNDFREIHEITEN ÜBERWIEGEN, ODER WENN DIE VERARBEITUNG DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN DIENT.

WERDEN IHRE PERSONENBEZOGENEN DATEN VON UNS VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN. SIE KÖNNEN DEN WIDERSPRUCH WIE OBEN BESCHRIEBEN AUSÜBEN.

MACHEN SIE VON IHREM WIDERSPRUCHSRECHT GEBRAUCH, BEENDEN WIR DIE VERARBEITUNG DER BETROFFENEN DATEN ZU DIREKTWERBEZWECKEN.`}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">13. Dauer der Speicherung personenbezogener Daten</h2>
            <p>
              Die Dauer der Speicherung von personenbezogenen Daten bemisst sich anhand der jeweiligen Rechtsgrundlage,
              am Verarbeitungszweck und – sofern einschlägig – zusätzlich anhand der jeweiligen gesetzlichen
              Aufbewahrungsfrist (z.B. handels- und steuerrechtliche Aufbewahrungsfristen).
            </p>
            <p>
              Bei der Verarbeitung von personenbezogenen Daten auf Grundlage einer ausdrücklichen Einwilligung gemäß
              Art. 6 Abs. 1 lit. a DSGVO werden die betroffenen Daten so lange gespeichert, bis Sie Ihre Einwilligung
              widerrufen.
            </p>
            <p>
              Existieren gesetzliche Aufbewahrungsfristen für Daten, die im Rahmen rechtsgeschäftlicher bzw.
              rechtsgeschäftsähnlicher Verpflichtungen auf der Grundlage von Art. 6 Abs. 1 lit. b DSGVO verarbeitet
              werden, werden diese Daten nach Ablauf der Aufbewahrungsfristen routinemäßig gelöscht, sofern sie nicht
              mehr zur Vertragserfüllung oder Vertragsanbahnung erforderlich sind und/oder unsererseits kein
              berechtigtes Interesse an der Weiterspeicherung fortbesteht.
            </p>
            <p>
              Bei der Verarbeitung von personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO werden
              diese Daten so lange gespeichert, bis Sie Ihr Widerspruchsrecht nach Art. 21 Abs. 1 DSGVO ausüben, es sei
              denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen,
              Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder
              Verteidigung von Rechtsansprüchen.
            </p>
            <p>
              Bei der Verarbeitung von personenbezogenen Daten zum Zwecke der Direktwerbung auf Grundlage von Art. 6
              Abs. 1 lit. f DSGVO werden diese Daten so lange gespeichert, bis Sie Ihr Widerspruchsrecht nach Art. 21
              Abs. 2 DSGVO ausüben.
            </p>
            <p>
              Sofern sich aus den sonstigen Informationen dieser Erklärung über spezifische Verarbeitungssituationen
              nichts anderes ergibt, werden gespeicherte personenbezogene Daten im Übrigen dann gelöscht, wenn sie für
              die Zwecke, für die sie erhoben oder auf sonstige Weise verarbeitet wurden, nicht mehr notwendig sind.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">14. Kontakt bei Fragen zum Datenschutz</h2>
            <p>
              Bei Fragen zur Verarbeitung Ihrer personenbezogenen Daten oder zur Ausübung Ihrer Rechte können Sie sich
              jederzeit an uns wenden:
            </p>
            <div className="space-y-1">
              <p>UniTrail Housing</p>
              <p>E-Mail: info@unitrail-housing.de</p>
              <p>Telefon: +49 176 56800301</p>
            </div>
          </section>

          <section className="space-y-4 border-t border-border pt-8">
            <h2 className="text-2xl font-semibold text-foreground">15. Cookie-Einstellungen</h2>
            <div className="flex flex-col gap-3">
              <Button onClick={handleShowCookieConsent} variant="outline" className="w-full justify-start sm:w-auto">
                Privatsphäre-Einstellungen ändern
              </Button>
              <Button
                onClick={() => {
                  const consent = localStorage.getItem("cookie-consent")
                  const language = localStorage.getItem("language")
                  const theme = localStorage.getItem("theme")
                  const history = `Cookie-Einstellungen: ${consent || "Nicht gesetzt"}\nSprache: ${language || "Nicht gesetzt"}\nTheme: ${theme || "Nicht gesetzt"}\nLetzte Änderung: ${new Date().toLocaleString("de-DE")}`
                  alert(history)
                }}
                variant="outline"
                className="w-full justify-start sm:w-auto"
              >
                Historie der Privatsphäre-Einstellungen
              </Button>
              <Button onClick={handleRevokeConsent} variant="outline" className="w-full justify-start sm:w-auto">
                Einwilligungen widerrufen
              </Button>
            </div>
          </section>
        </article>
        <Footer />
      </div>
    </main>
  )
}
