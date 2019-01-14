// module.exports = router;
var express = require('express');
var router = express.Router();
var {
  finds,
  insert,
  del,
  update
} = require("../libs/mongo.js");
//引入token
var token = require("../libs/token.js");  

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/findUser', async (req, res, next) => {
  let {
    id,
    name,
    password,
    hobby
  } = req.body
  let data = await finds(`xiang`, {
    id
  })
  res.send(data);
});

router.post('/login', async (req, res, next) => {
  let {
    inputEmail,
    inputPassword
  } = req.body
  let data = await finds(`xiang`, {
    name: inputEmail
  })
  console.log(data);
  console.log(data[0].password)
  if (data[0].password === inputPassword) {
    res.send({
    status: "success",
     token:token.createToken({
      inputEmail,
      inputPassword
      },10)
    });
  }else {
    res.send({
      status: "fail"
    });
  }
});

router.post('/autoLogin', async (req, res, next) => {
  // console.log(req.headers)
  res.send({
    status:token.checkToken(req.headers.token)
  })
})
module.exports = router;