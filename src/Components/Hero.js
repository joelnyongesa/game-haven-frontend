import Button from './Button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-row justify-between h-2/6 p-10 m-10'>
        <div className='flex flex-col justify-center content-evenly w-3/6'>
            <h1 className='text-3xl font-bold py-5'>Add your Games, Review Games, and More...</h1>
            <p className='py-10'>
                Tell us what games you are playing, and review other user's games ON THE FLY
            </p>
            <div>
                <Link to='/signup'>
                    <Button content="Sign Up and Get Started"/>
                </Link>                
            </div>
            
        </div>
        <div className='w-3/6'>
            <img className='object-contain h-450 w-680 rounded-md' src='https://img.freepik.com/free-photo/futuristic-video-game-equipment-illuminated-nightclub-generative-ai_188544-32105.jpg?t=st=1698916385~exp=1698919985~hmac=9483e7563313e74cf27d70d338fef8e8bbb9aeb373b99e2a6110df8c3b09f538&w=1060' alt='Gaming son'/>
        </div>
    </div>
  )
}

export default Hero