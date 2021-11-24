const express = require('express');
const router = express.Router();

const usuariosControllers = require('../controllers/usuariosControllers.js')

router.get('/usuarios', usuariosControllers.index);
router.post('/usuarios', usuariosControllers.store);
router.put('/usuarios/:codigo',usuariosControllers.update);
router.delete('/usuarios/:codigo',usuariosControllers.delete);

module.exports = router;
