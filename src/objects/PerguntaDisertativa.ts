import { PerguntaAbstract } from "./PerguntaAbstract";
import { RespostaDisertativa } from "./RespostaDisertativa";

export class PerguntaDisertativa extends PerguntaAbstract<string> {
  protected id: string;
  protected tipo: "Disertativa" | "Objetiva" = "Disertativa";
  protected enunciado: string;

  public constructor(id: string, enunciado: string) {
    super();
    this.id = id;
    this.enunciado = enunciado;
  }

  public async responderPergunta(
    username: string,
    conteudo: string
  ): Promise<RespostaDisertativa> {
    const r = new RespostaDisertativa(this.id, username, conteudo);
    await r.salvar();
    return r;
  }
}
