import "./styles.css";
import Container from "react-bootstrap/esm/Container";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';

export default function WelcomePage({ token }) {
  return (
    <>
    <div className="FullScreen main1">
      <Container className="Containerright">
        <div className="flex-container">
          <div className="text-container">
            <section className="row-justify-content-start">
              <h1 className="Welcome"><strong> Willkommen in Primeinsights </strong></h1>
              <p><strong>
                Du möchtest Nachrichten an Slack von überall und ohne Slack-App an deine Kolleginnen oder Studentinnen verschicken? </strong>
              </p>
              <p><strong>
                Dann ist die Primeinsights Web-Applikation die Lösung. </strong>
              </p>
            </section>
            <div className="btn-w">
              <Button className="btn-light" variant="light" size="lg" href="#Info">Infos</Button>
              <Link to="/create"><Button className="btn-primary"variant="primary" size="lg"> Nachricht erstellen </Button></Link>
            </div>
          </div>
              <div className="image-container">
                <img src={process.env.PUBLIC_URL + "/img/Webanwendung.png"} alt="Webanwendung" className="small-image" ></img>
              </div>
            </div>
      </Container>
    </div>
    <Container className="main1">
        <div>
          <section className="ueberschrifth1">
            <h1><u>Warum Primeinsights?</u></h1>
          </section>
        </div>
      <section className="card-container">
      <Card style={{ width: '18rem' }} className="cardbody">
        <Card.Body>
          <Card.Title>Adressaten</Card.Title>
          <Card.Text className="text-Card">
            <ul>
                <li>
                      externe / interne Professorinnen und Dozenteninnen 
                </li>
                <li>
                      Studentinnen 
                </li>
                <li>
                      Wissenschaftliche Mitarbeiterinnen
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
            <span className="hglt">unkompliziert</span> und für die Anwenderin gut verständlich.
         
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
                    Django-Rest-Framework
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