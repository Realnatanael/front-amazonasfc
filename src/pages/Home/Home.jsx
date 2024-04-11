import { useState, useEffect } from "react";
import { Card } from "../../components/Card/Card";
import { Navbar } from "../../components/Navbar/Navbar";
import { getAllPosts } from "../../services/postsServices";
import { HomeBody } from "./HomeStyled";

export default function Home(){

    const [news, setNews] = useState([]); // This is the state that will store the news data from the API request 

    async function findAllPosts(){
        const response = await getAllPosts();
        setNews(response.data.results);
    }

    useEffect(()=>{
        findAllPosts();
    }, []);

    return (
        <>
            <Navbar/>
            <HomeBody>
                {news.map((item, index) => {
                   return <Card 
                        key={item.id} 
                        title={item.title}
                        text={item.text}
                        banner={item.banner}
                        likes={item.likes.length}
                        comments={item.comments.length}
                    />
                })}
            </HomeBody>
        </>
    )
}