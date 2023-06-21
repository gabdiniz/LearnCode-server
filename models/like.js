const { DataTypes } = require("sequelize");
const { connection } = require("../config/database");
const User = require("./user");
const Course = require("./course");

const Like = connection.define('like', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  }
});

User.hasMany(Like);
Like.belongsTo(User);

Course.hasMany(Like);
Like.belongsTo(Course);

module.exports = Like;

