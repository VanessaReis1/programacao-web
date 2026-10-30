# Som & Arte — Catálogo Musical

## Integrante
- Vanessa Joana Reis Lima

## Sobre o projeto
O Som & Arte é uma aplicação web desenvolvida para a disciplina de Programação Web. O projeto consulta uma API pública de música e permite pesquisar faixas, visualizar informações, ouvir prévias quando disponíveis e salvar músicas favoritas.

## Tecnologias utilizadas
- HTML5 para a estrutura semântica da página;
- CSS3 para estilização e responsividade;
- JavaScript para eventos, manipulação do DOM e consumo da API;
- iTunes Search API para consultar músicas e seus metadados;
- localStorage para manter os favoritos e a preferência de tema no navegador.

## Funcionalidades
- Listagem de músicas com capa, título, artista e preço quando informado pela API;
- Pesquisa por nome de música ou artista;
- Exibição de detalhes, como álbum, gênero, duração e data de lançamento;
- Reprodução de prévia de áudio quando disponibilizada pela API;
- Adição e remoção de músicas dos favoritos;
- Persistência dos favoritos após recarregar a página;
- Alternância entre tema claro e escuro, com preferência salva;
- Mensagens de carregamento, lista vazia e falha na comunicação com a API.

## API utilizada
**iTunes Search API**  
Endpoint: `https://itunes.apple.com/search`  
Documentação: https://performance-partners.apple.com/search-api

A aplicação realiza requisições HTTP do tipo GET utilizando `fetch()` e `async/await`. Os resultados são recebidos em JSON e exibidos dinamicamente na página. A API pode não fornecer preço para todas as faixas; nesses casos, a aplicação informa que o preço não está disponível.

## Como executar
1. Baixe ou clone este repositório.
2. Abra a pasta do projeto no Visual Studio Code.
3. Execute o arquivo `index.html` com a extensão Live Server (ou utilize outro servidor local estático).
4. Aguarde o carregamento do catálogo e utilize a pesquisa.
5. Para testar os favoritos, adicione ou remova músicas e atualize a página para verificar a persistência.

É necessária conexão com a internet para consultar a API e carregar as capas e prévias de áudio.

## Organização dos arquivos
- `index.html` — estrutura da aplicação;
- `style.css` — estilos e adaptação para dispositivos móveis;
- `script.js` — consulta à API, manipulação do DOM, pesquisa, detalhes, favoritos e tema.
