var db = require("../models");

module.exports = function(app) {
  
  //Route to the main landing page
  app.get("/", function(req, res) {
    
    db.IniFile( "GETNAMES", data => {

      res.render("index", {
        data: data
      });

    })
  });

  //Route to the second page that displays the input fields
  app.get("/settings", function(req, res) {
    
    db.IniFile( "GETNAMES", data => {

      res.render("settings", {
        data: data
      });

    })
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
