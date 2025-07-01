const dashboardService = require("../services/dashboardService");
const { gerarPDFAulasAguardando } = require("../utils/gerarPDF");

exports.obterEstatisticas = async (req, res) => {
  const { tipo } = req.usuario;
  const { mes } = req.query;

  if (tipo !== "revisor") {
    return res.status(403).json({ erro: "Acesso negado. Apenas revisores podem acessar." });
  }

  if (!mes) {
    return res.status(400).json({ erro: "Parâmetro 'mes' é obrigatório no formato YYYY-MM" });
  }

  try {
    const estatisticas = await dashboardService.obterEstatisticasPorMes(mes);
    res.json(estatisticas);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao obter estatísticas", detalhes: err.message });
  }
};

exports.gerarPDFAulasAguardando = async (req, res) => {
  const { tipo } = req.usuario;
  const { mes } = req.query;

  if (tipo !== "revisor") {
    return res.status(403).json({ erro: "Acesso negado. Apenas revisores podem acessar." });
  }

  if (!mes) {
    return res.status(400).json({ erro: "Parâmetro 'mes' é obrigatório no formato YYYY-MM" });
  }

  try {
    const aulas = await dashboardService.obterAulasAguardandoPorMes(mes);
    const pdfBuffer = await gerarPDFAulasAguardando(aulas, mes);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="aulas_aguardando_${mes}.pdf"`,
    });

    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao gerar PDF", detalhes: err.message });
  }
};