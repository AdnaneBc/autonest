const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await prisma.client.findMany();
    res.json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// GET /clients/:id
exports.getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await prisma.client.findUnique({
      where: { id: Number(id) },
    });
    if (!client) return res.status(404).json({ error: "Client introuvable" });
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// POST /clients
exports.createClient = async (req, res) => {
  const { name, cin, phone, email, driver_license, status, notes } = req.body;
  try {
    const newClient = await prisma.client.create({
      data: {
        name,
        cin,
        phone,
        email,
        driver_license,
        status,
        notes,
      },
    });
    res.status(201).json(newClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création du client" });
  }
};

// PUT /clients/:id
exports.updateClient = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedClient = await prisma.client.update({
      where: { id: Number(id) },
      data,
    });
    res.json(updatedClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du client" });
  }
};

// DELETE /clients/:id
exports.deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.client.delete({ where: { id: Number(id) } });
    res.json({ message: "Client supprimé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
};
