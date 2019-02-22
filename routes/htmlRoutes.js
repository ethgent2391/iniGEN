var db = require("../models");
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads')
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

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

  app.post("/upload", function(req, res) {

    console.log( req.body );
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
