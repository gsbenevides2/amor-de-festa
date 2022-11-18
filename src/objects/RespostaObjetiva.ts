import { PerguntaDAO } from "../db/dao/PerguntaDAO";
import { RespostaDAO } from "../db/dao/RespostaDAO";
import { PerguntaObjetiva } from "./PerguntaObjetiva";
import { Resposta } from "./Resposta";

export class RespostaObjetiva extends Resposta {
  protected pergunta: string;
  protected usuario: string;
  protected alternativaEscolhida: 1 | 2;

  public constructor(
    pergunta: string,
    usuario: string,
    alternativaEscolhida: 1 | 2
  ) {
    super();
    this.pergunta = pergunta;
    this.usuario = usuario;
    this.alternativaEscolhida = alternativaEscolhida;
  }

  public async salvar(): Promise<void> {
    await RespostaDAO.create({
      usuario: this.usuario,
      pergunta: this.pergunta,
      alternativaEscolhida: this.alternativaEscolhida,
    });
  }

  public mesmaResposta(resposta: RespostaObjetiva): boolean {
    return resposta.alternativaEscolhida === this.alternativaEscolhida;
  }

  public async getPergunta(): Promise<PerguntaObjetiva> {
    const result = await PerguntaDAO.find(this.pergunta);
    if (result.tipo === "Disertativa")
      throw new Error("Tipo de pergunta incorreto");
    else
      return new PerguntaObjetiva(
        result.id,
        result.enunciado,
        result.alternativa1,
        result.alternativa2
      );
  }
}
