
# Desafio Prático — API To-Do List com Autenticação

## Objetivo

Desenvolver uma API REST para gerenciamento de tarefas (**to-do list**), com **cadastro e login de usuários**, garantindo segurança no acesso aos dados por meio de **autenticação e autorização com JWT**.

A aplicação deve permitir que cada usuário gerencie apenas as suas próprias tarefas, seguindo boas práticas de organização de código, segurança e documentação.

---

## Requisitos do desafio

### Funcionalidades obrigatórias

#### 1. Autenticação de usuários

A API deve permitir:

* Cadastro de usuários
* Login de usuários autenticados

#### 2. Segurança de credenciais

* As senhas dos usuários devem ser armazenadas de forma segura, utilizando **criptografia/hash**
* Não é permitido salvar senhas em texto puro

#### 3. Autenticação e autorização

* A autenticação deve ser implementada com **JWT**
* As rotas de tarefas devem ser protegidas
* Apenas usuários autenticados podem acessar o CRUD de tarefas
* Cada usuário deve acessar, editar e remover **somente as próprias tarefas**

#### 4. CRUD de tarefas

A API deve permitir:

* Criar tarefa
* Listar tarefas do usuário autenticado
* Buscar uma tarefa específica
* Atualizar tarefa
* Remover tarefa

---

## Regras de negócio sugeridas

### Usuário

Cada usuário deve possuir, no mínimo:

* id
* nome
* email
* senha

Regras:

* O email deve ser único
* Todos os campos obrigatórios devem ser validados
* A senha deve ser armazenada com hash

### Tarefa

Cada tarefa deve possuir, no mínimo:

* id
* título
* descrição
* status
* data de criação
* data de atualização
* userId

Regras:

* Toda tarefa deve pertencer a um usuário
* O campo `status` pode seguir valores como:

  * `pendente`
  * `em_andamento`
  * `concluida`

---

## Requisitos técnicos

### 1. Design Pattern

O projeto deve implementar **ao menos um design pattern**.

Sugestões:

* **Repository Pattern** para abstração do acesso a dados
* **Service Pattern** para centralizar regras de negócio
* **Factory Pattern** para criação de objetos
* **Strategy Pattern** para regras específicas
* **Middleware Pattern** para autenticação/autorização

Uma boa abordagem é utilizar:

* **Repository Pattern**
* **Service Layer**

### 2. Documentação

A API deve possuir documentação clara, contendo:

* objetivo do projeto
* tecnologias utilizadas
* instruções para instalação e execução
* variáveis de ambiente necessárias
* rotas da aplicação
* exemplos de requisição e resposta
* regras de autenticação

Pode ser feita com:

* `README.md`
* Swagger/OpenAPI

### 3. Boas práticas esperadas

* Organização em camadas
* Tratamento de erros
* Padronização de respostas
* Uso adequado de códigos HTTP
* Validação de dados de entrada
* Separação de responsabilidades

---

## Rotas esperadas

### Autenticação

#### Cadastro de usuário

`POST /users`

Exemplo de body:

```json
{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "password": "123456"
}
```

#### Login

`POST /auth/login`

Exemplo de body:

```json
{
  "email": "maria@email.com",
  "password": "123456"
}
```

Resposta esperada:

```json
{
  "token": "jwt_token_aqui"
}
```

---

### Tarefas

> Todas as rotas abaixo devem exigir token JWT.

#### Criar tarefa

`POST /tasks`

#### Listar tarefas

`GET /tasks`

#### Buscar tarefa por id

`GET /tasks/:id`

#### Atualizar tarefa

`PUT /tasks/:id`

#### Remover tarefa

`DELETE /tasks/:id`

---

## Requisitos de autorização

A API deve garantir que:

* um usuário autenticado **não possa acessar tarefas de outro usuário**
* um usuário autenticado **não possa editar tarefas de outro usuário**
* um usuário autenticado **não possa excluir tarefas de outro usuário**

---

## Entregáveis

O aluno/dev deve entregar:

* código-fonte do projeto
* arquivo `README.md` com documentação
* collection do Postman ou documentação Swagger
* arquivo `.env.example`
* script de inicialização do projeto
* migrations ou script de criação do banco, se aplicável

---

## Diferenciais

Itens que podem agregar valor ao desafio:

* paginação na listagem de tarefas
* filtro por status
* busca por título
* testes automatizados
* refresh token
* Docker
* deploy da API
* logs estruturados
* rate limiting

---

## Critérios de avaliação

### Funcionalidade

* Cadastro e login funcionando corretamente
* CRUD de tarefas funcionando
* Rotas protegidas por autenticação

### Segurança

* Senhas armazenadas com hash
* JWT implementado corretamente
* Proteção de acesso entre usuários

### Arquitetura e qualidade

* Uso de design pattern
* Código organizado e legível
* Separação de responsabilidades
* Tratamento adequado de erros

### Documentação

* Clareza na explicação do projeto
* Instruções suficientes para executar e testar
* Rotas bem documentadas

---

## Enunciado do desafio

Desenvolva uma API REST de **To-Do List** com autenticação de usuários.

A aplicação deve permitir que usuários se cadastrem e realizem login. Após autenticados, devem poder criar, listar, visualizar, editar e remover suas próprias tarefas.

As senhas devem ser armazenadas de forma segura com criptografia/hash. A autenticação e autorização devem ser realizadas com **JWT**, e todas as rotas de tarefas devem ser acessíveis apenas mediante autenticação.

Além disso, o projeto deve utilizar **ao menos um design pattern**, possuir **documentação completa** e seguir boas práticas de desenvolvimento de APIs.

