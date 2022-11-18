import inquirer from "inquirer";

import { Festa } from "../../objects/Festa";

export async function selectFestaPrompt(festas: Festa[]): Promise<Festa> {
  const festasText = festas.map(
    (festa, index) => `${index} - ${festa.getNome()}`
  );
  const answer = await inquirer.prompt({
    name: "festa",
    type: "list",
    message: "Selecione uma festa:",
    choices: festasText,
  });

  return festas[festasText.findIndex((v) => v === answer.festa)];
}
