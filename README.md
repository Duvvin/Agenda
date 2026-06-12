# Base Web Project

Base profissional para projetos web com **Node.js**, **Express**, **MongoDB (Mongoose)**, **Webpack** e **dotenv**.

## Stack

| Tecnologia | Uso |
|---|---|
| Node.js | Runtime |
| Express | API REST |
| Mongoose | ODM para MongoDB |
| Webpack | Bundler do frontend |
| dotenv | Variáveis de ambiente |

## Estrutura

```
├── src/
│   ├── server/           # Backend (Express + Mongoose)
│   │   ├── config/       # Conexão DB e env
│   │   ├── controllers/  # Lógica das rotas
│   │   ├── middleware/   # Error handler, 404
│   │   ├── models/       # Schemas Mongoose
│   │   ├── routes/       # Rotas da API
│   │   ├── app.js        # Configuração Express
│   │   └── server.js     # Entry point
│   └── client/           # Frontend
│       ├── css/
│       ├── js/
│       └── index.html
├── dist/                 # Build do Webpack (gerado)
├── webpack.config.js
├── .env.example
└── package.json
```

## Pré-requisitos

- Node.js >= 18
- MongoDB rodando localmente ou URI remota

## Instalação

```bash
# Clonar/copiar o projeto
cd base-web-project

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/base_project
WEBPACK_DEV_PORT=8080
```

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia servidor + Webpack dev server |
| `npm run dev:server` | Apenas o backend (nodemon) |
| `npm run dev:client` | Apenas o frontend (Webpack) |
| `npm run build` | Build de produção do frontend |
| `npm start` | Inicia servidor em produção |

## Desenvolvimento

```bash
npm run dev
```

- **API:** http://localhost:3000/api
- **Frontend:** http://localhost:8080 (proxy para `/api`)

## Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/users` | Listar usuários |
| GET | `/api/users/:id` | Buscar usuário |
| POST | `/api/users` | Criar usuário |
| PUT | `/api/users/:id` | Atualizar usuário |
| DELETE | `/api/users/:id` | Remover usuário |

## Produção

```bash
npm run build
NODE_ENV=production npm start
```

O Express serve os arquivos estáticos de `dist/` e a API continua em `/api`.

## Próximos passos

1. Renomeie o projeto em `package.json`
2. Adicione novos models, controllers e routes seguindo o padrão de `User`
3. Configure autenticação (JWT, sessions) conforme necessidade
4. Adicione testes com Jest ou Vitest
