require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");


var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    helpers: { 
        wut: stuff => {
            var ret = "";
            
            
            if( typeof stuff === "string" )
              stuff = JSON.parse( stuff );

        
            //outer nest loop
            Object.entries(stuff).forEach(([key, val]) => {
              
              if( typeof val === "object"){
                //nested object processing for object blocks

                ret += '<div class="rounded bg-info offset-1 m-1"><h5>' + key + '</h5>';

                Object.entries(val).forEach(([key2, val2]) => {

                  //replace double quotes with hex 
                  if( typeof val2 === "string")
                    val2 = val2.replace(/"/g, "&#34;");
                    
                  ret += '<label class="font-weight-bold" for="' + key2 + '">' + key2 + '</label>';
                  ret += '<input id="' + key2 + '" data-id="' + key2 + '" value="' + val2 + '"><br>';
                });

                ret += '</div>';

              }else{

                ret += '<label class="font-weight-bold" for="' + key + '">' + key + '</label>';
                ret += '<input class="outer-field" id="' + key + '" data-id="' + key + '" value="' + val + '"><br>';

              }
            });
            return ret;
     } }
  })
);

//register handlebars helper functions
app.set("view engine", "handlebars");

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });

  // Routes
require("./routes/htmlRoutes")(app);
});

module.exports = app;
