import { compareBcrypt } from '../utilities/hashing.js';

export class User {
  static create = async (pool, name, password) => {
    const [result] = await pool.execute(
      'INSERT INTO users (name, password) VALUES (?, ?)',
      [name, password]
    );
    return { id: result.insertId, name, password };
  };

  static authenticate = async (pool, name, password) => {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE name = ?',
      [name]
    );
    if (!rows.length) return null;
    const user = rows[0];
    if (!compareBcrypt(password, user.password)) return null;
    return user;
  };

  static findByName = async (pool, name) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE name = ?', [name]);
    return rows.length ? rows[0] : null;
  };

  static findById = async (pool, id) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows.length ? rows[0] : null;
  };

  static deleteAll = async pool => pool.execute('DELETE FROM users');

  static deleteById = async (pool, id) => pool.execute('DELETE FROM users WHERE id = ?', [id]);

  static deleteByName = async (pool, name) => pool.execute('DELETE FROM users WHERE name = ?', [name]);

  static getAll = async pool => (await pool.execute('SELECT * FROM users'))[0];
}
