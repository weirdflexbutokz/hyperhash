import mysql from 'mysql2/promise';
import dotenv from "dotenv";
import { User } from "../models/users.js"
import { Hash } from "../models/hashing.js"
import { createPool } from './pool.js';
dotenv.config();

async function main() {
  // Creamos el pool solo para este script y habilitamos múltiples sentencias
  const pool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
  });

  //TODO Añadir campo APIKEY a la tabla users
  await pool.query(`
    DROP TABLE IF EXISTS hashes;
    DROP TABLE IF EXISTS game_mode;
    DROP TABLE IF EXISTS users;

    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS game_mode (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS hashes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      hash VARCHAR(255) NOT NULL UNIQUE,
      word VARCHAR(100) NOT NULL,
      algo VARCHAR(100) NOT NULL,
      points INT NOT NULL,
      player_id INT,
      mode_id INT,
      FOREIGN KEY (player_id) REFERENCES users(id),
      FOREIGN KEY (mode_id) REFERENCES game_mode(id)
    );

    INSERT INTO game_mode (name) VALUES ('wordlists-starter');
    INSERT INTO game_mode (name) VALUES ('wordlists-common');
  `);
  // await User.create(pool, "user1", "1234");
  // await User.create(pool, "user2", "1234");
  // await User.create(pool, "user3", "1234");
  // console.log(await Hash.create(pool, 'wordlists-common', 10));
  // console.log(await Hash.create(pool, 'wordlists-common', 10));
  // console.log(await Hash.create(pool, 'wordlists-common', 10));
  // console.log(await Hash.create(pool, 'wordlists-starter', 1));
  // console.log(await Hash.create(pool, 'wordlists-starter', 1));
  // console.log(await Hash.create(pool, 'wordlists-starter', 1));
  // console.log(await Hash.create(pool, 'wordlists-starter', 1));
  // console.log(await Hash.create(pool, 'wordlists-starter', 1));
  await pool.end();
  console.log('Esquema ejecutado correctamente en MySQL');
}

main();