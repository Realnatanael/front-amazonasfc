import { useNavigate, useParams } from "react-router-dom";
import { AddNewsContainer } from "./ManageNewsStyled";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsSchema } from "../../Schemas/newsSchemas";
import { ErrorSpan } from "../../components/Navbar/NavbarStyled";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { createNews, getNewsById } from "../../services/postsServices";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export function ManageNews() {
    const navigate = useNavigate();
    const { action, id } = useParams();

    const {
        register: registerNews,
        handleSubmit: handleRegisterNews,
        formState: { errors: errorsRegisterNews },
        setValue,
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

    async function findNewsById(id){
        try {
            const response = await getNewsById(id);
            setValue("title", response.data.news.title);
            setValue("banner", response.data.news.banner);
            setValue("text", response.data.news.text);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (action === "edit") {
            findNewsById(id)
        }
    }, []);

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
                />
                {errorsRegisterNews.title && (<ErrorSpan>{errorsRegisterNews.title.message}</ErrorSpan>)}
                <Input
                    type="text"
                    placeholder="URL da imagem"
                    name="banner"
                    register={registerNews}
                />
                {errorsRegisterNews.banner && (<ErrorSpan>{errorsRegisterNews.banner.message}</ErrorSpan>)}
                <Input
                    type="text"
                    placeholder="Conteúdo"
                    name="text"
                    register={registerNews}
                    isInput={false}
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