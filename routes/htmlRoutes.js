var db = require("../models"), ini = require('ini');
var cors = require('cors');

module.exports = function(app) {
  // Load index page

  app.get("/", function(req, res) {  
    res.render("index");
  });

  app.post("/su", function(req, res) {
    
    db.IniFile( "UPDATE" + req.body.id, req.body.data, data => {
      
      res.send(ini.stringify(req.body.data));
      
    });

  })

  // Load example page and pass in an example by id
  app.post("/settings", function(req, res) {
  
    db.IniFile( "GET_BY_ID" + req.body.id, 0, data => {
     
      res.render("settings", {
        layout: false,
        data: data
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/ini_list", function(req, res) {

    db.IniFile( "GET_ALL", 0, data => {
      res.render("ini_list", {
        layout: false,
        data: data
      });
    });
  });

  app.post("/upload", cors() ,function(req, res) {
    db.IniFile( "INSERT_INI", req.body.food, data => {
        res.render( 'settings', { layout: false, data: data});
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
