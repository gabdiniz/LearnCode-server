const { DataTypes } = require("sequelize");
const { connection } = require("../config/database");
const Episode = require("./episode");
const User = require("./user");

const WatchTime = connection.define('watch_time', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  seconds: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Episode.hasMany(WatchTime);
WatchTime.belongsTo(Episode);

User.hasMany(WatchTime);
WatchTime.belongsTo(User);

module.exports = WatchTime;