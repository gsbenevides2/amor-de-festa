import bcrypt from "bcrypt";

import { Connection } from "../connection";

interface IUsuarioDAO {
  nome: string;
  username: string;
  senha: string;
}

export const UsuarioDAO = {
  async createTable() {
    const connection = await Connection.getInstance();
    const statement = await connection.prepare(
      `CREATE TABLE IF NOT EXISTS usuarios (
                username TEXT NOT NULL PRIMARY KEY,
                nome TEXT NOT NULL,
                senha TEXT NOT NULL
            );`
    );
    await statement.run();
    await statement.finalize();
  },
  async create(usuario: IUsuarioDAO) {
    const connection = await Connection.getInstance();
    const statement = await connection.prepare(
      `INSERT INTO usuarios (nome, username, senha) VALUES (?, ?, ?);`
    );
    const encryptedPassword = await bcrypt.hash(usuario.senha, 12);
    await statement.bind(usuario.nome, usuario.username, encryptedPassword);
    await statement.run();
    await statement.finalize();
  },
  async auth(username: string, password: string) {
    const connection = await Connection.getInstance();
    const statement = await connection.prepare(
      `SELECT * FROM usuarios WHERE username = ?;`
    );
    await statement.bind(username);
    const result = await statement.get();

    await statement.finalize();
    if (result) {
      return await bcrypt.compare(password, result.senha);
    }
  },
  async find(
    username: string
  ): Promise<Omit<IUsuarioDAO, "senha"> | undefined> {
    const connection = await Connection.getInstance();
    const statement = await connection.prepare(
      `SELECT nome, username FROM usuarios WHERE username = ?;`
    );
    await statement.bind(username);
    const result = await statement.get();
    await statement.finalize();
    if (result) {
      return result;
    }
  },
  async findByFesta(festa: string): Promise<Omit<IUsuarioDAO, "senha">[]> {
    const connection = await Connection.getInstance();
    const statement = await connection.prepare(
      `SELECT u.username, u.nome  
       FROM festas_usuarios fu 
       LEFT OUTER JOIN usuarios u 
       ON u.username = fu.usuario 
       WHERE fu.festa = ?;`
    );
    await statement.bind(festa);
    const result = await statement.all();
    await statement.finalize();
    return result;
  },
};
