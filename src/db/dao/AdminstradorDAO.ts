import bcrypt from "bcrypt";

import { Connection } from "../connection";
interface IAdminstradorDAO {
  nome: string;
  username: string;
  senha: string;
}

export const AdminstradorDAO = {
  async createTable() {
    const connection = await Connection.getInstance();
    const statement = await connection.prepare(
      `CREATE TABLE IF NOT EXISTS adminstradores (
                username TEXT NOT NULL PRIMARY KEY,
                nome TEXT NOT NULL,
                senha TEXT NOT NULL
            );`
    );
    await statement.run();
    await statement.finalize();
  },

  async create(adminstrador: IAdminstradorDAO) {
    const connection = await Connection.getInstance();
    const statement = await connection.prepare(
      `INSERT INTO adminstradores (nome, username, senha) VALUES (?, ?, ?);`
    );
    const encryptedPassword = await bcrypt.hash(adminstrador.senha, 12);
    await statement.bind(
      adminstrador.nome,
      adminstrador.username,
      encryptedPassword
    );
    await statement.run();
    await statement.finalize();
  },

  async auth(username: string, password: string) {
    const connection = await Connection.getInstance();
    const statement = await connection.prepare(
      `SELECT * FROM adminstradores WHERE username = ?;`
    );
    await statement.bind(username);
    const result = await statement.get();

    await statement.finalize();
    if (result) {
      return await bcrypt.compare(password, result.senha);
    }
  },

  async find(username: string) {
    const connection = await Connection.getInstance();
    const statement = await connection.prepare(
      `SELECT nome, username FROM adminstradores WHERE username = ?;`
    );
    await statement.bind(username);
    const result = await statement.get();
    await statement.finalize();
    return result;
  },
};
