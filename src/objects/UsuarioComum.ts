import { UsuarioDAO } from "../db/dao/UsuarioDAO";
import { UsuarioAbstract } from "./UsuarioAbstract";

interface IUsuario {
  nome: string;
  username: string;
  senha?: string;
}
interface IUsuarioWithSenha extends IUsuario {
  senha: string;
}

export class UsuarioComum extends UsuarioAbstract {
  protected nome: string;
  protected username: string;
  protected senha?: string;
  protected tipo: "Comum" | "Administrador" = "Comum";

  public constructor(args: IUsuario) {
    super();
    this.nome = args.nome;
    this.username = args.username;
    this.senha = args.senha;
  }

  public static async cadastrar(usuario: IUsuarioWithSenha) {
    await UsuarioDAO.create({ ...usuario });
    return new UsuarioComum(usuario);
  }

  
}
