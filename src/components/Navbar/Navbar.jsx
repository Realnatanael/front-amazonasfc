import { Link, Outlet, useNavigate } from 'react-router-dom'
import logo from '../../images/AmazonasFansLogo.png'
import {ImageLogo, Nav, InputSpace, ErrorSpan } from '../Navbar/NavbarStyled'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../Button/Button';
import { searchSchema } from '../../Schemas/SearchSchema';

export function Navbar(){
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: zodResolver(searchSchema),
    });
    const navigate = useNavigate();

    function onSearch(data){
        const {title} = data;
        navigate(`/search/${title}`);
        reset();
    }

    function goAuth(){
        navigate('/auth');
    }

    return (
       <>
            <Nav>
                <form onSubmit={handleSubmit(onSearch)}>
                    <InputSpace >
                        <button type='submit'>
                            <i className='bi bi-search'></i>
                        </button>
                        <input {...register("title")} type="text" placeholder='Pesquisar'/>
                    </InputSpace>
                </form>

                <Link to="/">
                    <ImageLogo src={logo} alt="Logo Amazonas Posts" />
                </Link>

                <Link to="/auth">
                    <Button  type="button" text="Entrar">Entrar</Button>
                </Link>
                
            </Nav>
            {errors.title && <ErrorSpan>{errors.title.message}</ErrorSpan>}
            <Outlet/>
       </>
    )
}
