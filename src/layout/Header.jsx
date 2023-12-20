import Sidebar from "./Sidebar";
import { useState } from "react";

function Header({onChange}) {
    const [hidden, setHidden] = useState(true);

    return (
        <nav>
            <span className="color-effect">Games</span>
            <div className="search-cnt">
                <button id="btn" className="search-btn" type="button">
                    <i className="search-icon"></i>
                </button>
                <input type="text" className="search-input" onChange={(e) => onChange(e.target.value.toLowerCase())}/>
            </div>
            <div id="menu" className={hidden?"menu-btn":"menu-btn change"} onClick={() => setHidden(!hidden)}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            <Sidebar hidden={hidden} />
        </nav>
    )
}

export default Header;