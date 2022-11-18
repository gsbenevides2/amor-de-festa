import type { Resposta } from "./Resposta";

export abstract class PerguntaAbstract<T> {
  protected abstract id: string;
  protected abstract tipo: "Disertativa" | "Objetiva";
  protected abstract enunciado: string;

  public getId(): string {
    return this.id;
  }

  public getTipo(): "Disertativa" | "Objetiva" {
    return this.tipo;
  }

  public getEnunciado(): string {
    return this.enunciado;
  }

  public abstract responderPergunta(
    username: string,
    resposta: T
  ): Promise<Resposta>;
}
