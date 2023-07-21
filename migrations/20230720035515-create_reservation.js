'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reservations', {
      reservationsId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      guestId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'guests',
          key: 'guestId',
        },
        onDelete: 'CASCADE',
      },
      sitterId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'sitters',
          key: 'sitterId',
        },
        onDelete: 'CASCADE',
      },
      startDateTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDateTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reservations');
  },
};
