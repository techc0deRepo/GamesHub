import { useState, useEffect } from "react";
import GameCard from "../components/GameCard";

function Home() {
    const [respData, setRespData] = useState([]);
    const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4ed77555e6mshfb74e64fc8b5304p106c81jsna7db2ec7d911',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    useEffect(() => {
        try {
            fetch(url, options)
              .then((response) => response.json())
              .then((data) => setRespData(data))
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <>
            <aside id="aside-cnt">
                <h5>TAGS</h5>
            </aside>
            <div className="container">
                <header>
                    <h2>Playing <span className="color-effect">Games</span> Should be free!</h2>
                    <h5>Follow me on social media to stay tuned on more projects</h5>
                </header>
                <div className="card-cnt" id="cnt">
                    {respData.map((item) => {
                        return (
                            <GameCard key={item.id} {...item} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Home;