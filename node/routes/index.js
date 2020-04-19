var express = require('express');
var router = express.Router();
const db = require('../models/index');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const result = await db.task.findAll({});
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/task", async function(req, res, next) {
  try {
    const result = await db.task.create({
      taskname: req.body.task
    });
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
