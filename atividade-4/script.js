// ======================================================
// MINI-SISTEMA DE CADASTRO DE TAREFAS
// ======================================================


// Array que armazenará os registros
let registros = [];


// ======================================================
// RECUPERAR OS REGISTROS DO LOCALSTORAGE
// ======================================================

const dadosSalvos = localStorage.getItem("tarefas");

if (dadosSalvos) {
    registros = JSON.parse(dadosSalvos);
}


// ======================================================
// ELEMENTOS DO DOM
// ======================================================

const formulario = document.getElementById("formularioTarefa");
const listaTarefas = document.getElementById("listaTarefas");
const botaoLimpar = document.getElementById("botaoLimpar");


// ======================================================
// FUNÇÃO PARA EXIBIR AS TAREFAS
// ======================================================

function mostrarTarefas() {

    // Limpa o conteúdo anterior
    listaTarefas.innerHTML = "";

    // Verifica se não existem registros
    if (registros.length === 0) {

        listaTarefas.innerHTML = `
            <p class="vazio">
                Nenhuma tarefa cadastrada.
            </p>
        `;

        return;
    }


    // Percorre o array utilizando for...of
    for (const tarefa of registros) {

        const div = document.createElement("div");

        div.classList.add("tarefa");

        div.innerHTML = `
            <h3>${tarefa.nome}</h3>

            <p>
                <strong>Responsável:</strong>
                ${tarefa.responsavel}
            </p>

            <p>
                <strong>Prioridade:</strong>
                ${tarefa.prioridade}
            </p>
        `;

        listaTarefas.appendChild(div);
    }
}


// ======================================================
// CADASTRAR NOVA TAREFA
// ======================================================

formulario.addEventListener("submit", function(event) {

    // Impede o recarregamento da página
    event.preventDefault();


    // Captura os valores digitados
    const nome = document.getElementById("nomeTarefa").value;
    const responsavel = document.getElementById("responsavel").value;
    const prioridade = document.getElementById("prioridade").value;


    // Cria um novo objeto
    const novaTarefa = {

        nome: nome,

        responsavel: responsavel,

        prioridade: prioridade
    };


    // Adiciona o objeto ao array
    registros.push(novaTarefa);


    // Converte o array de objetos para JSON
    localStorage.setItem(
        "tarefas",
        JSON.stringify(registros)
    );


    // Atualiza a lista na tela
    mostrarTarefas();


    // Limpa o formulário
    formulario.reset();

});


// ======================================================
// BOTÃO PARA LIMPAR OS REGISTROS
// ======================================================

botaoLimpar.addEventListener("click", function() {

    registros = [];

    localStorage.removeItem("tarefas");

    mostrarTarefas();

});


// ======================================================
// MOSTRAR OS REGISTROS AO CARREGAR A PÁGINA
// ======================================================

mostrarTarefas();
