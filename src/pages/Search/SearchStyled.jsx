import styled from 'styled-components';

export const ContainerResults = styled.div`
    padding-top: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
        width: 100%;
    }
`

export const SearchPosts = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin: 1rem auto;
    width: 80%;
    
`
export const TextResults = styled.div`
    padding: 3rem;
    background-color: #171717;
    width: 80%;
    border-radius: 0.3rem;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.675);
    color: #ffffff;

    span{
        font-size: 1.2rem;
        color: #ffffff;
    }
    h2 {
        
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #fff;
    }
`