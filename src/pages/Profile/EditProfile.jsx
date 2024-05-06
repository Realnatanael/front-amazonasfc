import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorSpan } from "../../components/Navbar/NavbarStyled";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { updateUser, userLogged } from "../../services/userServices";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {z} from 'zod'

const userSchema = z.object({
    name: z.string().nonempty({ message: 'Nome é obrigatório' }),
    username: z.string().nonempty({ message: 'Nome de usuário é obrigatório' }),
    email: z.string().email({ message: 'Email inválido' }),
    avatar: z.string().url({ message: 'URL do Avatar inválido' }),
    background: z.string().url({ message: 'URL do Background inválido' }),
  });

    export function EditProfile() {
    const navigate = useNavigate();

    const {
        register: registerUser,
        handleSubmit: handleRegisterUser,
        formState: { errors: errorsRegisterUser },
        setValue,
    } = useForm({ resolver: zodResolver(userSchema)});

    async function editUserSubmit(data){
        try {
            await updateUser(data);
            navigate("/profile");
        } catch (error) {
            console.error(error);
        }
    }

    async function findUser(){
        try {
            const response = await userLogged();
            if (response.data && response.data.user) {
                setValue("name", response.data.user.name);
                setValue("username", response.data.user.username);
                setValue("email", response.data.user.email);
                setValue("avatar", response.data.user.avatar);
                setValue("background", response.data.user.background);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        findUser()
    }, []);

    return (
        <div>
            <h2>Editar Perfil</h2>
            <form onSubmit={handleRegisterUser(editUserSubmit)}>
                <Input
                    type="text"
                    placeholder="Nome"
                    name="name"
                    register={registerUser}
                />
                {errorsRegisterUser.name && (<ErrorSpan>{errorsRegisterUser.name.message}</ErrorSpan>)}
                <Input
                    type="text"
                    placeholder="Nome de usuário"
                    name="username"
                    register={registerUser}
                />
                {errorsRegisterUser.username && (<ErrorSpan>{errorsRegisterUser.username.message}</ErrorSpan>)}
                <Input
                    type="text"
                    placeholder="Email"
                    name="email"
                    register={registerUser}
                />
                {errorsRegisterUser.email && (<ErrorSpan>{errorsRegisterUser.email.message}</ErrorSpan>)}
                <Input
                    type="text"
                    placeholder="URL do Avatar"
                    name="avatar"
                    register={registerUser}
                />
                {errorsRegisterUser.avatar && (<ErrorSpan>{errorsRegisterUser.avatar.message}</ErrorSpan>)}
                <Input
                    type="text"
                    placeholder="URL do Background"
                    name="background"
                    register={registerUser}
                />
                {errorsRegisterUser.background && (<ErrorSpan>{errorsRegisterUser.background.message}</ErrorSpan>)}

                <Button 
                    datatype="submit"
                    text="Atualizar"
                />
            </form>
        </div>
    )
}