import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import {useState, useRef} from 'react';
import axios from 'axios';
import {useMutation, useQuery} from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import relativeTime from 'dayjs/plugin/relativeTime';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleCheck, faClock} from '@fortawesome/free-solid-svg-icons';


import 'bootstrap/dist/css/bootstrap.min.css';

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

function handleClick(){ //sobald Login geklickt wird, wird das Ereignis handleClick getätigt aber nur, wenn die Daten vom Lgin stimmen 
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
    <Container fluid>
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
                <td>{post.posted?<FontAwesomeIcon icon={faCircleCheck}/>:<FontAwesomeIcon icon={faClock}/>}</td>
                <td>{post.text}</td>
              </tr>
            )
          })}
        </tbody>

      </Table>
    </Container>
     
  );
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
      <PostList token={token}/>
    )  
  }
}

export default App;
