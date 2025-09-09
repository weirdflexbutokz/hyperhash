const express = require('express');
const router = express.Router();

// POST /login
router.post('/', (req, res) => {
  // Lógica de login pendiente de implementar
  res.json({ message: 'Login endpoint pendiente de implementación' });
});

module.exports = router;
