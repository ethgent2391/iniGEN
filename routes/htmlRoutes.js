var db = require("../models");

module.exports = function(app) {
  // Load index page

  app.get("/", function(req, res) {  
    res.render("index");
  });

  // Load example page and pass in an example by id
  app.get("/settings/:id", function(req, res) {

    db.IniFile( "GET_BY_ID" + req.params.id, data => {
      res.render("settings", {
        data: data
      });
      
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
