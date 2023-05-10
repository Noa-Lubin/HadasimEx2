const express=require("express");

const router= express.Router();
const positive=require('../control/positive')

router.post("/AddPositive",positive.AddPositive)
router.get("/GetPositives",positive.GetPositives)
router.get("/GetPositive/:clientID",positive.GetPositive)
router.get("/GetRecoveriesToday",positive.GetRecoveriesToday)


module.exports=router
