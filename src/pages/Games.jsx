import { useState, useEffect } from "react";
import GameCard from "../components/GameCard";
import UserCard from "../components/UserCard";

const USERS_URL = "http://localhost:8080/api/users";
const GAMES_URL = "http://localhost:8080/api/games";
const USERGAMES_URL = "http://localhost:8080/api/users/games"

function Games() {

    const [users, setUsers] = useState([]);
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [userGames, setUsersGames] = useState([]);
    const [selectedGameIds, setSelectedGamesIds] = useState(new Set());

    useEffect(() => {
        fetchUsersAndGames();
    }, []);

    const resetActions = () => {
        setSelectedGamesIds(new Set());
        fetchUserGames(selectedUserId);
    }

    const handleSelectedUserId = (userId) => {
        console.log(`Selected UserId: ${userId}`);
        setSelectedUserId(userId);
        fetchUserGames(userId);
    }

    const fetchUserGames = async (userId) => {
        try {
          const response = await fetch(`${USERGAMES_URL}/${userId}`, { method: "GET" });
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);
          setUsersGames(data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

    const handleClickedGame = (gameId) => {
        const updatedGames = new Set(selectedGameIds);

        if (updatedGames.has(gameId)){
            updatedGames.delete(gameId);
        } else {
            updatedGames.add(gameId);
        }
        console.log(updatedGames);
        setSelectedGamesIds(updatedGames);
    }

    // Add userGames
    const handleAddUserGames = async () => {
        try {
            if (selectedUserId == null) {
                alert("NO USER SELECTED!");
            } else {
                const response = await fetch(`${USERGAMES_URL}/${selectedUserId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify([...selectedGameIds]),
                });
                if (response.ok) {
                    resetActions();
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            }
        } catch (error) {
        console.error("Error adding user:", error);
        }
    };

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
                                selected={selectedUserId}
                                key={user.userId} 
                                user={user} 
                                onUserClick={(userId) => handleSelectedUserId(userId)}
                            />
                        ))}
                    </div>
                </div>
                {selectedUserId != null?
                (
                    <>
                        <h3>User Games:</h3>
                        <div className="card-cnt">
                            {userGames.map((game) => (
                                <GameCard
                                key={game.gameId}
                                game={game}
                                onGameClick={(gameId) => console.log(`Game clicked: ${gameId}`)}
                                />
                            ))}
                        </div>
                    </>
                ) : (<></>)}
                <h3>Add new Game to the User {selectedUserId} <button onClick={handleAddUserGames}>ADD GAMES</button></h3>
                <h6> {[...selectedGameIds].map((id) => (
                    
                    games.find((game) => game.gameId === id) ? (
                        <span className="px-2 border-2 border-indigo-700" key={id}>
                          {games.find((game) => game.gameId === id).title}
                        </span>
                    ) : null
                    
                ))}</h6>
                <div className="card-cnt">
                    {games.map((game) => (
                        <GameCard
                        key={game.gameId}
                        game={game}
                        onGameClick={(gameId) => handleClickedGame(gameId)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Games;