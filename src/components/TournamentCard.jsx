import { height } from '@fortawesome/free-brands-svg-icons/fa42Group';
import { useState } from 'react';

const TournamentCard = ({ selected, tournament, onTournamentClick }) => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
      setClicked(!clicked);
      if (onTournamentClick) {
        onTournamentClick(tournament.tournamentId); // Call the click handler passed as a prop
      }
    };

    const handleAddParticipant = () => {
        console.log("add participant clicked");
    };

    const handleRemoveParticipant = () => {
        console.log("remove participant clicked");
    };

    return (
        <>
            <div className={selected == tournament.tournamentId?"card trn selected":"card trn"} onClick={handleClick}>
                <h2>{tournament.title}</h2>
                <div className='tournament-cnt'>
                    <a href={tournament.game.gameUrl} target="_blank" rel="noopener noreferrer">
                        <img src={tournament.game.thumbnail} alt={tournament.game.title} />
                    </a>
                    <div>
                        <p><strong>Game:</strong> {tournament.game.title} ({tournament.game.platform})</p>
                        <div className='desc-cnt'>
                            <p><strong>Description:</strong> {tournament.description}</p>
                        </div>
                        <div className='detail'>
                            <p><strong>Start Date:</strong> {tournament.startDate}</p>
                            <p><strong>Max Participants:</strong> {tournament.maxParticipants}</p>
                        </div>
                        <div className='fee-cnt'>
                            <div className='fee'>
                                <p><strong>Entry Fee:</strong></p>
                                <span>€ {tournament.entryFee}</span>
                            </div>
                            <p className='prize'><strong>Prize:</strong> <span>€ {tournament.priceWin}</span></p>
                        </div>
                    </div>
                </div>
                <div className='tournament-actions'>
                    <button className='button' type='button' onClick={handleAddParticipant}>Add</button>
                    <button className='button' type='button' onClick={handleRemoveParticipant}>Remove</button>
                </div>
            </div>
        </>
    )
};

export default TournamentCard;