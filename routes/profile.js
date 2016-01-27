
var express = require('express');
var router = express.Router();




router.get('/:name', function(req, res) {





    var db=req.app.locals.db;
    var profiles=db.collection('profiles');

    var ents=req.params.name;
    profiles.findOne({usern:ents}, function(err, item) {
        if (err) throw err;
        if(item==null)
        {
           res.redirect('login');
        }
        else if(item)
        {
            console.log(item.userim);
            var con={
                name:item.usern,
                password:item.userp,
                job:item.userj,
                pn:item.userpn,
                email:item.usere,
                photo:item.userim,
                upload: req.body
            };
            res.render('profile',con);
        }
    });
});


module.exports = router;
