import { v4 as uuid } from "uuid";

import { Connection } from "../connection";

interface IPerguntaDAODisertativa {
  id: string;
  tipo: "Disertativa";
  enunciado: string;
}

interface IPerguntaDAOObjetiva {
  id: string;
  tipo: "Objetiva";
  enunciado: string;
  alternativa1: string;
  alternativa2: string;
}

type IPerguntaDAO = IPerguntaDAODisertativa | IPerguntaDAOObjetiva;

type IPerguntaDAOCreate =
  | Omit<IPerguntaDAODisertativa, "id">
  | Omit<IPerguntaDAOObjetiva, "id">;

export const PerguntaDAO = {
  async createTable() {
    const connection = await Connection.getInstance();
    const statement =
      await connection.prepare(`CREATE TABLE IF NOT EXISTS perguntas (
                id TEXT NOT NULL UNIQUE PRIMARY KEY,
                tipo TEXT NOT NULL,
                enunciado TEXT NOT NULL,
                alternativa1 TEXT,
                alternativa2 TEXT
            );`);
    await statement.run();
    await statement.finalize();
  },

  async create(pergunta: IPerguntaDAOCreate) {
    const connection = await Connection.getInstance();
    const statement = await connection.prepare(
      `INSERT INTO perguntas (id, tipo, enunciado, alternativa1, alternativa2) VALUES (?, ?, ?, ?, ?);`
    );
    const id = uuid();
    if (pergunta.tipo === "Disertativa") {
      await statement.bind(id, pergunta.tipo, pergunta.enunciado, null, null);
    } else {
      await statement.bind(
        id,
        pergunta.tipo,
        pergunta.enunciado,
        pergunta.alternativa1,
        pergunta.alternativa2
      );
    }
    await statement.run();
    await statement.finalize();
    return id;
  },

  async find(id: string): Promise<IPerguntaDAO> {
    const connection = await Connection.getInstance();
    const statement = await connection.prepare(
      `SELECT * FROM perguntas WHERE id = ?;`
    );
    await statement.bind(id);
    const result = await statement.get();
    await statement.finalize();
    if (result === undefined) {
      throw new Error("Pergunta não encontrada");
    }
    if (result.tipo === "Disertativa") {
      return {
        id: result.id,
        tipo: result.tipo,
        enunciado: result.enunciado,
      };
    } else {
      return {
        id: result.id,
        tipo: result.tipo,
        enunciado: result.enunciado,
        alternativa1: result.alternativa1,
        alternativa2: result.alternativa2,
      };
    }
  },
};
