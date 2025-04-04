import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "../../Components/Layout";
import "./App.css";
import ConsultaApi from "../ConsultaApi";
import Escenarios from "../Escenarios";
import Specs from "../Specs";

function App() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDevices() {
      const url = "/api/devtools-socket/2.1/devices";

      const headers = {
        accept: "application/json, text/plain, */*",
        referer: "https://devtools.veritran.com/devtools-console/2.2/connect",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      };

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: headers,
          credentials: "include", // Para incluir cookies en la solicitud
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        setDevices(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDevices();
  }, []);

  if (loading) return <p>Cargando dispositivos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Router>
      <Routes>
        {/* Rutas que comparten el layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<ConsultaApi />} /> {/* Página por defecto */}
          <Route path="consulta-api" element={<ConsultaApi />} />
          <Route path="escenarios" element={<Escenarios />} />
          <Route path="specs" element={<Specs />} />
          <Route path="*" element={<Navigate to="/" />} />{" "}
          {/* Redirige a la principal */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
