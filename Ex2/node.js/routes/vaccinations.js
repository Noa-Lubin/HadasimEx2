const express=require("express");

const router= express.Router();
const vaccination=require('../control/vaccinations')

//Display of all vaccinated vaccines, including the customer ID and vaccine manufacturer
router.get("/GetVaccinations",vaccination.GetVaccinations)
//Get all vaccinations of a specific client by his ID
router.get("/GetVaccinationsClient/:clientID",vaccination.GetVaccinationsByClientID)
//Get vaccination by code
router.get("/GetVaccinationsByNum/:vaccinationNum",vaccination.GetVaccinationsByNum)
// Adding a new vaccination to the db by receiving vaccination details.
// With integrity check - id he already exists in the clients table
// if he did not do all the 4 vaccinations,
// And if the date is not in the future.
router.post("/AddVaccination",vaccination.AddVaccination)
//Display vaccinations by its manufacturer
router.get("/GetVaccinationsByManufacturer/:manufacturer",vaccination.GetVaccinationsByManufacturer)


module.exports=router


