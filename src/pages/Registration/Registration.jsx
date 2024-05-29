import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { AuthContainer, Section } from "../Authentication/AuthenticationStyled";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../Schemas/SignupSchema";
import { ErrorSpan } from "../../components/Navbar/NavbarStyled";
import { signup } from "../../services/userServices";
import { useState } from 'react';
import { SuccessSpan } from "../../components/Navbar/NavbarStyled";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import { baseURL } from '../../services/userServices';

export function Registration (){
    const navigate = useNavigate();
    const { 
        register: registerSignup, 
        handleSubmit: handleSubmitSignup, 
        formState: {errors: errorsSignup}, 
    } = useForm({resolver: zodResolver(signupSchema)});

    const [isSignupSuccessful, setSignupSuccessful] = useState(false);

    async function upHanleSubmit(data){
        try{
            const response = await signup(data);
            setSignupSuccessful(true);
    
            // Autenticação do usuário após o cadastro
            const loginResponse = await axios.post(`${baseURL}/auth/login`, {
                email: data.email,
                password: data.password
            });
    
            // Salvar o token em um cookie
            const token = loginResponse.data.token;
            Cookies.set('token', token, {expires: 1});
    
            // Decodificar o token e extrair o nome de usuário
            const decodedToken = jwtDecode(token);
            const username = decodedToken.username;
    
            // Salvar o nome de usuário em um cookie
            Cookies.set('username', username, {expires: 1});
    
            // Navegar para a página "/"
            navigate('/');
        } catch (error){
            console.error(error);
            setSignupSuccessful(false);
        }
    }

    return <AuthContainer>
        <Section type="signup"> 
                <h2>Cadastre-se</h2>
                <form onSubmit={handleSubmitSignup(upHanleSubmit)}>
                <Input aria-label="nome" type="text" placeholder="Nome" name="name" register={registerSignup}/>
                {errorsSignup.name && (<ErrorSpan>{errorsSignup.name.message}</ErrorSpan>)}
                <Input aria-label="E-mail" type="email" placeholder="E-mail" name="email" register={registerSignup} />
                {errorsSignup.email && (<ErrorSpan>{errorsSignup.email.message}</ErrorSpan>)}
                <Input aria-label="senha" type="password" placeholder="Senha" name="password" register={registerSignup} />
                {errorsSignup.password && (<ErrorSpan>{errorsSignup.password.message}</ErrorSpan>)}
                <Input aria-label="Confirma senha" type="password" placeholder="Confirme a senha" name="confirmPassword" register={registerSignup}/>
                {errorsSignup.confirmPassword && (<ErrorSpan>{errorsSignup.confirmPassword.message}</ErrorSpan>)}
                {isSignupSuccessful && <SuccessSpan>Cadastro realizado com sucesso!</SuccessSpan>}
                <Button aria-label="cadastrar" type="submit" text="Cadastrar"/>
                </form>
            </Section>
    </AuthContainer>
}