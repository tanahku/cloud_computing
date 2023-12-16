// models/plant.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Plant = sequelize.define(
    "Plant",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      latin_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      soil: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at",
      },
    },
    {
      tableName: "plants",
      timestamps: true,
    }
  );
  return Plant;
};
