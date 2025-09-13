//import models
import { Hash } from "../models/hashing.js"
import { createPool } from '../db/pool.js';
import dotenv from "dotenv"

dotenv.config();

const pool = await createPool();

async function main() {
  await Hash.generateHashes(pool);
  await pool.end();
}

main();