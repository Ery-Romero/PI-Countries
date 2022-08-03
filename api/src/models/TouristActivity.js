const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('TouristActivity', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(value) {
        this.setDataValue('name', value.toUpperCase());
      }
    },
    difficulty: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
    },
    duration: {
      type: DataTypes.TIME,
      defaultValue: '00:00:00'
    },
    season: {
      type: DataTypes.ENUM('Primavera', 'Verano', 'Otoño', 'Invierno', 'Cualquier temporada del año')
    },
  });
};
