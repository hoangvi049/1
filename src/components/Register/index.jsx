import React from "react";
import { Input, Button } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";

export default function Register() {
  return (
    <form className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h3 className="mb-5"> Register Admin</h3>
        <Input
          className="mb-5"
          name="taiKhoan"
          style={{ width: "50%" }}
          size="large"
          placeholder="User Name"
          prefix={<MailOutlined className="site-form-item-icon" />}
        />
        <Input
          className="mb-5"
          name="email"
          style={{ width: "50%" }}
          size="large"
          placeholder="Email"
          prefix={<MailOutlined className="site-form-item-icon" />}
        />

        <Input
          className="mb-5"
          name="soDt"
          style={{ width: "50%" }}
          size="large"
          placeholder="Số Điện Thoại"
          prefix={<MailOutlined className="site-form-item-icon" />}
        />

        <Input
          className="mb-5"
          name="matKhau"
          style={{ width: "50%" }}
          size="large"
          placeholder="Enter your password"
          prefix={<UserOutlined className="site-form-item-icon" />}
        />

        <Button className="mb-5" type="primary">
          Đăng ký
        </Button>

        <div className="social"></div>
      </div>
    </form>
  );
}
