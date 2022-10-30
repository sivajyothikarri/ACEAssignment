import React from "react";
import { Table } from "antd";

const TableComponent = ({ dataSource, columns }: any) => {
  return <Table dataSource={dataSource} columns={columns}  pagination={false} />;
};

export default React.memo(TableComponent);
