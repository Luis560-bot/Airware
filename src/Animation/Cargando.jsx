import React from "react";

import { Audio } from "react-loader-spinner";

const Cargando = () => {
  return (
    <div className="min-h-screen flex items-center justify-center fade-in">
      <Audio
      visible={true}
      height="80"
      width="80"
      color="#0369a1"
      ariaLabel="audio-loading"
      wrapperStyle={{}}
      wrapperClass="audio-wrapper"
      />
    </div>
  );
};

export default Cargando;
