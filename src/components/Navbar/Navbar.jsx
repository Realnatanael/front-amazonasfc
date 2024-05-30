import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../images/Logo2.png'
import logo2 from "../../images/amazonas-futebol-clube-seeklogo.png"
import { ImageLogo, Nav, InputSpace, ErrorSpan, UserLoggerSpace, Container } from "../Navbar/NavbarStyled"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../Button/Button';
import { searchSchema } from '../../Schemas/SearchSchema';
import Cookies from 'js-cookie';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { userLogged } from '../../services/userServices';
import { UserContext } from '../../Context/UserContext';
import { useHotkeys } from 'react-hotkeys-hook';
import { ButtonRefContext } from '../context/ButtonRefContext';
import { ScreenReaderMessage } from '../../pages/Home/HomeStyled';


export function Navbar() {
    const [logoSrc, setLogoSrc] = useState(logo);
    const loginButtonRef = useContext(ButtonRefContext);
    const location = useLocation();
    const narrationState = localStorage.getItem('narrationActive');
    const [isNarrationActive, setIsNarrationActive] = useState(narrationState === 'true');

    const speak = useCallback((text, alwaysSpeak = false) => {
        if (alwaysSpeak || isNarrationActive) {
            const utterance = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(utterance);
        }
    }, [isNarrationActive]);


    useHotkeys('ArrowLeft', () => loginButtonRef.current.focus());
    useEffect(() => {
        const updateLogo = () => {
            if (window.innerWidth < 720) {
                setLogoSrc(logo2);
            } else {
                setLogoSrc(logo);
            }
        };

        window.addEventListener('resize', updateLogo);
        updateLogo();

        return () => window.removeEventListener('resize', updateLogo);
    }, []);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(searchSchema),
    });
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);

    function onSearch(data) {
        const { title } = data;
        navigate(`/search/${title}`);
        reset();
    }

    async function findUserLogged() {
        try {
            const response = await userLogged();
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    function signout() {
        Cookies.remove('token');
        setUser(null);
        navigate('/');
        window.location.reload();
    }

    useEffect(() => {
        // Quando a rota muda, move o foco para o início da página.
        document.getElementById('Navbar').focus();
    }, [location]);

    useEffect(() => {
        if (Cookies.get("token")) {
            findUserLogged();
        }
    }, []);

    return (
        <>
            <Nav aria-label='Cabeçalho' tabIndex={0} id='Navbar'>
                <Container>
                    <form onSubmit={handleSubmit(onSearch)}     >
                        <InputSpace tabIndex={-1} >
                            <button type='submit' tabIndex="-1">
                                <i className='bi bi-search' tabIndex="-1"></i>
                            </button>
                            <input {...register("title")} type="text" placeholder='Pesquisar' aria-label=' Enter se quiser pesquisar por notícias, ou Tab para Pular para o login' />
                        </InputSpace>
                    </form>

                    <Link to="/" tabIndex={-1}>
                        <ImageLogo src={logoSrc} alt="Logo Amazonas Posts" tabIndex="-1" />
                    </Link>

                    {user ? (
                        <UserLoggerSpace
                            aria-label='Entrar Perfil'>
                            <Link
                                onMouseEnter={() => isNarrationActive && speak(`Olá ${user.name.split(' ')[0]}, clique para acessar seu perfil e ver suas infomações e suas postagens`)}
                                onMouseLeave={() => window.speechSynthesis.cancel()}
                                to="/profile">
                                <h2>{window.innerWidth <= 420 ? user.name.split(' ')[0] : user.name}</h2>
                            </Link>
                            <i aria-label="deslogar" className='bi bi-box-arrow-right' onClick={signout}
                                onMouseEnter={() => isNarrationActive && speak('Clique para deslogar')}
                            ></i>
                        </UserLoggerSpace>
                    ) : (
                        <ButtonRefContext.Provider value={loginButtonRef}>
                            <Link to="/auth" tabIndex={-1} onMouseEnter={() => isNarrationActive && speak('Entrar ou cadastrar-se como participante')}>
                                <ScreenReaderMessage onMouseOver={() => isNarrationActive && speak('Clique enter se quiser entrar como usuário')}>
                                    Clique enter se quiser entrar como usuário
                                </ScreenReaderMessage>
                                <Button
                                    type="button"
                                    text="Entrar"
                                    tabindex="0"
                                    role="button"
                                >
                                    Entrar
                                </Button>
                            </Link>
                        </ButtonRefContext.Provider>
                    )}

                </Container>

            </Nav>
            {errors.title && <ErrorSpan>{errors.title.message}</ErrorSpan>}
            <Outlet />
        </>
    )
}
