# Primeinsights 

### Implementation einer Webanwendung zur Automatisierung von Nachrichten mit der Schnittstelle Slack.

Die Webseite 'Primeinsights.space' bietet eine Lösung zur vereinfachten Erfassung relevanter und irrelevanter Inhalte auf verschiedenen Plattformen an der HTW. Alle Nachrichten werden zeitgemäß und geplant in einem Workspace namens 'Bachelorarbeit' in einem zugeordneten Ziel-Channel veröffentlicht.


**Was man alles mit dem Tool machen kann:**

- Nachrichten von der Webseite an eine Slack-Schnittstelle versenden 
- Nachrichten zeitgemäß und geplant, unabhängig von der Nutzung von Slack, verschicken
- Benutzerspezifischer Ziel-Channel für das Posten von Nachrichten
- Nur das **Posten** von Nachrichten ist möglich 


## Ergebnisse: 
![Login der Nutzerin](/frontend/primeinsights/public/img/Login.png)

![Startseite](/frontend/primeinsights/public/img/startseite.png)

![Erstellen einer Nachricht](/frontend/primeinsights/public/img/Nachricht.png)

![Übersichtliste](/frontend/primeinsights/public/img/uebersicht.png)

![Veröffentlichung in Slack](/frontend/primeinsights/public/img/slack.png)


## Installationsschritte:
- Klone das Projekt 
- Um es Lokal zu hosten, wird in der Datei backend/slackbridge/slackbridge/settings unter Allowed_hosts noch ‘“*”‘ geschrieben. 


**Backend starten (Terminal):** 
- cd Bachelor/backend
- source .venv/bin/activate
- slackbridge/manage.py runserver

**Frontend starten (Terminal):**
- cd Bachelor/frontend/primeinsights
- npm start


# Slack integration:
Zur Überprüfung der Anwendung empfiehlt es sich, eine Integration mit dem Workspace 'Bachelorarbeit' vorzunehmen, um das Ergebnis der Veröffentlichung zu sehen. Die Adresse hierfür lautet: ‚https://join.slack.com/t/bachelorarbei-rxk9339/shared_invite/zt-284jm8kte-_sE0w3FH3B5eV_c0ZzavLA‘. 


# Erforderliche Installationen für die Implementierung:
- Node.js,
- Node Package Manager (npm),
- Python


# Ausblick für erweiterbare Ideen:
- Update- und Delete-Funktion vom Backend zu Slack senden 
- Slack-App erstellen, um diese in verschiedene Workspaces hinzuzufügen 




