var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("siscad.bd");
var check;
var usuarios = [
  {
    rga: "2020.1919.188-8",
    nome: "Antônio",
    curso: "Engenharia Civil",
    situacao: "Ativo",
    registrado_em: now(),
  },
  {
    rga: "2020.1001.198-4",
    nome: "Maria",
    curso: "Nutrição",
    situacao: "Ativo",
    registrado_em: now(),
  },
  {
    rga: "2020.1717.999-7",
    nome: "Juliano",
    curso: "Engenharia de Computação",
    situacao: "Ativo",
    registrado_em: now(),
  },
  {
    rga: "2020.0056.444-6",
    nome: "Elisa",
    curso: "Enfermagem",
    situacao: "Ativo",
    registrado_em: now(),
  },
];

db.serialize(function () {
  db.run(
    "CREATE TABLE if not exists alunos (rga TEXT, nome TEXT, curso TEXT, situacao TEXT,registrado_em DATE)"
  );
  var stmt = db.prepare(
    "INSERT INTO alunos (rga, nome, curso, situacao, registrado_em) VALUES (?,?,?,?,?)"
  );
  for (var u of usuarios) {
    console.log(JSON.stringify(u));
    stmt.run(u.rga, u.nome, u.curso, u.situacao, u.registrado_em);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, nome, idade FROM usr_info", function (err, row) {
    console.log(
      row.id +
        " : " +
        row.rga +
        " : " +
        row.nome +
        " : " +
        row.curso +
        " : " +
        row.situacao +
        " : " +
        row.registrado_em
    );
  });
});

db.close();
