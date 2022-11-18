import inquirer from "inquirer";

export async function nomePrompt(): Promise<string> {
  const answer = await inquirer.prompt({
    type: "input",
    name: "nome",
    message: "Digite seu nome:",
  });
  return answer.nome;
}
