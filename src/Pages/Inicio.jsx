import React from "react";

import { TbConfettiFilled } from "react-icons/tb";

import Confundido from "../Images/Confundido.png";

import apunta_derecha from "../Images/apunta_derecha.png";

import apunta_izq from "../Images/apunta_izq.png";

import "../index.css";

const Inicio = () => {
  return (
    <>
      <div className="pt-20 sm:pt-20">
        <h1 className="text-4xl font-bold mt-2 text-center fade-in">
          Bienvenido a AirAware
        </h1>
      </div>

      <div className="mt-4 text-left px-3">
        <p className="text-gray-700 px-3 slide-in-right delay-1 font-bold text-3xl sm:text-4xl leading-tight">
          Tu fuente no tan confiable para monitorear
        </p>
        <p className="text-gray-700 px-3 slide-in-right delay-2 text-2xl sm:text-3xl leading-tight mt-1">
          la calidad del aire en tiempo real.
        </p>
        <p className="text-gray-700 px-3 slide-in-right delay-3 text-xl sm:text-2xl leading-tight mt-1">
          Talvez <TbConfettiFilled />
        </p>
      </div>

      <div className="mt-2 sm:-mt-2 md:-mt-8 lg:-mt-35 px-3 sm:px-6 flex justify-end">
        <img
          src={Confundido}
          alt="Confundido"
          className="w-32 sm:w-40 md:w-48 h-auto object-contain block slide-in-left delay-4"
        />
      </div>

      <div className="flex flex-wrap sm:flex-nowrap items-center justify-center px-3 mt-4 text-center">
        <img
          src={apunta_derecha}
          alt="Apunta derecha"
          className="w-12 sm:w-16 h-auto object-contain slide-in-left delay-5 shrink-0 -mr-1"
        />
        <p className="text-gray-700 text-base sm:text-lg leading-tight max-w-[22rem]">
          ¿Cansado de no saber si respieras humo o aire?
        </p>
        <img
          src={apunta_izq}
          alt="Apunta izquierda"
          className="w-12 sm:w-16 h-auto object-contain slide-in-left delay-6 shrink-0 -ml-1"
        />
      </div>
    </>
  );
};

export default Inicio;
