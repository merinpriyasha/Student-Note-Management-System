import { Link } from "react-router-dom";
import { Layout, Button, Typography, Card, Form, Input, Checkbox } from "antd";

import AuthHeader from "../components/layout/Auth-Header";
import AuthFooter from "../components/layout/Auth-Footer";

import AuthService from "../services/auth-service";

const signupBg = true;
const { Title } = Typography;
const { Content } = Layout;

export default function CreateAccount() {
  const { AuthCreateAccount } = AuthService();

  // function when validation is success
  const onFinish = (values) => {
    console.log("Success:", values);
    AuthCreateAccount(values);
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
              <Title>Create Account</Title>
              <p className="text-lg">
                Use these awesome forms to create new account in the Note
                managmnet system for student.
              </p>
            </div>
          </div>

          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            title={<h5>Register</h5>}
            bordered="false"
          >
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="row-col"
            >
              {/* <Form.Item
                name="Name"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input placeholder="Name" />
              </Form.Item> */}
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input placeholder="email" />
              </Form.Item>
              {/* <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input type="password" placeholder="Password" />
              </Form.Item> */}

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
                  create account
                </Button>
              </Form.Item>
            </Form>
            <p className="font-semibold text-muted text-center">
              Go to dashbord?{" "}
              <Link to="/dashboard" className="font-bold text-dark">
                Dashborad
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