import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { AuthContainer, Section } from "./AuthenticationStyled";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "../../Schemas/SigninSchema";
import { ErrorSpan } from "../../components/Navbar/NavbarStyled";

export function Authentication(){
    const { 
        register: registerSignin, 
        handleSubmit: handleSubmitSignin, 
        formState: {errors: errorsSignin}, 
    } = useForm({resolver: zodResolver(signinSchema)});

    function inHanleSubmit(data){
        console.log(data)
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

