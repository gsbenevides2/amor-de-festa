import chalk from "chalk";
import inquirer from "inquirer";

import { Pergunta } from "../../objects/Pergunta";

export async function createPerguntaFlow() {
  let alternativa1, alternativa2;
  const { enunciado, tipo } = await inquirer.prompt([
    {
      type: "input",
      name: "enunciado",
      message: "Digite o enunciado da pergunta",
    },
    {
      type: "list",
      name: "tipo",
      message: "Qual o tipo da pergunta?",
      choices: ["Objetiva", "Disertativa"],
    },
  ]);

  if (tipo === "Objetiva") {
    const alternativas = await inquirer.prompt([
      {
        type: "input",
        name: "alternativa1",
        message: "Digite a 1ª alternativa da pergunta:",
      },
      {
        type: "input",
        name: "alternativa2",
        message: "Digite a 2ª alternativa da pergunta:",
      },
    ]);

    alternativa1 = alternativas.alternativa1;
    alternativa2 = alternativas.alternativa2;
  }

  await Pergunta.criarPergunta({
    tipo,
    enunciado,
    alternativa1,
    alternativa2,
  });
  console.log(chalk.green.bold("> Pergunta criada com sucesso!"));
}
