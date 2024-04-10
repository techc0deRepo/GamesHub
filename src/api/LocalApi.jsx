const USER_URL = 'http://localhost:8080/api/users';
const GAMES_URL = "http://localhost:8080/api/games";
const GET = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
};

export const getUsers = async () => {
    
    return fetch(USER_URL, GET);
}


export const getGames = async () => {

    return fetch(GAMES_URL, GET)
}