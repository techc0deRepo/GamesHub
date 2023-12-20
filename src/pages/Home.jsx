import GameCard from "../components/GameCard";
import Tags from "../layout/Tags";

function Home({games, tags}) {

    return (
        <>
            <Tags {...tags} />
            <div className="container">
                <header>
                    <h2>Playing <span className="color-effect">Games</span> Should be free!</h2>
                    <h5>Follow me on social media to stay tuned on more projects</h5>
                </header>
                <div className="card-cnt" id="cnt">
                    {games.map((item) => {
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