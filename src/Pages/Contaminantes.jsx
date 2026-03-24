import React from 'react'

import { BiSolidConfused } from "react-icons/bi";

const Contaminantes = () => {
  return (
     <div className="pt-20 sm:pt-20">
        <h1 className="text-4xl font-bold mt-2 text-center fade-in">
          ¿Alguna vez te preguntaste como se contamina el aire?
          <BiSolidConfused size={40} className='block mx-auto mt-4 fade-in'/>
        </h1>
      </div>
  )
}

export default Contaminantes
