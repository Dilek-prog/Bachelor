import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'; 
import Image from 'react-bootstrap/Image';
import {useState, useRef} from 'react';
import axios from 'axios';
import {useMutation, useQuery} from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import relativeTime from 'dayjs/plugin/relativeTime';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleCheck, faClock} from '@fortawesome/free-solid-svg-icons';


import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

dayjs.extend(relativeTime);
dayjs.locale('de');

const API_BASE_URL = "http://127.0.0.1:3000/api";
const API_LOGIN = "/login/";
const API_POSTS = "/posts/";


function LoginWindow({onReceivedToken}) {
  let userRef = useRef(); // speichern des veränderlichen Werts ohne bei aktualisiserung ein erneutes Rendern zu verursachen
  let passwordRef = useRef();

  function login() {
    let username = userRef.current.value;
    let password = passwordRef.current.value;

    return axios.post(API_BASE_URL + API_LOGIN, {}, 
      {
        auth: {
          username: username,
          password: password,
        }
      }
    ); 
  }

  let loginMutation = useMutation({
    mutationFn: login, 
    enabled: false,
    onSuccess: (result) => {
      onReceivedToken(result.data.token);
    },
    onError: (error) => {
      console.log(error);
    },
  });

function handleClick(){ //sobald Login geklickt wird, wird das Ereignis handleClick getätigt aber nur, wenn die Daten vom Login stimmen 
    loginMutation.mutate();
  }

  return ( //Template Bootstrap 
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-revers">
        <div>
          <h1 class="italic">Herzlich Willkomen zu PrimeInsights</h1>
          <h3 className="md:not-italic">Haben Sie es satt nach ihren Retourenscheinen oder Passwörter zu suchen? legen sie darauf, wert alles auf einem Platz zu haben und das alles transparent und gesichert?
          Dann sind sie bei uns genau richtig. Registrieren Sie sich kostenlos bei uns und erwarten Sie eine qualitative und effiziente Einsicht Ihrer Retoure und Zahlungsinformation.</h3>
        </div>
        <div className="actions flex gap-4">
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
            ref={userRef}
          />          
          <Form.Label htmlFor="inputPassword">Passwort</Form.Label>
          <Form.Control
            type="password"
            id="inputPassword"
            ref={passwordRef}
          />
          <Button onClick={handleClick} variant="primary">Login</Button> 
        </Card.Body>
      </Card>
    </Container>
        </div>
      </div>
    </div>
  );
  
}

function PostList({token}) {

  function getPosts() {
    return axios.get(API_BASE_URL + API_POSTS, 
      {
        headers: {
          Authorization: 'Token ' + token,
        }
      }
    );
  }

  let {isLoading, isError, data, error} = useQuery({
    queryFn: getPosts,
    queryKey: ['posts'],
  });

  if(isLoading) {
    return (
      <div>Posts werden geladen :D</div>
    );
  };

  if(isError) {
    return (
      <div>Posts konnte nicht geladen werden. :(</div>
    );
  }; 

  const posts = data.data.map( (post) => {
    return {
        ...post,
        pub_date: new dayjs(post.pub_date), 
        created: new dayjs(post.created),
      }
    }
  )

  return (
    <Container class="table" fluid>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Titel</th>
            <th>Publikationsdatum</th>
            <th>Erstellungsdatum</th>
            <th>Channel</th>
            <th>veröffentlicht</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {posts.map( (post) =>  {
            console.log(post.pub_date);
            return (
              <tr>
                <td>{post.title}</td>
                <td>{post.pub_date.fromNow()}</td>
                <td>{post.created.format('DD.MM.YYYY')}</td> 
                <td>{post.channel}</td>
                <td className="posted-icon" >{post.posted?<FontAwesomeIcon icon={faCircleCheck}/>:<FontAwesomeIcon icon={faClock}/>}</td>
                <td>{post.text}</td>
              </tr>
            )
          })}
        </tbody>

      </Table>
    </Container>
     
  );
}
function Homepage({token}) {
  return (
    <>
      <div>
        <Navbar sticky="top" bg="light" expand="lg" className="navbar">
        <Image src="favicon.ico" className="img" alt="" rounded />
            <NavbarToggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#Ansicht">Ansicht</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
        
    <section className="hero hero-bg d-flex justify-content-center align-items-center">    
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-10 col-12 d-flex flex-column justify-content-center align-items-center">
           <div className="hero-text">
              <h1 className="text-white aos-init aos-animate" data-aos="fade-up">
               <strong className="h1">Problem:</strong> "Interviewpartner bei Bewerbungsgesprächen werden derzeit rein manuell ausgesucht, was einen hohen Zeit und Arbeitsaufwand mit sich bringt."
                 <p></p>
                  <p class="p">
                    <strong className="Interview">
                      </strong>"Interview Matching - simplify the hiring process."
                  </p>
              </h1>
                <div className="col-lg-6 col-12">
                  <div className="hero-image aos-init aos-animate" data-aos="fade-up" data-aos-delay="300">
                    <img src="-..." className="img-fluid" alt="img">
                    </img>                 
                  </div>
                </div>

            <div className="d-flex justify-content-center justify-content-lg-start">
            <Button className="about" class="btn-get-started scrollto">Create Post</Button>
            </div>
        </div>
      </div>
    </div>
    </div>
    </section>
      </div>
      <PostList token={token}/>
    </>
  )
}




function App() {
  let [token, setToken] = useState(''); // Status einer Funktionskomponente verfolgen
  
  function handleReceivedToken(newToken) {
    console.log(newToken);
    setToken(newToken);
  }
  
  if (token === '') {
    return (
      <LoginWindow onReceivedToken={handleReceivedToken}/> 
      );
    } else {
      return (
        <Homepage token={token}/>
        )  
      }
    }
    

    export default App;
    