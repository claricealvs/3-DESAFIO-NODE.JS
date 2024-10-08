# 🚘 FlexiLease Autos - API de Gerenciamento para Concessionária

## 🛠️ Tecnologias Utilizadas

<div>
<img align="center" alt="Jv-csharp" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" />
<img align="center" alt="Jv-csharp" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" /> 
<img align="center" alt="Jv-csharp" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg" />
<img align="center" alt="Jv-csharp" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original-wordmark.svg" />
<img align="center" alt="Jv-csharp" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original-wordmark.svg" />
</div>

## 🚀 Como Executar o Projeto

### Pré-Requisitos

- Node.js
- Git
- Editor de Código (Recomenda-se o VsCode)

### Passos para Execução

1. **Clone o Repositório**

```bash
https://github.com/claricealvs/3-DESAFIO-NODE.JS.git
cd 3-DESAFIO-NODE.JS
```

2. **Instale as Dependências**

```bash
npm install
```

3. **Execute a Aplicação**

   Execute a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

4. **Acesse a API**

   A aplicação estará disponível no endereço: `http://localhost:3000`.

## 🛠️ Ferramenta para testes

- Postman

## 🌐 Endpoints da API

Aqui estão os endpoints disponíveis na API:

- **Cars**

  - `POST /v1/car`: Cadastrar um carro
  - `GET /v1/car`: Listar todos os carros
  - `GET /v1/car/:id`: Listar um carro pelo id
  - `PUT /v1/car/:id`: Atualizar um carro pelo id
  - `PATCH /v1/car/:id`: Atualizar um acessório pelo id do carro
  - `DELETE /v1/car/:id`: Deletar um carro pelo id

- **Users**

  - `POST /v1/user`: Cadastrar um usuário
  - `POST /v1/auth`: Autenticar um usuário
  - `GET /v1/user`: Listar todos os usuários
  - `GET /v1/user/:id`: Listar um usuário pelo id
  - `PUT /v1/user/:id`: Atualizar um usuário pelo id
  - `DELETE /v1/user/:id`: Deletar um usuário pelo id

- **Reserves**

  - `POST /v1/reserve`: Cadastrar uma reserva
  - `GET /v1/reserve`: Listar todas as reservas
  - `GET /v1/reserve/:id`: Listar uma reserva pelo id
  - `PUT /v1/reserve/:id`: Atualizar uma reserva
  - `DELETE /v1/reserve/:id`: Deletar uma reserva

---

🔜🔜🔜🔜🔜🔜🔜🔜🔜

## 💻 Considerações e Melhorias

- A API possui a rota de autenticação de usuário, porém ela não funciona corretamente, fazendo com que fora necessário retirar a proteção das rotas.

- Devido a falta de autenticação, fora necessário adicionar a coluna `user_id` na tabela `reserves` para que a API funcionasse corretamente com o id do User.

- Algumas datas estão sendo retornadas de forma incorreta, porém estão sendo salvas corretamente no banco de dados.
