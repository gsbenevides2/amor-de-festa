import inquirer from "inquirer";

export async function usernamePrompt(): Promise<string> {
  const answer = await inquirer.prompt({
    type: "input",
    name: "username",
    message: "Digite seu nome de usuário:",
  });
  return answer.username;
}
