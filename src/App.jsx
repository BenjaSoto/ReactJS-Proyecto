import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Layout from "./components/layout/Layout";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Layout>
        <h1>Hola mundo</h1>
        <p>Mis productos</p>
      </Layout>
    </>
  )
}

export default App
