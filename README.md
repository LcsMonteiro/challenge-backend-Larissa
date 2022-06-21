
# CHALLENGE-Larissa


-[Documentação](https://api-partners.herokuapp.com/api-docs/)
<br>

-[Heroku](https://api-partners.herokuapp.com/)
<br>

-[GitHub](https://github.com/LcsMonteiro/ze-challenge-backend-Larissa)
<br>


Esta aplicação é uma API que fornece informações de localizaçao de parceiros do Zé Delivery."

## Tecnologias que vamos usar:
| Ferramenta | Descrição |
| --- | --- |
| `javascript` | Linguagem de programação |
| `nodejs` | Ambiente de execução do javascript|
| `express` | Framework NodeJS |
| `dotenv` | Dependência para proteger dados sensíveis do projeto|
| `mongoose` | Dependência que interage com o MongoDB para a conexão da database, criação do model e das collections|
| `nodemon` | Dependência que observa as atualizações realizadas nos documentos para rodar o servidor automaticamente|
| `npm ou yarn` | Gerenciador de pacotes|
| `MongoDb` | Banco de dado não relacional orietado a documentos|
| `MongoDb Compass` | Interface gráfica para verificar se os dados foram persistidos|
 `Insomnia ou Postman` | Interface gráfica para realizar os testes|
|`Heroku`|plataforma nuvem que faz deploy com integração github|
|`Editorconfig`|Ajuda a definir estilos de formatação de código|
|`Eslint`|É uma ferramenta que analisa o código e aponta os problemas encontrados|
|`Prettier`|Formatador de código|
|`Swagger`|Cria documentação de Api automaticamente e manualmente|
|`Docker`|plataforma de código aberto para criação de ambientes isolados via container|
|`Mongo Atlas`|Serviço de banco de dados em nuvem|
<br>
<br>

## 📁 Arquitetura

```
📁 CHALLENGE-LARISSA
   |
   |-  📁 src
   |    |
   |    |- 📁 data
   |         |- 📄 database.js
   |
   |    |- 📁 controllers
   |         |- 📄 partner.controller.js
   |         
   |    |- 📁 models
   |         |- 📄 partner.models.js
   |        
   |    |- 📁 routes
   |         |- 📄 partner.routes.js 
   | 
   |    |- app.js
   |
   |- 📄 .editorconfig
   |- 📄 .env
   |- 📄 .env.example
   |- 📄.eslintrc.json
   |- 📄 .gitignore
   |- 📄.prettierrc
   |- 📄 docker-compose
   |- 📄 Dockerfile
   |- 📄 package-lock.json
   |- 📄 package.json
   |- 📄 Procfile
   |- 📄 README.md
   |- 📄 server.js
   |- 📄 swagger_output.json
   |- 📄 swagger.js
   ```
<br>


## Requisitos

##### 1. Criar um parceiro:
Salvar no banco de dados todas as seguintes informações representadas por este JSON junto com as regras subsequentes:

```jsx
{
  "id": 1, 
  "tradingName": "Adega da Cerveja - Pinheiros",
  "ownerName": "Zé da Silva",
  "document": "1432132123891/0001",
  "coverageArea": { 
    "type": "MultiPolygon", 
    "coordinates": [
      [[[30, 20], [45, 40], [10, 40], [30, 20]]], 
      [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
    ]
  },
  "address": { 
    "type": "Point",
    "coordinates": [-46.57421, -21.785741]
  }
}
```
##### 2. Carregar parceiro pelo id:
Retornar um parceiro específico baseado no seu campo id com todos os campos apresentados acima.

##### 3. Buscar parceiro:
Dada uma localização pelo usuário da API (coordenadas long e lat), procure o parceiro que esteja mais próximo e que cuja área de cobertura inclua a localização.



<br>

#### PARTNER.CONTROLLER

  **GET**

    -[GET] "/partners/list"
    getAll que retorna todos os parceiros.
    HTTP 200 OK

    -[GET] "/partners/find/:id"
    getById que retorna parceiro com id específico.
    HTTP 200 OK

    -[GET] "/partners/nearest"
    nearestPartnerToCoordinates que retorna parceiro mais próximo da longitude e latitude inserida.
    HTTP 200 OK

  **POST**

    [POST] "/partners/create"
    createPartner cria um novo cadastro de usuários.
    HTTP 201 CREATED


  **DELETE**

    [Delete] "/partners/delete/:id"
    deletePartner deleta um parceiro.
    HTTP 200 OK

## Regras de negócio

- O campo address (endereço em inglês) segue o formato GeoJSON Point (https://en.wikipedia.org/wiki/GeoJSON);
- O campo coverageArea (área de cobertura em inglês) segue o formato GeoJSON MultiPolygon (https://en.wikipedia.org/wiki/GeoJSON);
- O campo document deve ser único entre os parceiros;
- O campo id deve ser único entre os parceiros, mas não necessariamente um número inteiro.

<br>

### Dados para Collection Partners

- id: autogerado e obrigatório
- tradingName: String e obrigatória;
- ownerName: String e obrigatória;
- document: Number e obrigatória;
- coverageArea: Multipolygon e obrigatória;
- address Point e obrigatória;

#### API deve retornar um JSON com o seguinte formato:

```jsx
{
    "_id": "610876dc60385599a6b69b03",
    "tradingName": "Bar Legal",
    "ownerName": "Fernando Silva",
    "document": "05202839000126",
    "coverageArea": {
      "type": "MultiPolygon",
      "coordinates": [
        [
          [
            [
              -43.50404,
              -22.768366
            ],
            [
              -43.45254,
              -22.775646
            ],
            [
              -43.429195,
              -22.804451
            ],
            [
              -43.38422,
              -22.788942
            ],
            [
              -43.390743,
              -22.764568
            ],
            [
              -43.355724,
              -22.739239
            ],
            [
              -43.403446,
              -22.705671
            ],
            [
              -43.440525,
              -22.707571
            ],
            [
              -43.4752,
              -22.698704
            ],
            [
              -43.514683,
              -22.742722
            ],
            [
              -43.50404,
              -22.768366
            ]
          ]
        ]
      ]
    },
    "address": {
      "type": "Point",
      "coordinates": [
        -43.432034,
        -22.747707
      ]
    },
    "__v": 0
  }
```

<br>

## Como acessar essa API

- Baixe NodeJs em seu computador clicando [aqui](https://nodejs.org/en/download/);
- Para instalar, siga um dos tutoriais disponibilizados [aqui](https://nodejs.org/pt-br/download/package-manager/);
- Para baixar essa API poderá ser pelo terminal utilizando o gitclone, ou fazendo o dowloand em formato zip [aqui](https://github.com/LcsMonteiro/ze-challenge-backend-Larissa), clique no botão verde e as opções apareceram;
- NodeJs e API baixada? Pelo terminal, acesse a pasta onde a API está e dê os seguintes comandos:
* npm init - y 
* npm install express
* npm start
- Com esses comandos será adicionado ao arquivo uma pasta com o nome "node_modules",dois arquivos com nome "package.json" e "package-lock.js".
- Existem várias dependencias que podem ser instaladas para diversos fins, quer saber mais, clique [aqui](https://docs.npmjs.com/cli/v6/commands/npm-init)
- Com esse passo-a-passo já é possível acessar a API.
- Para acessar o banco de dados é necessario a instalação, esse projeto, foi - se utilizado MongoDB.
- Caso não queira fazer esse passo-a-passo é possivel acessar pelo docker, que é uma plataforma de armazenado em containers virtuais.Para utlizar é necessário baixa-lo [aqui](https://docs.docker.com/desktop/)
-Para entender mais sobre docker, assista esse vídeo [aqui](https://www.youtube.com/watch?v=Kzcz-EVKBEQ);
- Também é possivel acessar pelo heroku, pelas rotas:
* Listar todos parceiros (https://api-partners.herokuapp.com/partners/list)
* Pesquisa pelo id (https://api-partners.herokuapp.com/partners/find/610871e71715c390e6586606)
* A rota "/partners/nearest" não está funcionado no heroku.
* Para mais informações sobre as rotas, consulte a documentação mencionada no inicio. 



## Projeto desenvolvido por: 

### Larissa Monteiro
-[linkedin](https://www.linkedin.com/in/larissa-silva-monteiro/)
-[github](https://github.com/LcsMonteiro)
