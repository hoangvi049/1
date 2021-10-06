import React, { useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { editUser, getInfor } from "../../redux/actions/UserAction";
import { groupID } from "../../config/setting";
const EditUserComponent = (props) => {
  let { id } = props.props.match.params;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInfor(id));
  }, [dispatch]);

  let { userDetail } = useSelector((state) => state.user);

  const { Option } = Select;

  const handleChangeMaLoaiNguoiDung = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      taiKhoan: userDetail.taiKhoan,
      matKhau: userDetail.matKhau,
      email: userDetail.email,
      soDt: userDetail.soDT,
      maNhom: groupID,
      maLoaiNguoiDung: userDetail.maloaiNguoiDung,
      hoTen: userDetail.hoTen,
    },
    onSubmit: (values) => {
      console.log(values);

      dispatch(editUser(values));
      // dispatch(addUser(values));
    },
  });

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  return (
    <>
      <h3 className="text-center"> Sửa thông tin người dùng</h3>

      <Form
        className="container"
        {...layout}
        onSubmitCapture={formik.handleSubmit}
      >
        <Form.Item label="Họ và tên">
          <Input
            name="hoTen"
            value={formik.values.hoTen}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Tài khoản">
          <Input
            name="taiKhoan"
            value={formik.values.taiKhoan}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Mật Khẩu">
          <Input.Password
            name="matKhau"
            value={formik.values.matKhau}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input
            name="soDt"
            value={formik.values.soDt}
            onChange={formik.handleChange}
          />
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
            Sửa
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditUserComponent;
