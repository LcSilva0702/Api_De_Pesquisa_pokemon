# Projeto_Type_Aprendendo 

### Docker

#### O projeto contém seu docker prontamente configurado para iniciar a aplipacação, para iniciar o mesmo deverá ser utilizado o comando:

    docker-compose up -d

#### para encerrar os conteiners devera ser utilizado o comando:

    docker-compose down

#### Caso o projeto não suba os conteiners, veja como instalar o software docker em:

    https://docs.docker.com/get-docker/

### Post /user

#### Nesse endpoint será feito o registro do usuario no banco de dados.

#### Os seguintes campos serão obrigatorios: 

    Name,
    Email(Unico),
    Password

#### Todos os campos desse endpoint deve ser passado no Body da requisição

### Exemplos:

#### Sucesso: 
    {
	    "name": "lucas",
	    "email": "teste4@gmail.com",
	    "password": "$2b$05$6tMPS/      VTsy4demklN0cd8eKRE7qjnJxSRTdn4JQxoPWSq5zLpvxjq",
	    "_id": "653be8a735623dd6d6aa5b3e",
	    "CreatedAt": "2023-10-27T16:43:19.522Z",
	    "__v": 0
    }

#### Erro:
    {
        error: "Registration Failed",
        message: error
    }