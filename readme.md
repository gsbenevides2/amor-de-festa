<p align="center"><h1 align="center">Amor de Festa</h1></p>

<p align="center"><img src="https://raw.githubusercontent.com/gsbenevides2/amor-de-festa/main/.github/images/captura_de_tela.png"></p>

## Descrição

Um sistema simples que possibilita encontrar pessoas com perfil semelhante em festas a partir de perguntas e respostas.

## Proposta

Atividade de modelagem e implementação das classes do sistema descrito pelo professor [Leandro Luque](https://github.com/leluque), na disciplina de Engenharia de Software II, do curso de Análise e Desenvolvimento de Sistemas, da [Faculdade de Tecnologia de Mogi das Cruzes](https://fatecmogidascruzes.com.br).

### Enunciado da Atividade

Desiludido com o amor, você resolveu iniciar uma nova startup: Amor de Festa. A ideia é unir participantes de festas por meio de coisas que eles tenham em comum. De modo geral, uma pessoa vai se cadastrar na sua plataforma e será um usuário. Ainda, ele deverá informar algumas de suas preferências no seu perfil. Você, como administrador, pode cadastrar festas. Os usuários, por sua vez, podem dizer que vão a uma festa. O sistema, então, compara as respostas dos perfis dos usuários e indica para cada um deles quais são os outros com os quais há maior similaridade. O cálculo de similaridade ocorre da seguinte forma:

- Respostas iguais para a mesma pergunta somam 2 pontos cada;
- Respostas diferentes para a mesma pergunta subtraem 1 ponto cada;

Após estudar os fatores que realmente fazem diferença no amor, você definiu que a composição do perfil é formada pelas seguintes perguntas:

1. Fala Iogurte ou Iorgute?
2. Para qual time torce (nome do time)?
3. Prefere rock ou pagode?
4. Heineken ou Skol?
5. No fim de semana, dorme ou vai para a balada?
6. Raul Seixas ou Queen?

Escreva uma solução orientada a objetos (modelo de classes, código e principal) para o problema.

## Diagrama de Classes

<p align="center"><img src="https://raw.githubusercontent.com/gsbenevides2/amor-de-festa/master/.github/images/classes.png"></p>

Diagrama desenvolvido com uso da extensão [UMLet](<https://marketplace.visualstudio.com/items?itemName=TheUMLetTeam.umlet>)  para Vscode.

## Tecnologias

- [TypeScript](https://www.typescriptlang.org/) (Linguagem de programação fortemente tipada baseada em JavaScript)
- [Node.js](https://nodejs.org/en/) (Ambiente de execução JavaScript)
- [Inquirer](https://www.npmjs.com/package/inquirer) (Lib para intefraces de linha de comando)
- [SQLite](https://www.sqlite.org/index.html) (Banco de dados relacional)
- [EsLint](https://eslint.org/) (Ferramenta de linting para JavaScript)
- [Prettier](https://prettier.io/) (Ferramenta de formatação de código)
- [Yarn](https://yarnpkg.com/) (Gerenciador de pacotes)

## Como executar

### Pré-requisitos

- Node.js (preferencialmente a versão LTS);
- NPM, ou de preferencia o Yarn.

### Instalação

- Clone o repositório;
- Execute o comando `yarn` ou `npm install` para instalar as dependências;
- Execute o comando `yarn build` ou `npm run build` para compilar o projeto;
- Execute o comando `yarn start` ou `npm run start` para executar o projeto.

## Licença

Este prejeto está sobre a Licença MIT - veja o arquivo [LICENSE](
    https://github.com/gsbenevides2/faltas/blob/master/LICENSE) para mais detalhes.

<p align="center">Construído com ❤ por gsbenevides2</p>
