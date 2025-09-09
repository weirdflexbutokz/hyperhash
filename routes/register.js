import express from "express"
import { User } from "../models/users.js"
import { Hash } from "../models/hashing.js"
import { pool } from "../server.js"

const router = express.Router()

router.post("/register", async (req, res) => {
  const { username, password } = req.body
  console.log(username,password)
  const user = await User.create(pool, username, Hash.encryptMD5(password))
  res.status(201).send("User registered")
})

export default router
