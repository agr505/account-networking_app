
var express = require('express');
var router = express.Router();
var prof=require('./prof');


router.get('/', function(req, res, next) {




if(req.session.user&&req.session) {
    var context = {

        upload: req.body
    };
    context.username=req.session.user;
    res.render('account', context);

}
else{
    res.redirect('login');
}









});
router.post('/', function(req, res, next) {
    if (req.body.button==1)
    {
        req.session.user=null;
        res.redirect('login');
    }
    else
    {
        next();
    }
});
router.post('/', function(req, res, next) {



    if (req.body.button==0) {
        var con = {
            upload: req.body
        };


        var db = req.app.locals.db;
        var profiles = db.collection('profiles');

        var ents = req.body.username;
        profiles.findOne({usern: ents}, function (err, item) {
            if (err) throw err;
            if (item == null) {
                con.wrong = 'User cannot be found!';
                res.render('account', con);
            }
            else if (item) {
                res.redirect('profile' + '/' + ents);
            }
        });
    }
    else
    {
        next();
    }




});
router.post('/', function(req, res, next) {
    var db = req.app.locals.db;
    var blog = db.collection('blog');
    var blogname=req.body.blogname;
    var blogpost=req.body.blogpost;
      var blogposter=req.session.user;
    console.log(blogname);
    console.log(blogpost);
    console.log(blogposter);
    blog.insertOne(
        {
          blogname:blogname,
            blogposter:blogposter,
            blogpost:blogpost


        }
        , function (err, documents) {
            if (err) {
                throw err;
            }
            else {
                console.log('good');

                res.redirect('account');
            }
        }
    );
});

module.exports = router;