export abstract class Pessoa {
  protected abstract nome: string;
  protected abstract username: string;
  protected abstract senha?: string;

  public getUsername(): string {
    return this.username;
  }

  public getNome(): string {
    return this.nome;
  }
}
