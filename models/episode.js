const { DataTypes } = require("sequelize");
const { connection } = require("../config/database");
const Course = require("./course");

const Episode = connection.define('episode', {
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
  order: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  video_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  thumbnail_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  seconds_long: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Course.hasMany(Episode);
Episode.belongsTo(Course);

module.exports = Episode;