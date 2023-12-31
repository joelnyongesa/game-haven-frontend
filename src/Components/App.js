import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import Landing from './Landing';
import Home from './Home';
import AllGames from './AllGames';
import Game from './Game'

import {useState, useEffect} from 'react'


function App() {

  const [games, setGames] = useState([])
  const [user, setUser] = useState({})

    useEffect(()=>{
        fetch('https://game-haven-backend.onrender.com/games')
        .then(r => r.json())
        .then(data=>setGames(data))
        .catch(e=> console.log(e))
    }, [])



    useEffect(()=>{
        fetch('https://game-haven-backend.onrender.com/session')
        .then(r=>r.json())
        .then(data => {
          setUser(data)
        })
        .catch(e=>console.log(e))
    },[])

  
  return (
    <div>
      <Routes>
        <Route element={<Landing 
                          user={user} setUser={ setUser}
                         />}>
          <Route path='/' element={<Home />}/>
          <Route path='/home' element={<Home games={games}/>}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/login' element={<Login setUser={ setUser } />}/>
          <Route path='/all-games' element={<AllGames games={games}/>}/>
          <Route path='/all-games/:id' element={<Game user={user} />} />
        </Route>
        
      </Routes>

    </div>
  );
}

export default App;
