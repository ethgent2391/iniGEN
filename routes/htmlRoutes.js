var db = require("../models");
var fs = require('fs'), ini = require('ini');
var config = ini.parse(fs.readFileSync( __dirname + '../../exampleinis/gamev9example.ini', 'utf-8'));
var data = {};

module.exports = function(app) {
  // Load index page

  app.get("/", function(req, res) {
    
    
    Object.entries(config).forEach( ([key, value]) => {
      
        data[key] = JSON.stringify(value);
  
    });


    db.IniFile.create(data);
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.IniFile.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
