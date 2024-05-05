import { useState, useEffect } from "react";
import { Card } from "../../components/Card/Card";
import { getAllPosts, getTopPosts } from "../../services/postsServices";
import { HomeBody, HomeHeader } from "./HomeStyled";
import Cookies from 'js-cookie';

export default function Home(){

    const [posts, setPosts] = useState([]); 
    const [topPosts, setTopPosts] = useState(null); 
    const userId = Cookies.get('userId');

    async function findPost(){
        const postsResponse = await getAllPosts();
        setPosts(postsResponse.data.results);

        const topPostResponse = await getTopPosts();
        setTopPosts(topPostResponse.data.news);
    }

    useEffect(()=>{
        findPost();
    }, []);

    return (
        <>
            <HomeHeader>
                {topPosts && topPosts.title && 
                    <Card 
                        userId={userId}
                        top={true.toString()}
                        id={topPosts.id}
                        title={topPosts.title}
                        text={topPosts.text}
                        banner={topPosts.banner}
                        likes={topPosts.likes}
                        comments={topPosts.comments}
                    />
                }
            </HomeHeader>
            <HomeBody>
                {posts && topPosts && posts.filter(post => post.id !== topPosts.id).map((item, index) => {
                return <Card 
                    userId={userId}
                    key={item.id} 
                    id={item.id}
                    title={item.title}
                    text={item.text}
                    banner={item.banner}
                    likes={item.likes}
                    comments={item.comments}
                />
                })}
            </HomeBody>
        </>
    )
}