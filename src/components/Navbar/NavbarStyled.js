import styled from 'styled-components';

export const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;
    padding: 1rem 0;/*
    position: fixed;
    top: 0%; */
    background-color: black;
    z-index: 1;
    box-shadow: rgba(17, 17, 26, 0.1)0px 1px 0px;
`;

export const ImageLogo = styled.img`
    height:3.4rem;
    object-fit: cover;
    cursor: pointer;
`;

export const InputSpace = styled.div`
    position: relative;
    width: 260px;
    display: flex;
    align-items: center;
    margin-left: 1rem;

    button {
        position: absolute;
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
    }
`

export const Button = styled.button`
    background-color: #fcba15;
    border: none;
    outline: none;
    font-size: 1rem;
    padding: 0.4rem 1rem;
    color: black;
    transition: all 0.4s ease-in-out;
    cursor: pointer;
    border-radius: 0.3rem;
    font-family: Roboto, Arial;
    width: 10%;
    font-weight: 500;
    letter-spacing: 0.1rem;
    margin-right: 1rem;

&:hover{
    background-color: #fcba30;
    color: white;
}
`;

export const ErrorSpan = styled.span`
    background-color: #ffaeae;
    color: #fe0000;
    padding: 1rem;
    display: flex;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: bold;
`;