var express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

//const routes = require('./src/routes/crmRoutes');

app.use(function(req,res,next){

   console.log("Time:", Date.now());
   next();
})

app.route('/').get(function(req,res,next){
    console.log("Method", req.method);
    next();
}, function(req,res,next){
    console.log("Original url", req.originalUrl)
    next();
}, function(req,res,next){
    res.send("This is the get request being served");
})

app.listen(PORT, () =>{
    console.log(`Your server is running on port: ${PORT}`)
});