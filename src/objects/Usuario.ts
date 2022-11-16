import { FestaDAO } from "../db/dao/FestaDAO";
import { RespostaDAO } from "../db/dao/RespostaDAO";
import { UsuarioDAO } from "../db/dao/UsuarioDAO";
import { Festa } from "./Festa";
import { Pessoa } from "./Pessoa";
import { Resposta } from "./Resposta";
import { RespostaDisertativa } from "./RespostaDisertativa";
import { RespostaObjetiva } from "./RespostaObjetiva";

interface IUsuario {
  nome: string;
  username: string;
  senha?: string;
}

export class Usuario extends Pessoa {
  protected nome: string;
  protected username: string;
  protected senha?: string;

  public constructor(args: IUsuario) {
    super();
    this.nome = args.nome;
    this.username = args.username;
    this.senha = args.senha;
  }

  public static async cadastrar(usuario: IUsuario) {
    try {
      await UsuarioDAO.create({ ...usuario, senha: usuario.senha! });
      return new Usuario(usuario);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  public static async logar(username: string, senha: string) {
    try {
      if (await UsuarioDAO.auth(username, senha)) {
        const result = await UsuarioDAO.find(username);
        return new Usuario({ ...result!, senha });
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
      const result = await UsuarioDAO.find(username);
      if (result) {
        return new Usuario(result);
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  public async getFestas(): Promise<Festa[]> {
    const result = await FestaDAO.findByUsuario(this.username);
    return result.map((festa) => new Festa(festa));
  }

  public async getRespostas(): Promise<Resposta[]> {
    const result = await RespostaDAO.findByUsuario(this.username);
    return result.map((resposta) => {
      if ("conteudo" in resposta)
        return new RespostaDisertativa(
          resposta.pergunta,
          resposta.usuario,
          resposta.conteudo
        );
      else
        return new RespostaObjetiva(
          resposta.pergunta,
          resposta.usuario,
          resposta.alternativaEscolhida
        );
    });
  }
}
