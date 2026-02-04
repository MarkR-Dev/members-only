#! /usr/bin/env node

const { Client } = require("pg");
const { argv } = require("node:process");

const SQL = `
CREATE TABLE accounts (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 	first_name VARCHAR(255) NOT NULL,
 	last_name VARCHAR(255) NOT NULL,
  	username VARCHAR(255) UNIQUE NOT NULL,
  	password VARCHAR(255) NOT NULL,
  	is_member BOOLEAN NOT NULL,
  	is_admin BOOLEAN NOT NULL
);

CREATE TABLE messages (
  	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  	title VARCHAR(255) NOT NULL,
	message VARCHAR(255) NOT NULL,
  	account_id INTEGER REFERENCES accounts(id) ON DELETE CASCADE NOT NULL,
  	date_posted TIMESTAMP(0) NOT NULL
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");`;

const connectionString = argv[2];

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: connectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done");
}

main();
