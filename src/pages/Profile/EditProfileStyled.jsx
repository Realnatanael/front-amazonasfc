import styled from "styled-components";

export const EditProfileContainer = styled.section`
    width: 60%;
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    border-radius: .3rem;

    h2{
        margin-top: 1rem;
    }

    form {
        min-width: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 1rem 0;
        gap: 1rem;

        input {
            width: 100%;
        }
    }
`