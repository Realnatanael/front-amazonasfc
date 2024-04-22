import styled from "styled-components";

export const ProfileContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const ProfileHeader = styled.div`
    width: 80%;
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;
    border-radius: 0.3rem;
    background-color: #dddbbe;
    z-index: 0;
`
export const ProfileIconEdit = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;   
    color: black;
    background-color: #fcba30;
    padding: 0.5rem;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover{
        color: #f7f7f7;
        box-shadow: 0 0 2rem #fcbb3080;
    }
`

export const ProfileBackground = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    object-fit: cover;
    width: 100%;
    height: 50%;
    z-index: -1;
    border-radius: 0.3rem 0.3rem 0 0;
`

export const ProfileUser = styled.div`
    padding: 1rem;
`

export const ProfileAvatar = styled.img`
    border-radius: 50%;
    width: 13rem;
    border: solid 5px white;
    object-fit: cover;
    object-position: center;
`

export const ProfileActions = styled.div`
    padding: 1rem;
`

export const ProfileIconAdd = styled.div`
    color: black;
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer !important;
    font-family: Roboto, Arial;
    font-weight: bold;
    border-radius: 50%;
    font-size: 2.2rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover{
        color: #fcba30;
        box-shadow: 0 0 2rem #fcbb3080;
        font-size: 2.4rem;
    }`