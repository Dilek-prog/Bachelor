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
import { useState, useRef, useEffect } from 'react';
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
import LoginPage from './pages/Login';
import WelcomePage from './pages/Welcome';


dayjs.extend(relativeTime);
dayjs.locale('de');

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
        <div>
          <div className="title-post">
            <h1>Detailübersicht</h1>
          </div>
        </div>
      <Container fluid className="post-detail-container" style={{padding: "35px"}}>
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
        <Link to="./edit" className="edit-btn-detail">
          <Button variant="primary">Bearbeiten</Button>
        </Link>
        <Link to="/posts" className="buttton-abbrechen">
          <Button variant="secondary" onClick={handleClickCancelDelete} className="abbrechen-bt">
            Abbrechen
          </Button>
        </Link>
        <DeleteButton token={token} id={id} onSuccess={handleSuccess} className="delete-btn-detail"/>
        </div>
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
    <>
      <Container>
        <div>
          <div className="title-post">
            <h1>Nachricht erstellen</h1>
            <p>Achten auf Beschränkungen</p>
          </div>
        </div>

    <Card className="Card-Create">
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
                  <Form.Group className="mb-3">
                    <Form.Label>Titel</Form.Label>
                      <Form.Control type="text" name="title" placeholder="Titel" value={values.title} onChange={handleChange} onBlur={handleBlur} />
                        <div className="text-danger">{errors.title}</div>
                          <p></p>
                    <Form.Label>Channel</Form.Label>
                      <Form.Control type="text" name="channel" placeholder="#Channel" value={values.channel}  onChange={handleChange} onBlur={handleBlur} />
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
                  <div className="btnForm">
                    <Button className="m-2" type="submit" to="/posts">
                      Speichern 
                    </Button>
                    <Button className="m-2" onClick={handleCancel} variant="danger">
                      Abbrechen 
                    </Button>
                  </div>
                </Form>
          )}
        </Formik>
    </Card>
      </Container>
    </>
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

  const [filter, setFilter] = useState('');

  let { isLoading, isError, data, refetch } = useQuery({
    queryFn: () => { return getPosts(token) },
    queryKey: ['posts'],
  });
  
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
      scrollToTopBtn.addEventListener('click', scrollToTop);
    }

    return () => {
      if (scrollToTopBtn) {
        scrollToTopBtn.removeEventListener('click', scrollToTop);
      }
    };
  }, []); 

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
    <>
    <Container className="main">
      <div className="title-post">
        <h1>Hier siehst du deine erstellten Posts</h1>
          <div>
            Für die Detail Übersicht auf den jeweiligen <u>Titel</u> klicken.
          </div>
      </div>

      <Container className="table-container">
        <Table striped bordered hover id="example" className="shaow-lg text-center">
          <thead>
            <tr>
              <th>Titel</th>
              <th>Publikationsdatum</th>
              <th>Erstellungsdatum</th>
              <th>Channel</th>
              <th>veröffentlicht</th>
              <th>Text</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              console.log(post.pub_date);
              return (
                <tr key={post.id}>
                  <td className={post.error===''?'':'table-row-failed'}>
                    <Link style={{color: 'black', 'textDecortion:hover': 'underline'}} to={`/posts/${post.id}`}>
                      {post.title}
                    </Link>
                    {post.error!=='' && <p className="post-error-message"> Fehler beim Posten <p> <small>{post.error}</small> </p></p>}
                  </td>
                  <td className={post.error===''?'':'table-row-failed'}> 
                    {post.pub_date.fromNow()}
                  </td>
                  <td className={post.error===''?'':'table-row-failed'}>
                    {post.created.format('DD.MM.YYYY')}
                  </td>
                  <td className={post.error===''?'':'table-row-failed'}>
                    {post.channel}
                  </td>
                  <td className={"posted-icon" + (post.error===''?'':' table-row-failed')} >{post.posted ? <FontAwesomeIcon icon={faCircleCheck}/> : <FontAwesomeIcon icon={faClock} />}</td>
                  <td className={post.error===''?'':'table-row-failed'} >{post.elipsis}</td>
                  <td className={post.error===''?'':'table-row-failed'}><DeleteButton token={token} id={post.id} onSuccess={handleSuccess}/></td>
                  <td className={post.error===''?'':'table-row-failed'}><Link to={`/posts/${post.id}/edit`}><Button variant="primary">Bearbeiten</Button></Link></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
        <div className="">
          <button id="scrollToTopBtn">^</button>
        </div>
    </Container>
  </>
  );
}

function Homepage({ token }) {

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();  
  };

  return (
    <>
      <div>
        <Navbar
          sticky="top"
          collapseOnSelect
          expand="lg"
          bg="light"
          >
          <Container>
            <Navbar.Brand as={Link} to="/" style={{ color: "#87BD20;", fontWeight: 550 }} href="#home">
              PrimeInsights
            </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link as={Link} to="/" style={{color: 'black',textDecoration: 'none'}} href="#home">Home</Nav.Link>
                    <Nav.Link as={Link} to="/posts" style={{color: 'black',textDecoration: 'none'}} href="#Ansicht">Posts</Nav.Link>
                    <Nav.Link as={Link} to="/create" style={{color: 'black',textDecoration: 'none'}} href="#create">Post erstellen</Nav.Link>
                  </Nav>
                  <Nav>
                    <Button
                      variant="Secondary"
                      className="btn btn-outline-dark"
                      type="submit"
                      onClick={handleLogout}
                      >
                      Abmelden
                    </Button>
                  </Nav>
                </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <div className="main-content">
        <Routes>
          <Route path='/posts/:id' element={<PostDetails token={token} />} />
          <Route path='/posts' element={<PostList token={token} />} />
          <Route path='*' element={<WelcomePage token={token} />} />
          <Route path='/create' element={<CreatePost token={token}/>} />
          <Route path='/posts/:id/edit' element={<UpdatePost token={token} />} />
        </Routes>
        <div className="push"></div>
      </div>

      <p></p>      
      <footer className="page-footer font-small blue pt-4 bg-light">
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <h5 className="text-uppercase text-primary">PrimeInsights</h5>
              <p>
                Here you can use rows and columns to organize your footer content.
              </p>
            </div>

          <div className="col-md-3 mb-md-0 mb-3">
            <h6 className="text-uppercase"></h6>
            <a href="/impressum" className="impressum">Impressum</a>
          </div>
        </div>
      </div>

      <div className="footer-copyright text-center py-3">
        © 2023 Copyright: <a href="https://example.com/">PrimeInsights</a>
      </div>
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
      <LoginPage onReceivedToken={handleReceivedToken} />
    );
  } else {
    return (
      <Homepage token={token} />
    )
  }
}


export default App;