'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Job, { foreignKey: "authorId"});
      
    }
  }
  User.init({
    username: DataTypes.STRING,   
    email: { 
      type: DataTypes.STRING,
      allowNull : false,
      unique : {
        msg : 'Email already exist'
      },
      validate : {
        notNull : {
          msg : 'Email is required' 
        },
        notEmpty : {
        msg : 'Email is required' 
        }, 
        isEmail : {
        msg : 'Email format is wrong' 
        }
      } 
    },   
    
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Password is required'
        },
        notEmpty : {
          msg : 'Password is required'
        },
        len : {
          args : [5],
          msg : 'Password at least 5 characters'
        }
      }
    },
    
    role: {
      type : DataTypes.STRING,
      defaultValue : 'Staff'
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  
  //jalankan setelah validasi
    User.beforeCreate((user) => {
    user.password = hashPassword(user.password)
  })
  
  return User;
};