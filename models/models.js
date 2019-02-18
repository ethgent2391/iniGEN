module.exports = (sequelize, DataTypes) => {
    var IniFile = sequelize.define( "IniFile", {
        file: DataTypes.STRING
    })

    return IniFile;
}