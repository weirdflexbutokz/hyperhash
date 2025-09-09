//import models
import { Hash } from "../models/hashing.js"
import { User } from "../models/users.js"
import { choice } from "./utils.js"
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'datadiego',
  password: '1337',
  database: 'hyperhash',
});

async function main() {
  //clear users
  await Hash.deleteAll(pool);
  await User.deleteAll(pool);
  //clear hashes
  await User.create(pool, "user1", "1234");
  await User.create(pool, "user2", "1234");
  await User.create(pool, "user3", "1234");
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