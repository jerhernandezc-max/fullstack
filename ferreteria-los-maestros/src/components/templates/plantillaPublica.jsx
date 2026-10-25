import { Outlet } from 'react-router-dom'
import Footer from '../organisms/footer'
import Navbar from '../organisms/navbar'

export default function PlantillaPublica() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}