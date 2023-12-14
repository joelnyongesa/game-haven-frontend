import Button from "./Button"

function GameCard({ games }) {
    const gameCard = games && games.slice(0,6).map((game)=>(
        <div key={game.id} className='max-w-sm rounded overflow-hidden m-10 w-1/6'>
            <img className='w-full h-400' src={game.image_url} alt={game.title}/>
            <div className='flex flex-col items-start my-3'>
                <h1 className='font-bold text-sm'>{game.title}</h1>
                <p className='text-sm'>{game.description}</p>
                <div className="w-20px">
                    <Button content="View more..." className='text-sm my-3 px-2 py-1 mx-auto'/>
                </div>
                
            </div>
        </div>
    ))
  return (
    <>
        <h1 className="text-2xl font-bold text-center">Games in our collection</h1>
        <div className='flex flex-row flex-wrap justify-center'>
            {gameCard}
        </div>
    </>
    
  )
}

export default GameCard