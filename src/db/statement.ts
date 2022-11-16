import { Statement as SQLiteStatement } from "sqlite3";
export class Statement {
  private readonly statement: SQLiteStatement;
  constructor(statement: SQLiteStatement) {
    this.statement = statement;
  }

  public async bind(...params: any[]): Promise<void> {
    return await new Promise((resolve, reject) => {
      this.statement.bind(params, (err: Error | null) => {
        if (err != null) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public async run(): Promise<void> {
    return await new Promise((resolve, reject) => {
      this.statement.run(function (err: Error | null, ...args) {
        console.log(args);
        if (err != null) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public async all(): Promise<any[]> {
    return await new Promise((resolve, reject) => {
      this.statement.all((err: Error | null, rows: any[], ...args: any[]) => {
        console.log(args);
        if (err != null) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  public async get(): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.statement.get((err: Error | null, row: any, ...args) => {
        console.log(args);
        if (err != null) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  public async finalize(): Promise<void> {
    return await new Promise((resolve, reject) => {
      this.statement.finalize((err: Error | null) => {
        if (err != null) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
