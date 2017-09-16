var express = require('express');
var router = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/healthcheck", (req, res) => {
  var responseObject = { message: "OK" };
  res.send(responseObject);
});

let database = [];

router.post('/ilike/:icecreamchoice/:name', (req, res) => {
  //if the is a req body with a formfactor key
  if(req.body.formfactor){
    console.log(req.body.formfactor);
  } else {
    console.log('No formfactor!');
  }
  const choice = req.params.icecreamchoice;
  const name = req.params.name;
  if(name === 'manthan'){
    database.push({ choice: choice, name: name });
    const responseObject = { message: 'Hey ' + name + '! I like ' + choice + ' too!' };
    res.send(responseObject);
  } else {
    res.status(400).send();
  }

});

router.get('/likes', (req, res) => {
  //how to get headers note: headers are incrypted through https
  //so it good for passwords
  var logvalue = req.headers['log'];
  if(logvalue && logvalue == 'info'){
    console.log('Request received for /likes.');
  }

  //how to get query strings
  var select = req.query.select;
  if(database.length === 0){
    var responseObject = undefined;
    if(select && select == "count"){
      responseObject = { count: 0 }
    }
    res.status(404).send(responseObject);
  } else {
    var responseObject = database;
    if(select && select == "count"){
      responseObject = { count: database.length
       }
    }
    res.send(database);
  }
});

module.exports = router;
