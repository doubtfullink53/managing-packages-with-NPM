let express = require('express');
let app = express();
require('dotenv').config();

app.use(function(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip)
    next();
})



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


app.use(express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/public"));



// app.get("/json", (req, res) => {   
//     res.json({
//         message: "Hello json"
//     });
// });



app.get("/json", function (req, res) {

   var jsonResponse = {"message": "Hello json"};
   if(process.env.MESSAGE_STYLE === "uppercase") {
        jsonResponse.message = jsonResponse.message.toUpperCase();
   }
    res.json(jsonResponse);
})





app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.send({
        time: req.time
    });
})



app.get("/:word/echo", function(req, res) {
    res.json({echo: req.params.word})
});







 module.exports = app;