import { useEffect, useState } from "react";
import "../../index.css";

function Specs() {
  return (
    <div className="w-full p-4">
      <iframe
        src="http://co-ailct-01.veritran.net:8080/mimicking/specs"
        className="w-full h-screen border-none"
      ></iframe>
    </div>
  );
}

export default Specs;
