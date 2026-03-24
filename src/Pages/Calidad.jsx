import React from "react";

import "../index.css";

const Calidad = ({ pm25 }) => {
  const horaActual = new Date().getHours();
  const minutoActual = new Date().getMinutes();
  const min = Math.min(...pm25);
  const max = Math.max(...pm25);
  const promedio = (pm25.reduce((a, b) => a + b, 0) / pm25.length).toFixed(1);

  let rangoUbicado = null;

  if (pm25[horaActual] <= 12 && pm25[horaActual] >= 0) {
    rangoUbicado = (
    <>
      <li className="text-green-600">Buena: 0-12 µg/m³</li>
      <li className="font-black">Consejos</li>
      <li className="text-gray-700">- Disfruta de actividades al aire libre</li>
      <li className="text-gray-700">- Mantén las ventanas abiertas para ventilar tu hogar</li>
      <li className="text-gray-700">- No es necesario tomar precauciones especiales</li>
    </>
    );
  }else if (pm25[horaActual] >= 13 && pm25[horaActual] <= 35) {
    rangoUbicado = (
      <>
        <li className="text-yellow-600">Moderada</li>
        <li className="font-black">Consejos</li>
        <li className="text-gray-700">Personas sensibles deben tener cuidado</li>
        <li className="text-gray-700">Evitar ejercicio intenso al aire libre</li>
      </>
    );
  }else{
    rangoUbicado = (
      <>
        <li className="text-red-600">Mala</li>
        <li className="font-black">Consejos</li>
        <li className="text-gray-700">Evitar actividades al aire libre</li>
        <li className="text-gray-700">Mantenerse informado sobre la calidad del aire</li>
      </>
    );
  }

  return (
    <>
      <div className="pt-20 sm:pt-24">
        <h1 className="text-4xl font-bold mt-2 text-center fade-in">
          Calidad del Aire
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center mt-10 fade-in">
        <p className="text-lg text-gray-700 mb-4 text-center max-w-2xl slide-in-up">
          La calidad del aire es un indicador crucial de la salud ambiental y el
          bienestar humano. La contaminación del aire puede tener efectos
          adversos en la salud, causando problemas respiratorios,
          cardiovasculares y otros trastornos. Es importante monitorear y
          mejorar la calidad del aire para proteger nuestra salud y el medio
          ambiente
        </p>
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cXVhbGlkYWQlMjBhaXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
          alt="Calidad del Aire"
          className="rounded-lg shadow-lg mt-6 slide-in-up"
        />
      </div>
      <hr className="my-8 border-t border-gray-300 slide-in-up" />

      <div className="flex flex-col items-center justify-center mt-10 fade-in">
        <h2 className="text-2xl font-bold mb-4 text-center">Datos Actuales</h2>
        <p className="text-lg text-gray-700 mb-2 text-center slide-in-up">
          PM2.5 actual: {pm25[horaActual]} µg/m³
        </p>
        <p className="text-lg text-gray-700 mb-2 text-center slide-in-up">
          Minimo: {min} µg/m³
        </p>
        <p className="text-lg text-gray-700 mb-2 text-center slide-in-up">
          Maximo: {max} µg/m³
        </p>
        <p className="text-lg text-gray-700 mb-2 text-center slide-in-up">
          Promedio: {promedio} µg/m³
        </p>
        <p className="text-lg text-gray-700 mb-2 text-center slide-in-up">
          Última actualización: {horaActual}:{minutoActual}
        </p>
      </div>

      <hr className="my-8 border-t border-gray-300 slide-in-up" />

      <div>
        <h2 className="text-2xl font-bold mb-4 text-center slide-in-up">
          ¿Por que es importante medir el aire?
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center mt-10 fade-in py-50">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Rango ubicado
        </h2>
        <ul className="text-lg text-gray-700 mb-2 text-center slide-in-up">
          {rangoUbicado}
        </ul>
      </div>
    </>
  );
};

export default Calidad;
