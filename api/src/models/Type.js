const { DataTypes, NUMBER } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('Type', {
        slot: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
        }
    });
}