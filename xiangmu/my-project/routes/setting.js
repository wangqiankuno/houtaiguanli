var express = require('express');
var router = express.Router();
var {
    connect,
    insert,
    find,
    finds,
    ObjectId,
    del,
    update
} = require("../libs/mongo.js");
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/findUser', async (req, res, next) => {
    let {
        name
    } = req.body
    let data = await finds(`xiang`, name ? {
        name
    } : {})
    res.send(data);
});

router.post('/signs', async (req, res, next) => {
    let {
        name,
        age,
        skill,
        description,
        password
    } = req.body
    // console.log(name,age,skill,description,password);
    // console.log(666);
    let data = await insert(`xiang`, [{
        name,
        age,
        skill,
        description,
        password
    }])
    res.send(data);
});

router.post('/shan', async (req, res, next) => {
    let {
        name
    } = req.body
    // console.log(name,age,skill,description,password);
    console.log(666);
    let data = await del(`xiang`, {
        name
    })
    res.send(data);
});
router.post('/update', async (req, res, next) => {
    // console.log(name,names,age,skill,description,password);
    console.log(666);
    let {
        name,
        names,
        age,
        skill,
        description,
        password
    } = req.body
        console.log(name,names,age,skill,description,password);
        console.log(666);
    let data = await update(`xiang`, {
        name:name
    },{
        name:names,
        age:age,
        skill:skill,
        description:description,
        password:password
    })
    res.send(data);
});
router.post('/login', async (req, res, next) => {
//   console.log(inputEmail,inputPassword);
  let {
    inputEmail,
    inputPassword 
  } = req.body
  let data = await finds(`xiang`, {
    name: inputEmail
  })

//   console.log(data[0].password);
  if (data[0].password === inputPassword) {
    res.send("success");
  }else {
    res.send("fail");
  }
});


module.exports = router;