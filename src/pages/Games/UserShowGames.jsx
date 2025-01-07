import { useState } from "react";
import GameCard from "../../components/GameCard";
import UserCard from "../../components/UserCard";

const USERGAMES_URL = "http://localhost:8080/api/users/games"

function UserShowGames({users, userGames, selectedUserId, onUserClick, onRemoveGames}) {

    const [selectedGameIds, setSelectedGamesIds] = useState(new Set());

    const handleSelectedUserId = (userId) => {
        console.log(`Selected UserId: ${userId}`);
        onUserClick(userId);
    }

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

    const removeGames = () => {
        // delete userGames from selectedSet
        const filteredGames = userGames.filter((game) => !selectedGameIds.has(game.gameId));
        console.log(filteredGames);
        onRemoveGames(filteredGames);
      };

    const fetchDeleteGames = async () => {
        try {
            if (selectedGameIds == null) {
                alert("NO SELECTED GAMES TO DELETE!");
            } else {
                const response = await fetch(`${USERGAMES_URL}/${selectedUserId}`, {
                    method: "DELETE",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify([...selectedGameIds]),
                });
                if (response.ok) {
                    console.log("Relation Removed Success!");
                    setSelectedGamesIds(new Set());
                    removeGames();
                    console.log(selectedGameIds);
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            }
        } catch (error) {
            console.error("Error adding user:", error);
        }
    }

    return (
        <>
            <div className="box-container">
                <header>
                    <h1 className="roboto-regular">Game Page</h1>
                </header>
                <div>
                    <h3>Select User</h3>
                    <div className="cnt start gap-1 wrap">
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
                                onGameClick={(gameId) => handleClickedGame(gameId)}
                                selected={selectedGameIds}
                                />
                            ))}
                        </div>
                        <div className="cnt">
                            <button className="button" onClick={fetchDeleteGames}>DELETE</button>
                        </div>
                    </>
                ) : (<></>)}
            </div>
        </>
    )
}

export default UserShowGames;