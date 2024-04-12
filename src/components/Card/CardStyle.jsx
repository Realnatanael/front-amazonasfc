import styled from 'styled-components';

export const CardContainer = styled.section`
display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 100%;

    box-shadow: 0 0 30px rgba(0, 0, 0, 0.675);
    border-radius: 0.5rem;
    background-color: #171717;
    color: white;
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