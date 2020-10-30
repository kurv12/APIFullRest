const express = require("express");
const router = express.Router();

//RETORNA OS ALUNOS
router.get("/", (req, res, next) => {
  res.status(200).send({
    mensagem: "Usando get dentro da rota de produtos",
  });
});

//INSERE ALUNO
router.post("/", (req, res, next) => {
  const produto = {
    nome: req.body.nome,
    preco: req.body.preco,
  };

  res.status(201).send({
    mensagem: "Usando post dentro da rota de produtos",
    produtoCriado: produto,
  });
});

//RETORNA OS DADOS DE UM ALUNO
router.get("/:id_produto", (req, res, next) => {
  const id = req.params.id_produto;

  if (id == "especial") {
    res.status(200).send({
      mensagem: "você descobriu o ID especial",
      id: id,
    });
  } else {
    res.status(200).send({
      mensagem: "você passou um ID",
    });
  }

  //ALTERA UM ALUNO
  router.put("/", (req, res, next) => {
    res.status(201).send({
      mensagem: "Usando patch dentro da rota de produtos",
    });
  });

  //EXCLUI UM ALUNO
  router.delete("/", (req, res, next) => {
    res.status(201).send({
      mensagem: "Usando delete dentro da rota de produtos",
    });
  });

  res.status(200).send({
    mensagem: "Usando get de um produto exclusivo",
  });
});

module.exports = router;
