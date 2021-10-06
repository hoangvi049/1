import React from "react";
import { Form, Input, Button, Select } from "antd";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/actions/UserAction";
import { groupID } from "../../config/setting";

function AddUser(props) {
  const dispatch = useDispatch();

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const { Option } = Select;

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: groupID,
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    onSubmit: (values) => {
      //Tạo đối tượng formData=> đưa giá trị từ formik vào formData
      // let formData = new FormData();
      // for (let key in values) {
      //   formData.append(key, values[key]);
      // }

      dispatch(addUser(values));
    },
  });

  const handleChangeMaLoaiNguoiDung = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  return (
    <>
      <h3 className="text-center"> Thêm người dùng mới</h3>

      <Form
        {...layout}
        className="container"
        onSubmitCapture={formik.handleSubmit}
      >
        <Form.Item label="Họ và tên">
          <Input name="hoTen" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Email">
          <Input name="email" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Tài khoản">
          <Input name="taiKhoan" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mật Khẩu">
          <Input.Password name="matKhau" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input name="soDt" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mã loại người dùng">
          <Select
            showSearch
            placeholder="Chọn loại người dùng"
            onChange={handleChangeMaLoaiNguoiDung("maLoaiNguoiDung")}
          >
            <Option value="QuanTri">Quản Trị</Option>
            <Option value="KhachHang">Khách Hàng</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default AddUser;
