import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useRef } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faClock } from '@fortawesome/free-solid-svg-icons';


import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { getPosts, login, getPost, deletePost } from './Api';

dayjs.extend(relativeTime);
dayjs.locale('de');


function LoginWindow({ onReceivedToken }) {
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

  function handleClick() { //sobald Login geklickt wird, wird das Ereignis handleClick getätigt aber nur, wenn die Daten vom Login stimmen 
    loginMutation.mutate();
  }

  return ( //Template Bootstrap 
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
  );

}

function PostDetails({ token }) {

  const { id } = useParams();
  const navigate = useNavigate();
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  
  let { isLoading, isError, data, error } = useQuery({
    queryFn: () => { return getPost(token, id) },
    queryKey: ['post', id],
  });

  function handleClickCancelDelete() { //Abbrechen des Modal und schließt ihn 
    setConfirmDeleteModal(false);
  }

  function handleSuccess(result) {
    navigate('/posts');
  }

  if (isLoading) {
    return (
      <div>Post wird geladen :D</div>
    );
  };

  if (isError) {
    return (
      <div>Post konnte nicht geladen werden. :(</div>
    );
  };

  const postRaw = data.data;
  const post = {
    ...postRaw,
    pub_date: new dayjs(postRaw.pub_date),
    created: new dayjs(postRaw.created),
  }
  
  return (
    <>
      <Container fluid className="post-detail-container">
        <h1>{post.title}</h1>
        <div>erstellt am {post.created.format('DD.MM.YYYY')}</div>
        <p>
          <small className='text-muted'>veröffentlicht {post.pub_date.fromNow()}&nbsp;</small>
          <span className="posted-icon" >{post.posted ? <FontAwesomeIcon icon={faCircleCheck} /> : <FontAwesomeIcon icon={faClock} />}</span>
        </p>
        <p>
          <small>Channel {post.channel}</small>
        </p>
        <div>{post.text}</div>
        <div className="post-detail-button-group">
          <DeleteButton token={token} id={id} onSuccess={handleSuccess}/>
        </div>
        <Link to="/posts">
        <Button variant="secondary" onClick={handleClickCancelDelete} className="abbrechen-bt">
          Abbrechen
        </Button>
      </Link>
      </Container>
    </>
  )
}

function DeleteButton({token, id, onSuccess}) {

  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  let deleteMutation = useMutation({
    mutationFn: () => {
      return deletePost(token, id)
    },
    enabled: false,
    onSuccess: onSuccess,
    onError: (error) => {
      console.log(error);
    },
  });

  function handleClickConfirmDelete() { //Löscht den Post und schließt Modal
    setConfirmDeleteModal(false);
    deleteMutation.mutate();
  }
  
  function handleClickCancelDelete() { //Abbrechen des Modal und schließt ihn 
    setConfirmDeleteModal(false);
  }
  
  function handleClickDelete() { //Modal öffnet sich 
    setConfirmDeleteModal(true);
  }
  
  return (
    <>
      <Modal show={confirmDeleteModal} onHide={handleClickCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Wirklich löschen?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bist du sicher, dass du den Post wirklich löschen willst?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClickCancelDelete}>
            Abbrechen
          </Button>
          <Button variant="danger" onClick={handleClickConfirmDelete}>
            Löschen
          </Button>
        </Modal.Footer>
      </Modal>

      <Button onClick={handleClickDelete} variant="danger">
        Löschen
      </Button>
    </>
  )
}


function PostList({ token }) {

  let { isLoading, isError, data, refetch } = useQuery({
    queryFn: () => { return getPosts(token) },
    queryKey: ['posts'],
  });

  function handleSuccess(result) {
    refetch();
  }

  if (isLoading) {
    return (
      <div>Posts werden geladen :D</div>
    );
  };

  if (isError) {
    return (
      <div>Posts konnte nicht geladen werden. :(</div>
    );
  };

  const posts = data.data.map((post) => {
    return {
      ...post,
      pub_date: new dayjs(post.pub_date),
      created: new dayjs(post.created),
    }
  }
  )

  return (
    <Container className="table">
      <Table striped bordered hover className="shaow-lg text-center">
        <thead>
          <tr>
            <th>Titel</th>
            <th>Publikationsdatum</th>
            <th>Erstellungsdatum</th>
            <th>Channel</th>
            <th>veröffentlicht</th>
            <th>Text</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            console.log(post.pub_date);
            return (
              <tr>
                <td>
                  <Link style={{color: 'black',textDecoration: 'none'}} to={`/posts/${post.id}`}>
                    {post.title}
                  </Link>
                </td>
                <td>{post.pub_date.fromNow()}</td>
                <td>{post.created.format('DD.MM.YYYY')}</td>
                <td>{post.channel}</td>
                <td className="posted-icon" >{post.posted ? <FontAwesomeIcon icon={faCircleCheck} /> : <FontAwesomeIcon icon={faClock} />}</td>
                <td>{post.text}</td>
                <td><DeleteButton token={token} id={post.id} onSuccess={handleSuccess}/></td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Container>

  );
}

function Welcome({ token }) {
  return (
    <>
    <h1 className="h1">Willkommen in PrimeInsights</h1>
    <Container fluid className="Container1">
    <div className="grid-container">
      <div>
          <div>
            <div>
            <br/>
            <br/>
              <h1 className="">PrimeInsights</h1>
              <p></p>
              <div className="grid-item">
                <h3 className="">Um Verwaltung und internen sowie externen Professor:innen, 
                Dozent:innen und wissenschaftliche Mitarbeiter:innen eine Möglichkeit zu bieten, 
                ohne die Slack-App auf ihren Endgeräten Nachrichten zu posten, 
                wurde die PrimeInsights-Webanwendung programmiert.</h3>
              </div>
            </div>
          </div>
      </div>
    </div>
    </Container>
    <br/>
    <Container fluid>
      <div className="section-title">
        <h2 className="projekt">Projekt</h2>
        <p className="Vision">Vision</p>
      </div>
      <div className="col-lg-12">
        <p>Um Verwaltung und internen sowie externen Professor:innen, 
          Dozent:innen und wissenschaftliche Mitarbeiter:innen eine Möglichkeit zu bieten, 
          ohne die Slack-App auf ihren Endgeräten Nachrichten zu posten, 
          wird die PrimeInsights-Webanwendung programmiert.
        </p>
        <p>Die Handhabung unserer Anwendung ist unkompliziert und für den Laien gut verständlich. Zudem
            sind nur notwendige Anwendungen und Funktionen vorhanden, um eine einfache Bedienung zu
            gewährleisten. Anders als Produkte der Wettbewerber ist unsere Anwendung auf das wenstlichste
            fokussiert und als OpenSource-APM kostenfrei.   
        </p>
      </div>
    </Container>
    <Container fluid>
    <h1 className="technologien">VERWENDETE TECHNOLOGIEN</h1>
    <br/>
      <Row xs={1} md={2} lg={3} className="cards">
        <Col>
          <Card className="card1">
          <Card.Header as="h5">React</Card.Header>
          <Card.Body>
          <div className="bild">
            <img scr="Bild.JPG" fluid width="64" height="64"/>
          </div>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
           </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="card2">
          <Card.Header as="h5">Django</Card.Header>
          <Card.Body>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
           </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="card3">
          <Card.Header as="h5">React Bootstrap</Card.Header>
          <Card.Body>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
           </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  )
}


function Homepage({ token }) {
  return (
    <>
      <div>
        <Navbar sticky="top" bg="light" expand="lg" className="navbar">
           <Image src="favicon.ico" className="img" alt="" rounded />
          <NavbarToggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav">
              <Nav.Link href="#home">
                <Link style={{color: 'black',textDecoration: 'none'}} to="/">
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link href="#Ansicht">
                <Link style={{color: 'black', textDecoration: 'none'}} to="/posts">
                  Posts
                </Link>
              </Nav.Link>
            </Nav>
            <Nav.Link href="#logout" className="logout">
                <Link style={{color: 'black', textDecoration: 'none'}} to="/logout">
                  logout
                </Link>
              </Nav.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>

      <div className="main-content">
        <Routes>
          <Route path='/posts/:id' element={<PostDetails token={token} />} />
          <Route path='/posts' element={<PostList token={token} />} />
          <Route path='*' element={<Welcome token={token} />} />
        </Routes>
        <div className="push"></div>
      </div>
      <footer className="footer">
        PrimeInsights
          <Link>
            Impressium
          </Link>
          <Link>
            HTW
          </Link>
          <Link>
            Datenschutz
          </Link>
          
      </footer>

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
      <LoginWindow onReceivedToken={handleReceivedToken} />
    );
  } else {
    return (
      <Homepage token={token} />
    )
  }
}


export default App;
