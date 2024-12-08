import { useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";

const GameCard = ({ game, onGameClick }) => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
      setClicked(!clicked);
      if (onGameClick) {
        onGameClick(game.gameId); // Call the click handler passed as a prop
      }
    };

    return (
        <>
            <div className={!clicked?"card":"card selected"} onClick={handleClick}>
                <LazyLoadImage 
                    src={game.thumbnail} width={320} height={200} alt="Image Alt" 
                    className={!clicked?"image":"image selected"} 
                />
                <div className="game-desc hidden">
                    <h4>{game.title}</h4>
                    <p>{game.description}</p>
                    <span>{game.releaseDate}</span>
                    <button type="button" className="button">Go to website</button>
                </div>
            </div>
        </>
    )
};

export default GameCard;