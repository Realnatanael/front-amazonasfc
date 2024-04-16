import axios from 'axios'

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
