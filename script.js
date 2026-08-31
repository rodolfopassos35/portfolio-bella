let todosModelos = [];

const containerGaleria = document.getElementById("galeria-modelos");
const botoesFiltro = document.querySelectorAll(".btn-filtro");

// Buscar dados do JSON e inicializar a página
async function carregarModelos() {
  try {
    const resposta = await fetch("modelos.json");
    todosModelos = await resposta.json();
    renderizarCards(todosModelos);
  } catch (erro) {
    console.error("Erro ao carregar os modelos:", erro);
    containerGaleria.innerHTML = "<p>Erro ao carregar a galeria.</p>";
  }
}

// Renderizar cards na tela (ESTRUTURA ATUALIZADA)
function renderizarCards(modelos) {
  containerGaleria.innerHTML = modelos
    .map(
      (modelo) => `
    <article class="card-moderno" data-categoria="${modelo.categoria}">
      <img src="${modelo.imagem}" alt="${modelo.titulo}" loading="lazy">
      <div class="card-overlay">
        <h3>${modelo.titulo}</h3>
        <p>${modelo.descricao}</p>
      </div>
    </article>
  `,
    )
    .join("");
}
// Filtrar modelos por categoria
function filtrarModelos(categoria) {
  if (categoria === "todos") {
    renderizarCards(todosModelos);
  } else {
    const modelosFiltrados = todosModelos.filter(
      (item) => item.categoria === categoria,
    );
    renderizarCards(modelosFiltrados);
  }
}

// Event Listeners nos botões de filtro
botoesFiltro.forEach((botao) => {
  botao.addEventListener("click", (e) => {
    botoesFiltro.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

    const categoriaSelecionada = e.target.getAttribute("data-categoria");
    filtrarModelos(categoriaSelecionada);
  });
});

// Inicialização
carregarModelos();
