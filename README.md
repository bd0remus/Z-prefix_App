
DATABASE SETUP:

 *NOTE: replace the develop details in the knex files with your database's connection details*

run:

docker pull postgres

mkdir -p $HOME/docker/volumes/postgres

docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 \
-v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres

docker exec -it <PSQL-Container-ID> bash

psql -U postgres

CREATE DATABASE inventory;
----------------------------------------------------------------------------------------------------------------------------
BACKEND SETUP:

cd server

npm i

npx knex migrate:latest

npx knex seed:run

nodemon server.js

----------------------------------------------------------------------------------------------------------------------------

FRONTEND SETUP:

cd client

npm i

npm run dev