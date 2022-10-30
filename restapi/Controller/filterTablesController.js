const { FilterTables } = require("../Model/FilterTables");

const tab = new FilterTables();
const getFilterTablesList = async (
  head_count_lessThan,
  head_count_greaterThan,
  departments
) => {
  let response;
  response = await tab.getFilterTablesData(
    head_count_lessThan,
    head_count_greaterThan,
    departments
  );

  return response;
};

const getDepartmentsList = async () => {
  let response;
  response = await tab.getDepartmentsData();
  return response;
};
module.exports = {
  getFilterTablesList,
  getDepartmentsList,
};
