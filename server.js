/*
 * HISTÓRICO DO PROJETO — DO ARRAY AO MONGODB
 *
 * 1. SERVIDOR COM EXPRESS
 * Criamos a aplicação com express() e iniciamos na porta 3000.
 * GET /users  → lista usuários.
 * POST /users → cadastra um usuário.
 * express.json() permite ler o JSON enviado em req.body.
 *
 * 2. PRIMEIRO ARMAZENAMENTO: ARRAY
 * Usamos const users = [] para guardar usuários na memória.
 * POST adiciona com users.push(req.body).
 * GET devolve esse array.
 * Ao reiniciar o servidor, os dados somem.
 *
 * 3. BANCO NO MONGODB ATLAS
 * Criamos um cluster gratuito para hospedar o banco.
 * Escolhemos "users" como nome do banco.
 * O banco permite manter os dados após desligar o servidor.
 *
 * 4. PRISMA 8
 * Instalamos e configuramos o Prisma para acessar o MongoDB.
 * Estamos usando uma versão candidata a lançamento (RC).
 * A estrutura e os comandos diferem do Prisma 6 usado na aula.
 *
 * Arquivos principais:
 * .env                       → endereço e credenciais do banco.
 * prisma.config.ts           → configuração dos comandos Prisma.
 * src/prisma/contract.prisma → modelo dos dados.
 * src/prisma/db.ts           → acesso ao banco pelo código.
 *
 * O .env contém senha: não publicar no GitHub.
 *
 * 5. MODELO USER
 * Definimos id, name, email e age.
 * age usa Int32, o tipo indicado pelo Prisma 8.
 * email usa @unique para impedir e-mails repetidos.
 * @@map("users") define o nome da coleção no MongoDB.
 *
 * Banco "users" e coleção "users" são coisas diferentes:
 * o banco contém coleções; a coleção contém os documentos.
 *
 * 6. GERAMOS OS ARQUIVOS DO MODELO
 * Comando: npx prisma contract emit
 * Gerou contract.json e contract.d.ts.
 * Repetir esse comando quando alterar contract.prisma.
 * Não editar os arquivos gerados manualmente.
 *
 * 7. RESOLVEMOS A CONEXÃO
 * A URL mongodb+srv:// falhou na consulta DNS SRV.
 * O DNS da conexão não respondeu; o teste com 1.1.1.1 respondeu.
 * Pegamos no Atlas a URL alternativa mongodb://,
 * com os servidores explícitos, e atualizamos o .env.
 * Essa alternativa funcionou.
 *
 * 8. PREPARAMOS O BANCO
 * Comando: npx prisma db init
 * Conectou ao MongoDB e criou a coleção users,
 * incluindo o índice único para email.
 * Isso não cadastrou usuários nem alterou nossas rotas.
 *
 /*
 * ESTADO ATUAL — INTEGRAÇÃO COM MONGODB FUNCIONANDO
 *
 * O array temporário foi substituído pelo banco.
 * POST /users → grava com await db.orm.users.create(...).
 * GET /users  → consulta com await db.orm.users.all().
 *
 * Cada usuário recebe um identificador único: _id.
 * Os dados permanecem no MongoDB após reiniciar o servidor.
 * async/await aguarda as operações do banco.
 * try/catch trata possíveis falhas.
 *
 * Cadastro e consulta funcionando com três usuários.
 
 *
 * PARA RODAR O SERVIDOR
 * node --watch server.js
 * Salvar alterações: Ctrl + S.
 * Encerrar o servidor: Ctrl + C.
 */


import express from "express";
import { db } from "./src/prisma/db.ts";

const app = express();
app.use(express.json());

// Busca os usuários salvos no MongoDB.
app.get("/users", async (req, res) => {
  try {
    const users = await db.orm.users.all();

    res.status(200).json(users);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ message: "Erro ao listar usuários." });
  }
});

// Salva um novo usuário no MongoDB.
app.post("/users", async (req, res) => {
  try {
    const user = await db.orm.users.create({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    });

    res.status(201).json(user);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ message: "Erro ao cadastrar usuário." });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const user = await db.orm.users
      .where({ _id: req.params.id })
      .update({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
      });

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado."
      });
    }

    res.status(200).json(user);
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      message: "Erro ao atualizar usuário."
    });
  }
});

// Exclui o usuário identificado pelo ID da URL.
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await db.orm.users
      .where({ _id: req.params.id })
      .delete();

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado."
      });
    }

    res.status(200).json({
      message: "Usuário excluído com sucesso!"
    });
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      message: "Erro ao excluir usuário."
    });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});