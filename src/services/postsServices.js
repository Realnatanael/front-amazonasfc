import axios from 'axios'
import Cookies from 'js-cookie'

const baseURL = 'http://localhost:3000'

export function getAllPosts() {
  return axios.get(`${baseURL}/news`)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error('Houve um erro ao obter os posts:', error);
    });
}

export function getTopPosts() {
  return axios.get(`${baseURL}/news/top`)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error('Houve um erro ao obter os posts:', error);
    });
}

export function searchPosts(title) {
  return axios.get(`${baseURL}/news/search?title=${title}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error('Houve um erro ao obter os posts:', error);
    });
}

export function getAllPostsByUser(){
  const response = axios.get(`${baseURL}/news/byUser`, {
      headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
      }
  });
  return response;
}

export function createNews(data){
  const response = axios.post(`${baseURL}/news/create`, data, {
      headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
      },
  });
  return response;
}

export function getNewsById(id){
  const response = axios.get(`${baseURL}/news/${id}`, {
      headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
      }
  })
  .catch(error => {
      console.error('Houve um erro ao obter a notícia:', error);
  });
  return response;
}

export function updateNews(body, id){
  const response = axios.patch(`${baseURL}/news/${id}`, body, {
      headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
      } 
  });
  return response;
}

export function deleteNews(id){
  const response = axios.delete(`${baseURL}/news/${id}`, {
      headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
      }
  });
  return response;
}

export function likeNews(id){
  const response = axios.patch(`${baseURL}/news/like/${id}`, {}, {
      headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
      }
  })
  .catch(error => {
      console.error('Houve um erro ao dar like na notícia:', error);
  });
  return response;
}


export function addComment(id, comment){
  const response = axios.post(`${baseURL}/news/comment/${id}`, { comment }, {
      headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
      }
  })
  .catch(error => {
      console.error('Houve um erro ao adicionar o comentário:', error);
  });
  return response;
}