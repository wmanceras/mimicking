import React from "react";
import { useState } from "react";

const Card = ({ data, setUrlDestino }) => {
  const [terminalId, setTerminalId] = useState(null);

  const callMimicking = async (data) => {
    const id = await fetchDeviceInformation(data);
    if (id) {
      setTerminalId(id);
      console.log("termnid" + id);
      fetchDataWithTerminalID(id); // Llamar la segunda petición
    }
  };

  const fetchDeviceInformation = async (data) => {
    console.log(data.socketId);
    let socket = data.socketId;
    try {
      const response = await fetch("http://10.242.0.189:3000/api/v1/proxy", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ socketId: socket }),
      });

      if (!response.ok) {
        throw new Error(
          `Error en fetchDeviceInformation: ${response.statusText}`
        );
      }

      const data = await response.json();

      // Extraer el "Terminal ID" de la respuesta
      const terminalIdObj = data.device_information.find(
        (item) => item.name === "Terminal ID"
      );

      return terminalIdObj ? terminalIdObj.value : null;
    } catch (error) {
      console.error("Error obteniendo el Terminal ID:", error);
      return null;
    }
  };

  const fetchDataWithTerminalID = async (terminalId) => {
    if (!terminalId) {
      console.error("Terminal ID no encontrado");
      return;
    }

    const url = `http://co-ailct-01.veritran.net:8080/mimicking/${terminalId}`;
    const urlDestino = `http://co-ailct-01.veritran.net:8080/mimicking/${terminalId}`;
    console.log("Redirigiendo a:", urlDestino);

    // Redirección a la URL
    //window.location.href = urlDestino;
    setUrlDestino(url);
  };

  return (
    <div className="mt-6 pt-3 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          fill="none"
          viewBox="0 0 19 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 3 6 2V1m5 2 1-1V1M9 7v11M9 7a5 5 0 0 1 5 5M9 7a5 5 0 0 0-5 5m5-5a4.959 4.959 0 0 1 2.973 1H12V6a3 3 0 0 0-6 0v2h.027A4.959 4.959 0 0 1 9 7Zm-5 5H1m3 0v2a5 5 0 0 0 10 0v-2m3 0h-3m-9.975 4H2a1 1 0 0 0-1 1v2m13-3h2.025a1 1 0 0 1 1 1v2M13 9h2.025a1 1 0 0 0 1-1V6m-11 3H3a1 1 0 0 1-1-1V6"
          />
        </svg>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {data.deviceName}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {data.client}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {data.socketId}
        </span>
        <div className="flex mt-4 md:mt-6">
          <a
            href="#"
            onClick={() => callMimicking(data)}
            className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Create Session
          </a>
        </div>
      </div>
      {/* Mostrar el iframe si hay una URL */}
    </div>
  );
};

export default Card;
