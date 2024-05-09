import styled from 'styled-components';

export const Nav = styled.nav`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;
    padding: 1rem 0;
    padding-right: 1rem;
    background-color: black;
    z-index: 1;
    box-shadow: rgba(17, 17, 26, 0.1)0px 1px 0px;

    p{
        color: #fcba15;
    }

    @media (max-width: 720px) {
        background-color: #201e1e;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    form {
        @media (max-width: 420px) {
            width: 30%;
            margin-left: 1rem;
        }
    }
`;

export const ImageLogo = styled.img`
    height:3.4rem;
    object-fit: cover;
    cursor: pointer;

    
`;

export const InputSpace = styled.div`
    position: relative; //Para o botão ficar por cima do input e não empurrar ele para baixo
    width: 260px;
    display: flex;
    align-items: center;
    margin-left: 1rem;
    color: darkgray;

    @media (max-width: 420px) {
            width: 100%;
            margin-left: 1rem;
        }

    button {
        position: absolute; //Para ficar por cima do input e não empurrar ele para baixo
        top: 1;
        right: 0.1rem;
        z-index: 10;
        background-color: #0b0b0b;
        color: #757575;
        border: none;
        border-radius: .3rem;
        padding: .5rem;
        cursor: pointer;
        transition: 0.5s;


    }

    button:hover{
        background-color: #464545;
        border-radius: 50%;
    }

    input {
        color: white;
        outline: none;
        font-size: 1rem;
        padding: 0.6rem;
        background-color: #2523234e;
        border: 2px solid #5e5d5c; 
        width: 100%;
        border-radius: 0.3rem;
        
        
        &:focus{
            border:2px solid #fcba1596;
        }
        &:hover{
            box-shadow: 0px 0px 10px #fcba1596;
        }
    }
`

export const ErrorSpan = styled.span`
    background-color: #ffaeae;
    color: #fe0000;
    padding: 1rem;
    display: flex;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: bold;
`;

export const SuccessSpan = styled.span`
    background-color: #a7f3d0;
    color: #00fe00;
    padding: 1rem;
    display: flex;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: bold;
`;

export const UserLoggerSpace = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    gap: 1rem;

    a{
        text-decoration: none;
    }

    h2{
        color: #fcba15;
        font-size: 1rem;
        transition: all 0.5s;
        cursor: pointer;
    }

    h2{
        &:hover{
            color: #ffcf4d; 
            text-shadow: 0px 0px 30px #ffcf4d;
        }
    }

    i{
        color: #fcba15;
        cursor: pointer;
    }
`;