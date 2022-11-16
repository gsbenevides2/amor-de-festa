import { verbose, Database } from "sqlite3";

import { Statement } from "./statement";

export class Connection {
  // eslint-disable-next-line no-use-before-define
  private static instance?: Connection;
  private readonly db: Database;

  private constructor(db: Database) {
    this.db = db;
  }

  private static async open(): Promise<Connection> {
    const sqlite3 = verbose();
    const db = new sqlite3.Database("database.sqlite");
    return await new Promise((resolve, reject) => {
      db.run("PRAGMA foreign_keys = ON", (err: Error | null) => {
        if (err != null) {
          reject(err);
        } else {
          const connection = new Connection(db);
          resolve(connection);
        }
      });
    });
  }

  public static async getInstance(): Promise<Connection> {
    if (Connection.instance == null) {
      Connection.instance = await Connection.open();
    }

    return Connection.instance;
  }

  public async prepare(sql: string): Promise<Statement> {
    return await new Promise((resolve, reject) => {
      this.db.prepare(sql, function (err: Error | null) {
        if (err != null) {
          reject(err);
        } else {
          resolve(new Statement(this));
        }
      });
    });
  }
}
