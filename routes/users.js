
var express = require('express');
var router = express.Router();
var fs=require('fs');

router.get('/', function(req, res, next) {











  res.render('index');






});

router.post('/', function(req, res, next) {
   if (req.body.button==2)
   {res.redirect('login');}
    
    var db=req.app.locals.db;
  var profiles=db.collection('profiles');

    var username=req.body.nam;
    var password= req.body.pass;
    var job=req.body.job;
        var phonenumber=req.body.pn;
        var email=req.body.email;

            profiles.insertOne(
                {
                    usern: username,
                    userp: password,
                    userj: job,
                    userpn: phonenumber,
                    usere: email,
                    userim:''



                }
                , function (err, documents) {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log('good');
                        req.session.user = username;
                        res.redirect('avatar');
                    }
                }
            );
});
module.exports = router;