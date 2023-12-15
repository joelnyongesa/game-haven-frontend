import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"


function Landing({ user, setUser }) {
    
  return (
    <div>
        <Navbar user={user} setUser={ setUser } />
        <Outlet />
    </div>
  )
}

export default Landing