import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';
import GameList from './pages/GameList';
import Cart from './pages/Cart';
import FriendList from './pages/FriendList';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import Header from './layout/Header';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/mygames" element={<GameList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/friends" element={<FriendList />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  )
}

export default App
