require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Importar rotas
const userRoutes = require("./routes/userRoutes");
const aulaRoutes = require("./routes/aulaRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");


app.use("/api/usuarios", userRoutes);
app.use("/api/aulas", aulaRoutes);
app.use("/api/dashboard", dashboardRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
