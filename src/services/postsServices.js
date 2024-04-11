import axios from 'axios'

const baseURL = 'http://localhost:3001'

export function getAllPosts() {
  return axios.get(`${baseURL}/news`)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error('Houve um erro ao obter os posts:', error);
    });
}