import Button from "./Button"
import { Link, useNavigate } from "react-router-dom"
import {useSnackbar} from "notistack"
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";

function Navbar({ user, setUser  }) {
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar();
    const [loading, setLoading] = useState(false);


    function handleHeaderClick(){
        navigate('/home')
    }

    function handleLogOutClick(){
        setLoading(true);
        fetch('https://game-haven-backend.onrender.com/logout',
        {
            method: "DELETE"
        })
        .then(()=>{
            (setUser(null))
            enqueueSnackbar("Logged out successfully!", {variant: "success"});
            navigate('/')
        })
        .catch((e)=>{
            console.error(e);
            enqueueSnackbar("Error logging out", {variant: "error"});
        })
        .finally(()=>{
            setLoading(false);
        })
    }

  return (
    <>
        {loading && (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(255,255,255,0.5)',
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 999,
            }}    
        >
            <TailSpin
                height={100}
                width={100}
                visible
                radius={5}
                ariaLabel="tail-spin-loading"
                color="#ffffff"
            />
        </div>
    )}
        <nav 
            className='flex flex-row justify-between p-10'
        >
            <div></div>
            <h1 className='text-3xl font-bold' onClick={handleHeaderClick}>Game<span className="text-platinum">Haven</span></h1>

            {user && user.username ? 
                <section className='flex flex-row justify-end '>
                    <Button content={`Welcome, ${user.username}`} className='py-1 border-none hover:cursor-default  hover:text-platinum'/>
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
        </nav>
    </>

  )
}

export default Navbar