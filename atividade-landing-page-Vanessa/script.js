// ============================================================
// SELEÇÃO DOS ELEMENTOS DA PÁGINA
// ============================================================

// Seleciona o botão responsável pelo modo escuro
const botaoTema = document.getElementById("botaoTema");

// Seleciona o botão que mostra uma mensagem musical
const botaoMensagem = document.getElementById("botaoMensagem");

// Seleciona o espaço onde a mensagem será exibida
const mensagem = document.getElementById("mensagem");

// Seleciona o campo onde o usuário digitará o nome
const campoNome = document.getElementById("campoNome");

// Seleciona o elemento que exibirá a saudação
const saudacao = document.getElementById("saudacao");

// Seleciona o botão de curtida
const botaoCurtir = document.getElementById("botaoCurtir");

// Seleciona o contador de curtidas
const contador = document.getElementById("contador");


// ============================================================
// VARIÁVEL DO CONTADOR
// ============================================================

// Guarda a quantidade de curtidas
let curtidas = 0;


// ============================================================
// EVENTO CLICK - MODO ESCURO
// ============================================================

// Adiciona um evento de clique ao botão do tema
botaoTema.addEventListener("click", function () {

    // Adiciona ou remove a classe "modo-escuro" do body
    document.body.classList.toggle("modo-escuro");


    // Verifica se o modo escuro está ativado
    if (document.body.classList.contains("modo-escuro")) {

        // Altera o texto do botão
        botaoTema.textContent = "☀️ Modo claro";

    } else {

        // Volta o texto original do botão
        botaoTema.textContent = "🌙 Modo escuro";
    }

});


// ============================================================
// EVENTO CLICK - MENSAGEM MUSICAL
// ============================================================

// Adiciona um evento de clique ao botão de mensagem
botaoMensagem.addEventListener("click", function () {

    // Altera o conteúdo do elemento usando textContent
    mensagem.textContent =
        "🎵 Nunca é tarde para começar a descobrir a música!";

    // Altera a aparência do elemento usando style
    mensagem.style.fontSize = "18px";

    mensagem.style.fontWeight = "bold";

});


// ============================================================
// EVENTO INPUT - NOME DO USUÁRIO
// ============================================================

// O evento input acontece sempre que o usuário digita
campoNome.addEventListener("input", function () {

    // Pega o valor digitado pelo usuário
    const nome = campoNome.value;


    // Verifica se existe algum texto no campo
    if (nome.trim() !== "") {

        // Exibe uma mensagem personalizada
        saudacao.textContent =
            "🎶 Olá, " + nome + "! Que bom ter você por aqui. A música também é para você!";

        // Modifica a aparência da saudação
        saudacao.style.color = "#ffe0cf";

    } else {

        // Texto exibido quando o campo está vazio
        saudacao.textContent =
            "Sua mensagem aparecerá aqui.";

        // Volta a cor original
        saudacao.style.color = "white";
    }

});


// ============================================================
// EVENTO CLICK - CURTIDAS
// ============================================================

// Adiciona um evento de clique ao botão Curtir
botaoCurtir.addEventListener("click", function () {

    // Aumenta o número de curtidas em 1
    curtidas++;

    // Atualiza o conteúdo do contador
    contador.textContent = curtidas;

    // Altera o texto do botão
    botaoCurtir.textContent = "❤️ Curtido!";

    // Altera a aparência do botão
    botaoCurtir.style.transform = "scale(1.08)";

});
