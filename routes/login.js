
var express = require('express');
var router = express.Router();
var search=require('./../search');



router.get('/', function(req, res, next) {



res.render('login');








});
router.post('/', function(req, res, next) {


    var context={
        upload: req.body
    };

    var entu=req.body.entn;
    var entpa=req.body.entp;
    console.log(entu);
    console.log(entpa);


    var db=req.app.locals.db;
    var profiles=db.collection('profiles');

    profiles.findOne({usern:entu,userp:entpa}, function(err, item) {
if (err) throw err;
        if(item==null)
        {
            context.wrong='Wrong Username or Password!';
            res.render('login',context);
        }
        else
        {
            req.session.user = item.usern;
            res.redirect('account');
        }
    });
});

module.exports = router;
