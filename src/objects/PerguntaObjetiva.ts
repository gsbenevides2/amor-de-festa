import { PerguntaDAO } from "../db/dao/PerguntaDAO";
import { Pergunta } from "./Pergunta";
import { RespostaObjetiva } from "./RespostaObjetiva";
import { Usuario } from "./Usuario";

export class PerguntaObjetiva extends Pergunta<1 | 2> {
  protected id: string;
  protected tipo: "Disertativa" | "Objetiva" = "Objetiva";
  protected enunciado: string;
  protected alternativa1: string;
  protected alternativa2: string;

  public constructor(
    id: string,
    enunciado: string,
    alternativa1: string,
    alternativa2: string
  ) {
    super();
    this.id = id;
    this.enunciado = enunciado;
    this.alternativa1 = alternativa1;
    this.alternativa2 = alternativa2;
  }

  public async responderPergunta(
    usuario: Usuario,
    alternativaEscolhida: 1 | 2
  ): Promise<RespostaObjetiva> {
    const r = new RespostaObjetiva(
      this.id,
      usuario.getUsername(),
      alternativaEscolhida
    );
    await r.salvar();
    return r;
  }

  public static async criarPergunta(
    enunciado: string,
    alternativa1: string,
    alternativa2: string
  ) {
    const id = await PerguntaDAO.create({
      tipo: "Objetiva",
      enunciado,
      alternativa1,
      alternativa2,
    });
    return new PerguntaObjetiva(id, enunciado, alternativa1, alternativa2);
  }
}
