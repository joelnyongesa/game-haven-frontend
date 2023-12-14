import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"


function Landing({ user }) {
    
  return (
    <div>
        <Navbar user={user} />
        <Outlet />
    </div>
  )
}

export default Landing