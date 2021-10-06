import React from "react";
import { Input, Button, Form } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { dangNhapAction } from "../../redux/actions/AdminAction";
export default function Login() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    // validationSchema: validationSchema

    onSubmit: (values) => {
      console.log(values);
      dispatch(dangNhapAction(values));
    },
  });

  return (
    <div className="container">
      <Form
        onSubmitCapture={formik.handleSubmit}
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h3 className="mb-5"> Login Admin</h3>
        <Input
          className="mb-5"
          name="taiKhoan"
          style={{ width: "50%" }}
          size="large"
          placeholder="Tài Khoản"
          onChange={formik.handleChange}
          prefix={<MailOutlined className="site-form-item-icon" />}
        />

        <Input
          className="mb-5"
          name="matKhau"
          type="password"
          style={{ width: "50%" }}
          size="large"
          placeholder="Enter your password"
          onChange={formik.handleChange}
          prefix={<UserOutlined className="site-form-item-icon" />}
        />

        <Button className="mb-5" type="primary" htmlType="submit">
          Log In
        </Button>

        {/* <div className="social">
          <Button
            className="mr-3"
            type="primary"
            shape="circle"
            icon={<TwitterOutlined />}
            size={"large"}
          />

          <Button
            shape="circle"
            icon={<InstagramOutlined />}
            size={"large"}
            style={{ backgroundColor: "#C62E90" }}
          />
        </div> */}
      </Form>
    </div>
  );
}
