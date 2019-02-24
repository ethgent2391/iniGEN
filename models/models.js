var fs = require('fs'), ini = require('ini');
var path = require('path');
var config = ini.parse(fs.readFileSync( path.join( __dirname, '../exampleinis/gamev9example.ini'), 'utf-8'));


module.exports = (sequelize, DataTypes) => {

    function IniFile( q, newFile ,cb) {

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
            case "INSERT_INI":
      
            let stuff = ini.parse( newFile );
            let data = {};

            //initial table maker, if doesn't already exist
            Object.entries(stuff).forEach(([key, value]) => {
                data[key] = DataTypes.TEXT;
            });

            let newEntry = sequelize.define( "IniFile", data );

            //default ARK ini file
            Object.entries(stuff).forEach( ([key, value]) => {
                data[key] = JSON.stringify(value);
            });

            newEntry.create(data);
            cb(data);
       
            break;
            default:
                console.log( q + " is an invalid command.");
            break;
        }
    }

   return IniFile ;
}