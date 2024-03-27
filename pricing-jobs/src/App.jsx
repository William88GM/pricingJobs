import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState(false);
  const [total, setTotal] = useState(0);
  const [selectedServices, setSelectedServices] = useState({
    diagnostico: true,
    disco: false,
    limpieza: false,
    optimizar: false,
    office: false,
    windows: false,
    arquitectura: false,
    diseno: false,
    antivirus: false,
    otros: false,
  });

  //   {
  //     Diagnósito de mi PC 🔍

  // Cambio de Disco a SSD 💿 + Backup de archivos 🗃 + Instalación Windows 🖥

  // Limpieza Física 🧹 + Optimización 🚀

  // Instalacion y activación de Office 👩‍💼👨‍💼

  // Instalacion y activación de Windows 🖥

  // Instalacion y activación de Programas Autodesk 📐

  // Instalacion y activación de Programas Adobe 🖌

  // Instalacion y activación de Antivirus 👾

  // Otros: Me gustaría consultarte sobre...🤔
  //   }

  const titles = {
    diagnostico: "Diagn%C3%B3sito%20de%20mi%20PC%20%F0%9F%94%8D",
    disco:
      "Cambio%20de%20Disco%20a%20SSD%20%F0%9F%92%BF%20%28Comprado%20previamente%20por%20el%20cliente%29%20%2B%20Backup%20de%20archivos%20%F0%9F%97%83%20%2B%20Instalaci%C3%B3n%20Windows%20%F0%9F%96%A5%0A",
    limpieza:
      "Limpieza%20F%C3%ADsica%20%F0%9F%A7%B9%20%2B%20Optimizaci%C3%B3n%20%F0%9F%9A%80",
    office:
      "Instalacion%20y%20activaci%C3%B3n%20de%20Office%20%F0%9F%91%A9%E2%80%8D%F0%9F%92%BC%F0%9F%91%A8%E2%80%8D%F0%9F%92%BC",
    windows: "Instalacion%20y%20activaci%C3%B3n%20de%20Windows%20%F0%9F%96%A5",
    arquitectura:
      "Instalacion%20y%20activaci%C3%B3n%20de%20Programas%20Autodesk%20%F0%9F%93%90",
    diseno:
      "Instalacion%20y%20activaci%C3%B3n%20de%20Programas%20Adobe%20%F0%9F%96%8C",
    antivirus:
      "Instalacion%20y%20activaci%C3%B3n%20de%20Antivirus%20%F0%9F%91%BE",
    desbloqueo:
      "Desbloqueo%20de%20computadora%20Conectar%20Igualdad%20%F0%9F%92%BB",
    otros: "Otros%3A%20Me%20gustar%C3%ADa%20consultarte%20sobre...%F0%9F%A4%94",
  };

  function convertion(cant) {
    return value ? Math.round((value * cant) / 100) * 100 : cant;
  }
  const priceServices = {
    diagnostico: convertion(5),
    disco: convertion(10),
    limpieza: convertion(4),
    office: convertion(3),
    windows: convertion(2),
    arquitectura: convertion(5),
    diseno: convertion(5),
    antivirus: convertion(1),
    desbloqueo: convertion(5),
    otros: convertion(0),
  };

  useEffect(() => {
    setTotal(0);
    for (const key in selectedServices) {
      if (selectedServices[key]) {
        setTotal((prev) => prev + priceServices[key]);
      }
    }
  }, [selectedServices]);
  useEffect(() => {
    fetch("https://dolarapi.com/v1/dolares/blue")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setValue(res.venta);
      })
      .finally(() => {});
  }, []);

  useEffect(() => {
    setTotal(priceServices.diagnostico);
  }, [value]);

  const constructWhatsAppMessage = () => {
    let message =
      "¡Hola! Me gustaría contratar los siguientes servicios: %0A%0A ";
    for (const key in selectedServices) {
      if (selectedServices[key]) {
        message += `- ${titles[key]} %0A `;
      }
    }
    message += `%0A El total sería de $${total}`;
    // return encodeURIComponent(message);
    // return encodeURI(message);
    console.log(message);
    return message;
  };

  const handleServiceChange = (serviceName) => {
    setSelectedServices({
      ...selectedServices,
      [serviceName]: !selectedServices[serviceName],
    });
  };

  return (
    <>
      <article>
        <h1>
          Servicio Técnico <span className="sanjuan">San Juan</span>
        </h1>

        <img
          className="tecnico"
          src="https://i.postimg.cc/90rK8LH2/logo.webp"
          alt="Logo page"
        />
        <h3>
          Reparación de <span className="sanjuan">Computadoras</span>,
          Instalación de <span className="sanjuan">programas</span> y demás.
        </h3>
        <p>
          No hacemos reparaciones físicas de Hardware, electrónica o cambios de
          pantalla
        </p>

        <h3>¡Calculá tu Presupuesto!</h3>

        <section>
          <div className="base">
            <h3>
              Precio base por consulta:
              <span className="price">
                {" "}
                $ {priceServices.diagnostico + (value ? " pesos" : " dólares")}
              </span>
            </h3>
          </div>
        </section>

        <div className="div-divisor"></div>
        {/* ----------------------------------------------------------------------------------- */}
        <h3 className="titleSelect">Seleccioná lo que necesitas:</h3>

        <section>
          <button
            className={selectedServices.limpieza ? "checked" : ""}
            onClick={() => handleServiceChange("limpieza")}
          >
            <h3>
              Limpieza Física + Optimización:{" "}
              <span className="price">
                $ {priceServices.limpieza + (value ? " pesos" : " dólares")}
              </span>
            </h3>
          </button>
        </section>

        <section>
          <button
            className={selectedServices.disco ? "checked" : ""}
            onClick={() => handleServiceChange("disco")}
          >
            <h3>
              Cambio de Disco a SSD + Backup de archivos + Instalación Windows:
              <span className="price">
                {" "}
                $ {priceServices.disco + (value ? " pesos" : " dólares")}
              </span>
            </h3>
          </button>
        </section>

        <section>
          <h3> Instalación y activación de programas:</h3>

          <div className="cards">
            <button
              className={selectedServices.office ? "checked" : ""}
              onClick={() => handleServiceChange("office")}
            >
              <h5>
                Office:{" "}
                <span className="price">
                  $ {priceServices.office + (value ? " pesos" : " dólares")}
                </span>
              </h5>
              <img
                src="https://i.postimg.cc/Vv2p7tB1/office.png"
                alt="Office Logos"
              />
            </button>

            <button
              className={selectedServices.windows ? "checked" : ""}
              onClick={() => handleServiceChange("windows")}
            >
              <h5>
                Windows:{" "}
                <span className="price">
                  $ {priceServices.windows + (value ? " pesos" : " dólares")}
                </span>
              </h5>

              <img
                className="oneLogo"
                src="https://i.postimg.cc/nh355N10/Windows-logo.png"
                alt="Windows Logo"
              />
            </button>

            <button
              className={selectedServices.arquitectura ? "checked" : ""}
              onClick={() => handleServiceChange("arquitectura")}
            >
              <li>
                <h5>
                  Arquitectura:{" "}
                  <span className="price">
                    ${" "}
                    {priceServices.arquitectura +
                      (value ? " pesos" : " dólares")}
                  </span>
                </h5>

                <img
                  src="https://i.postimg.cc/nchcDfM1/autodesklogos.png"
                  alt="Autodesk Logos"
                />
              </li>
            </button>

            <button
              className={selectedServices.diseno ? "checked" : ""}
              onClick={() => handleServiceChange("diseno")}
            >
              <li>
                <h5>
                  Diseño:
                  <span className="price">
                    {" "}
                    $ {priceServices.diseno + (value ? " pesos" : " dólares")}
                  </span>
                </h5>

                <img
                  src="https://i.postimg.cc/26JykH7D/Adobe-Programs2.png"
                  alt="Adobe Logos"
                />
              </li>
            </button>

            <button
              className={selectedServices.antivirus ? "checked" : ""}
              onClick={() => handleServiceChange("antivirus")}
            >
              <h5>
                Antivirus (c/u):{" "}
                <span className="price">
                  $ {priceServices.antivirus + (value ? " pesos" : " dólares")}
                </span>
              </h5>
              <img
                className="oneLogo"
                src="https://i.postimg.cc/Z5zLNY4v/avast.png"
                alt="Avast Logo"
              />
            </button>

            <button
              // style={{padding:"6px"}}
              className={selectedServices.desbloqueo ? "checked " : ""}
              onClick={() => handleServiceChange("desbloqueo")}
            >
              <h5 className="twoLines">
                Debloqueo de Equipos {" Conectar Igualdad"}:{" "}
                <span className="price">
                  ${priceServices.antivirus + (value ? " pesos" : " dólares")}
                </span>
              </h5>
              {/* <img
                className="oneLogo"
                src="https://i.postimg.cc/DfC3FbxH/laptop-svgrepo-com.png"
                alt="Avast Logo"
              /> */}
              <svg
                className="oneLogo"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
                version="1.0"
                width="512.000000pt"
                height="512.000000pt"
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <metadata>
                  Created by potrace 1.16, written by Peter Selinger 2001-2019
                </metadata>
                <g
                  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                  fill="#fff"
                  stroke="none"
                >
                  <path d="M1633 4013 c510 -2 1344 -2 1855 0 510 1 92 2 -928 2 -1020 0 -1438 -1 -927 -2z" />
                  <path d="M644 3982 c-19 -12 -34 -25 -34 -28 0 -3 5 -2 10 1 6 3 -1 -15 -15 -41 l-25 -47 0 -1114 c0 -965 2 -1118 15 -1149 8 -20 13 -40 10 -44 -6 -9 64 -70 79 -70 5 0 1 7 -10 16 -18 15 -18 15 3 5 31 -15 3735 -15 3766 0 21 10 21 10 3 -5 -11 -9 -15 -16 -10 -16 15 0 85 61 79 70 -3 4 2 24 10 44 13 31 15 184 15 1149 l0 1114 -25 47 c-14 26 -19 44 -13 40 9 -5 8 -2 -1 10 -8 9 -19 15 -26 13 -6 -3 -22 1 -36 9 -29 16 -17 19 14 3 16 -9 19 -9 11 0 -7 8 -510 12 -1898 14 l-1889 2 -33 -23z m3685 -198 c21 -27 21 -27 19 -1043 -2 -669 -6 -1016 -13 -1016 -5 0 -19 -6 -30 -12 -15 -9 -16 -13 -5 -13 10 -1 9 -4 -5 -10 -26 -11 -3444 -11 -3470 0 -14 6 -15 9 -5 10 11 0 10 4 -5 13 -11 6 -24 12 -30 12 -7 0 -11 347 -13 1016 -2 1016 -2 1016 19 1043 l20 26 1749 0 1749 0 20 -26z" />
                  <path d="M799 3783 c-11 -15 -11 -16 1 -5 11 9 377 12 1760 12 1383 0 1749 -3 1760 -12 12 -11 12 -10 1 5 -13 16 -108 17 -1761 17 -1653 0 -1748 -1 -1761 -17z" />
                  <path d="M785 2745 c0 -561 1 -789 2 -507 2 283 2 742 0 1020 -1 279 -2 48 -2 -513z" />
                  <path d="M4335 2745 c0 -561 1 -789 2 -507 2 283 2 742 0 1020 -1 279 -2 48 -2 -513z" />
                  <path d="M1698 1693 c474 -2 1250 -2 1725 0 474 1 86 2 -863 2 -949 0 -1337 -1 -862 -2z" />
                  <path d="M583 3913 c-17 -25 -18 -94 -21 -1138 -1 -610 0 -1124 3 -1141 3 -17 12 -39 20 -50 13 -17 13 -14 0 18 -13 32 -15 186 -15 1151 0 1072 1 1114 19 1150 22 43 19 48 -6 10z" />
                  <path d="M4531 3903 c18 -36 19 -79 19 -1150 0 -950 -2 -1119 -14 -1148 -8 -19 -13 -35 -10 -35 3 0 12 16 20 35 12 29 14 198 14 1145 0 1147 0 1161 -38 1184 -5 3 -1 -11 9 -31z" />
                  <path d="M295 1421 c-22 -10 -49 -29 -60 -42 l-20 -24 24 20 25 20 -17 -25 c-10 -14 -23 -25 -29 -25 -6 0 -13 -7 -15 -15 -4 -12 -3 -13 5 -1 7 9 8 -1 5 -32 -7 -59 1 -88 34 -129 22 -27 23 -29 4 -13 -33 28 -44 53 -52 110 l-6 50 -2 -43 c0 -24 6 -56 13 -71 17 -32 81 -91 98 -91 7 0 3 7 -8 16 -18 15 -18 15 3 5 31 -15 4495 -15 4526 0 21 10 21 10 3 -5 -11 -9 -15 -16 -8 -16 17 0 81 59 98 91 7 15 13 47 13 71 l-2 43 -6 -50 c-8 -57 -19 -82 -52 -110 -19 -16 -18 -14 4 13 33 41 41 70 34 129 -3 31 -2 41 5 32 8 -12 9 -11 5 1 -2 8 -9 15 -15 15 -6 0 -19 11 -29 25 l-17 25 25 -20 24 -20 -20 24 c-11 13 -38 32 -60 42 -38 18 -80 18 -755 16 l-715 -2 725 -5 c565 -4 730 -8 748 -18 33 -19 27 -23 -13 -6 -29 12 -147 14 -743 14 -390 0 -711 -3 -715 -6 -3 -3 -3 -13 0 -21 5 -12 7 -12 14 -1 6 9 9 3 9 -17 0 -16 -4 -25 -8 -20 -4 7 -287 10 -812 10 -525 0 -808 -3 -812 -10 -4 -5 -8 4 -8 20 0 20 3 26 9 17 7 -11 9 -11 14 1 3 8 3 18 0 21 -4 3 -325 6 -715 6 -596 0 -714 -2 -743 -14 -40 -17 -46 -13 -12 6 17 10 182 14 747 18 l725 5 -715 2 c-675 2 -717 2 -755 -16z m2668 -78 c-222 -2 -584 -2 -805 0 -222 1 -41 2 402 2 443 0 624 -1 403 -2z" />
                  <path d="M1437 1103 c618 -2 1628 -2 2245 0 618 1 113 2 -1122 2 -1235 0 -1740 -1 -1123 -2z" />
                </g>
              </svg>
            </button>

            <button
              className={selectedServices.otros ? "checked" : ""}
              onClick={() => handleServiceChange("otros")}
            >
              <h5 className="otros">Otros (Consultar)</h5>
              <svg
                fill="#72ff91"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                width="100px"
                height="100px"
                viewBox="0 0 47.354 47.354"
              >
                <g>
                  <path
                    d="M6.446,17.233C2.892,17.233,0,20.124,0,23.678c0,0.552,0.448,1,1,1c0.552,0,1-0.448,1-1c0-2.452,1.994-4.446,4.446-4.446
		c2.452,0,4.446,1.994,4.446,4.446c0,2.452-1.994,4.446-4.446,4.446c-1.188,0-2.304-0.462-3.143-1.302
		c-0.391-0.391-1.024-0.39-1.415,0c-0.391,0.391-0.391,1.024,0,1.415c1.217,1.218,2.836,1.888,4.558,1.888
		c3.554,0,6.446-2.892,6.446-6.446S10,17.233,6.446,17.233z"
                  />
                  <path
                    d="M40.908,17.233c-3.554,0-6.445,2.892-6.445,6.446s2.892,6.446,6.445,6.446c1.722,0,3.341-0.67,4.559-1.888
		c0.391-0.391,0.391-1.024,0-1.415c-0.391-0.391-1.024-0.39-1.414,0c-0.84,0.84-1.957,1.303-3.145,1.303
		c-2.451,0-4.445-1.994-4.445-4.446c0-2.452,1.994-4.446,4.445-4.446c2.452,0,4.446,1.994,4.446,4.446c0,0.552,0.447,1,1,1
		c0.553,0,1-0.448,1-1C47.354,20.124,44.463,17.233,40.908,17.233z"
                  />
                  <path
                    d="M26.718,19.05c-0.382,0.399-0.367,1.032,0.031,1.414c0.858,0.821,1.346,1.927,1.372,3.114
		c0.027,1.187-0.41,2.314-1.23,3.172c-0.82,0.858-1.926,1.346-3.113,1.373c-2.453,0.052-4.489-1.894-4.545-4.344
		c-0.055-2.451,1.894-4.49,4.345-4.545c0.552-0.012,0.99-0.47,0.977-1.022c-0.013-0.553-0.479-1.025-1.022-0.977
		c-3.554,0.08-6.379,3.036-6.299,6.589c0.038,1.721,0.746,3.325,1.99,4.514c1.208,1.155,2.784,1.786,4.45,1.786
		c0.05,0,0.1,0,0.149-0.002c1.722-0.039,3.324-0.745,4.515-1.99c1.189-1.245,1.823-2.878,1.784-4.599
		c-0.038-1.721-0.745-3.324-1.989-4.514C27.731,18.636,27.1,18.651,26.718,19.05z"
                  />
                </g>
              </svg>
            </button>
          </div>
        </section>

        <h3 className="total">
          TOTAL:{" "}
          <span className="price">
            $ {total + (value ? " pesos" : " dólares")}
          </span>
        </h3>
        <h4 className="contact">
          <a
            className="contact"
            target="_blank"
            href={`https://wa.me/+5492645835123?text=${constructWhatsAppMessage()}`}
          >
            CONTACTAR
            <svg
              fill="#72ff91"
              height="20px"
              width="20px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 308 308"
              className="svg"
            >
              <g id="XMLID_468_">
                <path
                  id="XMLID_469_"
                  d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156
		c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687
		c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887
		c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153
		c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348
		c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802
		c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922
		c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0
		c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458
		C233.168,179.508,230.845,178.393,227.904,176.981z"
                />
                <path
                  id="XMLID_470_"
                  d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716
		c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396
		c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z
		 M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188
		l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677
		c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867
		C276.546,215.678,222.799,268.994,156.734,268.994z"
                />
              </g>
            </svg>
          </a>
        </h4>
        <h4>
          <span>Creado por: </span>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/guillermo-martinez-barros/"
          >
            Guillermo Martínez
          </a>
        </h4>
      </article>
    </>
  );
}

export default App;
