import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../Context/UserContext"
import { ProfileActions, ProfileAvatar, ProfileBackground, ProfileContainer, ProfileHeader, ProfileIconAdd, ProfileIconEdit, ProfileUser, ProfilePosts } from "./ProfileStyled";
import { getAllPostsByUser } from "../../services/postsServices";
import { getItem } from "localforage";
import { Card } from "../../components/Card/Card";
import { Link } from "react-router-dom";

export function Profile(){
    const [user] = useContext(UserContext);
    const [news, setNews] = useState([]);

    async function findAllPostsByUser(){
        const postsResponse = await getAllPostsByUser();
        if (postsResponse.data.byUser) {
            setNews(postsResponse.data.byUser);
        } else {
            console.error('postsByUser not found in response:', postsResponse);
        }
    }

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

    return (
        <ProfileContainer>
            <ProfileHeader>
                <ProfileIconEdit>
                    <i className="bi bi-pencil-square"></i>
                </ProfileIconEdit>
                <ProfileBackground src={user.background} alt=""/>
                <ProfileUser>
                    <ProfileAvatar src={user.avatar} alt="Foto de usuário"/>
                        <h2>{user.name}</h2>
                        <p>{user.username}</p>
                </ProfileUser>
                <ProfileActions>
                    <Link to="/manage-news/add/news">
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
                        />
                    )
                })}
            </ProfilePosts>
        </ProfileContainer>
    )
}