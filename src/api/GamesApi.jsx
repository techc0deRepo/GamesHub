const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '4ed77555e6mshfb74e64fc8b5304p106c81jsna7db2ec7d911',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

export const getGamesData = async () => {
    
    try {

        const response = await fetch(url, options);
        const data = await response.json();
        return data;

    } catch (error) {

        return error;

    }
}