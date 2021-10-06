import { NavLink, Route, Redirect } from "react-router-dom";
import { dangXuatAction } from "../../redux/actions/AdminAction";
import React, { Fragment, useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  FileOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";

import { userLogin } from "../../config/setting";
import { useDispatch } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;

export const HomeTemplate = (props) => {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(dangXuatAction());
  };
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  let user = {};
  if (localStorage.getItem(userLogin)) {
    user = JSON.parse(localStorage.getItem(userLogin));
  }

  //props: path, exact, Component
  //bóc tách Component ra
  const { Component, ...restProps } = props;
  if (!localStorage.getItem("userLogin")) {
    return <Redirect to="/login" />;
  } else {
    if (user.action.maLoaiNguoiDung !== "QuanTri") {
      alert("Bạn không đủ quyền truy cập");
      return <Redirect to="/login" />;
    }
  }
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //propsRout: Component trung gian => Component bên trong có thể điều hương trang
        return (
          <Fragment>
            <Layout style={{ minHeight: "100vh" }}>
              <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <NavLink to="/" className="logo">
                  <img
                    style={{
                      width: "100%",
                      height: "auto",
                      background: "rgb(240 229 195 / 64%)",
                    }}
                    src="https://cybersoft.edu.vn/wp-content/uploads/2017/03/MIN-OP1.png"
                    alt="logo"
                  ></img>
                </NavLink>
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                  <SubMenu key="sub1" icon={<FileOutlined />} title="User">
                    <Menu.Item key="11" icon={<UserOutlined />}>
                      <NavLink to="/user">User list</NavLink>
                    </Menu.Item>
                    <Menu.Item key="12" icon={<UserOutlined />}>
                      <NavLink to="/user/adduser">Add user</NavLink>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub2" icon={<FileOutlined />} title="Film">
                    <Menu.Item key="14" icon={<VideoCameraOutlined />}>
                      <NavLink to="/film">List Film</NavLink>
                    </Menu.Item>
                    <Menu.Item key="15" icon={<VideoCameraOutlined />}>
                      <NavLink to="/film/addnewfilm">Add New Film</NavLink>
                    </Menu.Item>
                  </SubMenu>
                  <Menu.Item key="3" icon={<UploadOutlined />}>
                    Showtime
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout>
                <Header
                  className="site-layout-sub-header-background"
                  style={{
                    margin: 5,
                    color: "#fff",
                    position: "relative",
                  }}
                >
                  <div
                    className="account d-flex"
                    style={{
                      position: "absolute",
                      right: "5%",
                      fontSize: "15px",
                      fontSize: "15px",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    <UserOutlined style={{ marginRight: "5px" }} />
                    <span className="mr-4">{user.action?.hoTen}</span>
                    <div className="log-out">
                      <span
                        onClick={logOut}
                        className="btn"
                        style={{ transform: "translateY(-3px)" }}
                      >
                        Log Out
                      </span>
                    </div>
                  </div>
                </Header>
                <Content style={{ margin: "24px 16px 0" }}>
                  <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: 360 }}
                  >
                    <Component {...propsRoute} />
                  </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  Ant Design ©2018 Created by Ant UED
                </Footer>
              </Layout>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
};
