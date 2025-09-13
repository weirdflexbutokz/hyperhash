export function requireAuth(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  res.status(401).redirect('/login');
}

export async function requireApiKey(req, res, next) {
  const apikey = req.headers['x-apikey'];
  if (!apikey) {
    return res.status(401).json({ error: 'APIKEY requerida' });
  }
  const { pool } = await import('../server.js');
  const [rows] = await pool.execute('SELECT * FROM users WHERE apikey = ?', [apikey]);
  if (rows.length === 0) {
    return res.status(401).json({ error: 'APIKEY inválida' });
  }
  req.user = rows[0];
  next();
}