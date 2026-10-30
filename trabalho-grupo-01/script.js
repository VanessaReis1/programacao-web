
// Endereço da API pública usada para consultar músicas.
const API_URL = "https://itunes.apple.com/search";

// Guarda as músicas recebidas da API e as que estão sendo exibidas na tela.
let musicas = [];
let musicasExibidas = [];
// A lista começa vazia e será preenchida ao carregar os dados salvos.
let favoritos = [];

// Armazena temporariamente a música aberta na janela de detalhes.
let musicaSelecionada = null;

// Captura elementos HTML que serão manipulados pelo JavaScript.

const listaMusicas = document.getElementById("listaMusicas");
const listaFavoritos = document.getElementById("listaFavoritos");
const campoPesquisa = document.getElementById("campoPesquisa");
const formPesquisa = document.getElementById("formPesquisa");

const mensagem = document.getElementById("mensagem");
const mensagemFavoritos = document.getElementById("mensagemFavoritos");

const contador = document.getElementById("contador");
const contadorFavoritos = document.getElementById("contadorFavoritos");
const numeroFavoritos = document.getElementById("numeroFavoritos");

const modal = document.getElementById("modal");
const detalhesMusica = document.getElementById("detalhesMusica");
const botaoTema = document.getElementById("botaoTema");


/* =================================
   BUSCAR MÚSICAS NA API
   A função usa fetch e async/await para consultar os dados.
================================= */

async function buscarMusicas(termo = "MPB") {

    mensagem.style.display = "block";
    mensagem.textContent = "Buscando músicas...";
    listaMusicas.innerHTML = "";

    contador.textContent = "Carregando...";

    try {

        // Organiza os parâmetros enviados no endereço da API.
        const parametros = new URLSearchParams({
            term: termo,
            entity: "song",
            country: "BR",
            limit: "24",
            explicit: "No"
        });

        // Faz a requisição HTTP e aguarda a resposta do servidor.
        const resposta = await fetch(`${API_URL}?${parametros}`);

        if (!resposta.ok) {
            throw new Error("Erro na comunicação com a API.");
        }

        // Converte o conteúdo da resposta para um objeto JavaScript.
        const dados = await resposta.json();

        if (!Array.isArray(dados.results)) {
            throw new Error("Resposta inválida da API.");
        }

        // Mantém somente resultados que possuem identificador e nome.
        musicas = dados.results.filter(musica =>
            musica.trackId && musica.trackName
        );

        renderizarMusicas(musicas);

        contador.textContent =
            `${musicas.length} músicas encontradas`;

        mensagem.style.display =
            musicas.length === 0 ? "block" : "none";

        if (musicas.length === 0) {
            mensagem.textContent =
                "Nenhuma música encontrada. Tente outra pesquisa.";
        }

    } catch (erro) {

        console.error("Erro:", erro);

        mensagem.textContent =
            "Não foi possível carregar as músicas. Verifique sua conexão e tente novamente.";

        mensagem.style.display = "block";
        contador.textContent = "Erro ao carregar";

    }
}


/* =================================
   CRIAR CARDS
   Cria os elementos de cada música que serão inseridos no HTML.
================================= */

function criarCard(musica) {

    // Cria um elemento article para representar uma música.
    const card = document.createElement("article");
    card.className = "card-musica";

    const estaFavorita = favoritos.some(
        item => item.trackId === musica.trackId
    );

    const imagem = musica.artworkUrl100 || "";

    card.innerHTML = `
        <div class="capa">
            <img
                src="${escaparHTML(imagem)}"
                alt="Capa do álbum ${escaparHTML(musica.collectionName || musica.trackName)}"
                loading="lazy"
            >
        </div>

        <div class="info">

            <span class="genero">
                ${escaparHTML(musica.primaryGenreName || "Música")}
            </span>

            <h3>${escaparHTML(musica.trackName)}</h3>

            <p class="artista">
                ${escaparHTML(musica.artistName || "Artista desconhecido")}
            </p>

            <p class="preco-musica">
                ${formatarPreco(musica.trackPrice, musica.currency)}
            </p>

            <div class="acoes">

                <button class="detalhes-btn" type="button">
                    Ver detalhes
                </button>

                <button
                    class="favorito-btn ${estaFavorita ? "ativo" : ""}"
                    type="button"
                    aria-label="Adicionar aos favoritos"
                >
                    ${estaFavorita ? "♥" : "♡"}
                </button>

            </div>

        </div>
    `;

    // Define as ações dos botões de detalhes e de favoritos.
    card.querySelector(".detalhes-btn").addEventListener(
        "click",
        () => abrirDetalhes(musica)
    );

    card.querySelector(".favorito-btn").addEventListener(
        "click",
        () => alternarFavorito(musica)
    );

    return card;
}


