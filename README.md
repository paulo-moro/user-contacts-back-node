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