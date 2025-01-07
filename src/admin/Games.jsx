import { useState, useEffect } from "react";
import UserShowGames from "../pages/Games/UserShowGames";
import UserAddGames from "./Games/UserAddGames";

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
    const [searchText, setSearchText] = useState("");
    const [filteredGames, setFilteredGames] = useState([]);
    const [refreshData, setRefreshData] = useState();

    useEffect(() => {
        fetchUsersAndGames();
    }, []);

    const resetActions = () => {
        const freshSet = new Set();
        setSelectedGamesIds(freshSet);
        fetchUserGames(selectedUserId);
        fetchUsersAndGames();
    }

    const handleSelectedUserId = (userId) => {
        console.log(`Selected UserId: ${userId}`);
        setSelectedUserId(userId);
        fetchUserGames(userId);
    }

    const setText = (text) => {
        console.log(text);
        setSearchText(text);
        let filteredGamesData = games.filter((item) => item.title.toLowerCase().includes(text))
        console.log(filteredGamesData);
        setFilteredGames(filteredGamesData);
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

    const handleResetClickedGames = () => {
        const newGames = new Set();
        setSelectedGamesIds(newGames);
    }

    useEffect(() => {

        let filteredGamesData = filteredGames;
    
        if (searchText.length !== 0){
          filteredGamesData = filteredGames.filter((item) => item.title.toLowerCase().includes(searchText));
        }
    
        setFilteredGames(filteredGamesData);
    }, [searchText]);

    const handleRefreshFetch = () => {
        setRefreshData(true);
    }

    useEffect(() => {
        if (selectedUserId != null) {
            fetchUserGames(selectedUserId);
        }
    }, [refreshData]);
    
    /*** 
     * 
     * API
     * 
     * ***/

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
                    console.log("Added Success!");
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            }
        } catch (error) {
        console.error("Error adding user:", error);
        } finally {
            resetActions();
            handleResetClickedGames();
            setFilteredGames(games);
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

    /*** 
     * 
     * ERROR
     * 
     * ***/

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
                <UserShowGames 
                    users={users}
                    userGames={userGames}
                    selectedUserId={selectedUserId}
                    onUserClick={(userId) => handleSelectedUserId(userId)}
                    refreshFetch={() => handleRefreshFetch()}
                    onRemoveGames={(removedGames) => setUsersGames(removedGames)}
                />
                <UserAddGames 
                    games={games}
                    selectedUserId={selectedUserId} 
                    selectedGameIds={selectedGameIds}
                    searchText={searchText}
                    filteredGames={filteredGames}
                    onInputChange={(text) => setText(text)}
                    onAddClick={handleAddUserGames} 
                    onGameClick={handleClickedGame}
                    onClearClick={resetActions}
                />
            </div>
        </>
    )
}

export default Games;