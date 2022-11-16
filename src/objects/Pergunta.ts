import { PerguntaDAO } from "../db/dao/PerguntaDAO";
import { PerguntaDisertativa } from "./PerguntaDisertativa";
import { PerguntaObjetiva } from "./PerguntaObjetiva";
import { Resposta } from "./Resposta";
import { Usuario } from "./Usuario";

export abstract class Pergunta<T> {
  protected abstract id: string;
  protected abstract tipo: "Disertativa" | "Objetiva";
  protected abstract enunciado: string;

  public getId(): string {
    return this.id;
  }

  public abstract responderPergunta(
    usuario: Usuario,
    resposta: T
  ): Promise<Resposta>;

  public static async procurar(id: string): Promise<Pergunta<any>> {
    const result = await PerguntaDAO.find(id);
    if (result.tipo === "Disertativa")
      return new PerguntaDisertativa(result.id, result.enunciado);
    else
      return new PerguntaObjetiva(
        result.id,
        result.enunciado,
        result.alternativa1,
        result.alternativa2
      );
  }
}
