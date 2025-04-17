'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'authorId'
      })
    }

    checkAuthorId(userId) {
      if(this.authorId !== userId) throw Error.message = {code: 403, message: "Forbidden - User id doesn't match authorId"}
      return this
    }
  }
  Post.init({
    content: DataTypes.STRING,
    authorId: DataTypes.INTEGER
  }, {
    hooks: {
      afterFind: (post, options) => {
        if (!post) throw Error.message = { code: 404, message: "Post not found" }
      }
    },
    sequelize,
    modelName: 'Post',
  });
  return Post;
};