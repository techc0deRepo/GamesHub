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

const addUser = async (user) => {
    const ADD = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    };

    const response = await fetch(USER_URL, ADD);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

const updateUser = async (user) => {
    const UPDATE = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    };

    const response = await fetch(`${USER_URL}/${user.id}`, UPDATE);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

const deleteUser = async (userId) => {
    const DELETE = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(`${USER_URL}/${userId}`, DELETE);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

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


export { addUser, updateUser, deleteUser };