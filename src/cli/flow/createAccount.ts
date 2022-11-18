import chalk from "chalk";

import { Usuario } from "../../objects/Usuario";
import { UsuarioAbstract } from "../../objects/UsuarioAbstract";
import { UsuarioComum } from "../../objects/UsuarioComum";
import { nomePrompt } from "../prompts/nome";
import { passwordPrompt } from "../prompts/password";
import { usernamePrompt } from "../prompts/username";

export async function createAccountFlow(): Promise<UsuarioAbstract> {
  function askForValidUsername() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<string>(async (resolve) => {
      const username = await usernamePrompt();
      Usuario.procurar(username)
        .then(async () => {
          console.log(
            chalk.red.bold(
              "> Erro nome de usuário já utilizado, por favor escolha outro nome!"
            )
          );
          resolve(await askForValidUsername());
        })
        .catch(async (e: any) => {
          if (e.message.includes("Usuário não encontrado")) resolve(username);
          else {
            console.log(
              chalk.red.bold(
                "Ocorreu um erro desconhecido ao verificar se esse nome de usuário já estava sendo utilizado, por favor utilize outro nome!"
              )
            );
            resolve(await askForValidUsername());
          }
        });
    });
  }

  const nome = await nomePrompt();

  const username = await askForValidUsername();

  const senha = await passwordPrompt();
  try {
    const usuario = await UsuarioComum.cadastrar({
      nome,
      username,
      senha,
    });
    console.log(chalk.green.bold("> Conta criada!"));
    return usuario;
  } catch (e: any) {
    console.log(
      chalk.bold.red("> Ocorreu um erro ao criar a conta: " + e.message)
    );
    process.exit(0);
  }
}
