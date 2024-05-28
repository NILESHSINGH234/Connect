const { getAllpostController } = require('../controllers/postControllers');

const router=require('express').Router();

router.get('/all',getAllpostController);


module.exports=router;