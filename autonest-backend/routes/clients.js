const express = require("express");
const router = express.Router();
const clientCtrl = require("../controllers/clientsController");

router.get("/", clientCtrl.getAllClients);
router.get("/:id", clientCtrl.getClientById);
router.post("/", clientCtrl.createClient);
router.put("/:id", clientCtrl.updateClient);
router.delete("/:id", clientCtrl.deleteClient);

module.exports = router;
