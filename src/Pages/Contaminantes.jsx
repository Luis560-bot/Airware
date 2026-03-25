import React from 'react'

import { BiSolidConfused } from "react-icons/bi";

const Contaminantes = () => {
  return (
     <div className="pt-20 sm:pt-20">
        <h1 className="text-4xl font-bold mt-2 text-center fade-in">
          ¿Alguna vez te preguntaste como se contamina el aire?
          <BiSolidConfused size={40} className='block mx-auto mt-4 fade-in'/>
        </h1>
        <p className="text-lg text-center mt-4 fade-in">
          Aprende sobre los contaminantes del aire y cómo afectan nuestra salud y el medio ambiente.
        </p>
        <div className="mt-8 flex justify-center fade-in">
          <a href="/contaminantes" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
            Explorar Contaminantes
          </a>
          <a href="/contaminantes" className="ml-4 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300">
            Ver Más
          </a>
        </div>
      </div>
  )
}

export default Contaminantes
