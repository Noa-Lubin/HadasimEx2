const express=require("express");

const router= express.Router();
const vaccination=require('../control/vaccinations')

router.get("/GetVaccinations",vaccination.GetVaccinations)
router.get("/GetVaccinationsClient/:clientID",vaccination.GetVaccinationsByClientID)
router.get("/GetVaccinationsByNum/:VaccinationNum",vaccination.GetVaccinationsByNum)
router.post("/AddVaccination",vaccination.AddVaccination)


module.exports=router


