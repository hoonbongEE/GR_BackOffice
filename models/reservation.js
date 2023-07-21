'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.guest, {
        foreignKey: 'guestId',
        as: 'guest',
      });
      this.belongsTo(models.sitter, {
        foreignKey: 'sitterId',
        as: 'sitter',
      });
    }
  }
  reservation.init(
    {
      reservationsId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      guestId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'guest',
          key: 'guestId',
        },
        onDelete: 'CASCADE',
      },
      sitterId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'sitter',
          key: 'sitterId',
        },
        onDelete: 'CASCADE',
      },
      startDateTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDateTime: {
        type: DataTypes.DATE,
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
      modelName: 'reservation',
    }
  );
  return reservation;
};
