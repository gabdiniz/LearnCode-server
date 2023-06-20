const { DataTypes } = require("sequelize");
const { connection } = require("../config/database");
const Category = require("./category");

const Course = connection.define('course', {
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
  synopsis: {
    type: DataTypes.STRING,
    allowNull: false
  },
  thumbnail_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  featured: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
});

Category.hasMany(Course, {
  foreignKey: {
    name: "categoryId",
    allowNull: false,
  }
});
Course.belongsTo(Category, {
  foreignKey: {
    name: "categoryId",
    allowNull: false,
  }
});

module.exports = Course;