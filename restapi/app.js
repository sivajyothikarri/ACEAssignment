const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const { getUsersList } = require("./Controller/userController");
const { getFilterTablesList, getDepartmentsList } = require("./Controller/filterTablesController");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
var cors = require("cors");
app.use(cors());
app.post("/login", jsonParser, (req, res) => {
  const { email, password } = req.body;
  getUsersList(email, password)
    .then((resp) => {
      res.send({ data: resp, message: "success" });
    })
    .catch((err) => {
      res.status(500).send({
        error: "something went wrong",
        message: err,
        status: 500,
      });
    });
});

app.post("/table_data", jsonParser, (req, res) => {
  const head_count_lessThan = req?.body?.headCountUpperLimit;
  const head_count_greaterThan = req?.body?.headCountLowerLimit ?? 0;
  const departments = req?.body?.departments ?? [];
  getFilterTablesList(head_count_lessThan, head_count_greaterThan, departments)
    .then((resp) => {
      res.send({ data: resp, message: "success" });
    })
    .catch((err) => {
      res.status(500).send({
        error: "something went wrong",
        message: err,
        status: 500,
      });
    });
});

app.get("/departments", (req, res) => {
    getDepartmentsList()
    .then((resp) => {
      res.send({ data: resp, message: "success" });
    })
    .catch((err) => {
      res.status(500).send({
        error: "something went wrong",
        message: err,
        status: 500,
      });
    });
});
console.log("server started on port 6060");
app.listen(6060);
