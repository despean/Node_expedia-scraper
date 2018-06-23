/**
 * Created by Administrator on 2018-06-23.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send({Error: "Wrong route"});
});

module.exports = router;
