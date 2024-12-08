import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import User from './pages/User';
import Games from './pages/Games';
import Cart from './pages/Cart';
import FriendList from './pages/FriendList';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import Header from './layout/Header';
import './style/theme.css'

const GAMES_URL = "http://localhost:8080/api/games";

function App() {

  const [respData, setRespData] = useState([]);
  const [tags, setTags] = useState(new Set());
  const [clickedTags, setClickedTags] = useState(new Set());
  const [searchText, setSearchText] = useState("");
  const [filtered, setFiltered] = useState([]);

  const handleData = (data) => {
    setRespData(data);
    setFiltered(data);
    let tagSet = new Set();
    data.map(item => tagSet.add(item.genre));
    setTags(tagSet);
  }

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await fetch(GAMES_URL, { method: "GET" });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      handleData(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  
  const setText = (text) => setSearchText(text); 
  const setFilters = (filters) => setClickedTags(filters);

  useEffect(() => {

    let filteredGames = respData;

    if (searchText.length !== 0){
      filteredGames = respData.filter((item) => item.title.toLowerCase().includes(searchText));
    }

    if(clickedTags.size !== 0) {
      let array = [];
      filteredGames.forEach(item => {
          if (clickedTags.has(item.genre)){
              array.push(item);
          }
      });
      filteredGames = array;
    }

    filteredGames.sort((a,b) => {
      return a.title - b.title
    });

    setFiltered(filteredGames);
  }, [clickedTags, searchText]);

  return (
    <>
      <Header onChange={setText} />
      <Routes>
        <Route path="/" element={<Home games={filtered} tags={tags} tagStatusChange={setFilters}/>} />
        <Route path="/user" element={<User />} />
        <Route path="/mygames" element={<Games />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/friends" element={<FriendList />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  )
}

export default App
