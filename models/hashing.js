import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { choice, randomLine, randomFile } from "../utilities/utils.js"

export class Hash {
  static algoMap = new Map([
    ["md5", this.encryptMD5],
    ["sha1", this.encryptSHA1],
    ["sha256", this.encryptSHA256],
    // ["md4", this.encryptMD4],
    ["sha512", this.encryptSHA512],
    ["ripemd160", this.encryptRIPEMD160],
    ["bcrypt", this.bcryptHash],
    // ["whirlpool", this.encryptWhirlpool],
    ["sha3-256", this.encryptSHA3_256],
    ["sha3-512", this.encryptSHA3_512]
  ]);
  static compareMap = new Map([
    ["md5", this.compareMD5],
    ["sha1", this.compareSHA1],
    ["sha256", this.compareSHA256],
    ["md4", this.compareMD4],
    ["sha512", this.compareSHA512],
    ["ripemd160", this.compareRIPEMD160],
    ["bcrypt", this.compareBcrypt],
    ["whirlpool", this.compareWhirlpool],
    ["sha3-256", this.compareSHA3_256],
    ["sha3-512", this.compareSHA3_512]
  ]);
  static getRandomAlgo() {
    return choice(Array.from(Hash.algoMap.keys()));
  }
  static async create(pool, mode, points) {
    let cleartext;
    let algo = Hash.getRandomAlgo();
    if (mode === "wordlists-common") {
      cleartext = await randomLine(randomFile("./wordlists/"))
    }
    else if (mode === "wordlists-starter") {
      cleartext = await randomLine(randomFile('./public/wordlists/'));
    }
    const modeId = await Hash.getModeId(pool, mode);
    const encryptFn = Hash.algoMap.get(algo);
    if (!encryptFn) throw new Error(`No existe función de cifrado para el algoritmo: ${algo}`);
    const hash = encryptFn.call(this, cleartext);
    try {
      await pool.execute(
        'INSERT INTO hashes (hash, word, points, algo, player_id, mode_id) VALUES (?, ?, ?, ?, ?, ?)',
        [hash, cleartext, points, algo, null, modeId]
      );
    } catch (error) {
      console.error(`Error al crear hash: ${error.message}`);
    }
    return hash;
  }

  static async trySolve(pool, player_name, hash, solution) {
    // Asegura que el usuario existe
    const [userRows] = await pool.execute('SELECT id FROM users WHERE name = ?', [player_name]);
    let userId;
    if (userRows.length === 0) {
      // Si no existe, lo crea con una contraseña dummy
      const [result] = await pool.execute('INSERT INTO users (name, password) VALUES (?, ?)', [player_name, 'dummy']);
      userId = result.insertId;
    } else {
      userId = userRows[0].id;
    }
    const uncracked = await this.getUncracked(pool);
    const target = uncracked.find(row => row.hash === hash);
    if (!target) throw new Error('Hash not found');
    const compareFn = this.compareMap.get(target.algo);
    if (!compareFn) throw new Error(`No existe función de comparación para el algoritmo: ${target.algo}`);
    const isCorrect = compareFn.call(this, solution, target.hash);
    if (isCorrect) {
      await pool.execute(
        'UPDATE hashes SET player_id = ? WHERE hash = ?',
        [userId, hash]
      );
    }
    return isCorrect;
  }

  static async getUncracked(pool) {
    const [rows] = await pool.execute(
      `SELECT h.id, h.hash, h.word, h.points, h.algo, gm.name as mode
       FROM hashes h
       JOIN game_mode gm ON h.mode_id = gm.id
       WHERE h.player_id IS NULL`
    );
    return rows;
  }

  static async getCracked(pool) {
    const [rows] = await pool.execute(
      'SELECT * FROM hashes WHERE player_id IS NOT NULL'
    );
    return rows;
  }

  static async deleteAll(pool) {
    await pool.execute('DELETE FROM hashes');
  }
  static async getLeaderBoard(pool) {
    const [rows] = await pool.execute(`
      SELECT u.name, SUM(h.points) AS total_points
      FROM users u
      JOIN hashes h ON u.id = h.player_id
      GROUP BY u.id, u.name
      ORDER BY total_points DESC
    `);
    return rows;
  }
  static async getModes(pool) {
    const [rows] = await pool.execute(
      'SELECT * FROM game_mode'
    );
    return rows;
  }
  static async getModeId(pool, mode) {
    const modes = await this.getModes(pool); // pass pool here
    const found = modes.find(m => m.name === mode);
    return found ? found.id : null;
  }
  static async getByUser(pool, username) {
    const [rows] = await pool.execute(
      'SELECT * FROM hashes WHERE player_id = (SELECT id FROM users WHERE name = ?)',
      [username]
    );
    return rows;
  }

  static encryptMD5(input) {
    return crypto.createHash('md5').update(input).digest('hex');
  }

  static compareMD5(input, hash) {
    return this.encryptMD5(input) === hash;
  }

  static encryptSHA1(input) {
    return crypto.createHash('sha1').update(input, 'utf8').digest('hex');
  }

  static compareSHA1(input, hash) {
    return this.encryptSHA1(input) === hash;
  }

  static encryptSHA256(input) {
    return crypto.createHash('sha256').update(input, 'utf8').digest('hex');
  }

  static compareSHA256(input, hash) {
    return this.encryptSHA256(input) === hash;
  }

  static encryptMD4(input) {
    return crypto.createHash('md4').update(input, 'utf8').digest('hex');
  }

  static compareMD4(input, hash) {
    return this.encryptMD4(input) === hash;
  }

  static encryptSHA512(input) {
    return crypto.createHash('sha512').update(input, 'utf8').digest('hex');
  }

  static compareSHA512(input, hash) {
    return this.encryptSHA512(input) === hash;
  }

  static encryptRIPEMD160(input) {
    return crypto.createHash('ripemd160').update(input, 'utf8').digest('hex');
  }

  static compareRIPEMD160(input, hash) {
    return this.encryptRIPEMD160(input) === hash;
  }

  static bcryptHash(input) {
    const saltRounds = 10;
    return bcrypt.hashSync(input, saltRounds);
  }

  static compareBcrypt(input, hash) {
    return bcrypt.compareSync(input, hash);
  }

  static encryptWhirlpool(input) {
    return crypto.createHash('whirlpool').update(input, 'utf8').digest('hex');
  }

  static compareWhirlpool(input, hash) {
    return this.encryptWhirlpool(input) === hash;
  }

  static encryptSHA3_256(input) {
    return crypto.createHash('sha3-256').update(input, 'utf8').digest('hex');
  }

  static compareSHA3_256(input, hash) {
    return this.encryptSHA3_256(input) === hash;
  }

  static encryptSHA3_512(input) {
    return crypto.createHash('sha3-512').update(input, 'utf8').digest('hex');
  }

  static compareSHA3_512(input, hash) {
    return this.encryptSHA3_512(input) === hash;
  }
}