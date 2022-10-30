const { cnPostgres, cnACEAssignment } = require("../Database/dbconnection");

async function createDatabase() {
  const { Client } = require("pg");
  const dbPostgres = new Client(cnPostgres);
  await dbPostgres.connect();
  console.log("Connected to Postgres");

  await dbPostgres.query("CREATE DATABASE aceassignment;");
  console.log("successfully Created Database");

  const dbACEAssignment = new Client(cnACEAssignment);
  await dbACEAssignment.connect();
  console.log("Connected to Assignment");

  await dbACEAssignment.query(
    "CREATE TABLE APP_USER(id SERIAL PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL, email TEXT NOT NULL, role TEXT)"
  );
  console.log("Created TABLE APP_USER");
  await dbACEAssignment.query(
    "INSERT INTO APP_USER(username, password, email, role) values ('Siva Jyothi', 'sa123', 'sivajyothi.karri@gmail.com', 'manager'), ('Dinesh Mallidi', 'sa123', 'dineshmallidi@gmail.com', 'manager'), ('Bonnie Boon', 'sa123', 'bonnieboon@gmail.com', 'manager'), ('Gowtham Reddy', 'sa123', 'gowthamreddy@gmail.com', 'app_user'), ('Suseela Karri', 'sa123', 'suseelakarri@gmail.com', 'manager')"
  );
  console.log("Populated APP_USER");
  await dbACEAssignment.query(
    "CREATE TABLE DEPARTMENT(id SERIAL PRIMARY KEY,rating FLOAT, name TEXT NOT NULL, head_count INT DEFAULT 0, manager_id INT, FOREIGN KEY(manager_id) REFERENCES APP_USER(id))"
  );
  console.log("CREATED TABLE DEPARTMENT");
  await dbACEAssignment.query(
    "INSERT INTO DEPARTMENT(name, rating, head_count, manager_id) values ('App Dev', 4.5, 230, 1), ('Human Resource', 4.1, 30, 2), ('App Dev', 3.7, 630, 3),('Finance', 4.9, 22, 4), ('Sales', 4.9, 22, 5), ('Admin', 5.0, 12, 1)"
  );
  console.log("Populated DEPARTMENT");
  await dbACEAssignment.query(
    "CREATE TABLE BUDGET(id SERIAL PRIMARY KEY, dept_id INT, allocated INT, financial_year INT, EXP_JAN FLOAT,EXP_FEB FLOAT,EXP_MAR FLOAT,EXP_APR FLOAT,EXP_MAY FLOAT,EXP_JUN FLOAT,EXP_JUL FLOAT,EXP_AUG FLOAT,EXP_SEPT FLOAT,EXP_OCT FLOAT, EXP_NOV FLOAT, EXP_DEC FLOAT)"
  );
  console.log("CREATED TABLE BUDGET");
  await dbACEAssignment.query(
    "INSERT INTO BUDGET(dept_id, allocated, financial_year, EXP_JAN ,EXP_FEB ,EXP_MAR ,EXP_APR ,EXP_MAY ,EXP_JUN ,EXP_JUL ,EXP_AUG ,EXP_SEPT ,EXP_OCT , EXP_NOV , EXP_DEC) values (1, 1000, 2022, 30, 120, 150, 100, 100, 100, 100, 100, 100, 100, 0, 0),(2, 1000, 2022, 30, 120, 150, 100, 100, 100, 100, 100, 100, 100, 0, 0),(3, 10000, 2022, 300, 1200, 1500, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 0, 0),(4, 1000, 2022, 30, 120, 150, 100, 100, 100, 100, 100, 100, 100, 0, 0),(5, 10000, 2022, 300, 1200, 1500, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 0, 0) "
  );
  console.log("Populated BUDGET");
  console.log("Exitting with success code 0");
  process.exit(0);
}
createDatabase();
