Tabadulat Assessment:
Build a node.js / typescript api that allows me to create and edit notes.

Requirements: 

•	API must be Restful

•	Schema for Note = {id, title, body, created_on, edited_on}

•	SQL database

•	Hawk authentication must be used

•	Dockerized

Code: https://github.com/akshayseth/notes

1.	Build the Docker images and start the containers using Docker Compose:
```
docker-compose up --build
```
This will:

o	Build the Node.js application defined in the Dockerfile.

o	Start a PostgreSQL container and an app container.

o	Set up the Prisma client in the app container.

2.	Check that everything is running: 
After running the above command, Docker will spin up both services, and you should see logs for the PostgreSQL and app services.

Apply Prisma Migrations

Once the app and database containers are running, apply the Prisma migrations to set up the database schema.

Run Prisma migrations inside the app container:
```
docker-compose exec app npx prisma migrate dev --name init
```
This command applies the migration files and creates the necessary tables in PostgreSQL.

3.	Verify migration: You can verify that the database schema is applied correctly by connecting to the database and checking the notes table.

Using Postman or curl for Testing
1.	Set the method (POST, GET, PUT).
2.	Set the URL: http://localhost:3000/api/notes.
3.	Under the Authorization tab, select Hawk.
4.	Fill in:
```
o	ID: samy_1234
o	Key: werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn
o	Algorithm: sha256.
```
5.	Enter the request body (for POST/PUT requests):
```
{
  "title": "My First Note",
  "body": "This is the content of my first note."
}
```
Stopping and Cleaning Up
1.	Stop the containers: To stop the running containers, use:
```
docker-compose down
```
2.	Remove volumes: If you want to remove the volumes (which will also delete the database data):
```
docker-compose down --volumes
```
