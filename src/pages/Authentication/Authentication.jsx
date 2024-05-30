import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { AuthContainer, Section } from "./AuthenticationStyled";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "../../Schemas/SigninSchema";
import { ErrorSpan } from "../../components/Navbar/NavbarStyled";
import Cookies from "js-cookie";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { baseURL } from '../../services/userServices';
import { useCallback, useState } from "react";

export function Authentication(){
    const navigate = useNavigate();
    const { 
        register: registerSignin, 
        handleSubmit: handleSubmitSignin, 
        formState: {errors: errorsSignin}, 
    } = useForm({resolver: zodResolver(signinSchema)});
    const narrationState = localStorage.getItem('narrationActive');
    const [isNarrationActive, setIsNarrationActive] = useState(narrationState === 'true');

    const speak = useCallback((text, alwaysSpeak = false) => {
        if (alwaysSpeak || isNarrationActive) {
            const utterance = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(utterance);
        }
    }, [isNarrationActive]);

    async function inHanleSubmit(data){
        try {
            // Fazer a solicitação à sua API
            const response = await axios.post(`${baseURL}/auth/login`, {
                email: data.email,
                password: data.password
            });
    
            // Salvar o token em um cookie
            const token = response.data.token;
            Cookies.set('token', token, {expires: 1});
    
            // Decodificar o token e extrair o nome de usuário
            const decodedToken = jwtDecode(token);
            const username = decodedToken.username;
    
            // Salvar o nome de usuário em um cookie
            Cookies.set('username', username, {expires: 1});
    
            // Navegar para a página "/"
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    return <AuthContainer>
        <Section type="signin">
            <h2 tabIndex="-1"
                onMouseEnter={() => isNarrationActive && speak('Entre se você já tem uma conta')}
                onMouseLeave={() => window.speechSynthesis.cancel()}
            >Entrar</h2>
            <form onSubmit={handleSubmitSignin(inHanleSubmit)}
                 onMouseEnter={() => isNarrationActive && speak('Digite seu e-mail e senha e depois clique para entrar')}
                 onMouseLeave={() => window.speechSynthesis.cancel()}
            >
                <Input type="email" placeholder="E-mail" name="email" register={registerSignin}
                    onMouseClick={() => isNarrationActive && speak('Digite seu e-mail')}
                />
                {errorsSignin.email && (<ErrorSpan>{errorsSignin.email.message}</ErrorSpan>)}
                <Input type="password" placeholder="Senha" name="password" register={registerSignin}/>
                {errorsSignin.password && (<ErrorSpan>{errorsSignin.password.message}</ErrorSpan>)}
                <Button type="submit" text="Entrar"
                    onMouseEnter={() => isNarrationActive && speak('Clique para entrar')}
                />
            </form>
            <p>Ou</p>
                <Link tabIndex={-1} to="/signup"
                    onMouseEnter={() => isNarrationActive && speak('Se não tem conta, clica aqui pra se cadastrar')}
                    onMouseLeave={() => window.speechSynthesis.cancel()}
                >
                    <Button  type="button" text="Cadastre-se">Cadastre-se</Button>
                </Link>
        </Section> 
            
    </AuthContainer>
}

