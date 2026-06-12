const express = require('express');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando',
    timestamp: new Date().toISOString(),
  });
});

router.use('/users', userRoutes);

module.exports = router;
