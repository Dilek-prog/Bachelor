import "./styles.css";
import Container from "react-bootstrap/esm/Container";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";

export default function WelcomePage({ token }) {
  return (
    <>
    <div className="FullScreen">
      <Container className="main1">
        <div className="Containerright">
          <section>
            <h1 className="Welcome"><strong>Willkommen in PrimeInsights</strong></h1>
            <p><strong>
              Du möchtest Nachrichten an Slack von überall und ohne Slack App an deine Kollegen oder Studenten verschicken?</strong>
            </p>
          </section>
          <section>
            <p><strong>
              Dann ist die PrimeInsights Web-Applikation die Lösung.</strong>
            </p>
          </section>
          <div className="btn-w">
            <Button className="btn-light" variant="light" size="lg" href="#Info">Infos</Button>
            <Button className="btn-primary"variant="primary" size="lg" href="/create">Post erstellen</Button>
          </div>
        </div>
      </Container>
    </div>
    <Container className="main1">
        <div id="Info">
          <section className="ueberschrifth1">
            <h1><u>Warum PrimeInsights?</u></h1>
          </section>
        </div>
      <section className="card-container">
      <Card style={{ width: '18rem' }} className="cardbody">
        <Card.Body>
          <Card.Title>Adressaten</Card.Title>
          <Card.Text className="text-Card">
            <ul>
                <li>
                      externe / interne Professoren und Dozenten 
                </li>
                <li>
                      Studierende 
                </li>
                <li>
                      Wissenschaftliche Mitarbeiter
                </li>
            </ul>
          </Card.Text>
        </Card.Body>
      </Card> 
      <Card style={{ width: '18rem' }} className="cardbody">
        <Card.Body>
          <Card.Title>Vision</Card.Title>
          <Card.Text className="text-Card1">
          Die Handhabung der Anwendung ist
            <span className="hglt">unkompliziert</span> und für den Anwender gut verständlich.
         
          </Card.Text>
        </Card.Body>
      </Card> 
      <Card style={{ width: '18rem' }} className="cardbody">
        <Card.Body>
          <Card.Title>Technologien</Card.Title>
          <Card.Text className="text-Card2">
            <ul>
                <li>
                    React
                </li>
                <li>
                    React Bootstrap 
                </li>
                <li>
                    Django
                </li>
                <li>
                    Django Restframework
                </li>
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
      </section> 
    </Container>
  </>
  );
} 