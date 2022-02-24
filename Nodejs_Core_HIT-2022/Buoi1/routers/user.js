const express = require('express');
const router = express.Router();

const {getUser,getUserQuery,postCreateUser,deleteUser,patchUpdateUser} = require('../controllers/user.controller');

router
    .get('/',getUser)
    .get('/search',getUserQuery)
    .post('/',postCreateUser)
    .patch('/update/:id',patchUpdateUser)
    .delete('/:id',deleteUser)

module.exports = router;