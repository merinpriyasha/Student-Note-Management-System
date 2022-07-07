import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

// logo
import ERLogo from "../../assets/logos/system logo.jpg";
import LifeForceLogo from "../../assets/logos/online_learning.jpg";

const signup = [
  <svg
    data-v-4ebdc598=""
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={1}
  >
    <path
      data-v-4ebdc598=""
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
      fill="#111827"
      className="fill-muted"
    ></path>
  </svg>,
];

const signin = [
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    key={2}
  >
    <path
      className="fill-muted"
      d="M12.25,14H1.75A1.752,1.752,0,0,1,0,12.25V3.5A1.752,1.752,0,0,1,1.75,1.75h.876V.875a.875.875,0,0,1,1.75,0V1.75h5.25V.875a.875.875,0,0,1,1.75,0V1.75h.875A1.752,1.752,0,0,1,14,3.5v8.75A1.752,1.752,0,0,1,12.25,14ZM3.5,4.375a.875.875,0,0,0,0,1.75h7a.875.875,0,0,0,0-1.75Z"
    />
  </svg>,
];

const { Header } = Layout;

export default function AuthHeader({ signupBg }) {
  return (
    <Header>
      <div className="header-col header-brand">
        <img
          style={signupBg ? { padding: 10 } : {}}
          src={ERLogo}
          width={signupBg ? "270px" : "70px"}
          alt="ER logo"
        />
      </div>
      <div className="header-col header-nav">
        <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
          {/* <Menu.Item key="1">
            <Link to="/sign-up">
              {signup}
              <span> Sign Up</span>
            </Link>
          </Menu.Item> */}
          <Menu.Item key="2">
            <Link to="/sign-in">
              {signin}
              <span> Sign In</span>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className="header-col header-brand">
        {signupBg ? (
          <img
            src={LifeForceLogo}
            style={signupBg ? { padding: 10 } : {}}
            width="280px"
            alt="lifeforce logo"
          />
        ) : (
          ""
        )}
      </div>
    </Header>
  );
}
