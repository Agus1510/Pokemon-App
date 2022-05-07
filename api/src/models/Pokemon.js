const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    idPoke:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    vida:{
      type: DataTypes.INTEGER
    },
    fuerza:{
      type: DataTypes.INTEGER
    },
    defensa:{
      type: DataTypes.INTEGER
    },
    velocidad:{
      type: DataTypes.INTEGER
    },
    altura:{
      type: DataTypes.DECIMAL
    },
    peso:{
      type: DataTypes.DECIMAL
    },
  });
};
