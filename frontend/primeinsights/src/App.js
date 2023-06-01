import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import {useState, useRef} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

let API_BASE_URL = "http://127.0.0.1:3000/api";
let API_LOGIN = "/login/";


function LoginWindow({onLogin}) {

  let user = useRef();
  let password = useRef();

  function handleClick(){
    onLogin(user.current.value, password.current.value);
  }

  return (
    <Container fluid>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Card.Text>
            Bitte Login Daten eingeben
          </Card.Text>
          <Form.Label htmlFor="inputUsername">Benutzername</Form.Label>
          <Form.Control
            type="text"
            id="inputUsername"
            ref={user}
          />          
          <Form.Label htmlFor="inputPassword">Passwort</Form.Label>
          <Form.Control
            type="password"
            id="inputPassword"
            ref={password}
          />
          <Button onClick={handleClick} variant="primary">Login</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

function App() {
  let [token, setToken] = useState(''); 

  function handleLogin(username, password) {
    console.log(username, password);
    fetch(API_BASE_URL + API_LOGIN, {
      method: "POST", 
      mode: "cors",
      headers: {
        "Authorization": `Basic ${btoa(`${username}:${password}`)}`,
      }
    }).then( response => {
      console.log(response);
    });
  }


  return (
    <>
      <LoginWindow onLogin={handleLogin}/> 
    </>
  );
}

export default App;
