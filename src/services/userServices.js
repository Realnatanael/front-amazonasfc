import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const baseURL = 'http://localhost:3000';

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
    const decoded = jwtDecode(Cookies.get('token'));
    const userId = decoded.id;

    const response = axios.get(`${baseURL}/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
        }
    });
    return response;
}

function generateUsername(name){
    const nameLowerCaseWithoutSpace = name.replace(/\s/g, '').toLowerCase();
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${nameLowerCaseWithoutSpace}-${randomNumber}`;   
}