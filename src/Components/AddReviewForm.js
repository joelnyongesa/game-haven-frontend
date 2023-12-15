import React from 'react'
import Button from './Button';
import {useState} from 'react'
import { useSnackbar } from 'notistack';

function AddReviewForm({ user, game, handleUpdateReviews}) {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState();

    const {enqueueSnackbar} = useSnackbar();

    function handleAddReview(e){
        e.preventDefault();
        const new_review = {
            rating: rating,
            comment: comment,
            user_id: user.id,
            game_entry_id: game.id
        }

        fetch('https://game-haven-backend.onrender.com/game-reviews',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new_review)
        })
        .then(r=>r.json())
        .then(data => {handleUpdateReviews(data);
                        enqueueSnackbar("Comment Addedd successfully!", {variant: "success"})})
        .catch(e=>console.log(e));
        e.target.reset();
    }

  return (
        <form className='flex flex-col' onSubmit={handleAddReview}>
            <div className='mb-3'>
                <label className='mr-3'>Comments</label><br />
                <input required type='text' className='px-2 py-1 text-platinum bg-rich-black border rounded-sm' onChange={(e)=>{setComment(e.target.value)}} />
            </div>
            <div className='mb-3'>
                <label className='mr-3'>Rating</label><br />
                <input required type='number' className='px-2 py-1 text-platinum bg-rich-black border rounded-sm' onChange={(e)=>{setRating(e.target.value)}}/>
            </div>
            <Button type='submit' content='Add Review' className='px-3 py-1 self-center w-2/6 mx-3 mb-2 font-bold text-sm border  border-platinum   bg-rich-black hover:bg-platinum hover:text-rich-black rounded-lg' />
        </form>
  )
}

export default AddReviewForm