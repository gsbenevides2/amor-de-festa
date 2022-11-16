import { AdminstradorDAO } from "./dao/AdminstradorDAO";
import { FestaDAO } from "./dao/FestaDAO";
import { PerguntaDAO } from "./dao/PerguntaDAO";
import { RespostaDAO } from "./dao/RespostaDAO";
import { UsuarioDAO } from "./dao/UsuarioDAO";

export async function createTables(): Promise<void> {
  await AdminstradorDAO.createTable();
  await UsuarioDAO.createTable();
  await FestaDAO.createTable();
  await PerguntaDAO.createTable();
  await RespostaDAO.createTable();
}
