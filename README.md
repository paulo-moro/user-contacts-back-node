# user-contacts-back-node

Aplicação criada para gerenciamento de usuarios e lista de contatos.
Após clonar o repositório executar os seguintes comandos:



```
docker-compose up --build
```

em sequencia executar as migrações dentro do docker:

```
docker exec api yarn typeorm migration:run -d src/data-source 
```

## Não esquecer
```
Não esquecer de definir as variáveis de ambiente no .env.exemple
```
 
libs utilizadas
```
* jest
* express-asyn-errors
* bcryptjs
* dot-env
* jsonwebtoken
* pg
* reflect-metadata
* swagger-ui-express
* typeorm
* uuid
* sqlite3
* supertest
* ts-jest
* ts-node-dev
* express
```

após iniciar a aplicação para acessar a documentação da api basta acessar o endpoint /api-docs.