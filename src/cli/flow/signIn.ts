import chalk from "chalk";

import { Usuario } from "../../objects/Usuario";
import { UsuarioAbstract } from "../../objects/UsuarioAbstract";
import { passwordPrompt } from "../prompts/password";
import { usernamePrompt } from "../prompts/username";

export async function signInFlow(): Promise<UsuarioAbstract> {
  let usuario: UsuarioAbstract;
  while (true) {
    try {
      const username = await usernamePrompt();
      usuario = (await Usuario.procurar(username)) as UsuarioAbstract;
      break;
    } catch (e: any) {
      if (e.message.includes("Usuário não encontrado")) {
        console.log(
          chalk.bold.red(
            "> Erro: nome de usuário não encontrado. Verifique se você digitou corretamente, e tente novamente"
          )
        );
      } else {
        console.log(
          chalk.red.bold(
            "Ocorreu um erro ao verificar nome de usuário tente novamete."
          )
        );
      }
    }
  }
  while (true) {
    const password = await passwordPrompt();
    try {
      usuario = await Usuario.logar(usuario?.getUsername() as string, password);
      break;
    } catch (e: any) {
      if (e.message.includes("Senha inválida"))
        console.log(chalk.red.bold("> Senha Inválida!"));
      else
        console.log(
          chalk.red.bold(
            "Ocorreu um erro ao logar. Tente digitar sua senha novamente!"
          )
        );
    }
  }
  console.log(chalk.green.bold("> Seja bem vindo " + usuario.getNome()));
  return usuario;
}
