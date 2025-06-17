const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const clientsRoutes = require("./routes/clients");

const vehiclesRoutes = require("./routes/vehicles");

app.use(cors());
app.use(express.json());

app.use("/vehicles", vehiclesRoutes);
app.use("/clients", clientsRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur prêt sur http://localhost:${PORT}`);
});
