function Header() {
    return (
        <nav>
            <span className="color-effect">Games</span>
            <div className="search-cnt">
                <button id="btn" className="search-btn" type="button">
                    <i className="search-icon"></i>
                </button>
                <input type="text" className="search-input" />
            </div>
            <div id="menu" class="menu-btn">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
            </div>
        </nav>
    )
}

export default Header;