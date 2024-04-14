import { Link, Outlet, useNavigate } from 'react-router-dom'
import logo from '../../images/AmazonasFansLogo.png'
import { Button, ImageLogo, Nav, InputSpace } from '../Navbar/NavbarStyled'
import { useForm } from 'react-hook-form';

export function Navbar(){
    const {register, handleSubmit, reset} = useForm();
    const navigate = useNavigate();

    function onSearch(data){
        const {title} = data;
        navigate(`/search/${title}`);
        reset();
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

                <Button>Entrar</Button>
            </Nav>
            <Outlet/>
       </>
    )
}
