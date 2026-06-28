# 📒 Agenda - Sistema de Gerenciamento de Contatos

## 📖 Sobre o projeto

A **Agenda** é uma aplicação web desenvolvida com **Node.js**, **Express** e **MongoDB**, criada para permitir o gerenciamento de contatos de forma prática e segura.

O projeto foi desenvolvido com foco em boas práticas de desenvolvimento back-end, autenticação de usuários, segurança, organização do código seguindo o padrão MVC e persistência de dados utilizando o MongoDB Atlas.

Cada usuário possui sua própria agenda, podendo visualizar e editar apenas os seus contatos.

---

# 🚀 Funcionalidades

## 👤 Autenticação de usuários

* Cadastro de usuários
* Login
* Logout
* Sessões utilizando Express Session
* Senhas criptografadas com bcrypt
* Validação de dados durante cadastro e login

---

## 📧 Verificação de e-mail

Após realizar o cadastro:

* envio automático de código de verificação por e-mail;
* código numérico de confirmação;
* expiração do código;
* limitação para reenvio (contador regressivo);
* bloqueio do botão de reenvio até o término da contagem;
* ativação da conta somente após confirmação do código.

---

## 📇 Gerenciamento de contatos (CRUD)

O usuário autenticado pode:

* criar contatos;
* listar todos os seus contatos;
* editar contatos existentes;
* excluir contatos.

Cada contato possui:

* Nome
* Sobrenome
* E-mail
* Telefone

---

## 🔒 Controle de acesso

O sistema garante que:

* apenas usuários autenticados possam acessar a agenda;
* cada usuário visualize apenas seus próprios contatos;
* não seja possível editar ou excluir contatos pertencentes a outro usuário.

---

## ✅ Validações

Validação dos dados de usuários:

* nome obrigatório;
* e-mail válido;
* senha obrigatória;
* confirmação de senha.

Validação dos contatos:

* nome obrigatório;
* e-mail válido (quando informado);
* telefone válido (quando informado);
* obrigatoriedade de possuir pelo menos um meio de contato (telefone ou e-mail).

---

## ✉️ Envio de e-mails

Integração com Nodemailer para envio de:

* código de verificação;
* confirmação de cadastro.

---

## 💾 Banco de dados

MongoDB Atlas para armazenamento de:

* usuários;
* contatos;
* códigos de verificação.

---

## 🔐 Segurança

* Hash de senhas utilizando bcrypt;
* Sessões armazenadas no MongoDB;
* Variáveis de ambiente com dotenv;
* Proteção de rotas privadas;
* Validação de permissões antes de alterar ou excluir dados.

---

# 🛠️ Tecnologias utilizadas

* Node.js
* Express
* MongoDB Atlas
* Mongoose
* Express Session
* Connect-Mongo
* Bcrypt
* Nodemailer
* Dotenv
* Validator
* HTML5
* CSS3
* JavaScript (ES6)

---

# 📁 Estrutura do projeto

```text
Agenda/
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── views/
│   └── server.js
│
├── frontend/
│
├── public/
│
├── .env
├── package.json
└── README.md
```

---

# ▶️ Como executar

## Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/agenda.git
```

## Instale as dependências

```bash
npm install
```

## Configure o arquivo `.env`

Exemplo:

```env
MONGODB_URI=sua_string_do_mongodb
SESSION_SECRET=sua_chave
EMAIL_USER=seu_email
EMAIL_PASS=sua_senha_de_aplicativo
PORT=3000
```

## Execute o projeto

```bash
npm start
```

ou

```bash
npm run dev
```

---

# 📚 Conceitos aplicados

* Arquitetura MVC
* CRUD
* Autenticação
* Autorização
* Sessões
* Hash de senhas
* Persistência de dados
* Middlewares
* Validação de formulários
* Integração com API SMTP
* Variáveis de ambiente
* Controle de acesso por usuário

---

# 🎯 Objetivo

Este projeto foi desenvolvido com o objetivo de aprofundar conhecimentos em desenvolvimento back-end utilizando Node.js e Express, aplicando conceitos fundamentais como autenticação, gerenciamento de sessões, integração com banco de dados NoSQL, envio de e-mails e construção de aplicações web seguras.

---

# 📄 Licença

Este projeto foi desenvolvido para fins de estudo e aprendizado.
