var db = require("../models");
var cors = require('cors');

module.exports = function(app) {
  // Load index page

  app.get("/", function(req, res) {  
    res.render("index");
  });

  // Load example page and pass in an example by id
  app.get("/settings/:id", function(req, res) {

    db.IniFile( "GET_BY_ID" + req.params.id, 0, data => {
      res.render("settings", {
        data: data
      });
      
    });
  });

  app.post("/upload", cors() ,function(req, res) {

    db.IniFile( "INSERT_INI", req.body.food, data => {
      
      
      
    });
    

    
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
