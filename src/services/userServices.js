import axios from "axios";

const baseURL = 'http://localhost:3000';

export function signup(data){
    delete data.confirmPassword;
    const body = {
        ...data,
        username: generateUsername(data.name),
        avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        background: "https://www.bing.com/images/search?view=detailV2&ccid=QNk%2bXWKc&id=B68D83578670BD91E11F373AE4DCA274C83BEED7&thid=OIP.QNk-XWKcNDVL1rvFxaYdmAHaEK&mediaurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.40d93e5d629c34354bd6bbc5c5a61d98%3frik%3d1%252b47yHSi3OQ6Nw%26riu%3dhttp%253a%252f%252fblended-html.com%252fbackground-images%252fbi-background-black.png%26ehk%3dM3Dysbq4ieBl9B4FNOhQWN5VfFNa3%252b5sd2NIObdKuUY%253d%26risl%3d%26pid%3dImgRaw%26r%3d0&exph=1080&expw=1920&q=background+image+css&simid=608012613596968741&FORM=IRPRST&ck=0684FD57A33E4AD9F8D99B7D588335D9&selectedIndex=3&itb=0"
    }
    const response = axios.post(`${baseURL}/user/create`, body)
      return response;  
}


function generateUsername(name){
    const nameLowerCaseWithoutSpace = name.replace(/\s/g, '').toLowerCase();
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${nameLowerCaseWithoutSpace}-${randomNumber}`;   
}