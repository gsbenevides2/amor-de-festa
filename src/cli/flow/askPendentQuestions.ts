import chalk from "chalk";
import inquirer from "inquirer";

import { PerguntaObjetiva } from "../../objects/PerguntaObjetiva";
import { UsuarioAbstract } from "../../objects/UsuarioAbstract";

export async function askPedenteQuestionsFlow(usuario: UsuarioAbstract) {
  const pendentQuestions = await usuario.obterPerguntasNaoRespondidas();
  if (pendentQuestions.length === 0) {
    console.log(chalk.yellow.bold("> Você não tem perguntas pendentes"));
    return;
  }
  console.log(
    chalk.bold.blue(
      "> Você tem perguntas pendentes, responda elas para completar seu perfil:"
    )
  );

  for (const pergunta of pendentQuestions) {
    if (pergunta instanceof PerguntaObjetiva) {
      const { resposta } = await inquirer.prompt({
        type: "list",
        name: "resposta",
        message: pergunta.getEnunciado(),
        choices: [pergunta.getAlternativa1(), pergunta.getAlternativa2()],
      });
      const alternativaEscolhida =
        resposta === pergunta.getAlternativa1() ? 1 : 2;
      await pergunta.responderPergunta(
        usuario.getUsername(),
        alternativaEscolhida
      );
    } else {
      const { resposta } = await inquirer.prompt({
        type: "input",
        name: "resposta",
        message: pergunta.getEnunciado(),
      });
      await pergunta.responderPergunta(usuario.getUsername(), resposta);
    }
  }

  console.log(chalk.green.bold("> Perguntas respondidas com sucesso!"));
}
