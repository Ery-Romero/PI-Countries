const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    fifa: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
      set(value) {
        this.setDataValue('fifa', value.toUpperCase());
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('name', value.toUpperCase());
      }
    },
    flags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continents: {
      type: DataTypes.STRING,
      allowNull: false,
  /*    set(value) {  
        if(value === "North America" || value === "South America") {
          const string = value.split(' ');
          const america = string[1];
          this.setDataValue('continents', america); console.log(america)
        }} */
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING,
      defaultValue: 'No tiene Subregion'
    },
    area: {
      type: DataTypes.FLOAT,
      defaultValue: '0'
    },
    population: {
      type: DataTypes.INTEGER,
      defaultValue: '0'
    },
  });
};
