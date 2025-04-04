import { Link, Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation(); // Obtiene la URL actual

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white p-4 mr-6">
        <ul>
          <li className="mb-4">
            <Link
              to="/consulta-api"
              className={`block p-2 rounded ${
                location.pathname === "/consulta-api"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              Consulta de dispositivos
            </Link>
          </li>
          <li>
            <Link
              to="/escenarios"
              className={`block p-2 rounded ${
                location.pathname === "/escenarios"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              Scenarios
            </Link>
          </li>
          <li>
            <Link
              to="/specs"
              className={`block p-2 rounded ${
                location.pathname === "/specs"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              API specifications
            </Link>
          </li>
        </ul>
      </nav>

      {/* Contenido dinámico */}
      <div className="flex w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
