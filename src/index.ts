//importando as variáveis de ambiente primeiro para garantir que sejam preenchidas
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { useRoutes } from "./routes";
import bodyParser from "body-parser";

//vai escutar pela porta passada por variável de ambiente, mas se não tiver escuta na porta 8091
const PORT = process.env.PORT || 8091;
const app = express();
app.use(bodyParser.json());
useRoutes(app);

app.listen(PORT, () => console.log("Servidor ativo na porta " + PORT));
