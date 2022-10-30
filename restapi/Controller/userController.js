const { User } = require("../Model/User");

const user = new User();
const getUsersList = async (userEmail, userPassword) => {
  let response;
  response = await user.getUsersDetails(userEmail, userPassword);
  if (response.length === 0) throw "user Not Found";
  delete response[0].password;
  return response;
};

module.exports = {
    getUsersList
};
