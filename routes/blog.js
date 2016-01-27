
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    var db=req.app.locals.db;
    var blog=db.collection('blog');

    blog.find().toArray(function(err,results) {
        if (err) throw err;


var context={
    upload:req.body
};
               context.bb = results;

        console.log(context.bb);

        res.render('blog',context);
    });

});
module.exports = router;