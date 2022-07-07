import React, { useState, useEffect } from "react";
import { Content } from "antd/lib/layout/layout";
import { Table, Row, Col } from "antd";
import service from "../services/data-service";
import "antd/dist/antd.css";
import { useCookies } from "react-cookie";

import {
  Modal,
  Button,
  Card,
  Typography,
  DatePicker,
  Space,
  Avatar
} from "antd";

const { Title } = Typography;

const Students = () => {
  const [data, setdata] = useState([]);
  const [modaldata, setmodaldata] = useState({});
  const [studentName, setStudentName] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    getStudents,
    getStudentorById
  } = service();


  const columns = [
    {
      title: "ID",
      key: "student id",
      dataIndex: "student id",
      render: (index, record) => (
        <>
          <Title level={5}>{record.id}</Title>
        </>
      ),
    },
    {
      title: "First name",
      key: "student first name",
      dataIndex: "student first name",
      render: (index, record) => (
        <>
          <Title level={5}>{record.firstName}</Title>
        </>
      ),
    },
    
    {
      title: "Account type",
      key: "account type",
      dataIndex: "account type",
      render: (index, record) => (
        <>
          <Title level={5}>{record.accountType}</Title>
        </>
      ),
    },
  ];
  const [cookies] = useCookies(['token']);
  useEffect(async () => {
    
    const headers = {
      "Content-type": "application/json",
      "x-auth-token": cookies.token
    };

    fetch('http://localhost:3002/admin', {headers})
    .then((res) => res.json())
    .then((res) => {
          setdata(
            res.map(
              ({
                id,
                email,
                mobile,
                accountType,
                dateOfBirth,
                firstName,
                lastName
              }) => ({
                id,
                email,
                mobile,
                accountType,
                dateOfBirth,
                firstName,
                lastName
              })
            )
        
          );
        })
  

  }, [getStudents]);

  useEffect(async () => {
    if (!modaldata) return;
    const student = await getStudentorById(modaldata._id);
    //const auditor = await getAuditorById(modaldata.creatorID);
    setStudentName(student);
    //setAuditorName(auditor);
  }, [modaldata]);

 // const [isModalVisible, setIsModalVisible] = useState(false);
const {
  id,
  email,
  mobile,
  accountType,
  dateOfBirth,
  firstName,
  lastName
        } = modaldata
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Content>
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Student List"
            >
              <Table
                dataSource={data}
                columns={columns}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      setIsModalVisible(true)
                      //console.log(record, rowIndex);
                      setmodaldata(record)
                    },
                  };
                }}
              />
            </Card>
          </Col>
        </Row>
      </Content>

      <Modal
        title="Student"
        visible={isModalVisible}
        onCancel={handleCancel}
        destroyOnClose
        footer={[
          <Button key="back" type="primary" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >

<Row gutter={[16, 16]}>
          <Col md={12} xs={24}>

            <Avatar 
                        className="shape-avatar"
                        shape="square"
                        size={220}
                        //md={12} xs={24}
                        src='https://res.cloudinary.com/do0dboed0/image/upload/v1656909469/ProfileImage11_id0hdf.png'
                      ></Avatar> 
          </Col>
          <Col md={12} xs={24}>
            <Space direction="vertical">
              <div>
              ID : &nbsp;&nbsp;<b>{id}</b>
              </div>
              <div>
              Email : &nbsp;&nbsp;<b>{email}</b>
              </div>
              <div>
              Mobile : &nbsp;&nbsp;<b>{mobile}</b>
              </div>
              <div>
              account type: &nbsp;&nbsp;<b>{accountType}</b>
              </div>
              <div>
              Date of birth : &nbsp;&nbsp;<b>{dateOfBirth}</b>
              </div>
              <div>
              First name : &nbsp;&nbsp;<b>{firstName}</b>
              </div>
              <div>
              Last name : &nbsp;&nbsp;<b>{lastName}</b>
              </div>
            </Space>
          </Col>
        </Row>
        
      </Modal>
    </>
  );
};

export default Students;
