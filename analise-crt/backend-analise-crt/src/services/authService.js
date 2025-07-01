const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

async function criarUsuario({ nome, email, senha, tipo }) {
  const senhaHash = await bcrypt.hash(senha, 10);

  const usuario = await prisma.user.create({
    data: {
      nome,
      email,
      senhaHash,
      tipo,
    },
  });

  // Evita retornar a senha
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    tipo: usuario.tipo,
  };
}

async function autenticarUsuario(email, senha) {
  const usuario = await prisma.user.findUnique({ where: { email } });

  if (!usuario) {
    return null;
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash);
  if (!senhaCorreta) {
    return null;
  }

  const token = jwt.sign(
    { id: usuario.id, tipo: usuario.tipo },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipo,
    },
  };
}

module.exports = {
  criarUsuario,
  autenticarUsuario,
};
