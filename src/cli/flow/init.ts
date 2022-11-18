import chalk from "chalk";
import inquirer from "inquirer";

import { UsuarioAbstract } from "../../objects/UsuarioAbstract";
import { createAccountFlow } from "./createAccount";
import { initMenuFlow } from "./initialMenu";
import { signInFlow } from "./signIn";

export async function initFlow() {
  console.log(chalk.bold.blue("> Seja bem-vindo ao Amor de Festa!"));
  const { desejaCriarUmaConta } = await inquirer.prompt({
    type: "confirm",
    name: "desejaCriarUmaConta",
    message: "Deseja criar uma conta?",
  });
  let usuario: UsuarioAbstract;
  if (desejaCriarUmaConta) usuario = await createAccountFlow();
  else usuario = await signInFlow();
  await initMenuFlow(usuario);
}
