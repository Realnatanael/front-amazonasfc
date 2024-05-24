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