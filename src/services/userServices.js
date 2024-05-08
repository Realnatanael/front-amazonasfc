import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const baseURL = 'https://amazonas-fc.vercel.app';

export function signup(data){
    delete data.confirmPassword;
    const body = {
        ...data,
        username: generateUsername(data.name),
        avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        background: "https://th.bing.com/th/id/R.40d93e5d629c34354bd6bbc5c5a61d98?rik=1%2b47yHSi3OQ6Nw&riu=http%3a%2f%2fblended-html.com%2fbackground-images%2fbi-background-black.png&ehk=M3Dysbq4ieBl9B4FNOhQWN5VfFNa3%2b5sd2NIObdKuUY%3d&risl=&pid=ImgRaw&r=0"
    }
    const response = axios.post(`${baseURL}/user/create`, body)
      return response;  
}

export function userLogged(){
    const token = Cookies.get('token');
    if (!token) {
        throw new Error('Token não definido');
    }

    const decoded = jwtDecode(token);
    const userId = decoded.id;

    if (!userId) {
        throw new Error('ID do usuário não definido');
    }

    const response = axios.get(`${baseURL}/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response;
}

function generateUsername(name){
    const nameLowerCaseWithoutSpace = name.replace(/\s/g, '').toLowerCase();
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${nameLowerCaseWithoutSpace}-${randomNumber}`;   
}

export function updateUser(data){
    const token = Cookies.get('token');
    if (!token) {
        throw new Error('Token não definido');
    }

    const decoded = jwtDecode(token);
    const userId = decoded.id;

    if (!userId) {
        throw new Error('ID do usuário não definido');
    }

    console.log("ID do usuário em updateUser:", userId); 

    const response = axios.patch(`${baseURL}/user/${userId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    });

    return response;
}