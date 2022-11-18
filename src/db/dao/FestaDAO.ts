import { v4 as uuid } from "uuid";

import { Connection } from "../connection";
interface IFestaDAO {
  id: string;
  nome: string;
  local: string;
  horario: string;
  adminstrador: string;
}

export const FestaDAO = {
  async createTable() {
    const connection = await Connection.getInstance();
    const statement = await connection.prepare(`
      CREATE TABLE IF NOT EXISTS festas (
                id TEXT NOT NULL UNIQUE PRIMARY KEY,
                nome TEXT NOT NULL,
                local TEXT NOT NULL,
                horario TEXT NOT NULL,
                adminstrador TEXT NOT NULL,
                FOREIGN KEY (adminstrador) REFERENCES usuarios(username)
            );`);
    await statement.run();
    await statement.finalize();

    const statement2 = await connection.prepare(`
    CREATE TABLE IF NOT EXISTS festas_usuarios (
      usuario TEXT NOT NULL,
      festa TEXT NOT NULL,
      FOREIGN KEY (usuario) REFERENCES usuarios(username),
      FOREIGN KEY (festa) REFERENCES festas(id),
      PRIMARY KEY (usuario, festa)
    )`);
    await statement2.run();
    await statement2.finalize();
  },
  async create(festa: Omit<IFestaDAO, "id">) {
    const connection = await Connection.getInstance();
    const statement = await connection.prepare(
      `INSERT INTO festas (id, nome, local, horario, adminstrador) VALUES (?, ?, ?, ?, ?);`
    );
    const id = uuid();
    await statement.bind(
      id,
      festa.nome,
      festa.local,
      festa.horario,
      festa.adminstrador
    );
    await statement.run();
    await statement.finalize();
    return id;
  },
  async findByUsuario(idDoUsuario: string): Promise<IFestaDAO[]> {
    const connection = await Connection.getInstance();
    const statement = await connection.prepare(
      `SELECT f.* FROM festas_usuarios fu LEFT OUTER JOIN festas f ON fu.festa = f.id WHERE fu.usuario  = ?`
    );
    await statement.bind(idDoUsuario);
    const result = await statement.all();
    await statement.finalize();
    return result;
  },
  async addUsuario(festa: string, usuario: string) {
    const connection = await Connection.getInstance();
    const statement = await connection.prepare(
      `INSERT INTO festas_usuarios (usuario, festa) VALUES (?, ?);`
    );
    await statement.bind(usuario, festa);
    await statement.run();
    await statement.finalize();
  },

  async findAll(): Promise<IFestaDAO[]> {
    const connection = await Connection.getInstance();
    const statement = await connection.prepare(`SELECT * FROM festas`);
    const result = await statement.all();
    await statement.finalize();
    return result;
  },
};
