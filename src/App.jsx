import { useState } from 'react'
import './App.css'
import MapComponent from './components/MapComponent'
import CardComponent from './components/CardComponent'

function App() {
  const [modalVisibility, setModalVisibility] = useState(" ")
  
  return (
    <>
      <div className={`popup z-10 absolute ${modalVisibility} `}>
        <CardComponent setModalVisibility={setModalVisibility} />
      </div>
      <MapComponent />
    </>
  )
}

export default App
