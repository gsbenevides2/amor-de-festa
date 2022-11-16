import { Connection } from "../connection";

interface IRespostaDAOObjetiva {
  usuario: string;
  pergunta: string;
  alternativaEscolhida: 1 | 2;
}
interface IRespostaDAODisertativa {
  usuario: string;
  pergunta: string;
  conteudo: string;
}

type IRespostaDAO = IRespostaDAOObjetiva | IRespostaDAODisertativa;

export const RespostaDAO = {
  async createTable() {
    const instance = await Connection.getInstance();
    const statement = await instance.prepare(
      `CREATE TABLE IF NOT EXISTS respostas (
                usuario TEXT NOT NULL,
                pergunta TEXT NOT NULL,
                alternativaEscolhida INTEGER,
                conteudo TEXT,
                PRIMARY KEY (usuario, pergunta),
                FOREIGN KEY (usuario) REFERENCES usuarios(username),
                FOREIGN KEY (pergunta) REFERENCES perguntas(id)
            );`
    );

    await statement.run();
    await statement.finalize();
  },
  async create(resposta: IRespostaDAO) {
    const instance = await Connection.getInstance();
    const statement = await instance.prepare(
      `INSERT INTO respostas (usuario, pergunta, alternativaEscolhida, conteudo) VALUES (?, ?, ?, ?);`
    );

    if ("alternativaEscolhida" in resposta)
      await statement.bind(
        resposta.usuario,
        resposta.pergunta,
        resposta.alternativaEscolhida,
        null
      );
    else
      await statement.bind(
        resposta.usuario,
        resposta.pergunta,
        null,
        resposta.conteudo
      );
    await statement.run();
    await statement.finalize();
  },
  async findByUsuario(usuario: string): Promise<IRespostaDAO[]> {
    const instance = await Connection.getInstance();
    const statement = await instance.prepare(
      `SELECT * FROM respostas WHERE usuario = ?;`
    );
    await statement.bind(usuario);
    const result = await statement.all();
    await statement.finalize();
    return result;
  },
};
