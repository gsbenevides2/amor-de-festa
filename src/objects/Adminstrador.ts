/* eslint-disable no-unreachable */
import { AdminstradorDAO } from "../db/dao/AdminstradorDAO";
import { Pessoa } from "./Pessoa";

interface IAdminstrador {
  nome: string;
  username: string;
  senha: string;
}

export class Adminstrador extends Pessoa {
  protected nome: string;
  protected username: string;
  protected senha: string;

  private constructor(args: IAdminstrador) {
    super();
    this.nome = args.nome;
    this.username = args.username;
    this.senha = args.senha;
  }

  public static async cadastrar(args: IAdminstrador) {
    try {
      await AdminstradorDAO.create(args);
      return new Adminstrador(args);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  public static async logar(username: string, senha: string) {
    try {
      if (await AdminstradorDAO.auth(username, senha)) {
        const result = await AdminstradorDAO.find(username);
        return new Adminstrador({ ...result, senha });
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  public static async procurar(username: string) {
    try {
      const result = await AdminstradorDAO.find(username);
      return new Adminstrador(result);
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
