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

const baseURL = 'https://amazonas-fc.vercel.app'

export function Authentication(){
    const navigate = useNavigate();
    const { 
        register: registerSignin, 
        handleSubmit: handleSubmitSignin, 
        formState: {errors: errorsSignin}, 
    } = useForm({resolver: zodResolver(signinSchema)});

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
            <h2>Entrar</h2>
            <form onSubmit={handleSubmitSignin(inHanleSubmit)}>
                <Input type="email" placeholder="E-mail" name="email" register={registerSignin}/>
                {errorsSignin.email && (<ErrorSpan>{errorsSignin.email.message}</ErrorSpan>)}
                <Input type="password" placeholder="Senha" name="password" register={registerSignin}/>
                {errorsSignin.password && (<ErrorSpan>{errorsSignin.password.message}</ErrorSpan>)}
                <Button type="submit" text="Entrar"/>
            </form>
            <p>Ou</p>
                <Link to="/signup">
                    <Button  type="button" text="Cadastre-se">Cadastre-se</Button>
                </Link>
        </Section> 
            
    </AuthContainer>
}

