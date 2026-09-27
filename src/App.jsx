import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Layout from "./components/layout/Layout";
import { ItemListContainer } from './components/Items/ItemListContainer'
import { DetalleItemContainer } from './components/DetalleItems/DetalleItemContainer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Layout>
        <DetalleItemContainer idProducto={2}/>
        <ItemListContainer Mensaje="Nuestros productos destacados"/>
      </Layout>
    </>
  )
}

export default App
