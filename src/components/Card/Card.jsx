import { useState } from "react";
import { Link } from "react-router-dom";
import { TextLimit } from "../TextLimit/TextLimit";
import { CardBody, CardContainer, CardFooter, CardHeader, CommentForm } from "./CardStyle";
import { likeNews, addComment } from "../../services/postsServices";
import Cookies from 'js-cookie';

export function Card({top, title, text, banner, likes, comments, actions=false, id}){

    const [likeCount, setLikeCount] = useState(likes?.length || 0);
    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState('');
    const [showCommentForm, setShowCommentForm] = useState(false);

    const handleLike = async () => {
    try {
        const response = await likeNews(id);

        if (response && response.status === 200) {
            setLiked(response.data.liked);
            setLikeCount(response.data.liked ? likeCount + 1 : likeCount - 1);
        } else {
            console.log('Erro ao registrar like');
        }
    } catch (error) {
        console.error('Erro ao registrar like:', error);
    }
};
const handleComment = async () => {
    try {
        const response = await addComment(id, comment);

        if (response && response.status === 200) {
            // atualize a lista de comentários
        } else {
            console.log('Erro ao adicionar comentário');
        }
    } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
    }
};

 const toggleCommentForm = () => {
        if (Cookies.get('token')) {
            setShowCommentForm(!showCommentForm);
        } else {
            alert('Você precisa estar logado para comentar.');
        }
    };

    return (
        <CardContainer>
            <CardBody >
                <div>
                    <CardHeader top={top}>
                        {actions && (
                            <span>
                                <Link to={`/manage-news/edit/${id}`}>
                                     <i className="bi bi-pencil-square"></i>
                                </Link>
                                <Link to={`/manage-news/delete/${id}`}>
                                    <i className="bi bi-trash3"></i>
                                </Link>
                            </span>
                        )}
                        <h2>{title}</h2>
                        <TextLimit text= {text} limit={180}/>
                    </CardHeader>
                    
                    <CardFooter>
                        <section>
                            <i className={liked ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"} onClick={handleLike}></i>
                            <span>{likeCount}</span>
                        </section>
                        <section> 
                        <i className="bi bi-chat" onClick={toggleCommentForm}></i>
                            <span>{comments?.length}</span>
                        </section>
                    </CardFooter>
                    {showCommentForm && (
                        <CommentForm onSubmit={handleComment}>
                            <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
                            <button type="submit">Comentar</button>
                        </CommentForm>
                    )}
                </div>
                <img src={banner} alt="Imagem" />
            </CardBody>
        </CardContainer>
    )
}