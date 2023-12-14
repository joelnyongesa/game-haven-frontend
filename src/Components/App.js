import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import Landing from './Landing';
import Home from './Home';
import AllGames from './AllGames';
import Game from './Game'
import {motion} from "framer-motion"

import {useState, useEffect} from 'react'


function App() {

  const [games, setGames] = useState([])
  const [user, setUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(()=>{
        fetch('/games')
        .then(r => r.json())
        .then(data=>setGames(data))
        .catch(e=> console.log(e))
    }, [])

    // console.log(games);


    useEffect(()=>{
        fetch('/session')
        .then(r=>r.json())
        .then(data => {
          setUser(data)
          setIsLoggedIn(!isLoggedIn)
        })
        .catch(e=>console.log(e))
    }, [])

    // console.log(games)
    // console.log(user)
    // console.log(isLoggedIn);
  
  return (
    <div>
      <Routes>
        <Route element={<Landing 
                          user={user}
                         />}>
          <Route path='/' element={<Home />}/>
          <Route path='/home' element={<Home games={games}/>}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/all-games' element={<AllGames games={games}/>}/>
          <Route path='/all-games/:id' element={<Game user={user} />} />
        </Route>
        
      </Routes>

    </div>
  );
}

export default App;
