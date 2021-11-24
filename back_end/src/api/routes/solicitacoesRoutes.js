const express = require('express');
const router = express.Router();

const solicitacoesControllers = require('../controllers/solicitacoesControllers')

router.get('/solicitacoes', solicitacoesControllers.index);
router.post('/solicitacoes', solicitacoesControllers.store);
router.put('/solicitacoes/:codigo',solicitacoesControllers.update);
router.delete('/solicitacoes/:codigo',solicitacoesControllers.delete);

module.exports = router;
