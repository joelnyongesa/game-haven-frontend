import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {MdReviews, MdAddCircleOutline} from 'react-icons/md'
import GameReviews from './GameReviews'
import {motion} from 'framer-motion'
import AddReviewForm from './AddReviewForm'



function Game({ user }) {
    const [game, setGame] = useState([])
    const [showReviews, setShowReviews] = useState(false)
    const [showReviewForm, setShowReviewForm] = useState(false)
    const [gameReviews, setGameReviews] = useState()
    const [gameReviewsCount, setGameReviewsCount] = useState()

    

    let {id} = useParams()

    useEffect(()=>{
        fetch(`https://game-haven-backend.onrender.com/games/${id}`)
        .then(r=>r.json())
        .then(data=>{
            setGame(data);
            setGameReviews(prevGameReviews => data.game_reviews ? data.game_reviews : []);
            setGameReviewsCount(prevCount => data.game_reviews ? data.game_reviews.length : 0);
        })
        .catch(e=>console.log(e))
    }, [id])

    // const gameReviewsCount = game.game_reviews ? game.game_reviews.length : 0;

    // const gameReviews = game.game_reviews ? game.game_reviews : []
    // console.log(gameReviews);

    const gameGenres = game.game_genres ? game.game_genres.map(genre => genre.genre.name) : [];

    // console.log(game);

    // To show the reviews
    function toggleReviews(){
        setShowReviews((showReviews) => !showReviews)
    }

    function toggleReviewForm(){
        setShowReviewForm((showReviewForm)=> !showReviewForm)
    }

    const genres = gameGenres.length > 0 ? (
        gameGenres.map((genre, index)=>(
            <span key={index}
                className='inline-block bg-platinum rounded-full text-sm font-semibold text-rich-black mr-2 mb-2 px-1'
            >#{genre}</span>
        )
    )) : (
        <span></span>
    )

    // Handle animations
    const variants = {
        visible: {opacity: 1, x:5, transition: {type: "spring", stiffness:100}},
        hidden: {opacity: 0, transition: {type: "spring", stiffness:100}}
    }

    // Update the reviews
    function handleUpdateReviews(review){
        setGameReviews([...gameReviews, review])
        setGameReviewsCount(prevCount => prevCount+1);
    }


    function updateReviewsOnDelete(deletedReview){
        setGameReviews(gameReviews.filter((review)=> review.id !== deletedReview))
    }

  return (
    <div className='w-screen max-w-lg rounded overflow-hidden p p-10 mx-auto'>
        <img src={game.image_url} alt={game.name} />
        <h1 className='text-xl font-bold my-3'>Game Description</h1>
        <p className='mb-3'>{game.description}</p>
        <span className='flex mb-5 cursor-pointer' onClick={toggleReviews}>
            <MdReviews className='text-2xl mx-3 ' />
            <p>{gameReviewsCount }</p>
        </span>
        <motion.div
            variants={variants}
            animate={showReviews ? "visible": "hidden"}
        >
            {showReviews && <GameReviews reviews={gameReviews} user={user} game={game} onDelete={updateReviewsOnDelete}/>}
        </motion.div>
        <span className='flex mb-5 cursor-pointer' onClick={toggleReviewForm}>
            <MdAddCircleOutline className='text-2xl mx-3 cursor-pointer'/>Add a Review
        </span>
        <motion.div
            variants={variants}
            animate={showReviewForm ? "visible": "hidden"}
        >
            {showReviewForm && <AddReviewForm user={user} game={game} handleUpdateReviews={handleUpdateReviews}/>}
        </motion.div>
        <div>
            {genres}
        </div>
        
    </div>
  )
}

export default Game