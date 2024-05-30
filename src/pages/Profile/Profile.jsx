import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../Context/UserContext"
import { ProfileActions, ProfileAvatar, ProfileBackground, ProfileContainer, ProfileHeader, ProfileIconAdd, ProfileIconEdit, ProfileUser, ProfilePosts } from "./ProfileStyled";
import { getAllPostsByUser } from "../../services/postsServices";
import { Card } from "../../components/Card/Card";
import { Link } from "react-router-dom";
import { userLogged } from "../../services/userServices"

export function Profile(){
    const [user, setUser] = useContext(UserContext);
    const [news, setNews] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await getAllPostsByUser();
                setNews(response.data.results);
            } catch (error) {
                console.error('Erro ao buscar notícias:', error);
            }
        };
    
        fetchNews();
    }, []);

    useEffect(() => {
        const fetchUserAndUserId = async () => {
            try {
                const response = await userLogged();
                setUser(response.data);
                setUserId(response.data._id);
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            }
        };
    
        fetchUserAndUserId();
    }, []);


    return (
        <ProfileContainer>
            <ProfileHeader>
                <ProfileIconEdit>
                    {userId && <Link aria-label="Editar" to={`/edit-profile/${userId}`}>
                        <i className="bi bi-pencil-square"></i>
                    </Link>}
                </ProfileIconEdit>
                <ProfileBackground src={user?.background} alt=""/>
                <ProfileUser>
                    <ProfileAvatar src={user?.avatar} alt="Foto de usuário"/>
                        <h2>{user?.name}</h2>
                        <p>{user?.username}</p>
                </ProfileUser>
                <ProfileActions>
                    <Link aria-label="Adicionar Notícia" to="/manage-news/add/news">
                        <ProfileIconAdd>
                            <i className="bi bi-plus-circle"></i>
                        </ProfileIconAdd>
                    </Link>
                </ProfileActions>
            </ProfileHeader>
            <ProfilePosts>
                {news.length === 0 && <h3>Você não encontrou nenhum post</h3>}

                {news.map(item => {
                    return (
                        <Card
                        key= {item.id}
                        id={item.id}
                        title= {item.title}
                        text= {item.text}
                        banner= {item.banner}
                        likes= {item.likes}
                        comments= {item.comments}
                        actions= {true}
                        userId= {user.id}
                        username= {user.username}
                        />
                    )
                })}
            </ProfilePosts>
        </ProfileContainer>
    )
}