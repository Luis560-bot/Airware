import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contaminantes from "./Pages/Contaminantes";
import Glosario from "./Pages/Glosario";
import Inicio from "./Pages/Inicio";
import Cargando from "./Animation/Cargando";
import { useEffect, useState } from "react";
import { fetchWeatherApi } from "openmeteo";

const formatHourKey = (value) => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");

  return `${year}-${month}-${day}T${hour}:00`;
};

function App() {
  const [data, setData] = useState(null);

  const currentPm25 = data
    ? (() => {
        const currentKey = formatHourKey(new Date());
        const currentIndex = data.hourly.time.findIndex(
          (value) => formatHourKey(value) === currentKey,
        );

        return data.hourly.pm2_5[currentIndex] ?? data.hourly.pm2_5[new Date().getHours()] ?? 0;
      })()
    : 0;

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const params = {
          latitude: -12.0432,
          longitude: -77.0282,
          hourly: ["pm10", "pm2_5"],
          past_days: 1,
          forecast_days: 1,
        };

        const url = "https://air-quality-api.open-meteo.com/v1/air-quality";

        const responses = await fetchWeatherApi(url, params);

        // Primera ubicación
        const response = responses[0];

        // Información de ubicación
        const latitude = response.latitude();
        const longitude = response.longitude();
        const elevation = response.elevation();
        const utcOffsetSeconds = response.utcOffsetSeconds();

        console.log("Coordenadas:", latitude, longitude);
        console.log("Elevación:", elevation);
        console.log("UTC:", utcOffsetSeconds);

        const hourly = response.hourly();

        const weatherData = {
          latitude,
          longitude,
          elevation,

          hourly: {
            time: Array.from(
              {
                length:
                  (Number(hourly.timeEnd()) - Number(hourly.time())) /
                  hourly.interval(),
              },
              (_, i) =>
                new Date(
                  (Number(hourly.time()) +
                    i * hourly.interval() +
                    utcOffsetSeconds) *
                    1000,
                ),
            ),

            pm10: hourly.variables(0).valuesArray(),
            pm2_5: hourly.variables(1).valuesArray(),
          },
        };

        console.log("Datos de la API:", weatherData);

        // Guardar los datos en el estado
        setData(weatherData);
      } catch (error) {
        console.error("Error obteniendo datos:", error);
      }
    };

    obtenerDatos();
  }, []);

  return (
    <BrowserRouter>
      <Navbar currentPm25={currentPm25} />
      {data ? (
        <Routes>
          <Route path="/" element={<Inicio currentPm25={currentPm25} />} />
          <Route
            path="/contaminantes"
            element={<Contaminantes currentPm25={currentPm25} />}
          />
          <Route
            path="/glosario"
            element={<Glosario currentPm25={currentPm25} />}
          />
        </Routes>
      ) : (
        <Cargando />
      )}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
