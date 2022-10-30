const { Client } = require("pg");
const { cnACEAssignment } = require("../Database/dbconnection");

class FilterTables {
  getFilterTablesData = async (hc_upper, hc_lower = 0, departments = []) => {
    const dbACEAssignment = new Client(cnACEAssignment);
    dbACEAssignment.connect();
    const query = {
      name: "fetch-table-data",
      text: `SELECT dept_id, allocated, financial_year, EXP_JAN ,EXP_FEB ,EXP_MAR ,EXP_APR ,EXP_MAY ,EXP_JUN ,EXP_JUL ,EXP_AUG ,EXP_SEPT ,EXP_OCT , EXP_NOV , EXP_DEC , manager_name, head_count, dept_name, rating FROM (SELECT a.username as manager_name, d.head_count as head_count, d.name as dept_name, d.id as depart_id, d.rating as rating FROM APP_USER a, DEPARTMENT d where d.manager_id = a.id and a.role='manager') p, BUDGET b where p.depart_id = b.dept_id and p.head_count > ${hc_lower} ${
        hc_upper ? ` and p.head_count < ${hc_upper}` : ""
      } ${
        departments.length
          ? ` and p.depart_id in (${departments.join(",")})`
          : ""
      }`,
      // values: [userEmail, password],
    };
    let response = await dbACEAssignment.query(query);
    await dbACEAssignment.end();
    return response.rows;
  };

  getDepartmentsData = async () => {
    const dbACEAssignment = new Client(cnACEAssignment);
    dbACEAssignment.connect();
    const query = {
      name: "fetch-dept",
      text: "SELECT * from DEPARTMENT",
    };
    let response = await dbACEAssignment.query(query);
    await dbACEAssignment.end();
    return response.rows;
  };
}

module.exports = { 
    FilterTables
 };
