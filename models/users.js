export class User {
  static create = async (pool, name, password) => {
    const [result] = await pool.execute('INSERT INTO users (name, password) VALUES (?, ?)', [name, password]);
    return { id: result.insertId, name, password };
  };

  static findByName = async (pool, name) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE name = ?', [name]);
    return rows.length ? rows[0] : null;
  };

  static findById = async (pool, id) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows.length ? rows[0] : null;
  };

  static authenticate = async (pool, name, password) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE name = ? AND password = ?', [name, password]);
    return rows.length ? rows[0] : null;
  };

  static deleteAll = async pool => pool.execute('DELETE FROM users');

  static deleteById = async (pool, id) => pool.execute('DELETE FROM users WHERE id = ?', [id]);

  static getAll = async pool => (await pool.execute('SELECT * FROM users'))[0];
}
