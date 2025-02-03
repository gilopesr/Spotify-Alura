const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");
const gridContainer = document.querySelector(".grid-container");

function requestApi(searchTerm) {
  fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
    .then((response) => response.json())
    .then((results) => displayResults(results, searchTerm));
}

function displayResults(results, searchTerm) {
  hidePlaylists();
  gridContainer.innerHTML = "";

  const filteredResults = results.filter(artist => 
    artist.name.charAt(0).toLowerCase() === searchTerm.charAt(0)
  );

  if (filteredResults.length === 0) {
    resultArtist.classList.add("hidden");
    return;
  }

  filteredResults.forEach((element) => {
    // Cria um card para cada artista correspondente
    const artistCard = document.createElement("div");
    artistCard.classList.add("artist-card");

    // Criando a estrutura do card
    artistCard.innerHTML = `
      <div class="card-img">
        <img src="${element.urlImg}" class="artist-img" alt="${element.name}">
        <div class="play">
          <span class="fa fa-solid fa-play"></span>
        </div>
      </div>
      <div class="card-text">
        <a title="${element.name}" class="vst" href="${element.url}"></a>
        <span class="artist-name">${element.name}</span>
        <span class="artist-categorie">Artista</span>
      </div>
    `;

    
    gridContainer.appendChild(artistCard);
  });

  resultArtist.classList.remove("hidden");
}

function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }
  requestApi(searchTerm);
});




//BOM DIA | BOA TARDE | BOA NOITE

const greetingElement = document.getElementById("greeting");

// Obtém a hora atual do sistema
const currentHour = new Date().getHours();

const greetingMessage =
  currentHour >= 5 && currentHour < 12
    ? "Bom dia"
    : currentHour >= 12 && currentHour < 18
    ? "Boa tarde"
    : "Boa noite";

greetingElement.textContent = greetingMessage;

// GRID INTELIGENTE
const container = document.querySelector(".offer__list-item");

const observer = new ResizeObserver(() => {  //mudanças no tamanho do elemento 
  const containerWidth = container.offsetWidth; //largura total do elemento, incluindo largura do conteúdo, bordas e preenchimento.
  const numColumns = Math.floor(containerWidth / 200); //número de colunas com base na largura do container

  //largura mínima de 200px e máxima de 1fr (uma fração do espaço disponível).
  container.style.gridTemplateColumns = `repeat(${numColumns}, minmax(200px, 1fr))`;

  console.log({ container });
  console.log({ numColumns });
});
//observando a mudança do elemento
observer.observe(container);
