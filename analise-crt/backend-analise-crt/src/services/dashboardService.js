const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.obterEstatisticasPorMes = async (mes) => {
  const totalAulas = await prisma.aula.count({
    where: {
      mesReferencia: mes,
    },
  });

  const aulasPorStatus = await prisma.aula.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
    where: {
      mesReferencia: mes,
    },
  });

  return {
    totalAulas,
    aulasPorStatus,
    mesSelecionado: mes,
  };
};

exports.obterAulasAguardandoPorMes = async (mes) => {
  return await prisma.aula.findMany({
    where: {
      mesReferencia: mes,
      status: "Aguardando",
    },
    select: {
      renach: true,
      numeroAula: true,
      dataAula: true,
      numeroChamado: true,
      mesReferencia: true,
    },
  });
};