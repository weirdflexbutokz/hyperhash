//import models
import { Hash } from "../models/hashing.js"
import { User } from "../models/users.js"
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'datadiego',
  password: '1337',
  database: 'hyperhash',
});

async function main() {
  await User.create(pool, "user1", "1234");
  await User.create(pool, "user2", "1234");
  await User.create(pool, "user3", "1234");
  console.log(await Hash.create(pool, 'wordlists-common', 10));
  console.log(await Hash.create(pool, 'wordlists-common', 10));
  console.log(await Hash.create(pool, 'wordlists-common', 10));
  console.log(await Hash.create(pool, 'wordlists-starter', 1));
  console.log(await Hash.create(pool, 'wordlists-starter', 1));
  console.log(await Hash.create(pool, 'wordlists-starter', 1));
  console.log(await Hash.create(pool, 'wordlists-starter', 1));
  console.log(await Hash.create(pool, 'wordlists-starter', 1));
  await pool.end();
}

main();