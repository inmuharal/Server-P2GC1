'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const companies = require('../data/company.json').map(company => {
      company.createdAt = new Date()
      company.updatedAt = new Date()
      return company
    })
    await queryInterface.bulkInsert('Companies',companies)
    
   const users = require('../data/user.json').map(user => {
      user.createdAt = new Date()
      user.updatedAt = new Date()
      user.password = hashPassword(user.password)
      return user
    })
    await queryInterface.bulkInsert('Users',users)
    
   const jobs = require('../data/job.json').map(job => {
      job.createdAt = new Date()
      job.updatedAt = new Date()
      return job
    })
    await queryInterface.bulkInsert('Jobs',jobs)
  
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Companies',null,{});
    await queryInterface.bulkDelete('Users',null,{});
    await queryInterface.bulkDelete('Jobs',null,{});
    
  }
};
