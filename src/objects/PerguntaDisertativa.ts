import { PerguntaDAO } from "../db/dao/PerguntaDAO";
import { Pergunta } from "./Pergunta";
import { RespostaDisertativa } from "./RespostaDisertativa";
import { Usuario } from "./Usuario";

export class PerguntaDisertativa extends Pergunta<string> {
  protected id: string;
  protected tipo: "Disertativa" | "Objetiva" = "Disertativa";
  protected enunciado: string;

  public constructor(id: string, enunciado: string) {
    super();
    this.id = id;
    this.enunciado = enunciado;
  }

  public async responderPergunta(
    usuario: Usuario,
    conteudo: string
  ): Promise<RespostaDisertativa> {
    const r = new RespostaDisertativa(this.id, usuario.getUsername(), conteudo);
    await r.salvar();
    return r;
  }

  public static async criarPergunta(enunciado: string) {
    const id = await PerguntaDAO.create({ tipo: "Disertativa", enunciado });
    return new PerguntaDisertativa(id, enunciado);
  }
}
