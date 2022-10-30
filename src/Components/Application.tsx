import {Avatar, Col, Divider, Layout, Row, Space, Select, Button, Dropdown, Menu, Empty, Spin,} from "antd";
  import { useEffect, useState } from "react";
  import { columns } from "../setupTableHeader";
  import { MenuOutlined } from "@ant-design/icons";
  import TableComponent from "./TableComponent";
  import Charts from "./Charts";
  import { getData, getDepartments } from "../api";
  import { useNavigate } from "react-router-dom";
  
  const EmpCount = [" ", "0-10", "10-50", "50-100"];
  
  const { Header, Sider, Content } = Layout;
  const { Option } = Select;
  
  const Application: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [department, setDepartment] = useState<any>([]);
  
    const [noOfEmp, setNoOFEmp] = useState<string>("");
    const [dataSource, setDataSource] = useState<any>([]);
    const [Departments, setAllDepartments] = useState<any>([]);
    const [filterApplied, setFilterApplied] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
      getDepartments().then((res) => {
        setAllDepartments(res.data.data);
      });
    }, []);
  
    useEffect(() => {
      setLoading(true);
      getData(
        noOfEmp.split("-")[0] || undefined,
        noOfEmp.split("-")[1],
        department
      )
        .then((res) => {
          const totalEmp = res.data.data
            .map((rawData: any) => rawData.head_count)
            .reduce((partialSum: any, a: any) => partialSum + a, 0);
          const modifiedData = res.data.data.map(
            (rawData: any, index: number) => {
              return {
                sno: index + 1,
                department: rawData.dept_name,
                headCount: rawData.head_count,
                budget: rawData.allocated,
                [`FY${rawData.financial_year}`]: [
                  rawData.exp_jan,
                  rawData.exp_feb,
                  rawData.exp_mar,
                  rawData.exp_jun,
                  rawData.exp_jul,
                  rawData.exp_aug,
                  rawData.exp_sept,
                  rawData.exp_oct,
                  rawData.exp_nov,
                  rawData.exp_dec,
                ],
                rating: rawData.rating,
                manager: rawData.manager_name,
                totalEmp,
              };
            }
          );
          setDataSource(modifiedData);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [filterApplied]);
  
    const applyFilters = () => {
      setFilterApplied((prevCount) => prevCount + 1);
    };
  
    const handleChange = (value: any) => {
      setDepartment(value);
    };
  
    const handleLogout = (e: any) => {
      e.stopPropagation();
      sessionStorage.setItem("user", "{}");
      navigate("/");
    };
  
    const menu = (
      <Menu
        items={[
          {
            label: (
              <a href="/" onClick={handleLogout}>
                LogOut
              </a>
            ),
            key: "0",
          },
        ]}
      />
    );
  
    const children: React.ReactNode[] = [];
    Departments.forEach((el: any, index: number) => {
      children.push(
        <Option key={index} value={el.id}>
          {el.name}
        </Option>
      );
    });
  
    const empCountOptions: React.ReactNode[] = [];
    EmpCount.forEach((el, index) => {
      empCountOptions.push(
        <Option key={index} value={el}>
          {el}
        </Option>
      );
    });
  
    return (
      <>
        <Layout>
          <Sider
            theme={"light"}
            className={`sider sider-${open ? "open" : "close"}`}
            trigger={null}
            collapsible
            collapsed={!open}
          >
            <div className="logo">
              <MenuOutlined
                className="menuIcon"
                onClick={() => {
                  setOpen((prev: boolean) => !prev);
                }}
              />
            </div>
            <div>
              <Select
                mode="multiple"
                // size={size}
                placeholder="Please select department"
                onChange={handleChange}
                style={{ width: "90%" }}
                maxTagCount="responsive"
              >
                {children}
              </Select>
              <div style={{ marginTop: "2rem" }}>
                <span style={{ color: "black", textDecoration: "underline" }}>
                  Employee Head Count
                </span>
                <Select
                  placeholder="Please select count"
                  onChange={(value) => {
                    setNoOFEmp(value);
                  }}
                  style={{ width: "90%" }}
                  maxTagCount="responsive"
                >
                  {empCountOptions}
                </Select>
              </div>
              <Divider />
              <div>
                <Button onClick={applyFilters}>apply</Button>
              </div>
            </div>
          </Sider>
  
          <Layout>
            <Header>
              <Row justify={open ? `end` : "space-between"}>
                {!open && (
                  <Col>
                    <MenuOutlined
                      onClick={() => {
                        setOpen((prevState: boolean) => !prevState);
                      }}
                    />
                  </Col>
                )}
                <Col>
                  {JSON.parse(sessionStorage.getItem("user") || "{}").id && (
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <div>
                        <Space>
                          <Avatar>
                            {JSON.parse(sessionStorage.getItem("user") || "{}")
                              .username.split(" ")
                              .map((name: string) => name.split("")[0])}
                          </Avatar>Welcome
                          {
                            JSON.parse(sessionStorage.getItem("user") || "{}")
                              .username
                          }
                          <Divider type="vertical" />
                        </Space>
                      </div>
                    </Dropdown>
                  )}
                </Col>
              </Row>
            </Header>
            {loading ? (
              <Spin />
            ) : error ? (
              <Empty />
            ) : (
              <Content>
                <Charts dataSource={dataSource} />
                <TableComponent dataSource={dataSource} columns={columns} />
              </Content>
            )}
          </Layout>
        </Layout>
      </>
    );
  };
  export default Application;
  