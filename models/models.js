var fs = require('fs'), ini = require('ini');
var path = require('path');
var config = ini.parse(fs.readFileSync( path.join( __dirname, '../exampleinis/gamev9example.ini'), 'utf-8'));
var data = {};

module.exports = (sequelize, DataTypes) => {

    /*//initial table maker, if doesn't already exist
    Object.entries(config).forEach(([key, value]) => {
        data[key] = DataTypes.TEXT;
    });

    sequelize.define( "IniFile", data );

    //default ARK ini file 
    Object.entries(config).forEach( ([key, value]) => {
      
        data[key] = JSON.stringify(value);
  
    });*/

    //IniFile.create(data);

    function IniFile( q, cb) {

        let stop, en = 0;
        //stop iterator if a number is in string
        for( stop = 0; stop < q.length; stop++ ){    
            if( !isNaN( parseInt( q[stop] ) ) ){

                en = parseInt( q.substring( stop ) );
                q = q.substring( 0, stop );
                break;
            }
        }

        switch( q ){
            case "GET_ALL":
            sequelize.query("SELECT * FROM IniFiles").then( dat => {

                let data = [];

                dat = dat[0];

                for( let i = 0; i < dat.length; i++ ){
                    let t = JSON.parse(dat[i]['/Script/EngineSettings']);
                    data.push( { id: dat[i].id, name: t.GeneralProjectSettings.ProjectName });
                }
                    
                cb(data); 
            });
            break;
            case "GET_BY_ID":
            sequelize.query("SELECT * FROM IniFiles WHERE id = " + en ).then( dat => {
    
                dat = dat[0][0];            
                    
                cb(dat);
            });
            break;
            default:
                console.log( q + " is an invalid command.");
            break;
        }
    }

   return IniFile ;
}