const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');


const app = express();
const PORT = 3000;

app.use(cors()); // Permite o acesso do Front-end
app.use(express.json()); 


app.get('/', (req, res) => {
    res.send('API do Orienta+ está funcionando');
});

app.listen(PORT, () => {
    console.log(`Rodando com sucesso em http://localhost:${PORT}`);
});
app.get("/unidades", (req, res) => {
  res.json([
    {
      nome: "UBS Central",
      lat: -22.2,
      lng: -45.9
    },
    {
      nome: "Hospital Regional",
      lat: -22.25,
      lng: -45.92
    }
  ]);
});

