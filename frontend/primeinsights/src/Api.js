import axios from 'axios';

const API_BASE_URL = window.location.origin + "/api";
const API_LOGIN = "/login/";
const API_POSTS = "/posts/";


function getPosts(token) {
    return axios.get(API_BASE_URL + API_POSTS,
        {
            headers: {
                Authorization: 'Token ' + token,
            }
        }
    );
}

function login(username, password) {
    return axios.post(API_BASE_URL + API_LOGIN, {},
        {
            auth: {
                username: username,
                password: password,
            }
        }
    );
}

function getPost(token, id) {
    return axios.get(API_BASE_URL + API_POSTS + id + "/",
        {
            headers: {
                Authorization: 'Token ' + token,
            }
        }
    );
}

function deletePost(token, id) {
    return axios.delete(API_BASE_URL + API_POSTS + id + "/",
        {
            headers: {
                Authorization: 'Token ' + token,
            }
        }
    );
}

export { getPosts, login, getPost, deletePost };