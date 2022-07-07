import { useState } from "react";

import {
  Card,
  Col,
  Row,
  Typography,
  Tooltip,
  Progress,
  Upload,
  message,
  Button,
  Timeline,
  Radio,
} from "antd";
import {
  ToTopOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

import Echart from "../components/chart/EChart";
import LineChart from "../components/chart/LineChart";

import ava1 from "../assets/images/icons8-owner-64.png";
import card from "../assets/logos/system logo.jpg";

function Home() {
  const { Title, Text } = Typography;

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  const [reverse, setReverse] = useState(false);

  const profile = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
        fill="#fff"
      ></path>
      <path
        d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
        fill="#fff"
      ></path>
      <path
        d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
        fill="#fff"
      ></path>
      <path
        d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const count = [
    {
      today: "Number of Students",
      icon: profile,
      bnb: "bnb2",
    },
    {
      today: "Number of Subject",
      icon: profile,
      bnb: "bnb2",
    },
    {
      today: "Number of Teachers",
      icon: profile,
      bnb: "redtext",
    },
    {
      today: "Number of Active Students",
      icon: profile,
      bnb: "bnb2",
    }
  ];

  const list = [
    {
      img: ava1,
      Title: "Dumal Perera",
      bud: "dumalperera@gmail.com",
      progress: "074 124 3568",
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            ST-1001
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava1,
      Title: "Lahiru Kumar",
      bud: "lahirukumar@gmail.com",
      progress: "075 124 3207",
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            ST-1002
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava1,
      Title: "Vinod Banuka",
      bud: "vinodbanuka@gmail.com",
      progress: "077 214 2030",
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            ST-1003
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava1,
      Title: "Yasas Fernando",
      bud: "yasasfernando@gmail.com",
      progress: "078 102 5463",
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            ST-1004
          </Tooltip>
        </div>
      ),
    },
    {
      img: ava1,
      Title: "Viraj Perera",
      bud: "virajperera@gmail.com",
      progress: "076 852 9631",
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            ST-1005
          </Tooltip>
        </div>
      ),
    },

    {
      img: ava1,
      Title: "Sadish Nuwan",
      bud: "sadishnuwan@gmail.com",
      progress: "074 521 4568",
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            ST-1006
          </Tooltip>
        </div>
      ),
    },
  ];

  const timelineList = [
    {
      title: "Combine Maths",
      color: "red",
    },
    {
      title: "Physics",
      color: "red",
    },
    {
      title: "Chemestry",
      color: "red",
    },
    {
      title: "Biology",
      color: "green",
    },
    {
      title: "Agry",
      color: "green",
    },
    {
      title: "Business Studies",
      color: "blue",
    },
    {
      title: "Accounting",
      color: "blue",
    },
    {
      title: "ICT",
      color: "blue",
    },
    {
      title: "Economy",
      color: "blue",
    },
  ];

  const uploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>
                        {c.title} <small className={c.bnb}>{c.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>Students</Title>
                  {/* <Paragraph className="lastweek">
                    done this month<span className="blue">40%</span>
                  </Paragraph> */}
                </div>

                {/* <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="a">ALL</Radio.Button>
                      <Radio.Button value="b">ONLINE</Radio.Button>
                      <Radio.Button value="c">STORES</Radio.Button>
                    </Radio.Group>
                  </div>
                </div> */}

              </div>
              <div className="ant-list-box table-responsive">
                <table className="width-100">
                  <thead>
                    <tr>
                      <th>STUDENT NAME</th>
                      <th>STUDENT ID</th>
                      <th>EMAIL</th>
                      <th>CONTACT NUMBER</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((d, index) => (
                      <tr key={index}>
                        <td>
                          <h6>
                            <img
                              src={d.img}
                              alt=""
                              className="avatar-sm mr-10"
                            />{" "}
                            {d.Title}
                          </h6>
                        </td>
                        <td>{d.member}</td>
                        <td>
                          <span className="text-xs font-weight-bold">
                            {d.bud}{" "}
                          </span>
                        </td>
                        <td>
                          <div className="percent-progress">{d.progress}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="uploadfile shadow-none">
                <Upload {...uploadProps}>
                  <Button
                    type="dashed"
                    className="ant-full-box"
                    icon={<ToTopOutlined />}
                  >
                    <span className="click">Click to Upload</span>
                  </Button>
                </Upload>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <div className="timeline-box">
                <Title level={5}>Subject Names</Title>
                {/* <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                  this month <span className="bnb2">20%</span>
                </Paragraph> */}
                <br></br>

                <Timeline>
                  {timelineList.map((t, index) => (
                    <Timeline.Item color={t.color} key={index}>
                      <Title level={5}>{t.title}</Title>
                      <Text>{t.time}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} md={12} sm={24} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Row gutter>
                <Col
                  xs={24}
                  md={12}
                  sm={24}
                  lg={12}
                  xl={14}
                  className="mobile-24"
                >
                  <div className="h-full col-content p-20">
                    <div className="ant-muse">
                      <Text>Built by developer</Text>
                      <Title level={5}>Students Note Management System Dashboard for SURGE</Title>
                      <Paragraph className="lastweek mb-36">
                      Empower the educational services in ever-changing 
                      environment to create better opportunities for the 
                      students for their consistent growth.
                      </Paragraph>
                    </div>
                    <div className="card-footer">
                      <a className="icon-move-right" href="#pablo">
                        Read More
                        {<RightOutlined />}
                      </a>
                    </div>
                  </div>
                </Col>
                <Col
                  xs={24}
                  md={12}
                  sm={24}
                  lg={12}
                  xl={10}
                  className="col-img"
                >
                  <div className="ant-cret text-right">
                    <img src={card} alt="" className="border10" />
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24} md={12} sm={24} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox card-info-2 h-full">
              <div className="gradent h-full col-content">
                <div className="card-content">
                  <Title level={5}>Work with the best</Title>
                  <p>
                  Our aim is to create a strong chain of educational 
                  institutes to connect and communicate with each other 
                  on the single platform.
                  </p>
                </div>
                <div className="card-footer">
                  <a className="icon-move-right" href="#pablo">
                    Read More
                    <RightOutlined />
                  </a>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
