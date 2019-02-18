var fs = require('fs'), ini = require('ini');
var config = ini.parse(fs.readFileSync( __dirname + '../../exampleinis/gamev9example.ini', 'utf-8'));
var data = {};

module.exports = (sequelize, DataTypes) => {

    Object.entries(config).forEach(([key, value]) => {
    
        data[key] = DataTypes.TEXT;
        

    });

    var IniFile = sequelize.define( "IniFile", data );
    
    return IniFile;
}