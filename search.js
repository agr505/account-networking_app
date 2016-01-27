
var app=require('./app');




  exports.search=function(entu,entpa,app){
var egg;
    var profiles=app.locals.db.collection('profiles');
profiles.find().toArray(function(err,results) {
    if(err) throw err;
    else{for(var x=0;x<results.length;x++){
        if(entu==results[x].userp.username&&entpa==results[x].userp.password){
            console.log('match');

         egg=x;

        }
        else{console.log('wrong username or password!!!!');}
    }


    }
});

  return egg;
  };
