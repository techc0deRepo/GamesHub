import { useState, useEffect } from "react";
import GameCard from "../components/GameCard";
import UserCard from "../components/UserCard";

const USERS_URL = "http://localhost:8080/api/users";
const GAMES_URL = "http://localhost:8080/api/games";

function Games() {

    const [users, setUsers] = useState([]);
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsersAndGames();
    }, []);

    const fetchUsersAndGames = async () => {
        setLoading(true);

        try {

            const [usersResponse, gamesResponse] = await Promise.all([
                fetch(USERS_URL, { method: "GET" }),
                fetch(GAMES_URL),
            ]);

            if (!usersResponse.ok || !gamesResponse.ok) {
                throw new Error(
                    `Failed to fetch: ${
                        !usersResponse.ok ? "users" : "games"
                    }`
                );
            }

            const usersData = await usersResponse.json();
            const gamesData = await gamesResponse.json();

            console.log(usersData);
            console.log(gamesData);

            setUsers(usersData);
            setGames(gamesData);

        } catch (error) {
            console.error("Error fetching data:", error);
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleError = (error) => {
        setError(error);
        console.log(error);
    }

    if (loading) return (
        <>
            <div className="box-container">
                <h1>Loading...</h1>
            </div>
        </>
    )

    if (error) return (
        <>
        <div className="box-container">
            <h1>Error: {error}</h1>
        </div>
        </>
    )

    return (
        <>
            <div className="box-container">
                <header>
                    <h1>Game Page</h1>
                </header>
                <div>
                    <h3>Select User</h3>
                    <div>
                        {users.map((user) => (
                            <UserCard 
                                key={user.userId} 
                                user={user} 
                                onUserClick={(userId) => console.log(`User clicked: ${userId}`)}
                            />
                        ))}
                    </div>
                </div>
                <div className="card-cnt">
                    {games.map((game) => (
                            <GameCard
                            key={game.gameId}
                            game={game}
                            onGameClick={(gameId) => console.log(`Game clicked: ${gameId}`)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Games;