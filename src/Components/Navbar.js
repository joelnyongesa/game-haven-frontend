import Button from "./Button"
import { Link, useNavigate } from "react-router-dom"
import {useSnackbar} from "notistack"
import {useState} from 'react'

function Navbar({ user  }) {
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar();


    function handleHeaderClick(){
        navigate('/home')
    }

    function handleLogOutClick(){
        fetch('/logout',
        {
            method: "DELETE"
        })
        .then(()=>{
            enqueueSnackbar("Logged out successfully!", {variant: "success"});
            navigate('/')})
        .catch(e=>console.log(e))

    
    }

  return (
    <nav 
        className='flex flex-row justify-between p-10'
    >
        <div></div>
        <h1 className='text-3xl font-bold' onClick={handleHeaderClick}>Game<span className="text-platinum">Haven</span></h1>

        {user.username ? 
            <section className='flex flex-row justify-end '>
                <Button content={`Welcome, ${user.username}`} className='py-1 border-none hover:bg-rich-black  hover:text-platinum'/>
                <Button onClick={handleLogOutClick} content="Log out" className='py-1'/>           
        </section> :
        <section className='flex flex-row justify-end '>
            <Link to='/signup'>
                <Button content="Sign Up"className='py-1'/>
            </Link>
            <Link to='/login'>
                <Button content="Log In" className='py-1'/>
            </Link>            
        </section>
        }
        {/* <section className='flex flex-row justify-end '>
            <Link to='/signup'>
                <Button content="Sign Up"className='py-1'/>
            </Link>
            <Link to='/login'>
                <Button content="Log In" className='py-1'/>
            </Link>            
        </section> */}
    </nav>
  )
}

export default Navbar