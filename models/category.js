const { DataTypes } = require("sequelize");
const { connection } = require("../config/database");

const Category = connection.define('categorie', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  }
}); 

module.exports = Category;