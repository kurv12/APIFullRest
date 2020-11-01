import sqlite3 from "sqlite3";

//o caminho do database foi definido via variável de ambiente no arquivo .env
const DATABASE_FILE = process.env.DATABASE_FILE;
if (!DATABASE_FILE) {
  throw new Error("DATABASE_FILE não informado");
}

//abrindo conexão com o banco
export const openConnection = () => {
  let db = new sqlite3.Database(DATABASE_FILE);
  return db;
};

export const dbQueryPrimeiro = async (query: string, parametros?: any[]) => {
  const retorno = await dbQuery(query, parametros);
  return retorno[0];
};

export const dbQuery = (query: string, parametros?: any[]) => {
  let db = openConnection();
  //cria uma promise para resolver se a conexão foi bem sucedida
  return (
    new Promise<any[]>((resolve, reject) => {
      db.all(query, parametros, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    })
      //finaliza a promise
      .finally(() => {
        db.close();
      })
  );
};
