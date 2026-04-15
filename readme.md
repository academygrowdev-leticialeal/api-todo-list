# API Node.js Template

Este é um template para criar APIs RESTful em Node.js utilizando Express, TypeScript, Prisma ORM e PostgreSQL. O projeto está configurado para rodar em containers Docker com autoreload para desenvolvimento.

## Descrição

O template inclui uma estrutura básica para uma API Node.js com:
- **Express**: Framework web para Node.js.
- **TypeScript**: Superset do JavaScript com tipagem estática.
- **Prisma**: ORM para interação com o banco de dados PostgreSQL.
- **Docker**: Containerização para facilitar o desenvolvimento e deploy.
- **Autoload**: Recarregamento automático do servidor durante o desenvolvimento.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

## Como Usar Este Template

Este repositório é um template no GitHub. Para usá-lo:

1. Clique no botão **"Use this template"** no topo da página do repositório no GitHub.
2. Escolha um nome para o seu novo repositório e clique em **"Create repository from template"**.
3. Clone o repositório criado para sua máquina local:
   ```bash
   git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   cd SEU_REPOSITORIO
   ```

4. Configure as variáveis de ambiente (veja a seção de configuração abaixo).

## Configuração

1. Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env-example`:
   ```env
   PORT=3030
   POSTGRES_USER=seu_usuario
   POSTGRES_PASSWORD=sua_senha
   POSTGRES_DB=seu_banco
   DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/seu_banco?schema=public"
   ```

2. Ajuste as configurações no `prisma/schema.prisma` conforme necessário para o seu banco de dados.

## Instalação e Execução

### Com Docker (Recomendado)

1. Certifique-se de que o Docker e Docker Compose estão instalados e rodando.

2. Execute o comando para construir e iniciar os containers:
   ```bash
   docker compose up --build
   ```

3. A API estará disponível em `http://localhost:3030`.

4. O Prisma Studio (interface gráfica para o banco) estará disponível em `http://localhost:5555`.

5. Para parar os containers:
   ```bash
   docker compose down
   ```

**Nota**: Com Docker, o autoreload está ativado. Qualquer mudança nos arquivos será automaticamente refletida no container.

### Sem Docker (Desenvolvimento Local)

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Configure o banco de dados PostgreSQL localmente ou use um serviço como ElephantSQL.

3. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```

4. Gere o cliente Prisma:
   ```bash
   npx prisma generate
   ```

5. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

6. A API estará disponível em `http://localhost:3030`.

## Estrutura do Projeto

```
├── src/
│   ├── controllers/     # Controladores da API
│   ├── database/        # Configurações do banco de dados
│   ├── dtos/            # Data Transfer Objects
│   ├── envs/            # Configurações de ambiente
│   ├── middlewares/     # Middlewares personalizados
│   ├── models/          # Modelos de dados
│   ├── routes/          # Definições de rotas
│   ├── services/        # Lógica de negócio
│   ├── utils/           # Utilitários
│   ├── app.ts           # Configuração do Express
│   └── server.ts        # Ponto de entrada da aplicação
├── prisma/
│   ├── schema.prisma    # Esquema do banco de dados
│   └── migrations/      # Migrações do Prisma
├── Dockerfile           # Configuração do container da aplicação
├── docker-compose.yml   # Configuração dos serviços Docker
├── package.json         # Dependências e scripts
├── tsconfig.json        # Configuração do TypeScript
└── readme.md            # Este arquivo
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento com autoreload.
- `npm run build`: Compila o TypeScript para JavaScript.
- `npm run start`: Inicia o servidor em produção (após build).

## Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript.
- **Express**: Framework web.
- **TypeScript**: Linguagem de programação.
- **Prisma**: ORM para banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **Docker**: Containerização.
- **ts-node-dev**: Ferramenta para desenvolvimento com TypeScript e autoreload.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está sob a licença ISC.