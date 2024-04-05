import logo from '../../images/AmazonasFansLogo.png'
import "./Navbar.css"

export function Navbar(){
    return (
       <>
            <nav>
                <div className="input-search-space">
                    <i className='bi bi-search'></i>
                    <input type="text" placeholder='Pesquisar'/>
                </div>
                <img src={logo} alt="Logo Amazonas Posts" />

                <button>Entrar</button>
            </nav>
       </>
    )
}