const validator = require('validator');

const validateRegisterUserData = ({ username, email, name, password }) => {
  return new Promise((resolve, reject) => {
    // console.log(name, email, username, password);
    if (!name || !username || !email || !password) reject("Missing user data");

    if (typeof username !== "string") reject("username is not a String");
    if (typeof email !== "string") reject("Email is not a String");
    if (typeof password !== "string") reject("password is not a String");

    if (username.length < 3 || username.length > 50)
      reject("Username length should be 3-50");
    if (password.length < 3 || password.length > 50)
      reject("Password length should be 3-50");

    if (!validator.isEmail( email )) reject("Email format is incorrect");

    resolve();
  });
};

module.exports = {validateRegisterUserData};