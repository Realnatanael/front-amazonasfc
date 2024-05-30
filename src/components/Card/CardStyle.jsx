import styled from 'styled-components';

export const CardContainer = styled.section`
display: flex;
    flex-direction: column;
    max-width: 100%;

    box-shadow: 0 0 30px rgba(0, 0, 0, 0.675);
    border-radius: 0.8rem;
    background-color: #171717;
    color: white;
`

export const CardBody = styled.article`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    border-radius: 0.8rem;
    border-bottom: 2px solid #0c0c0c;

    div.content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1rem;
        width: 100%;
        order: 1; // Adicionado
    }

    div.image-container {
        width: 65%;
        max-height: 300px; 
        overflow: hidden;   
        order: 2;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover; 
      object-position: center; 
      border-radius: 0 0.8rem 0.8rem 0;
    }

    @media (max-width: 720px) {
        flex-direction: column;

        div.content {
            order: 2; // Adicionado
            width: 93%;
        }

        img {
            border-radius: 0.8rem 0.8rem 0 0;
        }

        div.image-container {
            width: 100%;
            max-height: none;
            order: 1;
        }
    }
`

export const CardHeader = styled.article`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: ${props => props.top ? "1.5rem" : "0.9rem"};

    h2{
        margin-bottom: 1rem;
        font-size: ${props => props.top ? "3rem" : "1.5rem"};
        width: 100%;

        @media (max-width: 420px) {
            font-size: 1.5rem;
        }
    }

    span{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: 1rem;
    }
    i {
        justify-content: flex-end;
        cursor: pointer;
        font-size: 1.5rem;
        color: #fff;
        text-decoration: none;
        border: none;
    }

    p{
        padding-bottom: 1rem;
    }
`

export const CardFooter = styled.article`
    display: flex;
    align-items: center;
    gap: 1rem;

    section {
        display: flex;
        align-items: center;
        gap: 0.2rem;
    }

    section:last-child {
        margin-left: auto;
        font-size: 0.7rem;
        color: #999;
    }
`

export const CommentForm = styled.form`

    input {
        margin-bottom: 0.5rem;
        padding: 0.5rem;
        border: none;
        border-radius: 0.4rem;
        background-color: #fff;
    }

    button {
        padding: 0.5rem;
        border: none;
        border-radius: 0.4rem;
        background-color: #fcba30;
        color: #fff;
        cursor: pointer;
    }

    button:hover {
        background-color: #e7a71d;
        color: #000;
    }
`;

export const Commentdiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;

    p.data {
        font-size: 0.8rem;
        color: #999;
    }
    i {
        color: #171717;
        cursor: pointer;
        font-size: 1rem;
    }

        i:hover {
        color:  #fff;
    }
`;