import chalk from "chalk";
import inquirer from "inquirer";

import { Festa } from "../../objects/Festa";

export async function createFestaFlow(username: string) {
  const { nome, local, horario, confirmar } = await inquirer.prompt([
    {
      type: "input",
      name: "nome",
      message: "Qual o nome da festa?",
    },
    {
      type: "input",
      name: "local",
      message: "Qual o local da festa?",
    },
    {
      type: "input",
      name: "horario",
      message: "Qual o horário da festa?",
    },
    {
      type: "confirm",
      name: "confirmar",
      message: "Deseja confirmar a criação da festa?",
    },
  ]);
  if (confirmar) {
    await Festa.criar({
      adminstrador: username,
      nome,
      horario,
      local,
    });
    console.log(chalk.green.bold("> Festa criada com sucesso!"));
  } else {
    console.log(chalk.yellow.bold("> Festa não criada!"));
  }
}
