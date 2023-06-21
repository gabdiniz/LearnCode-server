const { DataTypes } = require("sequelize");
const { connection } = require("../config/database");
const User = require("./user");
const Course = require("./course");

const Favorite = connection.define('favorite', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  courseId: {
    type: DataTypes.UUID,
    unique: true
  }
});

User.hasMany(Favorite);
Favorite.belongsTo(User);

Course.hasMany(Favorite);
Favorite.belongsTo(Course);

module.exports = Favorite;
