import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import CounterTiles from './components/CounterTiles'

function App() {


  return (
    <>
        <Header />
        <CounterTiles />
    </>
  )
}

export default App
