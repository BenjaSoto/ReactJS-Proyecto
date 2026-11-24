import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from "./components/layout/Layout";
import { ItemListContainer } from './components/Items/ItemListContainer'
import { DetalleItemContainer } from './components/DetalleItems/DetalleItemContainer'
import Carrito from './components/Carrito/Carrito'
import Login from './components/Auth/Login'
import Registro from './components/Auth/Registro'
import RutaProtegida from './components/Auth/RutaProtegida'
import Panel from './components/Panel/Panel'
import Contacto from './components/Contacto/Contacto'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<h1>Inicio</h1>}/>
        <Route path='/productos' element={<ItemListContainer Mensaje="Productos"/>}/>
        <Route path='/producto/:idProducto' element={<DetalleItemContainer />}/>
        <Route path='/carrito' element={<Carrito />}/>
        <Route path='/contactos' element={<Contacto />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/registro' element={<Registro />}/>
        <Route
          path='/panel'
          element={
            <RutaProtegida rolesPermitidos={['admin']}>
              <Panel />
            </RutaProtegida>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
