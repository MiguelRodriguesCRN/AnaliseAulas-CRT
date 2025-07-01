const express = require("express");
const router = express.Router();
const aulaController = require("../controllers/aulaController");
const autenticar = require("../middlewares/authMiddleware");

router.use(autenticar);

router.post("/", aulaController.criarAula);
router.get("/", aulaController.listarAulas);
router.put("/:id/status", aulaController.atualizarStatus);
router.get("/minhas", aulaController.listarMinhasAulas); // NOVA ROTA

module.exports = router;
