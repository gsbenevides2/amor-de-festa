import { FestaDAO } from "../db/dao/FestaDAO";
import { UsuarioDAO } from "../db/dao/UsuarioDAO";
import { Adminstrador } from "./Adminstrador";
import { Resposta } from "./Resposta";
import { Usuario } from "./Usuario";

interface IFesta {
  id: string;
  nome: string;
  local: string;
  horario: string;
  adminstrador: string;
}

type UsuariosSimilar = Array<{
  usuario: Usuario;
  pontuacao: number;
}>;

export class Festa {
  protected id: string;
  protected nome: string;
  protected local: string;
  protected horario: string;
  private adminstrador: string;

  public constructor(args: IFesta) {
    this.id = args.id;
    this.nome = args.nome;
    this.local = args.local;
    this.horario = args.horario;
    this.adminstrador = args.adminstrador;
  }

  public static async criar(args: Omit<IFesta, "id">) {
    const id = await FestaDAO.create(args);
    return new Festa({ ...args, id });
  }

  public getNome() {
    return this.nome;
  }

  public getLocal() {
    return this.local;
  }

  public getHorario() {
    return this.horario;
  }

  public async getAdminstrador() {
    return await Adminstrador.procurar(this.adminstrador);
  }

  public async getParticipantes(): Promise<Usuario[]> {
    const participantes = await UsuarioDAO.findByFesta(this.id);
    return participantes.map((participante) => new Usuario(participante));
  }

  public async procurarUsuariosSimilares(
    usuarioA: Usuario
  ): Promise<UsuariosSimilar> {
    async function pontuarRespostasUsuario(
      respostasCorretas: Resposta[],
      usuarioB: Usuario
    ): Promise<number> {
      const respostasUsuario = await usuarioB.getRespostas();
      let pontuacao = 0;
      for (let i = 0; i < respostasCorretas.length; i++) {
        const respostaCorreta = respostasCorretas[i];
        const respostaInformada = respostasUsuario.find((resposta) =>
          resposta.mesmaResposta(respostaCorreta)
        );

        if (respostaInformada) {
          if (respostaInformada.mesmaResposta(respostaCorreta)) {
            pontuacao++;
          }
        }
      }
      return pontuacao;
    }

    const usuarios = await this.getParticipantes();
    const usuariosSimilar = usuarios.map(async (u) => {
      return {
        usuario: u,
        pontuacao: await pontuarRespostasUsuario(
          await usuarioA.getRespostas(),
          u
        ),
      };
    });
    return await Promise.all(usuariosSimilar);
  }

  public async incluirParticipante(usuario: string) {
    await FestaDAO.addUsuario(this.id, usuario);
  }

  public static async listarFestas(): Promise<Festa[]> {
    const festas = await FestaDAO.findAll();
    return festas.map((festa) => new Festa(festa));
  }
}
