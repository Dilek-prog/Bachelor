# Primeinsights 

##Motivation


##Technologien 

Backend: 
- Django
    - Dango-REST-Framework 
    - CronJob

Frontend:
- React 
    - React Bootstrap 

## Erste Schritte 

*Backend:*

Starten Sie in Ihrem **Terminal** den Backend Server in dem Sie: 
1. in das Verzeichnis wechseln (backend)
2. 'source .venv/bin/activate' schreiben 
3. python slackbridge/manage.py runserver schreiben

*Frontent:* 

Starten Sie in einem externen **Terminal** ihr Frontent Server in dem Sie:
1. in das Verzeichnis wechseln (frontend/primeinsights)
2. npm start ausführen

## Slack einrichten

**Unterscheidung zwischen Slack App erstellen oder nur mit einintegrieren**

1. Slack App erstellen

Vorraussetzung ist einen Slack Account bereits zu haben. Erstellen Sie sich einen neuen Workspace, wo Sie Freunde oder Teammitglieder einladen.  Gehen Sie auf Einstellung & Verwaltung in ihrem Worksapce und dann auf Apps verwalten. Gehen Sie dann auf Installierte Apps und oben rechts auf *Erstellen* Drücken Sie auf den **Create App** Button um eine neue App zu erstellen. Sobald der Pop-Up Fenster erscheint, müssen Sie auf: "From Scratch". Geben Sie den Namen der App ein und suchen Sie sich ein Workspace aus in dem Sie die Installieren möchten (häufig haben Sie mehr als nur einen Workspace). Drücken Sie dann auf Create App. Gehe auf OAuth & Permissions und übergeben Sie ihre URL von ihrem Workspace in dem Beirech "Redirect URL". Die Workspace URL können Sie ganz einfach über die Slack App auf den Namen links oben finden (rauf klicken). Oder gaz einfach in der E-Mail ermitteln. Als nächstes müssen Sie sogenannte "Scopes" ihrer App überschreiben. Das heißt Sie übergeben den Bot Token & dem User Token eine Authentifizierungsbereich. In unserem Fall: "chat:write". Als nächstes können Sie die App in ihrem Workspace installieren. Dabei müssen Sie die Berechtigung des Zugriffes der App an ihren Workspace übergeben. Jetzt wurde für Sie ein Bot Token und ein User Token erstellt. Wir verwenden erstmal nur den Bot Token. Nun ist in ihrer Slack App unter ihrem gewählten Workspace ihre App hinzugefügt worden. 

2. App in ihrem Channel integrieren 
Erstellen Sie nun ein Channel und schreiben Sie "@" hin um ihre App auswählen zu können. Fügen Sie nun ihre App zu dem Channel hinzu. 

Da der Bot Token in einer Variable exportiert werden muss ohne ihn ihm Code/Editor Hard zu coden. Wird ein weiterer Terminal geöffnet und in diesem wird im Backend der Export der "SLACK_API_TOKEN" in einer Variable dekleriert. Damit wird die Nachricht in genau der App, die wir erstellt haben gepostet. Dadurch wird die Nachticht manuell getriggert. Dies wurde jetzt aber durch die Einführung von Crontab umgesetz, so das die manuelle Trigerung durch einen Mechanismus von 5 Minuten automatisch regeneiert wird.  
-------------------------------- Ausbaufähig ----------------------------------
