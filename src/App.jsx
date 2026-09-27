import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Layout from "./components/layout/Layout";
import { ItemListContainer } from './components/Items/ItemListContainer'
import { DetalleItemContainer } from './components/DetalleItems/DetalleItemContainer'
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<h1>Inicio</h1>}/>
          <Route path='/productos' element={<ItemListContainer/>}/>
          <Route path='/producto/:idProducto' element={<DetalleItemContainer />}/>
        </Route>
      </Routes>

    </>
  )
}

export default App
