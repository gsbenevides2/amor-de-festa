import { UsuarioAbstract } from "./UsuarioAbstract";

interface IAdminstrador {
  nome: string;
  username: string;
  senha?: string;
}

export class Adminstrador extends UsuarioAbstract {
  protected nome: string;
  protected username: string;
  protected senha?: string;
  protected tipo: "Comum" | "Administrador" = "Administrador";

  public constructor(args: IAdminstrador) {
    super();
    this.nome = args.nome;
    this.username = args.username;
    this.senha = args.senha;
  }
}
