const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const companySchema = new Schema({
    "firstname":  String,
    "lastname": String,
    "Email": String,
    "Password": String,
    "employee": String
  });

const BlogPost = mongoose.model('meal_users',companySchema)
module.exports = BlogPost;
