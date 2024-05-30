const USER_URL = 'http://localhost:8080/api/users';
const GAMES_URL = "http://localhost:8080/api/games";
const CHECKBOX_URL = "http://localhost:8080/api/checkbox";

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

export const getCheckBoxStatus = async (data) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(CHECKBOX_URL, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};