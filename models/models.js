var ini = require('ini');
var data;

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

                    data = [];
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

                data = {};
                
                let stuff = ini.parse( newFile );

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
            case "UPDATE":

            data = {};
 
               
            //initial table maker, if doesn't already exist
            Object.entries(newFile).forEach(([key, value]) => {
                data[key] = DataTypes.TEXT;
            });

            let upEntry = sequelize.define( "IniFile", data );

            //default ARK ini file
            Object.entries(newFile).forEach( ([key, value]) => {
                data[key] = JSON.stringify(value);
            });

     

             upEntry.update(
                    data
              , {
                where: { id: en },
                returning: true
                
              })
              

            cb(data);

            break
            default:
                console.log( q + " is an invalid command.");
            break;
        }
    }

   return IniFile ;
}