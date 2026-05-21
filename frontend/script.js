//Descobrir onde o usuário está e colocar um balãozinho na localização dele 
// Para isso usa a biblioteca chamada Leaflet

const map = L.map('map');

function iniciarMapa(lat, lng) {
  map.setView([lat, lng], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'OSM'
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup("Você está aqui")
    .openPopup();
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      iniciarMapa(lat, lng);
    },
    (err) => {
      console.log("Erro ao pegar localização:", err);
      // fallback (caso negue permissão)
      iniciarMapa(-23.2, -48.9);
    }
  );
} else {
  iniciarMapa(-22.2, -45.9);
}