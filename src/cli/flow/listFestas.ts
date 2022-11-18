import chalk from "chalk";
import inquirer from "inquirer";

import { Festa } from "../../objects/Festa";
import { UsuarioAbstract } from "../../objects/UsuarioAbstract";

export async function listFestasFlow(usuario: UsuarioAbstract) {
  const festas = await Festa.listarFestas();
  const festaText = festas.map(
    (festa) =>
      `${festa.getNome()} - ${festa.getLocal()} - ${festa.getHorario()}`
  );

  const { festaEscolhidaText } = await inquirer.prompt({
    type: "list",
    name: "festaEscolhidaText",
    message: "Escolha uma festa para ver os detalhes",
    choices: festaText,
  });
  const festaEscolhida =
    festas[festaText.findIndex((f) => f === festaEscolhidaText)];
  console.log(chalk.bold("> Detalhes da festa escolhida:"));
  console.log(`> Nome: ${festaEscolhida.getNome()}`);
  console.log(`> Local: ${festaEscolhida.getLocal()}`);
  console.log(`> Horário: ${festaEscolhida.getHorario()}`);

  const festasDoUsuario = await usuario.getFestas();
  const festaJaEstaNaLista = festasDoUsuario.some(
    (festa) => festa.getId() === festaEscolhida.getId()
  );
  const choices = [];
  if (festaJaEstaNaLista) {
    console.log(chalk.bold.yellow("> Você já está participando dessa festa!"));
  } else {
    choices.push("Participar dessa festa");
  }
  choices.push("Ver pessoas similiar a você que vão na festa!");
  choices.push("Voltar");

  const { opção } = await inquirer.prompt({
    type: "list",
    name: "opção",
    message: "O que deseja fazer?",
    choices,
  });

  if (opção === "Participar dessa festa") {
    await festaEscolhida.incluirParticipante(usuario.getUsername());
    console.log(
      chalk.bold.green("> Você agora está participando dessa festa!")
    );
  } else if (opção === "Ver pessoas similiar a você que vão na festa!") {
    const pessoasSimilares = await festaEscolhida.procurarUsuariosSimilares(
      usuario
    );
    console.log(chalk.bold("> Pessoas similares que vão na festa:"));
    if (pessoasSimilares.length === 0) {
      console.log(chalk.bold.yellow("> Nenhuma pessoa similar encontrada!"));
    }
    pessoasSimilares.forEach((pessoa) => {
      console.log(
        `> ${pessoa.usuario.getUsername()} - Pontos: ${pessoa.pontuacao}`
      );
    });
  }
}
