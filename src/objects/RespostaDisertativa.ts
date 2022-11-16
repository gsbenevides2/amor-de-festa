import { RespostaDAO } from "../db/dao/RespostaDAO";
import { Resposta } from "./Resposta";

export class RespostaDisertativa extends Resposta {
  protected pergunta: string;
  protected usuario: string;
  protected conteudo: string;

  public constructor(pergunta: string, usuario: string, conteudo: string) {
    super();
    this.pergunta = pergunta;
    this.usuario = usuario;
    this.conteudo = conteudo;
  }

  public async salvar(): Promise<void> {
    await RespostaDAO.create({
      usuario: this.usuario,
      pergunta: this.pergunta,
      conteudo: this.conteudo,
    });
  }

  public mesmaResposta(resposta: RespostaDisertativa): boolean {
    return resposta.conteudo === this.conteudo;
  }
}
