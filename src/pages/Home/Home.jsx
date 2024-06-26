import React, { useState, useEffect, useRef, useContext } from "react";
import { Card } from "../../components/Card/Card";
import { getAllPosts, getTopPosts } from "../../services/postsServices";
import { FloatingButton, HomeBody, HomeHeader, ScreenReaderMessage } from "./HomeStyled";
import Cookies from 'js-cookie';
import { MdAccessibilityNew } from "react-icons/md";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [topPosts, setTopPosts] = useState(null);
    const userId = Cookies.get('userId');
    const [isNarrationActive, setIsNarrationActive] = useState(false);
    const speak = (text, alwaysSpeak = false) => {
        if (alwaysSpeak || isNarrationActive) {
            const utterance = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(utterance);
        }
    };

    async function findPost() {
        const postsResponse = await getAllPosts();
        setPosts(postsResponse.data.results);

        const topPostResponse = await getTopPosts();
        setTopPosts(topPostResponse.data.news);
    }

    useEffect(() => {
        const narrationState = localStorage.getItem('narrationActive');
        setIsNarrationActive(narrationState === 'true');
    }, []);


    useEffect(() => {
        findPost();
    }, []);

    return (
        <>
            <FloatingButton
                onMouseEnter={() => speak(isNarrationActive ? 'Desativar modo leitura de tela?' : 'Ativar modo leitura de tela?', true)}
                onClick={() => {
                    const newNarrationState = !isNarrationActive;
                    setIsNarrationActive(newNarrationState);
                    localStorage.setItem('narrationActive', newNarrationState.toString());
                    window.location.reload();           
                }}
            >
                <MdAccessibilityNew />
                <span className="tooltip-text">{isNarrationActive ? 'Desativar modo leitura de tela?' : 'Ativar modo leitura de tela?'}</span>
            </FloatingButton>
            <HomeHeader>
                {topPosts && topPosts.title &&
                    <Card
                        tabIndex={1}
                        userId={userId}
                        top={true.toString()}
                        id={topPosts.id}
                        title={topPosts.title}
                        text={topPosts.text}
                        banner={topPosts.banner}
                        likes={topPosts.likes}
                        comments={topPosts.comments}
                        username={topPosts.username}
                        onMouseEnter={() => isNarrationActive && speak(topPosts.title)}
                        speak={speak}
                    />
                }
            </HomeHeader>
            <HomeBody >
                {posts && topPosts && posts.filter(post => post.id !== topPosts.id).map((item, index) => {
                    return <Card
                        tabIndex={index + 2}
                        userId={userId}
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        text={item.text}
                        banner={item.banner}
                        likes={item.likes}
                        comments={item.comments}
                        username={item.username}
                        onMouseEnter={() => isNarrationActive && speak(item.title)}
                        speak={speak}
                    />
                })}
            </HomeBody>
        </>
    )
}