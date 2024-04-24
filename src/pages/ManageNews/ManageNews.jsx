import { useNavigate, useParams } from "react-router-dom";
import { AddNewsContainer } from "./ManageNewsStyled";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsSchema } from "../../Schemas/newsSchemas";
import { ErrorSpan } from "../../components/Navbar/NavbarStyled";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { createNews } from "../../services/postsServices";
import { useForm } from "react-hook-form";

export function ManageNews() {
    const navigate = useNavigate();
    const { action } = useParams();

    const {
        register: registerNews,
        handleSubmit: handleRegisterNews,
        formState: { errors: errorsRegisterNews },
    } = useForm({ resolver: zodResolver(newsSchema)});

    async function registerNewsSubmit(data){
        try {
            await createNews(data);
            navigate("/profile");
        } catch (error) {
            console.error(error);
        }
    }

    async function editNewsSubmit(data){
        //try {
        //    await updateNews(data);
        //    navigate("/profile");
        //} catch (error) {
        //    console.error(error);
        //}
    }

    return (
        <AddNewsContainer>
            <h2>{action==="add" ? "Adicionar" : "Atualizar"}Publicação</h2>
            <form onSubmit={
                action === "add" 
                ? handleRegisterNews(registerNewsSubmit)
                : handleRegisterNews(editNewsSubmit)
            }>
                <Input
                    type="text"
                    placeholder="Título"
                    name="title"
                    register={registerNews}
                    value={action !== "add" ? "title" : ""}
                />
                {errorsRegisterNews.title && (<ErrorSpan>{errorsRegisterNews.title.message}</ErrorSpan>)}
                <Input
                    type="text"
                    placeholder="URL da imagem"
                    name="banner"
                    register={registerNews}
                    value={action !== "add" ? "banner link" : ""}
                />
                {errorsRegisterNews.banner && (<ErrorSpan>{errorsRegisterNews.banner.message}</ErrorSpan>)}
                <Input
                    type="text"
                    placeholder="Conteúdo"
                    name="text"
                    register={registerNews}
                    isInput={false}
                    value={action !== "add" ? "text" : ""}
                />
                {errorsRegisterNews.text && (<ErrorSpan>{errorsRegisterNews.text.message}</ErrorSpan>)}

                <Button 
                    datatype="submit"
                    text={action === "add" ? "Adicionar" : "Atualizar"}
                />
            </form>
        </AddNewsContainer>
    )
}