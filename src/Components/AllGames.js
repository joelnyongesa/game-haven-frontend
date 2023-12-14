import React from 'react'
import Button from './Button'
import {useState} from 'react'
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'

function AllGames({ games }) {

    // const [gameID, setGameID]
    // const [game, setGame] = useState([]);
    // const navigate = useNavigate();

    // function handleCardClick(gameID){
    //     navigate(`all-games/${gameID}`)
    // }

    // function fetchOneGame(id){
    //     fetch(`/games/${id}`)
    //     .then(r=>r.json())
    //     .then(data=>setGame(data))
    //     .then(navigate(`/all-games/:${id}`))
    //     .catch(e=>console.log(e))
    // }

    const gameCard = games.map((game)=>(
        
            <motion.div 
                key={game.id} 
                className='max-w-sm rounded overflow-hidden m-10 w-1/6 hover:scale-110 duration-300' 
                initial={{opacity: 0.5, scale:0.9}}
                whileInView={{opacity: 1, scale:1}}
                transition={{duration: 0.3, delay: 0.3}}
            >
                <Link to={`/all-games/${game.id}`}>
                    <img className='w-full h-400' src={game.image_url} alt={game.title} loading='lazy'/>
                    <div className='flex flex-col items-start my-3'>
                        <h1 className='font-bold text-sm'>{game.title}</h1>
                        <p className='text-sm'>{game.description}</p>
                        <div className="w-20px">
                            <Button content="Game reviews" className='text-sm my-3 px-2 py-1 mx-auto'/>
                        </div>                        
                    </div>
                </Link>
            </motion.div>
        
        
    ))

  return (
    <div>
        <h1 className='text-3xl font-bold text-center'>All Games</h1>
        <div className='flex flex-row flex-wrap justify-center'>
            {gameCard}
        </div>
    </div>
  )
}

export default AllGames