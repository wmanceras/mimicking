import { useEffect, useState } from "react";
import Card from "../../Components/Card";
import "../../index.css";

function ConsultaApi() {
  const [searchTerm, setSearchTerm] = useState("");
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [urlDestino, setUrlDestino] = useState("");

  // Función para obtener dispositivos
  const fetchDevices = async () => {
    setLoading(true);
    setError(null);

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
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      // Filtrar dispositivos por client === "BNBJ"
      const filteredDevices = data.filter((device) => device.client === "BNBJ");

      setDevices(filteredDevices);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
    setUrlDestino(null);
  }, []);

  // Filtrar dispositivos cuando cambia el searchTerm
  useEffect(() => {
    if (!searchTerm) {
      setFilteredDevices(devices); // Si el buscador está vacío, mostrar todos
    } else {
      const filtered = devices.filter((device) =>
        device.deviceName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDevices(filtered);
    }
  }, [searchTerm, devices]);

  const resetUrlDestino = () => {
    setUrlDestino(null);
  };

  if (loading) return <p className="text-center">Cargando dispositivos...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="w-full p-4">
      {!urlDestino && (
        <div id="divPrincipal" className="flex flex-col">
          {/* Barra de búsqueda y botón recargar */}
          <div className="flex items-center mb-4">
            {/* Input de búsqueda */}
            <input
              type="text"
              placeholder="Buscar dispositivo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full max-w-md"
            />

            {/* Botón Recargar al lado derecho */}
            <button
              onClick={fetchDevices}
              className="ml-4 p-2 bg-blue-500 text-black rounded-md flex items-center gap-2 hover:bg-blue-600 transition"
            >
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3"
                />
              </svg>{" "}
              Recargar
            </button>
          </div>

          {/* Renderizado de dispositivos filtrados */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredDevices.length > 0 ? (
              filteredDevices.map((device) => (
                <Card
                  key={device.socketId}
                  data={device}
                  setUrlDestino={setUrlDestino}
                />
              ))
            ) : (
              <p className="text-center col-span-full">
                No se encontraron dispositivos
              </p>
            )}
          </div>
        </div>
      )}

      {/* Botón para volver y mostrar el iFrame */}
      {urlDestino && (
        <div className="flex flex-col items-center">
          <button
            onClick={resetUrlDestino}
            className="px-4 py-2  text-black rounded mb-4 hover:bg-blue-600 border-2"
          >
            Volver
          </button>

          <iframe
            src={urlDestino}
            className="w-full h-screen border-none"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default ConsultaApi;
