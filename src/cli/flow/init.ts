import chalk from "chalk";
import clear from "clear";
import inquirer from "inquirer";
import PressToContinuePrompt from "inquirer-press-to-continue";

import { UsuarioAbstract } from "../../objects/UsuarioAbstract";
import { createAccountFlow } from "./createAccount";
import { initMenuFlow } from "./initialMenu";
import { signInFlow } from "./signIn";
// import type { KeyDescriptor } from "inquirer-press-to-continue";

inquirer.registerPrompt("press-to-continue", PressToContinuePrompt);

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

  await inquirer.prompt({
    // @ts-ignore: Type 'KeyDescriptor' is not assignable to type 'string'.
    name: "press",
    type: "press-to-continue",
    anyKey: true,
    pressToContinueMessage: "Pressione uma tecla para continuar",
  });

  clear();

  await initMenuFlow(usuario);
}
