import styled from 'styled-components';

export const HomeBody = styled.section`
    display: grid;
    grid-template-columns: repeat(2, 1fr); // 2 colunas com o mesmo tamanho (1fr = 1 fraction)
    grid-gap: 10px;
    margin: 1rem auto;
    width: 80%;
`
export const HomeHeader = styled.header`
    width: 80%;
    margin: 1rem auto;
`
export const ScreenReaderMessage = styled.div`
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
`;

export const FloatingButton = styled.button`
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 100;
    padding: 15px;
    border-radius: 50%;
    background-color: #fcba15;
    color: black;
    border: none;
    font-size: 1.5rem;

    &:hover {
        background-color: #fcbf1e;
        cursor: pointer;
    }

    // Responsividade para telas menores, deixando o componente no ldo direito e menor
    @media (max-width: 420px) {
        bottom: 10px;
        left: auto;
        right: 10px;
        padding: 10px;
        font-size: 1.2rem;
    }

    // Estilo para o tooltip
    .tooltip-text {
        visibility: hidden;
        width: 200px;
        background-color: black;
        color: #fff;
        text-align: center;
        padding: 5px 0;
        border-radius: 6px;

        position: absolute;
        z-index: 1;
        bottom: 125%; 
        left: 50%;
        margin-left: -50px;

        opacity: 0;
        transition: opacity 0.3s;
    }

    &:hover .tooltip-text {
        visibility: visible;
        opacity: 1;
    }
`;