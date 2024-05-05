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

export function Registration (){
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
        } catch (error){
            console.error(error);
            setSignupSuccessful(false);
        }
    }

    return <AuthContainer>
        <Section type="signup"> 
                <h2>Cadastre-se</h2>
                <form onSubmit={handleSubmitSignup(upHanleSubmit)}>
                <Input type="text" placeholder="Nome" name="name" register={registerSignup}/>
                {errorsSignup.name && (<ErrorSpan>{errorsSignup.name.message}</ErrorSpan>)}
                <Input type="email" placeholder="E-mail" name="email" register={registerSignup} />
                {errorsSignup.email && (<ErrorSpan>{errorsSignup.email.message}</ErrorSpan>)}
                <Input type="password" placeholder="Senha" name="password" register={registerSignup} />
                {errorsSignup.password && (<ErrorSpan>{errorsSignup.password.message}</ErrorSpan>)}
                <Input type="password" placeholder="Confirme a senha" name="confirmPassword" register={registerSignup}/>
                {errorsSignup.confirmPassword && (<ErrorSpan>{errorsSignup.confirmPassword.message}</ErrorSpan>)}
                {isSignupSuccessful && <SuccessSpan>Cadastro realizado com sucesso!</SuccessSpan>}
                <Button type="submit" text="Cadastrar"/>
                </form>
            </Section>
    </AuthContainer>
}