import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState(false);

  useEffect(() => {
    fetch("https://dolarapi.com/v1/dolares/blue")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setValue(res.venta);
      });
  }, []);

  return (
    <>
      <section>
        <h3>Diagnostico:</h3>
        {value && Math.round((value * 5) / 100) * 100}
      </section>
      <section>
        <h3> Limpieza Física:</h3>
        {value && Math.round((value * 5) / 100) * 100}
      </section>
      <section>
        <h3> Instalación y activación de programas:</h3>

        <ul>
          <li>
            <h5>Office: $ {value && Math.round((value * 3) / 100) * 100}</h5>
            <img
              src="https://i.postimg.cc/Vv2p7tB1/office.png"
              alt="Office Logos"
            />
          </li>
          <li>
            <h5>Windows: $ {value && Math.round((value * 3) / 100) * 100}</h5>
            <img
              className="oneLogo"
              src="https://i.postimg.cc/nh355N10/Windows-logo.png"
              alt="Windows Logo"
            />
          </li>
          <li>
            <h5>
              Arquitectura: $ {value && Math.round((value * 3) / 100) * 100}
            </h5>
            <img
              src="https://i.postimg.cc/nchcDfM1/autodesklogos.png"
              alt="Autodesk Logos"
            />
          </li>
          <li>
            <h5>Diseño: $ {value && Math.round((value * 3) / 100) * 100}</h5>
            <img
              src="https://i.postimg.cc/26JykH7D/Adobe-Programs2.png"
              alt="Adobe Logos"
            />
          </li>
          <li>
            <h5>
              Videojuegos: $ {value && Math.round((value * 3) / 100) * 100}
            </h5>
            <img
              className="oneLogo"
              src="https://i.postimg.cc/LsY57tfJ/videojuegos.png"
              alt="Videojuegos Logo"
            />
          </li>
        </ul>
      </section>
    </>
  );
}

export default App;
