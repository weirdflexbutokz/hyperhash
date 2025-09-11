//import models
import { Hash } from "../models/hashing.js"
import { choice } from "./utils.js"
import { createPool } from '../db/pool.js';
import dotenv from "dotenv"

dotenv.config();

const pool = await createPool();

async function main() {
  console.log(await Hash.create(pool, 'wordlists-common', 10));
  console.log(await Hash.create(pool, 'wordlists-common', 10));
  console.log(await Hash.create(pool, 'wordlists-common', 10));
  console.log(await Hash.create(pool, 'wordlists-common', 10));
  console.log(await Hash.create(pool, 'wordlists-common', 10));
  console.log(await Hash.create(pool, 'wordlists-common', 10));
  console.log(await Hash.create(pool, 'wordlists-common', 10));
  console.log(await Hash.create(pool, 'wordlists-starter', 1));
  console.log(await Hash.create(pool, 'wordlists-starter', 1));
  console.log(await Hash.create(pool, 'wordlists-starter', 1));
  console.log(await Hash.create(pool, 'wordlists-starter', 1));
  console.log(await Hash.create(pool, 'wordlists-starter', 1));
  console.log(await Hash.create(pool, 'wordlists-starter', 1));
  console.log(await Hash.create(pool, 'wordlists-starter', 1));
  console.log(await Hash.create(pool, 'wordlists-starter', 1));
  console.log(await Hash.create(pool, 'wordlists-starter', 1));
  await pool.end();
}

main();