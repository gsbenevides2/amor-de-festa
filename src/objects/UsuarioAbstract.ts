import { FestaDAO } from "../db/dao/FestaDAO";
import { RespostaDAO } from "../db/dao/RespostaDAO";
import { Festa } from "./Festa";
import { Pergunta } from "./Pergunta";
import type { Resposta } from "./Resposta";
import { RespostaDisertativa } from "./RespostaDisertativa";
import { RespostaObjetiva } from "./RespostaObjetiva";

export abstract class UsuarioAbstract {
  protected abstract nome: string;
  protected abstract username: string;
  protected abstract senha?: string;
  protected abstract tipo: "Comum" | "Administrador";

  public getUsername(): string {
    return this.username;
  }

  public getNome(): string {
    return this.nome;
  }

  public async getRespostas(): Promise<Resposta[]> {
    const result = await RespostaDAO.findByUsuario(this.username);
    return result.map((resposta) => {
      if ("conteudo" in resposta && resposta.conteudo !== null)
        return new RespostaDisertativa(
          resposta.pergunta,
          resposta.usuario,
          resposta.conteudo
        );
      else if (
        "alternativaEscolhida" in resposta &&
        resposta.alternativaEscolhida !== null
      )
        return new RespostaObjetiva(
          resposta.pergunta,
          resposta.usuario,
          resposta.alternativaEscolhida
        );
      else throw new Error("Resposta inválida!");
    });
  }

  public async getFestas(): Promise<Festa[]> {
    const result = await FestaDAO.findByUsuario(this.username);
    return result.map((festa) => new Festa(festa));
  }

  public async obterPerguntasNaoRespondidas() {
    const todasAsPerguntas = await Pergunta.listar();

    const perguntasRespondidas = await this.getRespostas();
    const perguntasNaoRespondidas = todasAsPerguntas.filter((pergunta) => {
      const test = perguntasRespondidas.findIndex((resposta) =>
        resposta.respostaDessaPergunta(pergunta)
      );
      return test === -1;
    });
    return perguntasNaoRespondidas;
  }
}
