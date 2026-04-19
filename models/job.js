'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.User, { foreignKey: "authorId" });
      Job.belongsTo(models.Company, { foreignKey: "companyId"});
    }
  }
  Job.init({
    
    title: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : ' Title is required' 
        },
        notEmpty : {
        msg : ' Title is required' 
        }
      } 
    },
    
    description: {
      type : DataTypes.TEXT,
      allowNull : false,
      validate : {
        notNull : {
          msg : ' Description is required' 
        },
        notEmpty : {
        msg : ' Description is required' 
        }
      } 
    },
    
    imgUrl: {
     type : DataTypes.STRING,
     allowNull : false,
      validate : {
        notNull : {
          msg : ' Image URL is required' 
        },
        notEmpty : {
        msg : ' Image URL is required' 
        }
      }  
    }, 
    
    jobType: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : ' Job Type  is required, example: part time / full time' 
        },
        notEmpty : {
        msg : ' Job Type  is required, example: part time / full time' 
        }
      }  
    },
    
    companyId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : ' companyId  is required' 
        },
        notEmpty : {
        msg : ' companyId  is required' 
        }
      }  
    },
    
    authorId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : ' authorId  is required' 
        },
        notEmpty : {
        msg : ' authorId  is required' 
        }
      } 
    },
    
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};