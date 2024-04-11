import styled from 'styled-components';

export const CardContainer = styled.section`
display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 100%;

    box-shadow: rgba(50, 50, 105, 0.149) 0px 2px 5px 0px, hsla(0, 0%, 0%, 0.05) 0px 1px 1px 0px;
    border-radius: 0.5rem;
    background-color: #fff;
    padding: 2rem;
`

export const CardBody = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center; // alinha os itens no centro do eixo y (vertical) 
    justify-content: center; // alinha os itens no centro do eixo x (horizontal)
    gap: 1rem; 

    div {
        display: flex;
        align-items: center;
    }
    
    h2 {
        margin-bottom: 1rem;
    }

    img {
      width: 50%;
      margin-left: 5rem;
      object-fit: cover; // a imagem cobre todo o espaço
      object-position: center; // centraliza a imagem
    }
`

export const CardFooter = styled.article`
    display: flex;
    align-items: center;
    gap: 1rem;

    div {
        display: flex;
        align-items: center;
        gap: 0.2rem;
    }
`