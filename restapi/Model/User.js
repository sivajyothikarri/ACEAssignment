const { Client } = require("pg");
const { cnACEAssignment } = require("../Database/dbconnection");

class User {
  getUsersDetails = async (userEmail, password) => {
    const dbACEAssignment = new Client(cnACEAssignment);
    dbACEAssignment.connect();
    const query = {
      name: "fetch-user",
      text: "SELECT * FROM APP_USER WHERE email = $1 and password = $2",
      values: [userEmail, password],
    };
    let response = await dbACEAssignment.query(query);
    await dbACEAssignment.end()
    return response.rows;
  };
}

module.exports = { User };
