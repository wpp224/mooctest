var mysql=require('mysql');
var UsersSchema=require('../schemas/users');
var Users=mysql.model('Users',UsersSchema);
module.exports=Users;