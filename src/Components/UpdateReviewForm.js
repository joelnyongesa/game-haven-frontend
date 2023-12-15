import {useState} from 'react'
import Button from './Button'
import { useSnackbar } from 'notistack';

function UpdateReviewForm({ review, user, game }) {
    const [updatedComent, setUpdatedCommet] = useState(review.comment)
    const [updatedRating, setUpdatedRating] = useState(review.rating)
    const {enqueueSnackbar} = useSnackbar();

    function handleUpdateRating(e){
        e.preventDefault();

        const updatedReview = {
            rating: updatedRating,
            comment: updatedComent,
            user_id: user.id,
            game_entry_id: game.id
        }

        fetch(`https://game-haven-backend.onrender.com/game-reviews/${game.id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedReview)
        })
        .then(r=> r.json())
        .then(data => {
            console.log(data);
            enqueueSnackbar("Review updated successfully!", {variant: "success"})
        })
        .catch(e=> console.log(e));
        e.target.reset();
    }
  return (
    <form onSubmit={handleUpdateRating}>
        <div className='mb-3'>
            <label className='mr-3'>Comments</label><br />
            <input required type='text' className='px-2 py-1 text-platinum bg-rich-black border rounded-sm' onChange={(e)=>{setUpdatedCommet(e.target.value)}}  />
        </div>
        <div className='mb-3'>
            <label className='mr-3'>Rating</label> <br />
            <input required type='number' className='px-2 py-1 text-platinum bg-rich-black border rounded-sm' onChange={(e)=>{setUpdatedRating(e.target.value)}}/>
        </div>
        <Button type='submit' content='Edit Review' className='px-3 py-1 self-center w-2/6 mx-3 mb-2 font-bold text-sm border  border-platinum   bg-rich-black hover:bg-platinum hover:text-rich-black rounded-lg' />
    </form> 
  )
}

export default UpdateReviewForm