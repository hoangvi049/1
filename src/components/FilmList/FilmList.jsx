import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table } from "antd";
import { Input } from "antd";
import { Button } from "antd";
import {
  PlusSquareOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { history } from "../../App";
import { xoaPhimAction } from "../../redux/actions/FilmAction";
import { filmService } from "../../services/filmService";
import { useFormik } from "formik";

const FilmList = (props) => {
  const [searchText, setSearchText] = useState("");

  const [danhSachPhimSearch, setDanhSachPhimSearch] = useState([]);
  let [danhSachPhim, setDanhSachPhim] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    filmService
      .layDanhSachPhim()
      .then((res) => {
        setDanhSachPhim(res.data.content);
      })
      .catch((err) => {
        console.log(err?.response.data);
      });
  }, []);

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };
  useEffect(() => {
    let results = danhSachPhim.filter((phim) => {
      return phim.tenPhim.toLowerCase().includes(searchText.toLowerCase());
    });
    setDanhSachPhimSearch(results);
  }, [danhSachPhim, searchText]);

  const columns = [
    {
      title: "Mã Phim",
      dataIndex: "maPhim",
      sorter: {
        compare: (a, b) => a.maPhim - b.maPhim,
      },
      value: (text, film) => {
        return <Fragment>{text}</Fragment>;
      },
      // sortDirections: ["descend"],
      sortOder: "descend",
      width: "10%",
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      width: "30%",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhANH",
      render: (text, film) => {
        return (
          <Fragment>
            <img src={film.hinhAnh} alt={film.tenPhim} width={50} height={50} />
          </Fragment>
        );
      },
      width: "15%",
    },
    {
      title: "Mô Tả",
      dataIndex: "moTa",
      render: (text, film) => {
        return (
          <Fragment>
            {film.moTa.length > 50
              ? film.moTa.substr(0, 50) + "..."
              : film.moTa}
          </Fragment>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },

    {
      title: "Thao tác",
      dataIndex: "thaoTac",
      render: (text, film) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              className="bg-success text-white mr-2 p-2"
              to={`/film/editfilm/${film.maPhim}`}
            >
              <EditOutlined />
            </NavLink>
            <span
              style={{ cursor: "pointer" }}
              key={2}
              className="bg-danger text-white p-2 mr-2"
              to="/"
              onClick={() => {
                if (window.confirm("Bạn có muốn xóa phim " + film.tenPhim)) {
                  //dispatch action delete
                  dispatch(xoaPhimAction(film.maPhim));
                }
              }}
            >
              <DeleteOutlined />
            </span>

            <NavLink
              key={1}
              className="bg-primary text-white  p-2"
              to={`/film/addshowtime/${film.maPhim}`}
            >
              <CalendarOutlined />
            </NavLink>
          </Fragment>
        );
      },
      width: "20%",
    },
  ];

  const data = danhSachPhimSearch;

  const { Search } = Input;

  // const onSearch = (key) => {
  //   dispatch(fetchUserList(key));
  // };

  function onChange(pagination, filters, sorter, extra) {
    // console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div>
      <h3>Quản lý phim</h3>
      <Button
        className="mb-2"
        type="primary"
        icon={<PlusSquareOutlined />}
        size="small"
        onClick={() => history.push("/film/addnewfilm")}
      >
        Add new film
      </Button>
      <Search
        placeholder="input search text"
        id="search"
        name="search"
        value={searchText}
        onChange={handleChange}
        enterButton
      />
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};

export default FilmList;
