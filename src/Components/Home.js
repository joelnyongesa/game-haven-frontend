import Hero from "./Hero"
import GameCard from "./GameCard"
import Footer from "./Footer"


function Home({ games }) {
  return (
    <>
        <Hero />
        <GameCard games={games}/>
        <Footer />
        
    </>
  )
}

export default Home