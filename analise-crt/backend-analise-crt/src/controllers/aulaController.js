const aulaService = require("../services/aulaService");

exports.criarAula = async (req, res) => {
  const { renach, numeroAula, dataAula, numeroChamado, mesReferencia } = req.body;
  const { id: userId } = req.usuario;

  try {
    const aula = await aulaService.criarAula({
      renach,
      numeroAula,
      dataAula,
      numeroChamado,
      mesReferencia,
      criadoPorId: userId,
    });

    res.status(201).json({ mensagem: "Aula cadastrada com sucesso", aula });
  } catch (err) {
    res.status(400).json({ erro: "Erro ao cadastrar aula", detalhes: err.message });
  }
};

exports.listarAulas = async (req, res) => {
  const filtros = req.query;

  try {
    const aulas = await aulaService.listarAulas(filtros);
    res.status(200).json(aulas);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar aulas", detalhes: err.message });
  }
};

exports.listarMinhasAulas = async (req, res) => {
  const { id, tipo } = req.usuario;
  const { status } = req.query;

  if (tipo !== "agente") {
    return res.status(403).json({ erro: "Acesso negado. Apenas agentes podem acessar." });
  }

  try {
    const aulas = await aulaService.listarMinhasAulas(id, status);
    res.status(200).json(aulas);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar suas aulas", detalhes: err.message });
  }
};

exports.atualizarStatus = async (req, res) => {
  const { id } = req.params;
  const { status, motivoRejeicao } = req.body;
  const { tipo } = req.usuario;

  if (tipo !== "revisor") {
    return res.status(403).json({ erro: "Apenas revisores podem alterar o status" });
  }

  try {
    const aula = await aulaService.atualizarStatus(id, status, motivoRejeicao);
    res.status(200).json({ mensagem: "Status atualizado com sucesso", aula });
  } catch (err) {
    res.status(400).json({ erro: "Erro ao atualizar status", detalhes: err.message });
  }
};
