import ReactStars from 'react-rating-stars-component'
import {MdEdit, MdDeleteOutline} from 'react-icons/md'
import { useState } from 'react'
import UpdateReviewForm from './UpdateReviewForm'

function GameReviews({ reviews, user, game, onDelete }) {
    const [showEditReview, setShowEditReview] = useState(false)


    function toggleEditReview(){
        setShowEditReview((prev)=> !prev)
        console.log(showEditReview);
    }

    function handleDeleteReview(id){
        fetch(`https://game-haven-backend.onrender.com/game-reviews/${id}`,{
            method: "DELETE"
        })
        .then(onDelete(id))
        .catch(e=>console.log(e))
    }


    const allReviews = reviews ? reviews.map((review)=>(
        <div key={review.id}>
            <span className='flex flex-row justify-between'>
                <p className='text-sm text-platinum'>{review.user.username}</p>
                {user.username === review.user.username ? 
                <span className='flex justify-between'>
                    <MdEdit className='mr-5 cursor-pointer text-xl' onClick={toggleEditReview}/>
                    <MdDeleteOutline className='mr-2 cursor-pointer text-xl' onClick={()=>{handleDeleteReview(review.id)}} />
                </span>
                :
                <span></span>    
            }
            </span>

            <p>{review.comment}</p>
            <ReactStars count={5} value={(review.rating/2)} isHalf={true} />
            {/* Edit form */}

            {showEditReview && user.username === review.user.username ?
             <UpdateReviewForm review={review} user={user} game={game} />
             : 
             <span></span>}


            <hr className='w-6/6 my-3'/>
        </div>
    )) : <span>This game has no reviews yet!</span>

  return (
    <div>
        {allReviews}
    </div>
  )
}

export default GameReviews