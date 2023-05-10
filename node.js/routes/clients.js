const express = require("express");

const router = express.Router();
const client = require('../control/client')

router.post("/AddClient", client.AddClient)
router.get("/allClients", client.GetClients)
router.get("/getClient/:ID", client.GetClient)
router.get("/GetClientsNotVaccinated", client.GetClientsNotVaccinated)

module.exports = router