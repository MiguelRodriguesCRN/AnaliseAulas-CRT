const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const autenticar = require("../middlewares/authMiddleware");

router.use(autenticar);

router.get("/", dashboardController.obterEstatisticas);
router.get("/aulas-aguardando", dashboardController.gerarPDFAulasAguardando);

module.exports = router;
