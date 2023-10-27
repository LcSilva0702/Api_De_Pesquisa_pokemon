# Projeto Type Aprendendo

## Configuração do Docker

O projeto inclui um ambiente Docker pré-configurado para iniciar a aplicação. Para iniciar o ambiente Docker, utilize o seguinte comando:

```shell
docker-compose up -d
```

Para encerrar os containers, utilize o seguinte comando:

```shell
docker-compose down
```

Se o projeto não conseguir iniciar os containers, consulte a documentação oficial do Docker em: [Instalação do Docker](https://docs.docker.com/get-docker/)

## Registro de Usuário (POST /user)

Neste endpoint, é possível registrar um novo usuário no banco de dados. Os seguintes campos são obrigatórios e devem ser passados no corpo da requisição:

- Name
- Email (único)
- Password

Exemplo de sucesso:

```json
{
  "name": "Lucas",
  "email": "teste4@gmail.com",
  "password": "****",
  "_id": "653be8a735623dd6d6aa5b3e",
  "CreatedAt": "2023-10-27T16:43:19.522Z",
  "__v": 0
}
```

Exemplo de erro:

```json
{
  "error": "Registration Failed",
  "message": "error"
}
```

Exemplo de erro (usuário já existe):

```json
{
  "error": "User already exists",
  "message": "Xiiiiiiiiiii"
}
```

## Autenticação (POST /Login)

Este endpoint verifica as credenciais no banco de dados. Os seguintes dados são obrigatórios no corpo da requisição:

- Email
- Senha

Exemplo de sucesso:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Exemplo de erro (credenciais incorretas):

```json
{
  "error": "Incorrect email or password"
}
```

Exemplo de erro (campos em branco):

```json
{
  "error": "Check all fields"
}
```

Exemplo de erro (ocorreu um erro inesperado):

```json
{
  "error": "Something wrong happened, try again",
  "message": "error"
}
```

## Endpoints Disponíveis apenas para Usuários Logados

### Detalhes do Perfil (GET /detailProfile)

Este endpoint fornece detalhes do perfil do usuário logado.

Exemplo de sucesso:

```json
{
  "name": "Lucas",
  "email": "teste4@gmail.com",
  "password": "****"
}
```

Exemplo de erro (ocorreu um erro inesperado):

```json
{
  "error": "Something wrong happened, try again",
  "message": "error"
}
```

### Excluir Usuário (DELETE /delete)

Este endpoint permite a exclusão do usuário logado.

Exemplo de sucesso:

```json
{
  "User deleted"
}
```

Exemplo de erro (ocorreu um erro inesperado):

```json
{
  "error": "Something wrong happened, try again",
  "message": "error"
}
```

### Atualizar Perfil (PUT /updateProfile)

Este endpoint permite a atualização dos seguintes elementos, que devem ser passados no corpo da requisição:

- Novo Nome
- Novo Email
- Nova Senha

Deve ser passado apenas os elementos que você deseja atualizar.

Exemplo de sucesso:

```json
{
  "Atualizado"
}
```

Exemplo de erro (ocorreu um erro inesperado):

```json
{
  "error": "Something wrong happened, try again",
  "message": "error"
}
```

## Consulta de Pokemon (GET /pokemon/:name)

Este endpoint recebe o nome do Pokémon desejado e retorna os detalhes do mesmo.

Exemplo de sucesso:

```json
{
  "name": "Charizard",
  "moves": [
    {
      "move": {
        "name": "Mega Punch",
        "url": "https://pokeapi.co/api/v2/move/5/"
      },
      // Outros movimentos...
    }
  ]
}
```

Exemplo de erro (nome do Pokémon ausente na requisição):

```json
{
  "error": "Enter the name of the Pokémon you want"
}
```


Todas as Requisições disponíveis no arquivos wrk_scratchpad.json