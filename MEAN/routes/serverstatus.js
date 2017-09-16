var express = require('express');
var router = express.Router();

router.get('/errorcount', (req, res) => {
  res.send({ errorCount: 0 })
});

module.exports = router;
