const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.criarAula = async ({ renach, numeroAula, dataAula, numeroChamado, mesReferencia, criadoPorId }) => {
  return await prisma.aula.create({
    data: {
      renach,
      numeroAula,
      dataAula: new Date(dataAula),
      numeroChamado,
      mesReferencia,
      criadoPorId,
    },
  });
};

exports.listarAulas = async (filtros = {}) => {
  // Montar a condição where de forma dinâmica
  const where = {};

  if (filtros.mesReferencia) {
    // Filtra exatamente o mês e ano (YYYY-MM)
    where.mesReferencia = filtros.mesReferencia;
  }

  if (filtros.numeroAula) {
    // Busca parcial e case insensitive em número da aula
    where.numeroAula = {
      contains: filtros.numeroAula,
      mode: "insensitive",
    };
  }

  return await prisma.aula.findMany({
    where,
    include: { criadoPor: true },
    orderBy: { dataAtualizacao: "desc" },
  });
};

exports.atualizarStatus = async (id, status, motivoRejeicao) => {
  return await prisma.aula.update({
    where: { id: Number(id) },
    data: {
      status,
      motivoRejeicao: status === "Rejeitada" ? motivoRejeicao : null,
    },
  });
};

exports.listarMinhasAulas = async (agenteId, status) => {
  const where = { criadoPorId: agenteId };

  if (status) {
    where.status = status;
  }

  return await prisma.aula.findMany({
    where,
    orderBy: { dataAula: "desc" },
  });
};
