import React, { useState } from "react";
import { Link } from "react-router-dom";

// Datos de navegacion y redes sociales
const navbarlinks = [
  { id: 1, title: "Inicio", link: "/" },
  { id: 2, title: "Calidad del aire", link: "/calidad" },
  { id: 3, title: "Contaminantes", link: "/contaminantes" },
  {id: 4, title: "Mi ubicacion", link: "/mi-ubicacion" },
  {id: 5, title: "Glosario de indices", link: "/glosario" },
];


// Componente Navbar del botton de navegacion
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-opacity-30 backdrop-blur-md z-50">
      {/*/ Contenedor principal /*/}
      <div className="relative flex justify-center items-center sm:px-12 sm:py-6 px-4 py-3">
        {/*Boton hamburguesa*/}
        <button className="absolute left-4 sm:left-12 text-sky-700 md:hidden" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/*/ Navegacion del escritorio /*/}
        <div className="hidden md:block items-center">
          <ul className="flex sm:space-x-8 space-x-4">
            {navbarlinks.map(({ id, link, title }) => (
              <li key={id}>
                <Link
                  className="text-sky-700 sm:text-lg text-sm hover:text-sky-500 transition-transform hover:scale-105
                transform inline-block duration-300"
                  to={link}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*/ Menu movil /*/}
      <div
        className={`md:hidden absolute w-full bg-slate-900 transform transition-all duration-300 ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <ul className="flex flex-col px-4 py-2">
          {navbarlinks.map(({ id, link, title }) => (
            <li key={id} className="py-2 text-center">
              <Link
                className="text-sky-100 hover:text-sky-200"
                to={link}
                onClick={() => setIsOpen(false)}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
