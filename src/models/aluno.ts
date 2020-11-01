import { dbQuery, dbQueryPrimeiro } from "../services/db";

export type Alunos = {
  rga: string;
  nome: string;
  curso: string;
  situacao: string;
  registrado_em: String;
};

const insereAluno = async (aluno: Alunos) => {
  //async por causa da promise
  await dbQuery(
    `INSERT INTO alunos (rga, nome, curso, situacao, registrado_em) VALUES (?,?,?,?,?)`,
    [aluno.rga, aluno.nome, aluno.curso, aluno.situacao, aluno.registrado_em]
  );
  let retorno = await dbQuery(
    `SELECT seq AS Id FROM sqlite_sequence WHERE name = 'alunos'`
  );
  return getAluno(retorno[0].Id);
};

const listaAlunos = async () => {
  const retorno = await dbQuery(`SELECT * FROM alunos`);
  return retorno as Alunos[];
};

const getAluno = async (id: number) => {
  const retorno = await dbQueryPrimeiro(`SELECT * FROM alunos WHERE id = ?`, [
    id,
  ]);
  return retorno as Alunos[] | undefined;
};

const deletaAluno = async (id: number) => {
  await dbQueryPrimeiro(`DELETE FROM alunos WHERE id = ?`, [id]);
};

const atualizaAluno = async (aluno: Alunos, id: number) => {
  //async por causa da promise
  await dbQuery(
    `UPDATE alunos SET rga = ?, nome = ?, curso = ?, situacao = ? WHERE id = ?`,
    [aluno.rga, aluno.nome, aluno.curso, aluno.situacao, id]
  );
  return getAluno(id);
};

export const alunoModel = {
  insereAluno,
  listaAlunos,
  getAluno,
  deletaAluno,
  atualizaAluno,
};
