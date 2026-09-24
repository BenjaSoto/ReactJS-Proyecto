import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Layout from "./components/layout/Layout";
import { ItemListContainer } from './components/Items/ItemListContainer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Layout>
        <h1>Hola mundo</h1>
        <p>Mis productos</p>
        <ItemListContainer Mensaje="Nuestros productos destacados"/>
      </Layout>
    </>
  )
}

export default App
