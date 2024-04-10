import styled from 'styled-components';

export const HomeBody = styled.section`
    display: grid;
    grid-template-columns: repeat(2, 1fr); // 2 colunas com o mesmo tamanho (1fr = 1 fraction)
    grid-gap: 10px;
    margin: 1rem auto;
    width: 80%;
`