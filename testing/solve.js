//import models
import { Hash } from "../models/hashing.js"
import { choice } from "../utilities/utils.js"
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
  const hashes = await Hash.getUncracked(pool);
  for (const hash of hashes) {
    console.log(`Resolviendo ${hash.hash} con ${hash.word}`);
    await Hash.trySolve(pool, choice(["user1", "user2", "user3"]), hash.hash, hash.word);
  }
  const leaderboard = await Hash.getLeaderBoard(pool);
  //make an ascii table
  console.log("Leaderboard:");
  console.log("------------------------------");
  console.log("| Name       | Total Points   |");
  console.log("------------------------------");
  for (const row of leaderboard) {
    console.log(`| ${row.name.padEnd(10)} | ${row.total_points.toString().padEnd(15)} |`);
  }
  console.log("------------------------------");
  await pool.end();
}

main();