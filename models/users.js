export class User {
  static async create(pool, name, password) {
    const [result] = await pool.execute(
      'INSERT INTO users (name, password) VALUES (?, ?)',
      [name, password]
    );
    return new User({ id: result.insertId, name, password });
  }

  static async findByName(pool, name) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE name = ?',
      [name]
    );
    if (rows.length === 0) return null;
    return new User(rows[0]);
  }

  static async findById(pool, id) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    if (rows.length === 0) return null;
    return new User(rows[0]);
  }

  static async authenticate(pool, name, password) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE name = ? AND password = ?',
      [name, password]
    );
    if (rows.length === 0) return null;
    return rows[0];
  }

  static async deleteAll(pool) {
    await pool.execute('DELETE FROM users');
  }

  static async deleteById(pool, id) {
    await pool.execute(
      'DELETE FROM users WHERE id = ?',
      [id]
    );
  }

  static async getAll(pool) {
    const [result] = await pool.execute('SELECT * FROM users')
    return result
  }
}
