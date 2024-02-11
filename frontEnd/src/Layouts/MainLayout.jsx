import { Outlet } from "react-router-dom"
import Navbar from "../CommonComponents/Navbar"

function MainLayout() {

  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  )
}

export default MainLayout
