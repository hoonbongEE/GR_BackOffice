'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class guest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'UserId',
      });
    }
  }
  guest.init(
    {
      guestId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'CASCADE',
      },
      //  sitterId: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: 'Sitters',
      //     key: 'sitterId',
      //   },
      //   onDelete: 'CASCADE',
      career: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'guest',
    }
  );
  return guest;
};
