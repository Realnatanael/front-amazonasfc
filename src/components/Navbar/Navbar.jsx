import { Link, Outlet, useNavigate } from 'react-router-dom'
import logo from '../../images/AmazonasFansLogo.png'
import { Button, ImageLogo, Nav, InputSpace, ErrorSpan } from '../Navbar/NavbarStyled'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const searchSchema = z.object({
    title: z.string().nonempty({message: 'A pesquisa não pode ser vazia'}).refine(value => !/^\s*$/.test(value), {message: 'A pesquisa não pode ter apenas espaços'}),
});

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

                <Button onClick={goAuth}>Entrar</Button>
            </Nav>
            {errors.title && <ErrorSpan>{errors.title.message}</ErrorSpan>}
            <Outlet/>
       </>
    )
}
