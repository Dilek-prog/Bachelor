import "./styles.css";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { login } from "../../Api";

export default function LoginPage({ onReceivedToken }) {
  let userRef = useRef(); // speichern des veränderlichen Werts ohne bei aktualisiserung ein erneutes Rendern zu verursachen
  let passwordRef = useRef();

  let loginMutation = useMutation({
    mutationFn: () => {
      const username = userRef.current.value;
      const password = passwordRef.current.value;
      return login(username, password);
    },
    enabled: false,
    onSuccess: (result) => {
      onReceivedToken(result.data.token);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function handleClick() {
    //sobald Login geklickt wird, wird das Ereignis handleClick getätigt aber nur, wenn die Daten vom Login stimmen
    loginMutation.mutate();
  }

  return (
    <div className="bg">
      { <a href="https://www.htw-berlin.de/" target="_blank" className="logo-desktop"><img
        className="logo"
        src={process.env.PUBLIC_URL + "/img/logo.jpg"}
        alt="Logo"
        height={75}
      /></a>}

      { <a href="https://www.htw-berlin.de/" target="_blank" className="logo-desktop"><img
        className="logo-mobile"
        src={process.env.PUBLIC_URL + "/img/logo-mobile.png"}
        alt="Logo"
        height={75}
      /></a>}

      <div className="bg-svg-container">
        {<img
          src={process.env.PUBLIC_URL + "/svg/bg-login.svg"}
          alt="Logo"
          className="bg-svg"
        />}
      </div>

      <h1 className="title">
        Willkommen bei <br />
        PrimeInsights
      </h1>

      <Container className="floating-login">
        <div className="d-grid gap-2">
        <div className="title-mobile">
        <b>
        Willkommen bei PrimeInsights
        </b>
      </div>
          <Card.Title className="text-center text-light login-title">Anmeldung</Card.Title>
          <Form.Control
            type="text"
            id="inputUsername"
            placeholder="Nutzername"
            ref={userRef}
            size="lg"
          />
          <Form.Control
            type="password"
            id="inputPassword"
            placeholder="Passwort"
            ref={passwordRef}
            size="lg"
          />
          <Button onClick={handleClick} variant="outline-light" size="lg">
            Anmelden
          </Button>
        </div>
      </Container>
    </div>
  );
}