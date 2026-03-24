import Navbar from './Components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Calidad from './Pages/Calidad'
import Contaminantes from './Pages/Contaminantes'
import MiUbicacion from './Pages/Ubicacion'
import Glosario from './Pages/Glosario'
import Inicio from './Pages/Inicio'
import Cargando from './Animation/Cargando'
import {useEffect,useState} from 'react'


function App() {

  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=-12.04&longitude=-77.03&hourly=pm2_5,pm10')
      .then(response => response.json())
      .then(data => setData(data))
  }, [])




  return (
    <BrowserRouter>
      <Navbar />
      {data ? (
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/calidad' element={<Calidad pm25={data.hourly.pm2_5} />} />
          <Route path='/contaminantes' element={<Contaminantes />} />
          <Route path='/mi-ubicacion' element={<MiUbicacion />} />
          <Route path='/glosario' element={<Glosario />} />
        </Routes>
      ) : (
        <Cargando />
      )}
    </BrowserRouter>
  )
}

export default App
