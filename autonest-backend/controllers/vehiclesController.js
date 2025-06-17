const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /vehicles
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany();
    res.json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// GET /vehicles/:id
exports.getVehicleById = async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: Number(id) },
    });
    if (!vehicle)
      return res.status(404).json({ error: "Véhicule introuvable" });
    res.json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// POST /vehicles
exports.createVehicle = async (req, res) => {
  const { make, model, plate, price_per_day, status, image_url } = req.body;
  try {
    const newVehicle = await prisma.vehicle.create({
      data: { make, model, plate, price_per_day, status, image_url },
    });
    res.status(201).json(newVehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création" });
  }
};

// PUT /vehicles/:id
exports.updateVehicle = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedVehicle = await prisma.vehicle.update({
      where: { id: Number(id) },
      data,
    });
    res.json(updatedVehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la mise à jour" });
  }
};

// DELETE /vehicles/:id
exports.deleteVehicle = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.vehicle.delete({ where: { id: Number(id) } });
    res.json({ message: "Véhicule supprimé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
};
