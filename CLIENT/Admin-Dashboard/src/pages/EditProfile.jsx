import { Link } from "react-router-dom";
import { Layout, Button, Typography, Card, Form, Input, Checkbox } from "antd";

import AuthHeader from "../components/layout/Auth-Header";
import AuthFooter from "../components/layout/Auth-Footer";

import DataService from "../services/data-service";

const signupBg = true;
const { Title } = Typography;
const { Content } = Layout;

export default function CreateAccount() {
  const { AuthEdit } = DataService();

  // function when validation is success
  const onFinish = (values) => {
    console.log("Success:", values);
    AuthEdit(values);
  };

  // function when validation is unsuccess
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <AuthHeader signupBg={signupBg} />
        <Content className="p-0">
          <div className="sign-up-header">
            <div className="content">
              <Title>Edit Profile</Title>
              <p className="text-lg">
                Use these awesome forms to create new account in the Note
                managmnet system for student.
              </p>
            </div>
          </div>

          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            title={<h5>Edit Account Details</h5>}
            bordered="false"
          >
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="row-col"
            >
              <Form.Item
                name="firstName"
                rules={[
                  { required: true, message: "Please input your First Name!" },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[
                  { required: true, message: "Please input your Last Name!" },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input placeholder="email" />
              </Form.Item>

            <Form.Item
                name="dateOfBirth"
                rules={[
                  { required: true, message: "Please input your Date Of Birth!" },
                ]}
              >
                <Input placeholder="Date Of Birth" />
              </Form.Item>
              <Form.Item
                name="mobile"
                rules={[
                  { required: true, message: "Please input your Mobile Number!" },
                ]}
              >
                <Input placeholder="Mobile" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>
                  I agree the{" "}
                  <a href="#pablo" className="font-bold text-dark">
                    Terms and Conditions
                  </a>
                </Checkbox>
              </Form.Item>
 
              <Form.Item>
                <Button
                  style={{ width: "100%", backgroundColor: "green" }}
                  type="primary"
                  htmlType="submit"
                >
                  Edit account
                </Button>
              </Form.Item>
            </Form>
            <p className="font-semibold text-muted text-center">
              Go to Login?{" "}
              <Link to="/sign-in" className="font-bold text-dark">
                LOGIN
              </Link>
            </p>
          </Card>
        </Content>
        <AuthFooter />
      </div>
    </>
  );
}

//export default CreateAccount;