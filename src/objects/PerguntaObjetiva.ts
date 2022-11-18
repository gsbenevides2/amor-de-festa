import { PerguntaAbstract } from "./PerguntaAbstract";
import { RespostaObjetiva } from "./RespostaObjetiva";

export class PerguntaObjetiva extends PerguntaAbstract<1 | 2> {
  protected id: string;
  protected tipo: "Disertativa" | "Objetiva" = "Objetiva";
  protected enunciado: string;
  protected alternativa1: string;
  protected alternativa2: string;

  public getAlternativa1(): string {
    return this.alternativa1;
  }

  public getAlternativa2(): string {
    return this.alternativa2;
  }

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
    username: string,
    alternativaEscolhida: 1 | 2
  ): Promise<RespostaObjetiva> {
    const r = new RespostaObjetiva(this.id, username, alternativaEscolhida);
    await r.salvar();
    return r;
  }
}
