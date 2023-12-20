import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
  let [filtered, setFiltered] = useState([]);

  const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
  const options = {
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': '4ed77555e6mshfb74e64fc8b5304p106c81jsna7db2ec7d911',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
  };

  const getGames = async () => {
    
    try {

      const response = await fetch(url, options);
      const data = await response.json();
      setRespData(data);
      setFiltered(data);

    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getGames();
  }, []);

  const handleSearch = (text) => {
    const filteredGames = respData.filter((item) => item.title.toLowerCase().includes(text));
    setFiltered(filteredGames)
    console.log(text);
    console.log(filteredGames);
  }

  return (
    <>
      <Header onChange={handleSearch} />
      <Routes>
        <Route path="/" element={<Home games={filtered} tags={tags}/>} />
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
