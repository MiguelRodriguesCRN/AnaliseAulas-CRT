const authService = require("../services/authService");

exports.registrarUsuario = async (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  try {
    if (!nome || !email || !senha || !tipo) {
      return res.status(400).json({ erro: "Preencha todos os campos obrigatórios" });
    }

    const usuario = await authService.criarUsuario({ nome, email, senha, tipo });

    res.status(201).json({ mensagem: "Usuário criado com sucesso", usuario });
  } catch (err) {
    res.status(400).json({ erro: "Erro ao criar usuário", detalhes: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const resultado = await authService.autenticarUsuario(email, senha);

    if (!resultado) {
      return res.status(401).json({ erro: "Credenciais inválidas" });
    }

    res.status(200).json({
      mensagem: "Login realizado com sucesso",
      token: resultado.token,
      usuario: resultado.usuario,
    });
  } catch (err) {
    res.status(500).json({ erro: "Erro no login", detalhes: err.message });
  }
};
