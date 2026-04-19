'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    
    static associate(models) {
      // define association here
      Company.hasMany(models.Job, { foreignKey: "companyId"});
    }
  }
  Company.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Company is required' 
        },
        notEmpty : {
        msg : 'Company is required' 
        } 
      } 
    },
    
    companyLogo: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Url logo/image is required' 
        },
        notEmpty : {
        msg : 'Url logo/image is required' 
        }
      } 
    },
    
    location: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Location is required' 
        },
        notEmpty : {
        msg : 'Location logo is required' 
        }
      } 
    },
    
    email: DataTypes.STRING,
    
    description: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Description is required' 
        },
        notEmpty : {
        msg : 'Description is required' 
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};