/* =================================
   RENDERIZAR CATÁLOGO
   Limpa a área e desenha novamente os cards recebidos.
================================= */

function renderizarMusicas(lista) {
    musicasExibidas = lista;

    listaMusicas.innerHTML = "";

    lista.forEach(musica => {
        listaMusicas.appendChild(criarCard(musica));
    });

}


/* =================================
   PESQUISA
   Impede o envio tradicional do formulário e consulta o termo digitado.
================================= */

formPesquisa.addEventListener("submit", evento => {

    evento.preventDefault();

    const termo = campoPesquisa.value.trim();

    if (termo.length < 2) {
        mensagem.textContent =
            "Digite pelo menos dois caracteres para pesquisar.";
        mensagem.style.display = "block";
        return;
    }

    buscarMusicas(termo);

});


/* =================================
   DETALHES DA MÚSICA
   Preenche o modal com as informações do item escolhido.
================================= */

function abrirDetalhes(musica) {

    musicaSelecionada = musica;

    const favorita = favoritos.some(
        item => item.trackId === musica.trackId
    );

    const imagem =
        musica.artworkUrl100 || "";

    const duracao = musica.trackTimeMillis
        ? formatarDuracao(musica.trackTimeMillis)
        : "Não informada";

    // Verifica se a API disponibilizou uma prévia de áudio.
    const preview = musica.previewUrl
        ? `
            <audio class="audio-preview" controls preload="none">
                <source src="${escaparHTML(musica.previewUrl)}" type="audio/mp4">
                Seu navegador não suporta áudio.
            </audio>
          `
        : "<p>Prévia de áudio indisponível.</p>";

    // Cria um link para abrir a música na página da Apple, quando disponível.
    const linkApple = musica.trackViewUrl
        ? `
            <a class="link-apple"
               href="${escaparHTML(musica.trackViewUrl)}"
               target="_blank"
               rel="noopener noreferrer">
               Ver no Apple Music ↗
            </a>
          `
        : "";

    detalhesMusica.innerHTML = `

        <div class="detalhes-modal">

            <div class="imagem-modal">
                <img
                    src="${escaparHTML(imagem)}"
                    alt="Capa de ${escaparHTML(musica.trackName)}"
                >
            </div>

            <div class="texto-modal">

                <span class="genero">
                    ${escaparHTML(musica.primaryGenreName || "Música")}
                </span>

                <h2>${escaparHTML(musica.trackName)}</h2>

                <p><strong>Artista:</strong>
                    ${escaparHTML(musica.artistName || "Não informado")}
                </p>

                <p><strong>Álbum:</strong>
                    ${escaparHTML(musica.collectionName || "Não informado")}
                </p>

                <p><strong>Duração:</strong> ${duracao}</p>

                <p><strong>Preço:</strong>
                    ${formatarPreco(musica.trackPrice, musica.currency)}
                </p>

                <p><strong>Lançamento:</strong>
                    ${musica.releaseDate
                        ? new Date(musica.releaseDate).toLocaleDateString("pt-BR")
                        : "Não informado"}
                </p>

                <h3>Prévia da música</h3>

                ${preview}

                ${linkApple}

                <button
                    id="favoritarDetalhes"
                    class="botao-modal-favorito"
                    type="button"
                >
                    ${favorita ? "♥ Remover dos favoritos" : "♡ Adicionar aos favoritos"}
                </button>

            </div>

        </div>
    `;

    modal.classList.add("aberto");
    modal.setAttribute("aria-hidden", "false");

    document.getElementById("favoritarDetalhes")
        .addEventListener("click", () => {

            alternarFavorito(musica);
            abrirDetalhes(musica);

        });

}


/* =================================
   FECHAR MODAL
   Permite fechar pelo botão, clicando fora ou usando a tecla Escape.
================================= */

