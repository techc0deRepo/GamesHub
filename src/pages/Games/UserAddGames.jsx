import GameCard from "../../components/GameCard";

function UserAddGames({games, selectedUserId, selectedGameIds, searchText, filteredGames, onInputChange, onAddClick, onGameClick, onClearClick}) {

    const handleInputText = (text) => {
        onInputChange(text);
    }

    const handleAddUserGames = () => {
        console.log(`Selected UserId: ${selectedUserId}`);
        onAddClick(selectedUserId);
    }

    const handleClickedGame = (gameId) => {
        onGameClick(gameId); 
    }

    const handleClearClick = () => {
        onClearClick();
    }



    return (
        <>
            <div className="box-container">

                <h3>Add new Game to the User: {selectedUserId}</h3>
                    <div className="cnt start h-center gap-1_5 ms">
                        <div className="search-cnt">
                            <input type="text" className="search-input" onChange={(e) => handleInputText(e.target.value.toLowerCase())}/>
                        </div>
                            <button className="button" type="button" onClick={handleAddUserGames}>ADD GAMES</button>
                            <button className="button" type="button" onClick={handleClearClick}>CLEAR</button>
                    </div>
                    <h6> {[...selectedGameIds].map((id) => (
                            games.find((game) => game.gameId === id) ? (
                                <span className="px-2 border-2 border-indigo-700" key={id}>
                                {games.find((game) => game.gameId === id).title}
                                </span>
                            ) : null
                        ))}
                    </h6>
                    <div className="card-cnt">
                    {searchText != null && searchText.length>1 && searchText != '' ? (
                        <>
                            {filteredGames.map((game) => (
                                <GameCard
                                    key={game.gameId}
                                    game={game}
                                    onGameClick={(gameId) => handleClickedGame(gameId)}
                                    selected={selectedGameIds}
                                />
                            ))}
                        </>
                    ) : 
                        <>
                            {games.map((game) => (
                                <GameCard
                                    key={game.gameId}
                                    game={game}
                                    onGameClick={(gameId) => handleClickedGame(gameId)}
                                    selected={selectedGameIds}
                                />
                            ))}
                        </>
                    }

                </div>
            </div>
        </>
    )
}

export default UserAddGames;