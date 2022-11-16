import { Pergunta } from "./Pergunta";
import { Usuario } from "./Usuario";

export abstract class Resposta {
  protected abstract pergunta: string;
  protected abstract usuario: string;

  public abstract salvar(): Promise<void>;

  public async getPergunta(): Promise<Pergunta<any>> {
    return await Pergunta.procurar(this.pergunta);
  }

  public async getUsuario(): Promise<Usuario> {
    return (await Usuario.procurar(this.usuario)) as Usuario;
  }

  public mesmaPergunta(resposta: Resposta): boolean {
    return this.pergunta === resposta.pergunta;
  }

  public abstract mesmaResposta(resposta: Resposta): boolean;
}
