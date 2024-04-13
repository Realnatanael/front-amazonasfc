import { Outlet } from 'react-router-dom'
import logo from '../../images/AmazonasFansLogo.png'
//import "./Navbar.css"
import { Button, ImageLogo, Nav, InputSpace } from '../Navbar/NavbarStyled'

export function Navbar(){
    return (
       <>
            <Nav>
                <InputSpace >
                    <i className='bi bi-search'></i>
                    <input type="text" placeholder='Pesquisar'/>
                </InputSpace>
                <ImageLogo src={logo} alt="Logo Amazonas Posts" />

                <Button>Entrar</Button>
            </Nav>
            <Outlet/>
       </>
    )
}
