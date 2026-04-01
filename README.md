# Projecto de api com intuito de aplicar conhecimentos práticos

## Pré-requisitos
- Node.js
- Docker
- Docker Compose

## Como instalar
1. Clonar o repositório — git clone <url>
2. Entrar na pasta — cd Projecto1.1
3. Instalar dependências — npm install

## Como correr

### Com Docker
- docker compose up

### Sem docker
- node app.js

## Endpoints

### GET /livros
Retorna informação básica da API.

[{"titulo": "O Alquimista", "autor": "Paulo Coelho"}]

### POST /livros
Cria um novo livro.

[{"titulo":"biblia","autor":"Deus"}]

### PUT /livros/:id
Actualiza todo o recurso.

{"message": "Sucesso"}

### PATCH /livros/:id
Actualiza parcialmente o recurso.

{"titulo": "Titulo Atualizado", "autor": "Paulo Coelho"}

### DELETE /livros/:id
Apaga um recurso.

 {"message": "Sucesso"}
 
## Variáveis de ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| PORT | Porta onde o servidor corre | 3000 |
| APP_NAME | Nome da aplicação | Projecto1 |


