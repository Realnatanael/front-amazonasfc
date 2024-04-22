export function Profile(user){
    return (
        <div>
            <h1>Profile</h1>
            <h2>{user.name}</h2>
            <h3>{user.username}</h3>
            <img src={user.avatar} alt={user.name} />
            <img src={user.background} alt={user.name} />
        </div>
    )
}