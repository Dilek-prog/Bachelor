import "./styles.css";
import Container from "react-bootstrap/esm/Container";
import Accordion from "react-bootstrap/Accordion";

export default function WelcomePage({ token }) {
  return (
    <Container className="main">
      <section className="">
        <h1>Willkommen in PrimeInsights</h1>
        <p>
          Um Verwaltung, internen sowie externen Professor:innen,
          Dozent:innen und wissenschaftliche Mitarbeiter:innen eine Möglichkeit
          zu bieten, <span className="hglt">ohne die Slack-App</span> auf ihren
          Endgeräten Nachrichten zu posten, wurde die PrimeInsights-Webanwendung
          programmiert.
        </p>
      </section>
      <section>
        <h1>Vision</h1>
        <p>
          Die Handhabung unserer Anwendung ist
          <span className="hglt">unkompliziert</span> und für den Laien
          <span className="hglt">gut verständlich</span>. Zudem sind nur
          notwendige Anwendungen und Funktionen vorhanden, um eine
          <span className="hglt">einfache Bedienung</span> zu gewährleisten.
          Anders als Produkte der Wettbewerber ist unsere Anwendung auf das
          wenstlichste fokussiert und als OpenSource-APM kostenfrei.
        </p>
      </section>
      <section>
        <h1>Technologien</h1>
        <p>
          Im Folgenden werden die verwendeten Technologien und Frameworks
          aufgelistet:
        </p>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>React</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>React Bootstrap</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Django</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </section>
    </Container>
  );
} 