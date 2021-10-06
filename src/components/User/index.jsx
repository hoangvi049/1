import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table } from "antd";
import { Input } from "antd";
import { Button } from "antd";
import {
  PlusSquareOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { deleteUser } from "../../redux/actions/UserAction";
import { NavLink } from "react-router-dom";
import { history } from "../../App";
import { adminService } from "../../services/baseService";

export function User() {
  const [searchText, setSearchText] = useState("");

  const [danhSachUserSearch, setDanhSachUserSearch] = useState([]);
  let [danhSachUser, setDanhSachUser] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    adminService
      .layDanhSachNguoiDung()
      .then((res) => {
        setDanhSachUser(res.data.content);
      })
      .catch((err) => {
        console.log(err?.response.data);
      });
  }, [dispatch]);

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    let results = danhSachUser.filter((user) => {
      return user.taiKhoan.toLowerCase().includes(searchText.toLowerCase());
    });
    setDanhSachUserSearch(results);
  }, [danhSachUser, searchText]);

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      sortOder: "descend",
      width: "20%",
      sorter: {
        compare: (a, b) => a.taiKhoan.length - b.taiKhoan.length,
      },
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      sortOder: "descend",
      width: "10%",
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      sortOder: "descend",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      defaultSortOrder: "descend",
      width: "15%",
    },
    {
      title: "Loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      width: "20%",

      filters: [
        {
          text: "QuanTri",
          value: "QuanTri",
        },
        {
          text: "KhachHang",
          value: "KhachHang",
        },
      ],
      onFilter: (value, record) => record.maLoaiNguoiDung.indexOf(value) === 0,
    },

    {
      title: "Thao tác",
      dataIndex: "thaoTac",
      render: (text, user) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              className="bg-success text-white mr-2 p-2"
              to={`/user/edituser/${user.taiKhoan}`}
            >
              <EditOutlined />
            </NavLink>
            <span
              key={2}
              className="bg-danger text-white p-2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (
                  window.confirm("Bạn có muốn xóa người dùng " + user.taiKhoan)
                ) {
                  dispatch(deleteUser(user.taiKhoan));
                }
              }}
            >
              <DeleteOutlined />
            </span>
          </Fragment>
        );
      },
      width: "10%",
    },
  ];

  const data = danhSachUserSearch;

  const { Search } = Input;

  // const onSearch = (key) => {
  //   dispatch(fetchUserList(key));
  // };

  function onChange(pagination, filters, sorter, extra) {
    // console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div>
      <h3>Quản lý người dùng</h3>
      <Button
        className="mb-2"
        type="primary"
        icon={<PlusSquareOutlined />}
        size="small"
        onClick={() => history.push("/user/adduser")}
      >
        Add user
      </Button>
      <Search
        id="search"
        name="search"
        value={searchText}
        onChange={handleChange}
        placeholder="input search text"
        enterButton
      />
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
}

export default User;
