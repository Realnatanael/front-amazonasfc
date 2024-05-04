import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TextLimit } from "../TextLimit/TextLimit";
import { CardBody, CardContainer, CardFooter, CardHeader, CommentForm, Commentdiv } from "./CardStyle";
import { likeNews, addComment, deleteComment } from "../../services/postsServices"; 
import Cookies from 'js-cookie';
import { ErrorSpan } from "../Navbar/NavbarStyled";


function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function Card({top, title, text, banner, likes, comments: initialComments, actions=false, id}){

    const [likeCount, setLikeCount] = useState(likes?.length || 0);
    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState('');
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showError, setShowError] = useState(false);
    const [colorMap, setColorMap] = useState({});
    const [comments, setComments] = useState(initialComments);

    useEffect(() => {
        const newColorMap = {...colorMap};
        comments?.forEach(comment => {
            if (!colorMap[comment.username]) {
                newColorMap[comment.username] = getRandomColor();
            }
        });
        setColorMap(newColorMap);
    }, [comments, colorMap]);

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

const handleDeleteComment = async (idComment) => {
    try {
        const response = await deleteComment(id, idComment);

        if (response && response.status === 200) {
            setComments(comments.filter(comment => comment.idComment !== idComment)); // Use comment.idComment aqui
        } else {
            console.log('Erro ao deletar comentário');
        }
    } catch (error) {
        console.error('Erro ao deletar comentário:', error);
    }
};

 const toggleCommentForm = () => {
    setShowComments(!showComments);
    if (Cookies.get('token')) {
        setShowCommentForm(!showCommentForm);
        setShowError(false);
    } else {
        setShowError(true);
    }
};

return (
    <CardContainer>
        <CardBody >
            <div className="content">
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
                    <TextLimit text= {text} limit={280}/>
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
            </div>
            <div className="image-container">
                <img src={banner} alt="Imagem" />
            </div>
        </CardBody>
        {showError && <ErrorSpan>Faça login para comentar</ErrorSpan>}
        {showComments && (
                <Commentdiv>
                   {comments?.map((comment, index) => {
                        const color = colorMap[comment.username];
                        return (
                            <div key={index}>
                                <p>
                                <span style={{color: color}}>{comment.username}</span>: {comment.comment}
                                {Cookies.get('token') && (
                                    <i className="bi bi-trash3" onClick={() => handleDeleteComment(comment.idComment)}></i> // Use comment.idComment aqui
                                )}
                                </p>
                                <p className="data">Em:
                                    {new Date(comment.createdAt).toLocaleDateString()} - {new Date(comment.createdAt).toLocaleTimeString()}
                                </p>
                            </div>
                        );
                    })}
                    {Cookies.get('token') && showCommentForm && (
                        <CommentForm onSubmit={handleComment}>
                            <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
                            <button type="submit">Comentar</button>
                        </CommentForm>
                    )}
                </Commentdiv>
            )}
        </CardContainer>
);
}