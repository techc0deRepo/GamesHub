import GameCard from "../components/GameCard";
import { useState } from "react";
import Tag from "../layout/Tag";

function Home({games, tags, tagStatusChange}) {

    const [activeTags, setActiveTags] = useState(new Set());

    let tagsArray = [...tags];

    const handleActiveTags = (tag) => {
        const updatedTags = new Set(activeTags);
    
        if (updatedTags.has(tag)) {
          updatedTags.delete(tag); 
        } else {
          updatedTags.add(tag);
        }
    
        setActiveTags(updatedTags);
        tags = [...activeTags];
    };

    const handleTagClick = (status) => {
        tagStatusChange(status);
    };

    return (
        <>
            
            <aside>
                {tagsArray.map((tag,id) => {
                    return (
                        <Tag
                            key={id}
                            name={tag}
                            isActive={activeTags.has(tag)}
                            handleClick={() => handleActiveTags(tag)}
                            tagStatusChange={handleTagClick}
                        />
                    )
                })}
            </aside>
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