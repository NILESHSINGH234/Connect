const { getAllpostController } = require('../controllers/postControllers');

const jwt=require('jsonwebtoken');
const requireUser = require('../middlewares/requireUser');

const router=require('express').Router();

router.get('/all',requireUser,getAllpostController);




module.exports=router;