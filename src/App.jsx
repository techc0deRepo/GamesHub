import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getGamesData } from './api/GamesApi';
import Home from './pages/Home';
import User from './pages/User';
import GameList from './pages/GameList';
import Cart from './pages/Cart';
import FriendList from './pages/FriendList';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import Header from './layout/Header';

function App() {

  const [respData, setRespData] = useState([]);
  const [tags, setTags] = useState(new Set());
  const [filtered, setFiltered] = useState([]);

  const handleData = (data) => {

    setRespData(data);
    setFiltered(data);
    let tagSet = new Set();
    data.map(item => tagSet.add(item.genre));
    setTags(tagSet);
    console.log(tags);

  }

  useEffect(() => {

    getGamesData().then((result) => handleData(result));
  
  }, []);

  const handleSearch = (text) => {
    const filteredGames = respData.filter((item) => item.title.toLowerCase().includes(text));
    setFiltered(filteredGames)
    console.log(text);
    console.log(filteredGames);
  }

  const handleTagStatus = (status) => {
    console.log(status);
  }

  return (
    <>
      <Header onChange={handleSearch} />
      <Routes>
        <Route path="/" element={<Home games={filtered} tags={tags} tagStatusChange={handleTagStatus}/>} />
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
