import bcrypt from "bcrypt";

import { Connection } from "../connection";

interface IUsuarioDAO {
  nome: string;
  username: string;
  senha: string;
  tipo: "Comum" | "Administrador";
}

export const UsuarioDAO = {
  async createTable() {
    const connection = await Connection.getInstance();
    const statement = await connection.prepare(
      `CREATE TABLE IF NOT EXISTS usuarios (
                username TEXT NOT NULL PRIMARY KEY,
                nome TEXT NOT NULL,
                senha TEXT NOT NULL,
                tipo TEXT NOT NULL
            );`
    );
    await statement.run();
    await statement.finalize();
  },
  async create(usuario: Omit<IUsuarioDAO, "tipo">) {
    const connection = await Connection.getInstance();
    const statement = await connection.prepare(
      `INSERT INTO usuarios (nome, username, senha, tipo) VALUES (?, ?, ?, "Comum");`
    );
    const encryptedPassword = await bcrypt.hash(usuario.senha, 12);
    await statement.bind(usuario.nome, usuario.username, encryptedPassword);
    try {
      await statement.run();
    } catch (e: any) {
      if (e.message.includes("UNIQUE constraint failed usuarios.username")) {
        throw new Error("Mesmo nome de usuário já existe!");
      } else {
        throw new Error("Erro desconhecido ao criar usuário!");
      }
    } finally {
      await statement.finalize();
    }
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
    } else {
      throw new Error("Usuário não encontrado!");
    }
  },
  async find(username: string): Promise<Omit<IUsuarioDAO, "senha">> {
    const connection = await Connection.getInstance();
    const statement = await connection.prepare(
      `SELECT nome, username, tipo FROM usuarios WHERE username = ?;`
    );
    await statement.bind(username);
    const result = await statement.get();
    await statement.finalize();
    if (result) return result;
    else throw new Error("Usuário não encontrado!");
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
