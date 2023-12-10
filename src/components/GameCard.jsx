function GameCard(props) {

    let title = props.title; 
    let desc= props.short_description; 
    let release= props.release_date;
    let thumb= props.thumbnail;

    return (
        <>
            <div className="card">
                <img src={thumb} className="image" />
                <div className="game-desc hidden">
                    <h4>{title}</h4>
                    <p>{desc}</p>
                    <span>{release}</span>
                    <button type="button" className="button">Go to website</button>
                </div>
            </div>
        </>
    )
}

export default GameCard;