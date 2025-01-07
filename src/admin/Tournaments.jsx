import { useState, useEffect } from "react";
import TournamentCard from "../components/TournamentCard";
import UserCard from "../components/UserCard";

const USERS_URL = "http://localhost:8080/api/users";
const TOURNAMENTS_URL = "http://localhost:8080/api/tournaments"
const USERTOURNAMENTS_URL = "http://localhost:8080/api/users/tournaments"

function Tournaments() {

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [userTournaments, setUserTournaments] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedTournament, setSelectedTournament] = useState(null);

    useEffect(() => {
        fetchUsersAndTournaments();
    }, []);

    const handleSelectedTournamentId = (tournamentId) => {
        console.log(`Selected TournamentId: ${tournamentId}`);
        setSelectedTournament(tournamentId);
    }

    const handleSelectedUserId = (userId) => {
        console.log(`Selected UserId: ${userId}`);
        setSelectedUserId(userId);
    }

    /*** 
     * 
     * API
     * 
     * ***/

    const fetchUserTournaments = async (userId) => {
        try {
          const response = await fetch(`${USERTOURNAMENTS_URL}/${userId}`, { method: "GET" });
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);
          setUserTournaments(data);
        } catch (error) {
          console.error("Error fetching user tournaments:", error);
        }
    };

    const fetchUsersAndTournaments = async () => {

        setLoading(true);

        try {

            const [usersResponse, tournamentsResponse] = await Promise.all([
                fetch(USERS_URL, { method: "GET" }),
                fetch(TOURNAMENTS_URL),
            ]);

            if (!usersResponse.ok || !tournamentsResponse.ok) {
                throw new Error(
                    `Failed to fetch: ${
                        !usersResponse.ok ? "users" : "tournaments"
                    }`
                );
            }

            const usersData = await usersResponse.json();
            const tournamentsData = await tournamentsResponse.json();

            console.log(usersData);
            console.log(tournamentsData);

            setUsers(usersData);
            setTournaments(tournamentsData);

        } catch (error) {
            console.error("Error fetching data:", error);
            handleError(error);
        } finally {
            setLoading(false);
        }
    }

    /*** 
     * 
     * ERROR
     * 
     * ***/

    const handleError = (error) => {
        setError(true);
        console.log(error.toString());
        setErrorMsg(error.toString());
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
            <h1 className="roboto">{errorMsg}</h1>
        </div>
        </>
    )

    return (
        <>
            <div className="box-container">
                <h1>Users</h1>
                <div className="cnt center gap-1 wrap">
                    {users.map((user) => (
                                    <UserCard 
                                        selected={selectedUserId}
                                        key={user.userId} 
                                        user={user} 
                                        onUserClick={(userId) => handleSelectedUserId(userId)}
                                    />
                    ))}
                </div>
                <h1>Tournaments</h1>
                <div className="cnt center gap-1 wrap">
                    {tournaments.map((tournament) => (
                            <TournamentCard
                                selected={selectedTournament}
                                key={tournament.tournamentId}
                                tournament={tournament}
                                onTournamentClick={(tournamentId) => handleSelectedTournamentId(tournamentId)}
                            />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Tournaments;