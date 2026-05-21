//Era para funcionar assim: vai no mapa real, puxa todos os hospitais daquela região e joga 
// para dentro da tabela unidades do banco de dados. 
// Aí a gente pode puxar do banco para o front depois. Mas não consegui fazer funcionar, 
// então deixei só o código aqui para mostrar a ideia.

const axios = require("axios");
const db = require("./db");

async function importarHospitais() {
  const query = `
  [out:json];
  node["amenity"="hospital"](-23.0,-47.0,-22.0,-46.0);
  out;
  `;

  const url = "https://overpass-api.de/api/interpreter";

  const res = await axios.post(url, query, {
    headers: { "Content-Type": "text/plain" }
  });

  const elementos = res.data.elements;

  for (let e of elementos) {
    await db.query(
      `INSERT INTO unidades (nome, tipo, lat, lng)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT DO NOTHING`,
      [e.tags.name || "Sem nome", "hospital", e.lat, e.lon]
    );
  }
}

importarHospitais();