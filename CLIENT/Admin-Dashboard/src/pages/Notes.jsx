import React, { useState, useEffect } from "react";
import { Content } from "antd/lib/layout/layout";
import { Table, Row, Col, Layout } from "antd";
import service from "../services/data-service";
import "antd/dist/antd.css";
import { useCookies } from "react-cookie";
import Grid from "@mui/material/Grid";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

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



// axios.defaults.headers = {
//   "Content-Type": "application/json",
//   "x-auth-token": cookies[0].token,
// };

const Students = () => {
  const [data, setdata] = useState([]);
  const [modaldata, setmodaldata] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInsertModalVisible, setIsInsertModelVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [insertDescription, setInsertDescription] = useState("");
  const [insertTitle, setInsertTitle] = useState("");

 

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


    const note = {
      //id: modaldata._id,
        title: modaldata.title,
        description: modaldata.description,
       
  }

    const showModal = () => {
      setIsInsertModelVisible(true);
    };

 const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInsertModelCancel = () => {
    setIsInsertModelVisible(false);
  };
  const handleConfirmDelete = async () => {
    await deleteNote(_id);
    handleDeleteModalCancel();
    handleCancel();
  };

  const handleConfirmUpdate = async () => {
    await updateNote(_id, note);
    handleUpdateModalCancel();
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalVisible(false);
  };

  const handleUpdateModalCancel = () => {
    setIsUpdateModalVisible(false);
  };

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };
 
  const http = axios.create({
    headers: {
      "Content-type": "application/json",
      "x-auth-token": cookies.token,
    }});
  //Add Feed
  const AddNoteHandler = async () => {

    const formData = new FormData();
    
    formData.append("description", insertDescription);
    formData.append("title", insertTitle);
  
    try {
      await http.post(
        "http://localhost:3002/subject/addNote", note);
      setIsInsertModelVisible(false);
    } catch (error) {
      alert("Error Occcured");
    }
  };

  //Refresh page
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <>
    
    <Grid container direction="column" spacing={4}> 
    <Grid item>
          <Grid item container justifyContent="flex-end">
            <Grid item>
              <Button
                type="primary"
                className="ant-full-box"
                icon={<PlusOutlined />}
                onClick={showModal}
                style={{ color: "white" }}
              >
                Add Note
              </Button>
              <Modal
                title="Add New Note"
                visible={isInsertModalVisible}
                onCancel={handleInsertModelCancel}
                onOk={AddNoteHandler}
              >
                <Form {...layout}>
                  <Form.Item name={["user", "title"]} label="Title"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  
                  >
                    <Input
                      type="text"
                      value={insertTitle}
                      onChange={(event) => setInsertTitle(event.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name={["user", "description"]}
                    label="Description"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      value={insertDescription}
                      onChange={(event) => setInsertDescription(event.target.value)}
                    />
                  </Form.Item>
                  
                </Form>
              </Modal>
            </Grid>
          </Grid>
        </Grid>
      </Grid>    
         
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
          <Button type="primary" onClick= {handleConfirmUpdate}>
            update
          </Button>,
        ]}
      >
        {/* Form should be Here for tree <b>{_id}</b> */}
        {/* Add Form here  */}
        <Form {...layout}>
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the title",
                    },
                    {
                      whitespace: true
                    },
                    { min: 3},
                  ]}
                  hasFeedback
                >
                  <Input name="title" placeholder={modaldata.title} defaultValue={modaldata.title}
                  onChange={(event) => {
                    setmodaldata({
                      ...modaldata,
                      title: event.target.value
                    })
                  }}
                  />
                </Form.Item>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the description",
                    },
                    {
                      whitespace: true
                    },
                  ]}
                  hasFeedback
                >
                  <Input name="description" placeholder={modaldata.description} defaultValue={modaldata.description}
                  onChange={(event) => {
                    setmodaldata({
                      ...modaldata,
                      description: event.target.value
                    })
                  }}/>
                </Form.Item>
                {/* <Form.Item
                  name="contactNumber"
                  label="Contact Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the Contact number",
                    },
                    {
                      whitespace: true
                    },
                    { min: 10},
                    { max: 10},
                  ]}
                  hasFeedback
                >
                  <Input name="contactNumber" placeholder={modaldata.contactNumber} defaultValue={modaldata.contactNumber}
                  onChange={(event) => {
                    setmodaldata({
                      ...modaldata,
                      contactNumber: event.target.value.toString()
                    })
                  }}/>
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the address",
                    },
                    {
                      whitespace: true
                    },
                    { min: 5},
                  ]}
                  hasFeedback
                >
                  <Input name="address" placeholder={modaldata.address} defaultValue={modaldata.address}
                  onChange={(event) => {
                    setmodaldata({
                      ...modaldata,
                      address: event.target.value
                    })
                  }}/>
                </Form.Item>
                <Form.Item
                  name="type"
                  label="User Type"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the user type",
                    },
                    {
                      whitespace: true
                    },
                  ]}
                >
                  <Select
                    name="type"
                    placeholder={modaldata.type}
                    onChange={(value) => {
                      setmodaldata({
                        ...modaldata,
                        type: value
                      })
                    }}
                  >
                    <Select.Option value="Auditor">Auditor</Select.Option>
                    <Select.Option value="Field Agent">Field Agent</Select.Option>
                  </Select>
                </Form.Item> */}
              </Form>
      </Modal>
     

    </>
  );
};

export default Students;
