'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      imgUrl: {
        type: Sequelize.STRING
      },
      jobType: {
        type: Sequelize.STRING
      },
      
      companyId: {
        type: Sequelize.INTEGER,
        references :{
          model: "Companies",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      
      authorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Jobs');
  }
};