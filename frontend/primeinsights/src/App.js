import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import {Formik} from 'formik';
import * as Yup from 'yup';
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
import { Route, Routes, useNavigate, useParams } from 'react-router';


import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

import { getPosts, login, getPost, deletePost, createPost, updatePost } from './Api';

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

  return ( 
    //Template Bootstrap
    <div className="bg">
      <img className="logo" src={process.env.PUBLIC_URL + "/img/logo.png"} alt="Logo" height={75} />
        <div className="bg-svg-container">
          <img src={process.env.PUBLIC_URL + "/svg/bg-login.svg"} alt="Logo" className="bg-svg" />
        </div>
          <h1 className="title">Willkommen bei <br />PrimeInsights</h1>
            <Container className="floating-login">
              <Card.Title className="login-title">Anmelden</Card.Title>
                <div className="d-grid gap-2">
                  <Form.Control type="text" id="inputUsername" placeholder="Nutzername" ref={userRef} />
                  <Form.Control type="password" id="inputPassword" placeholder="Passwort" ref={passwordRef} />
                  <Button onClick={handleClick} variant="primary">
                    Login
                  </Button>
                </div>
            </Container>
    </div>
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
      <Link to="./edit">
        <Button variant="primary">Bearbeiten</Button>
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

function EditPostForm({onSubmit, initialValues}) {
  const navigate = useNavigate();

  function handleCancel(){
    console.log("Abbrechen");
    navigate("/posts");
  }

  return (
    <Container>
      <Formik 
        validationSchema={Yup.object({ 
          title: Yup.string()
                      .required("Titel erforderlich"),
          channel: Yup.string()
                      .required("Channel erforderlich")
                      .matches(/#.*/, "Channename muss mit # beginnen."),
          pub_date: Yup.date()
                      .typeError("kein gültiges Datum")
                      .required("Publikationsdatum erforderlich")
                      .min(new dayjs(), 'Publikationsdatum liegt in der Vergangenheit.')
                      .max((new dayjs()).add(2,'year'), 'Publikationsdatum liegt zu weit in der Zukunft'), 
          text: Yup.string()
                      .required("Text erforderlich")
        })}
  
        onSubmit={(values, {setSubmitting}) => {
          console.log(values);
          onSubmit(values);
        }}
  
        initialValues={initialValues}
      >
        {({handleSubmit, handleChange, handleBlur, values, errors}) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                  <Form.Label>Titel</Form.Label>
                  <Form.Control type="text" name="title" placeholder="Titel" value={values.title} onChange={handleChange} onBlur={handleBlur} />
                  <div className="text-danger ">{errors.title}</div>
                  <p></p>
                  <Form.Label>Channel</Form.Label>
                  <Form.Control type="text" name="channel" placeholder="Channel" value={values.channel}  onChange={handleChange} onBlur={handleBlur} />
                  <div className="text-danger">{errors.channel}</div>
                  <p></p>
                  <Form.Label>Publikationsdatum</Form.Label>
                  <Form.Control type="datetime-local" name="pub_date" placeholder="Publikationsdatum" value={values.pub_date} onChange={handleChange} onBlur={handleBlur} />
                  <div className="text-danger">{errors.pub_date}</div>
                  <p></p>
                  <Form.Group className="mb-3"  >
                  <Form.Label>Text</Form.Label>
                  <Form.Control as="textarea" rows={3} name="text" value={values.text} onChange={handleChange} onBlur={handleBlur} />
  
                  <div className="text-danger">{errors.text}</div>
                  </Form.Group>
                </Form.Group>
                <Button className="m-2" type="submit">
                  Speichern 
                </Button>
                <Button className="m-2" onClick={handleCancel} variant="danger">
                  Abbrechen 
                </Button>
              </Form>
        )}
      </Formik>
    </Container>
  );

}

function UpdatePost({token}) {
  const { id } = useParams();
  const navigate = useNavigate();

  let updateMutation = useMutation({
    mutationFn: (post) => {
      console.log(post);
      return updatePost(token, post, id);
    },
    enabled: false,
    onSuccess: (result) => {
      navigate('/posts');
    },
    onError: (error) => {
      console.log(error);
    },
  });


  let { isLoading, isError, data, error } = useQuery({
    queryFn: () => { return getPost(token, id) },
    queryKey: ['post', id],
  });

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
 
  const post = {
    ...data.data,
    pub_date: (new dayjs(data.data.pub_date)).format("YYYY-MM-DDThh:mm")
  };

  return (
    <>
     <EditPostForm onSubmit={ updateMutation.mutate } initialValues={post}/>
    </>
  );
}

function CreatePost({ token }) {
  const navigate = useNavigate();

  let createMutation = useMutation({
    mutationFn: (post) => {
      console.log(post);
      return createPost(token, post);
    },
    enabled: false,
    onSuccess: (result) => {
      navigate('/posts');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <EditPostForm onSubmit={ createMutation.mutate } initialValues={{ title: '', channel: '', pub_date: '', text: ''}}/>
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
  console.log(data.data);
  
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
              <tr key={post.id}>
                <td>
                  <Link style={{color: 'black',textDecoration: 'none', 'textDecortion:hover': 'underline'}} to={`/posts/${post.id}`}>
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
              <Link style={{color: 'black',textDecoration: 'none'}} to="/">

                  Home

              </Link>
              <Link style={{color: 'black', textDecoration: 'none'}} to="/posts">

                  Posts

              </Link>
              <Link  style={{color: 'black', textDecoration: 'none'}} to="/create">

                  Post erstellen

              </Link>
            <Link  className="logout" style={{color: 'black', textDecoration: 'none'}} to="/logout">

                  logout

              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

      <div className="main-content">
        <Routes>
          <Route path='/posts/:id' element={<PostDetails token={token} />} />
          <Route path='/posts' element={<PostList token={token} />} />
          <Route path='*' element={<Welcome token={token} />} />
          <Route path='/create' element={<CreatePost token={token}/>} />
          <Route path='/posts/:id/edit' element={<UpdatePost token={token} />} />
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