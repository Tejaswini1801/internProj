var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password:'',
  database:'taskDb',
  debug: false
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/testconnect', function(req,res,next){
if (db != null){
  res.send('success');
  }else{
    res.send('fail');
  }
});

router.get('/select',function(req,res,next){
db.query('SELECT * FROM `tasklist`', function(err,rs){
res.render('select', { tasks : rs});
});
});

router.get('/form', function(req,res,next){
res.render('form', { task : {} });
});

router.post('/form', function(req,res,next){
 db.query('INSERT INTO `tasklist` SET ?', req.body, function(err,rs){
  res.redirect('select');
 })
});

router.get('/delete', function(req,res,next){
  db.query('DELETE FROM `tasklist` WHERE Id = ?', req.query.Id, function(err,rs){
    res.redirect('select');
  })
  });

  router.get('/edit', function(req,res,next){
    db.query('SELECT * FROM `tasklist` WHERE Id = ?', req.query.Id, function(err,rs){
      res.render('form', { task : rs[0]});
    })
    });

    router.post('/edit', function(req,  res){
      var param = [
        req.body,
        req.query.Id
      ]
      db.query('UPDATE `tasklist` SET ? WHERE Id = ?', param, function(err,rs){
        res.redirect('/select');
      })
      });
  

module.exports = router;
