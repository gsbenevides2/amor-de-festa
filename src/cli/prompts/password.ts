import inquirer from "inquirer";

export async function passwordPrompt(): Promise<string> {
  const answer = await inquirer.prompt({
    type: "password",
    name: "passoword",
    message: "Digite sua senha:",
  });
  return answer.passoword;
}
