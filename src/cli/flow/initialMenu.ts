import chalk from "chalk";
import inquirer from "inquirer";

import { Adminstrador } from "../../objects/Adminstrador";
import { UsuarioAbstract } from "../../objects/UsuarioAbstract";
import { askPedenteQuestionsFlow } from "./askPendentQuestions";
import { createFestaFlow } from "./createFesta";
import { createPerguntaFlow } from "./createPergunta";
import { listFestasFlow } from "./listFestas";
import { listMyFestasFlow } from "./listMyFestas";

export async function initMenuFlow(usuario: UsuarioAbstract) {
  await askPedenteQuestionsFlow(usuario);
  const choices = [];
  if (usuario instanceof Adminstrador) {
    choices.push("Criar festa");
    choices.push("Criar pergunta");
  }
  choices.push("Ver quais festas você irá participar");
  choices.push("Listar festas");
  choices.push("Sair");

  const { opção } = await inquirer.prompt({
    type: "list",
    name: "opção",
    message: "O que deseja fazer?",
    choices,
  });

  if (opção === "Criar festa") await createFestaFlow(usuario.getUsername());
  else if (opção === "Listar festas") await listFestasFlow(usuario);
  else if (opção === "Ver quais festas você irá participar")
    await listMyFestasFlow(usuario);
  else if (opção === "Criar pergunta") await createPerguntaFlow();

  if (opção !== "Sair") {
    await initMenuFlow(usuario);
  } else {
    console.log(chalk.bold.blue("> Até mais!"));
    process.exit(0);
  }
}
