import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorSpan } from "../../components/Navbar/NavbarStyled";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { updateUser, userLogged } from "../../services/userServices";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {z} from 'zod'
import { EditProfileContainer } from "./EditProfileStyled";

const userSchema = z.object({
    name: z.string().nonempty({ message: 'Nome é obrigatório' }),
    username: z.string().nonempty({ message: 'Nome de usuário é obrigatório' }),
    email: z.string().email({ message: 'Email inválido' }),
    avatar: z.string().url({ message: 'URL do Avatar inválido' }),
    background: z.string().url({ message: 'URL do Background inválido' }),
});

export function EditProfile() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const {
        register: registerUser,
        handleSubmit: handleRegisterUser,
        formState: { errors: errorsRegisterUser },
        setValue,
    } = useForm({ resolver: zodResolver(userSchema)});

    async function editUserSubmit(data){
        try {
            const response = await userLogged();
            if (response.data) {
                return await updateUser(data, response.data._id);
            } else {
                console.log("Dados de usuário não encontrados em userLogged"); 
            }
        } catch (error) {
            console.error("Erro em userLogged:", error);
        }
    }

    async function findUser(){
        try {
            const response = await userLogged();
            if (response.data) {
                setValue("name", response.data.name);
                setValue("username", response.data.username);
                setValue("email", response.data.email);
                setValue("avatar", response.data.avatar);
                setValue("background", response.data.background);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        findUser()
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <EditProfileContainer>
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
        </EditProfileContainer>
    )
}