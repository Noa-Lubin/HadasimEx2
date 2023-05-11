const express = require("express");

const router= express.Router();
const positive=require('../control/positive')

// Adding a new positive patient to the db by receiving details.
// With integrity check - if he already exists in positive table
// if he exist in clients table
// And if the dates of are not in the future.
router.post("/AddPositive",positive.AddPositive)
// display all the positive patients
router.get("/GetPositives",positive.GetPositives)
// Get positive patient by his ID
router.get("/GetPositiveByClientID/:clientID",positive.GetPositiveByClientID)
// Get positive patient by num
router.get("/GetPositiveByNum/:positiveCode",positive.GetPositiveByNum)
//Get the positive patients who recovered today
router.get("/GetRecoveriesToday",positive.GetRecoveriesToday)

module.exports=router
