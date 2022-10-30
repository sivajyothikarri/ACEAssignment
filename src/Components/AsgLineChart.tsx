import { Row, Select, Spin } from "antd";
import { useEffect, useState, memo } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const AsgLineChart: React.FC<{ chartData: any }> = ({ chartData }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>(
    chartData[0].department
  );
  const [allDepartments, setAllDepartments] = useState([]);

  const [modifiedData, setModifiedData] = useState<any>([]);
  const MONTHS = [ "Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
  useEffect(() => {
    // get obj with selected department
    const objToRender: any = chartData.filter(
      (data: any) => data.department === selectedDepartment
    );
    console.log("for ", objToRender);
    const dataToRender: any[] = [];
    objToRender[0][`FY2022`].map((objData: any, index: number) => {
      dataToRender.push({
        month: MONTHS[index],
        expenditure: objData,
      });
    });
    setModifiedData(dataToRender);
  }, [selectedDepartment]);

  useEffect(() => {
    const alldepartments = chartData.map((data: any) => data.department);
    setAllDepartments(alldepartments);
  }, [JSON.stringify(chartData)]);

  if (!modifiedData.length) {
    return <Spin />;
  }
  return (
    <>
      <Row className="line_chart_select" justify="end">
        <Select
          onChange={(val) => setSelectedDepartment(val)}
          style={{ width: "150px !important" }}
          value={selectedDepartment}
        >
          {allDepartments.map((val: string) => (
            <Select.Option id={val} value={val}>
              {val}
            </Select.Option>
          ))}
        </Select>
      </Row>
      <ResponsiveContainer height={220}>
        <LineChart data={modifiedData}>
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
            vertical={false}
          />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip active={true} />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            name="Expenditure per month (USD)"
            dataKey="expenditure"
            stroke="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default memo(AsgLineChart);
