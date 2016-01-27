var express = require('express');
var router = express.Router();
var fs=require('fs');

router.get('/', function(req, res, next) {


    res.render('avatar');

});
router.post('/', function(req, res, next) {
    var db=req.app.locals.db;
    var profiles=db.collection('profiles');
    var user=req.session.user;
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);

        //Path where image will be uploaded
        fstream = fs.createWriteStream("/Users/zacharyreich/WebstormProjects/user/public/images/" + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            console.log("Upload Finished of " + filename);



            var photo = "http://localhost:3000/images/" + filename;

            profiles.updateOne({usern:user}, {$set:{userim:photo}},function(){});
            res.redirect('login');
        });

    });







});
module.exports = router;