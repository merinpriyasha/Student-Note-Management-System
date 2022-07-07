import React, { useState, useEffect } from "react";
import { Content } from "antd/lib/layout/layout";
import { Table, Row, Col, Layout } from "antd";
import service from "../services/data-service";
import "antd/dist/antd.css";
import { useCookies } from "react-cookie";
import Grid from "@mui/material/Grid";
import { PlusOutlined } from "@ant-design/icons";

import {
  Modal,
  Button,
  Card,
  Typography,
  DatePicker,
  Space,
  Avatar,
  Form,
  Input
} from "antd";

const { Title } = Typography;

const Students = () => {
  const [data, setdata] = useState([]);
  const [modaldata, setmodaldata] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  const {
    getNoteById,
    updateNote,
    deleteNote
  } = service();


  const columns = [
    {
      title: "ID",
      key: "student id",
      dataIndex: "student id",
      render: (index, record) => (
        <>
          <Title level={5}>{record._id}</Title>
        </>
      ),
    },
    {
      title: "Title",
      key: "student first name",
      dataIndex: "student first name",
      render: (index, record) => (
        <>
          <Title level={5}>{record.title}</Title>
        </>
      ),
    },
    {
      title: "Description",
      key: "account type",
      dataIndex: "account type",
      render: (index, record) => (
        <>
          <Title level={5}>{record.description}</Title>
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

    fetch('http://localhost:3002/subject/getNotes', {headers})
    .then((res) => res.json())
    .then((res) => {
          setdata(
            res.map(
              ({
                _id,
                title,
                description
              }) => ({
              key:_id,
                _id,
                title,
                description
              })
            )
        
          );
        })
   

  }, []);

  

const {
  _id,
  title,
  description
    } = modaldata

    const showModal = () => {
      setIsModalVisible(true);
    };

 const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirmDelete = async () => {
    await deleteNote(_id);
    handleDeleteModalCancel();
    handleCancel();
  };

  const handleConfirmUpdate = async () => {
    await updateNote(_id, {title, description});
    handleUpdateModalCancel();
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalVisible(false);
  };

  const handleUpdateModalCancel = () => {
    setIsUpdateModalVisible(false);
  };

  //Add Feed
  const AddFeedHandler = async () => {
    console.log(cookies[0].token);
    const formData = new FormData();
    //formData.append("imageUrl", selectedFile);
    formData.append("description", insertMessage);
    formData.append("title", insertTag);
    //formData.append("published", "Yes");
    console.log("this is form data", selectedFile);
    try {
      await axios.post(
        "http://localhost:3002/subject/addNote",
        formData
      );
      setIsModalVisible(false);
    } catch (error) {
      alert("Error Occcured");
    }
  };

  return (
    <>
     
    {/* <Grid item>
          <Grid item container justifyContent="flex-end">
            <Grid item>
              <Button
                type="primary"
                className="ant-full-box"
                icon={<PlusOutlined />}
                onClick={showModal}
                style={{ color: "white" }}
              >
                Add Feed
              </Button>
              <Modal
                title="Add New Feed"
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={AddFeedHandler}
              >
                <Form {...Layout}>
                  <Form.Item name={["user", "tag"]} label="Tag"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  
                  >
                    <Input
                      type="text"
                      value={insertTag}
                      onChange={(event) => setInsertTag(event.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name={["user", "name"]}
                    label="Description"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      value={insertMessage}
                      onChange={(event) => setInsertMessage(event.target.value)}
                    />
                  </Form.Item>
                  
                </Form>
              </Modal>
            </Grid>
          </Grid>
        </Grid> */}

      <Content>
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="All Notes"
            >
              <Table
                dataSource={data}
                columns={columns}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      setIsModalVisible(true)
                      setmodaldata(record)
                    },
                  };
                }}
              />
            </Card>
          </Col>
        </Row>
      </Content>
 {/* Tree detail Modal  */}
      <Modal
        title="Notes"
        visible={isModalVisible}
        onCancel={handleCancel}
        destroyOnClose
        footer={[
          <Button
            key="update"
            type="primary"
            onClick={() => setIsUpdateModalVisible(true)}
          >
            Update
          </Button>,
          <Button
            key="delete"
            type="danger"
            onClick={() => setIsDeleteModalVisible(true)}
          >
            Delete
          </Button>,
          <Button key="back" onClick={handleCancel}>
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
                        src='https://res.cloudinary.com/do0dboed0/image/upload/v1657179421/5ffd857883f7a1001c77a8bf_fmhixp.jpg'
                      ></Avatar> 
          </Col>
          <Col md={12} xs={24}>
            <Space direction="vertical">
              <div key={0}>
              ID : &nbsp;&nbsp;<b>{_id}</b>
              </div>
              <div key={1}>
              Note Title : &nbsp;&nbsp;<b>{title}</b>
              </div>
              <div key={2}>
              Description : &nbsp;&nbsp;<b>{description}</b>
              </div>
            </Space>
          </Col>
        </Row>
      </Modal>

      {/* Delete Modal */}
      <Modal
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        destroyOnClose
        width={500}
        footer={[
          <Button key="back" onClick={handleDeleteModalCancel}>
            Cancel
          </Button>,
          <Button type="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>,
        ]}
      >
        Are you sure You want to delete <b>{_id}</b> ?
      </Modal>

 {/* Update Modal */}
 <Modal
        title="Update Note "
        visible={isUpdateModalVisible}
        onCancel={() => setIsUpdateModalVisible(false)}
        destroyOnClose
        width={500}
        footer={[
          <Button key="back" onClick={handleUpdateModalCancel}>
            Cancel
          </Button>,
          <Button type="primary" onClick={handleConfirmUpdate}>
            update
          </Button>,
        ]}
      >
        Form should be Here for tree <b>{_id}</b>
        {/* Add Form here  */}
      </Modal>
      

    </>
  );
};

export default Students;
