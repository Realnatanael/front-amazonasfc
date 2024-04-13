import { useState, useEffect } from "react";
import { Card } from "../../components/Card/Card";
import { Navbar } from "../../components/Navbar/Navbar";
import { getAllPosts, getTopPosts } from "../../services/postsServices";
import { HomeBody, HomeHeader } from "./HomeStyled";

export default function Home(){

    const [posts, setPosts] = useState([]); 
    const [topPosts, setTopPosts] = useState(null); 

    async function findPost(){
        const postsResponse = await getAllPosts();
        setPosts(postsResponse.data.results);

        const topPostResponse = await getTopPosts();
        console.log(topPostResponse.data);
        setTopPosts(topPostResponse.data.news);
    }

    useEffect(()=>{
        findPost();
    }, []);

    return (
        <>
            <Navbar/>
            <HomeHeader>
                {topPosts && topPosts.title && 
                    <Card 
                        top={true}
                        title={topPosts.title}
                        text={topPosts.text}
                        banner={topPosts.banner}
                        likes={topPosts.likes}
                        comments={topPosts.comments}
                    />
                }
            </HomeHeader>
            <HomeBody>
                {posts && posts.map((item, index) => {
                   return <Card 
                        key={item.id} 
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