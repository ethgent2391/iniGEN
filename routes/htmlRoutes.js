var db = require("../models");

module.exports = function(app) {
  // Load index page

  app.get("/", function(req, res) {
    let data = [];
    db.IniFile.findAll().then( dat => {

      Object.entries(dat).forEach(([key, value]) => {

        let t = JSON.parse(value.dataValues['/Script/EngineSettings']);

        
        console.log( t.GeneralProjectSettings );
        data.push( { id: value.dataValues.id, name: t.GeneralProjectSettings.ProjectName });
        
      });

      res.render("index", {
        data: data
      });

    })
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
