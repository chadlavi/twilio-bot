var compose = require("./composer.js");
var routes = function(app) {
  app.get("/", function(req, res) {
    res.sendFile('views/index.html', { root: __dirname });
    console.log("Received GET");
  });

  app.post("/sms", function(req, res) {
    if(!req.body.From || !req.body.Body) {
      console.log("Received incomplete POST: "+JSON.stringify(req.body));
      return res.send({"status": "error", "message": "missing parameter(s)"});
    } else {
      var sender = req.body.From;
      var body = req.body.Body;
      var message = compose.message(sender, body);
      res.send("<?xml version='1.0' encoding='UTF-8' ?><Response><Message>"+message+"</Message></Response>");
    }
  });
  
};
 
module.exports = routes;