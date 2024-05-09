import { Link, Outlet, useNavigate } from 'react-router-dom'
import logo from '../../images/AmazonasFansLogo.png'
import logo2 from "../../images/amazonas-futebol-clube-seeklogo.png"
import {ImageLogo, Nav, InputSpace, ErrorSpan, UserLoggerSpace, Container } from  "../Navbar/NavbarStyled"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../Button/Button';
import { searchSchema } from '../../Schemas/SearchSchema';
import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { userLogged } from '../../services/userServices';
import { UserContext } from '../../Context/UserContext';


export function Navbar(){
    const [logoSrc, setLogoSrc] = useState(logo);
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
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: zodResolver(searchSchema),
    });
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);

    function onSearch(data){
        const {title} = data;
        navigate(`/search/${title}`);
        reset();
    }

    async function findUserLogged(){
        try {
            const response = await userLogged();
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    function signout(){
        Cookies.remove('token');
        setUser(null);
        navigate('/');
    }

    useEffect(()=>{
        if (Cookies.get("token")) {
            findUserLogged();
        }
    }, []);

    return (
       <>
            <Nav>
                <Container>
                <form onSubmit={handleSubmit(onSearch)}>
                    <InputSpace >
                        <button type='submit'>
                            <i className='bi bi-search'></i>
                        </button>
                        <input {...register("title")} type="text" placeholder='Pesquisar'/>
                    </InputSpace>
                </form>

                <Link to="/">
                   <ImageLogo src={logoSrc} alt="Logo Amazonas Posts" />
                </Link>

                {user ? (
                    <UserLoggerSpace>
                        <Link to="/profile">
                        <h2>{user.name}</h2>
                        </Link>
                        <i className='bi bi-box-arrow-right' onClick={signout}></i>
                    </UserLoggerSpace>
                ): (
                    <Link to="/auth">
                        <Button  type="button" text="Entrar">Entrar</Button>
                    </Link>
                )}
                </Container>
                
            </Nav>
            {errors.title && <ErrorSpan>{errors.title.message}</ErrorSpan>}
            <Outlet/>
       </>
    )
}
