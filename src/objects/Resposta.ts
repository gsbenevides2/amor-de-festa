// import { Pergunta } from "./Pergunta";
import type { PerguntaAbstract } from "./PerguntaAbstract";
import { Usuario } from "./Usuario";
import type { UsuarioAbstract } from "./UsuarioAbstract";

export abstract class Resposta {
  protected abstract pergunta: string;
  protected abstract usuario: string;

  public abstract salvar(): Promise<void>;

  public abstract getPergunta(): Promise<PerguntaAbstract<any>>;

  public async getUsuario(): Promise<UsuarioAbstract> {
    return await Usuario.procurar(this.usuario);
  }

  public respostasDeMesmaPergunta(resposta: Resposta): boolean {
    return this.pergunta === resposta.pergunta;
  }

  public respostaDessaPergunta(pergunta: PerguntaAbstract<any>): boolean {
    return this.pergunta === pergunta.getId();
  }

  public abstract mesmaResposta(resposta: Resposta): boolean;
}
