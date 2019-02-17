var db = require("../models");

module.exports = function(app) {
  // Get all db entries
  app.get("/api/examples", function(req, res) {
    db.Entry.findAll({}).then(function(dbEntries) {
      res.json(dbEntries);
    });
  });

  // Create a new example
  app.put("/api/examples", function(req, res) {
    db.Entry.update(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
