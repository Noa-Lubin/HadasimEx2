const express = require("express");

const router = express.Router();
const client = require('../control/client')

// Adding a new client to the HMO by receiving employee details.
// With integrity check - if it already exists in the database
// And if the date of birth is not in the future.
router.post("/AddClient", client.AddClient) 
//Showing all the clients that exist in the database
router.get("/allClients", client.GetClients) 
//Get a client by his ID
router.get("/getClient/:ID", client.GetClient) 
router.get("/GetClientsNotVaccinated", client.GetClientsNotVaccinated) 

module.exports = router