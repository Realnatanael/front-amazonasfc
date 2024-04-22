import { useContext } from "react"
import { UserContext } from "../../Context/UserContext"
import { ProfileActions, ProfileAvatar, ProfileBackground, ProfileContainer, ProfileHeader, ProfileIconAdd, ProfileIconEdit, ProfileUser } from "./ProfileStyled";

export function Profile(){
    const [user] = useContext(UserContext);
    return (
        <ProfileContainer>
            <ProfileHeader>
                <ProfileIconEdit>
                    <i className="bi bi-pencil-square"></i>
                </ProfileIconEdit>
                <ProfileBackground src={user.background} alt=""/>
                <ProfileUser>
                    <ProfileAvatar src={user.avatar} alt="Foto de usuário"/>
                        <h2>{user.name}</h2>
                        <p>{user.username}</p>
                </ProfileUser>
                <ProfileActions>
                    <ProfileIconAdd>
                        <i className="bi bi-plus-circle"></i>
                    </ProfileIconAdd>
                </ProfileActions>
            </ProfileHeader>
        </ProfileContainer>
    )
}