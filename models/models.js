var fs = require('fs'), ini = require('ini');
var path = require('path');
var config = ini.parse(fs.readFileSync( path.join( __dirname, '../exampleinis/gamev9example.ini'), 'utf-8'));
var data = {};

module.exports = (sequelize, DataTypes) => {

    //initial table maker, if doesn't already exist
    Object.entries(config).forEach(([key, value]) => {
        data[key] = DataTypes.TEXT;
    });

    var IniFile = sequelize.define( "IniFile", data );

    data = {};

    //default ARK ini file 
    Object.entries(config).forEach( ([key, value]) => {
      
        data[key] = JSON.stringify(value);
  
    });

    IniFile.create(data);
    
    return IniFile;
}