function fecharModal() {

    modal.classList.remove("aberto");
    modal.setAttribute("aria-hidden", "true");
    detalhesMusica.innerHTML = "";

}

document.getElementById("fecharModal")
    .addEventListener("click", fecharModal);

modal.addEventListener("click", evento => {

    if (evento.target === modal) {
        fecharModal();
    }

});

document.addEventListener("keydown", evento => {

    if (evento.key === "Escape") {
        fecharModal();
    }

});


/* =================================
   FAVORITOS
   Adiciona ou remove uma música da lista de favoritos.
================================= */

function alternarFavorito(musica) {

    // Procura se a música já está salva na lista.
    const indice = favoritos.findIndex(
        item => item.trackId === musica.trackId
    );

    if (indice === -1) {

        favoritos.push(musica);

    } else {

        favoritos.splice(indice, 1);

    }

    salvarFavoritos();

    atualizarFavoritos();

    renderizarMusicas(musicasExibidas);

}


// Transforma a lista em JSON e grava no armazenamento do navegador.
function salvarFavoritos() {

    localStorage.setItem(
        "somArteFavoritos",
        JSON.stringify(favoritos)
    );

}


// Atualiza os cards, a mensagem e os contadores da área de favoritos.
function atualizarFavoritos() {

    listaFavoritos.innerHTML = "";

    contadorFavoritos.textContent =
        `${favoritos.length} músicas`;

    numeroFavoritos.textContent = favoritos.length;

    if (favoritos.length === 0) {

        mensagemFavoritos.style.display = "block";

    } else {

        mensagemFavoritos.style.display = "none";

    }

    favoritos.forEach(musica => {

        listaFavoritos.appendChild(criarCard(musica));

    });

}


/* =================================
   CARREGAR FAVORITOS SALVOS
   Recupera os dados do localStorage ao abrir a página.
================================= */

function carregarFavoritos() {

    try {

        const dados = JSON.parse(
            localStorage.getItem("somArteFavoritos")
        );

        favoritos = Array.isArray(dados) ? dados : [];

    } catch (erro) {

        console.error("Erro ao recuperar favoritos:", erro);

        favoritos = [];

    }

    atualizarFavoritos();

}


/* =================================
   TEMA CLARO E ESCURO
   Salva a preferência do usuário para manter o tema após recarregar.
================================= */

function carregarTema() {

    const tema = localStorage.getItem("somArteTema");

    if (tema === "claro") {

        document.body.classList.add("tema-claro");
        botaoTema.textContent = "🌙";

    } else {

        botaoTema.textContent = "☀️";

    }

}

botaoTema.addEventListener("click", () => {

    document.body.classList.toggle("tema-claro");

    const temaClaro =
        document.body.classList.contains("tema-claro");

    localStorage.setItem(
        "somArteTema",
        temaClaro ? "claro" : "escuro"
    );

    botaoTema.textContent =
        temaClaro ? "🌙" : "☀️";

});


/* =================================
   FUNÇÕES AUXILIARES
   Funções menores usadas para formatar dados e evitar problemas no HTML.
================================= */

// Formata o preço informado pela API de acordo com a moeda recebida.
function formatarPreco(preco, moeda) {

    // Alguns resultados não possuem preço disponível na loja.
    if (typeof preco !== "number" || preco < 0 || !moeda) {
        return "Preço não informado";
    }

    try {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: moeda
        }).format(preco);
    } catch (erro) {
        return `${preco} ${moeda}`;
    }
}


// Converte a duração recebida em milissegundos para minutos e segundos.
function formatarDuracao(milissegundos) {

    const minutos = Math.floor(milissegundos / 60000);

    const segundos = Math.floor(
        (milissegundos % 60000) / 1000
    );

    return `${minutos}:${String(segundos).padStart(2, "0")}`;

}


// Trata caracteres especiais antes de inserir textos recebidos da API no HTML.
function escaparHTML(valor) {

    return String(valor ?? "").replace(/[&<>"']/g, caractere => {

        const entidades = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entidades[caractere];

    });

}


/* =================================
   INICIALIZAÇÃO
   Executa as configurações e carrega o catálogo quando a página abre.
================================= */

carregarTema();
carregarFavoritos();
buscarMusicas("MPB");
