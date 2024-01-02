import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGamepad, faCartShopping, faUserGroup, faTrophy, faGear } from '@fortawesome/free-solid-svg-icons';

function Sidebar({hidden}) {
    return (
        <div id="menuCnt" className={hidden?"menu-cnt":"menu-cnt show"}>
            <div id="menuList" className={hidden?"menu-list":"menu-list show"}>
                <a href="#"><FontAwesomeIcon icon={faUser} /><span>User</span></a>
                <a href="#"><FontAwesomeIcon icon={faGamepad} /><span>My Games</span></a>
                <a href="#"><FontAwesomeIcon icon={faCartShopping} /><span>My Cart</span></a>
                <a href="#"><FontAwesomeIcon icon={faUserGroup} /><span>Friends</span></a>
                <a href="#"><FontAwesomeIcon icon={faTrophy} /><span>Achievements</span></a>
                <a href="#"><FontAwesomeIcon icon={faGear} /><span>Settings</span></a>
            </div>
        </div>
    )
}

export default Sidebar;