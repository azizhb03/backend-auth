const { ObjectId } = require('mongodb');

function createUserSchema( email, password) {
  return {
    _id: new ObjectId(),
    email,
    password, 
    createdAt: new Date(),
  };
}

module.exports = {
  createUserSchema,
};