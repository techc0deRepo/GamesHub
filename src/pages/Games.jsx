import { useState, useEffect } from "react";
import { getGamesData } from "../api/GamesApi";
import GameCard from "../components/GameCard";

function Games() {

    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleGames = (data) => {
        console.log(data);
        setGames(data);
        setLoading(false);
    }

    const handleError = (error) => {
        setError(error);
        setLoading(false);
        console.log(error);
    }
    
      useEffect(() => {
        getGamesData()
            .then(data => handleGames(data))
            .catch((error) => handleError(error));
      }, []);

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
            <h1>Error 404</h1>
        </div>
        </>
    )

    return (
        <>
            <div className="box-container">
                <header>
                    <h1>Game Page</h1>
                </header>
                <div className="card-cnt">
                    {games.map((game,id) => {
                        return (
                            <GameCard
                                key={id}
                                gameId={game.gameId}
                                firstName={game.firstName}
                                lastName={game.lastName}
                                gamename={game.gamename}
                                password={game.password}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Games;