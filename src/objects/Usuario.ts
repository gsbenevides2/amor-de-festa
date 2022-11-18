import { UsuarioDAO } from "../db/dao/UsuarioDAO";
import { Adminstrador } from "./Adminstrador";
import { UsuarioComum } from "./UsuarioComum";

export class Usuario {
  public static async logar(username: string, senha: string) {
    if (await UsuarioDAO.auth(username, senha)) {
      const result = await UsuarioDAO.find(username);
      if (result.tipo === "Comum")
        return new UsuarioComum({ ...result!, senha });
      else return new Adminstrador({ ...result!, senha });
    } else {
      throw new Error("Senha inválida!");
    }
  }

  public static async procurar(username: string) {
    const result = await UsuarioDAO.find(username);

    if (result.tipo === "Comum") return new UsuarioComum({ ...result });
    else return new Adminstrador({ ...result });
  }

  public static parseDb(usuario: any) {
    if (usuario.tipo === "Comum") return new UsuarioComum({ ...usuario });
    else return new Adminstrador({ ...usuario });
  }
}
