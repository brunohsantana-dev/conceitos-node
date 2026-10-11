# Users API

API de cadastro de usuários construída durante meus estudos.
User registration API built during my studies.

---

## 🇧🇷 Português

### Sobre o projeto

API desenvolvida com Node.js e Express para cadastrar, listar, atualizar e excluir usuários, com persistência dos dados no MongoDB Atlas.

Este projeto faz parte do meu aprendizado de desenvolvimento backend.

### Tecnologias

- Node.js
- Express
- MongoDB Atlas
- Prisma 8 — versão de pré-lançamento utilizada neste projeto

### Funcionalidades

- Cadastrar usuários
- Listar usuários
- Atualizar usuários
- Excluir usuários
- Manter os dados salvos após reiniciar o servidor

### Rotas

| Método | Rota | Função |
|--------|------|--------|
| POST | `/users` | Cadastrar um usuário |
| GET | `/users` | Listar usuários |
| PUT | `/users/:id` | Atualizar um usuário |
| DELETE | `/users/:id` | Excluir um usuário |

Exemplo de corpo JSON para cadastro e atualização:

```json
{
  "name": "Bruno",
  "email": "bruno@example.com",
  "age": 33
}
```

### Como executar

No terminal, dentro da pasta do projeto:

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie um arquivo `.env` na raiz e configure a conexão com seu MongoDB:

   ```dotenv
   DATABASE_URL="SUA_STRING_DE_CONEXAO_MONGODB"
   ```

3. Gere o contrato do Prisma:

   ```bash
   npx prisma contract emit
   ```

4. Para preparar um banco novo, execute:

   ```bash
   npx prisma db init
   ```

5. Inicie o servidor:

   ```bash
   npm run dev
   ```

A API estará disponível em `http://localhost:3000`.

O arquivo `.env` contém configurações privadas e não é incluído no repositório.

### Aprendizados

- Criação de um servidor com Express
- Requisições, respostas e métodos HTTP
- Rotas, parâmetros e corpo da requisição
- Operações CRUD
- Integração com MongoDB usando Prisma
- Funções assíncronas e tratamento de erros
- Variáveis de ambiente

### Status

Projeto de estudo em desenvolvimento. A próxima etapa é integrar a API a uma interface de cadastro feita com React.

---

## 🇺🇸 English

### About the project

An API built with Node.js and Express to create, list, update and delete users, with persistent data storage in MongoDB Atlas.

This project is part of my backend development learning journey.

### Technologies

- Node.js
- Express
- MongoDB Atlas
- Prisma 8 — pre-release version used in this project

### Features

- Create users
- List users
- Update users
- Delete users
- Preserve stored data after restarting the server

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users` | Create a user |
| GET | `/users` | List users |
| PUT | `/users/:id` | Update a user |
| DELETE | `/users/:id` | Delete a user |

Example JSON request body for creating and updating users:

```json
{
  "name": "Bruno",
  "email": "bruno@example.com",
  "age": 33
}
```

### Getting started

Run the following commands from the project directory:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root and configure your MongoDB connection:

   ```dotenv
   DATABASE_URL="YOUR_MONGODB_CONNECTION_STRING"
   ```

3. Generate the Prisma contract:

   ```bash
   npx prisma contract emit
   ```

4. To initialize a new database, run:

   ```bash
   npx prisma db init
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`.

The `.env` file contains private configuration and is excluded from the repository.

### What I learned

- Creating an Express server
- HTTP requests, responses and methods
- Routes, parameters and request bodies
- CRUD operations
- Connecting to MongoDB using Prisma
- Asynchronous functions and error handling
- Environment variables

### Status

Learning project under development. The next step is to connect the API to a React registration interface.
