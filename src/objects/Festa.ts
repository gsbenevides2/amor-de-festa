import { FestaDAO } from "../db/dao/FestaDAO";
import { UsuarioDAO } from "../db/dao/UsuarioDAO";
import { Adminstrador } from "./Adminstrador";
import { Resposta } from "./Resposta";
import { Usuario } from "./Usuario";
import { UsuarioAbstract } from "./UsuarioAbstract";
// import { UsuarioComum } from "./UsuarioComum";

interface IFesta {
  id: string;
  nome: string;
  local: string;
  horario: string;
  adminstrador: string;
}

type UsuariosSimilar = Array<{
  usuario: UsuarioAbstract;
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

  public getId() {
    return this.id;
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
    return (await Usuario.procurar(this.adminstrador)) as Adminstrador;
  }

  public async getParticipantes(): Promise<UsuarioAbstract[]> {
    const participantes = await UsuarioDAO.findByFesta(this.id);
    return participantes.map((participante) => Usuario.parseDb(participante));
  }

  public async procurarUsuariosSimilares(
    usuarioA: UsuarioAbstract
  ): Promise<UsuariosSimilar> {
    async function pontuarRespostasUsuario(
      respostasCorretas: Resposta[],
      usuarioB: UsuarioAbstract
    ): Promise<number> {
      const respostasUsuario = await usuarioB.getRespostas();
      let pontuacao = 0;
      for (let i = 0; i < respostasCorretas.length; i++) {
        const respostaCorreta = respostasCorretas[i];
        const respostaInformada = respostasUsuario.find((resposta) =>
          resposta.respostasDeMesmaPergunta(respostaCorreta)
        );

        if (respostaInformada) {
          if (respostaInformada.mesmaResposta(respostaCorreta)) {
            pontuacao += 2;
          } else {
            pontuacao -= 1;
          }
        }
      }
      return pontuacao;
    }

    const usuarios = await this.getParticipantes();
    const usuariosSimilar = usuarios
      .filter((u) => u.getUsername() !== usuarioA.getUsername())
      .map(async (u) => {
        return {
          usuario: u,
          pontuacao: await pontuarRespostasUsuario(
            await usuarioA.getRespostas(),
            u
          ),
        };
      });
    return (await Promise.all(usuariosSimilar)).sort(
      (a, b) => b.pontuacao - a.pontuacao
    );
  }

  public async incluirParticipante(usuario: string) {
    await FestaDAO.addUsuario(this.id, usuario);
  }

  public static async listarFestas(): Promise<Festa[]> {
    const festas = await FestaDAO.findAll();
    return festas.map((festa) => new Festa(festa));
  }
}
