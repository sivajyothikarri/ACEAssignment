import React, { useEffect, useState } from "react";
import { Col, Empty, Row } from "antd";
import AsgPieChart from "./AsgPieChart";
import AsgBarChart from "./AsgBarChart";
import AsgLineChart from "./AsgLineChart";

const Charts = ({ dataSource }: any) => {
  const [chartData, setChartData] = useState<any>([]);
  useEffect(() => {
    setChartData(() => {
      return dataSource.map((data: any) => {
        return {
          ...data,
          empperc: data.headCount / data.totalEmp,
        };
      });
    });
  }, [JSON.stringify(dataSource)]);
  if (!chartData.length) {
    return <Empty />;
  }
  return (
    <Row className="chart_row">
      <Col xs={24} md={8} className="chart_wrapper">
        Distribution of Employees in Departments
        <AsgPieChart chartData={chartData} />
      </Col>
      <Col xs={24} md={8} className="chart_wrapper">
        Distribution of Budget in Departments
        <div style={{ paddingTop: "2rem" }}>
          <AsgBarChart chartData={chartData} />
        </div>
      </Col>
      <Col xs={24} md={8} className="chart_wrapper">
        Expenditure per month per department
        <div style={{ paddingTop: "2rem" }}>
          <AsgLineChart chartData={chartData} />
        </div>
      </Col>
    </Row>
  );
};

export default Charts;
