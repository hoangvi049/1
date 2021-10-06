import { createAction } from "./index";
import { actionTypes } from "./type";
import { adminService } from "../../services/baseService";
import { history } from "../../App";

export const fetchUserList = (dispatch) => {
  adminService
    .layDanhSachNguoiDung()
    .then((res) => {
      console.log(res.data.content);
      dispatch(createAction(actionTypes.FETCH_USER_LIST, res.data.content));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addUser = (formData) => {
  return async (dispatch) => {
    try {
      let res = await adminService.themNguoiDung(formData);
      console.log(res);
      alert("Thêm thành công người dùng");
      history.push("/user");
    } catch (err) {
      console.log(err.response?.data);
    }
  };
};

export const getInfor = (taiKhoan) => {
  return (dispatch) => {
    adminService
      .layThongTinNguoiDung(taiKhoan)
      .then((res) => {
        console.log(res.data);
        dispatch(createAction(actionTypes.FETCH_USER_DETAIL, res.data.content));
      })
      .catch((err) => {
        console.log(err?.response);
      });
  };
};

export const editUser = (thongTinNguoiDung) => {
  return async (dispatch) => {
    try {
      let res = await adminService.capNhatThongTinNguoiDung(thongTinNguoiDung);
      console.log(res.data.content);
      alert("Cập nhật thông tin thành công");
      history.push("/user");
    } catch (err) {
      console.log(err?.response);
    }
  };
};

export const deleteUser = (maPhim) => {
  return async (dispatch) => {
    try {
      let res = await adminService.xoaNguoiDung(maPhim);
      console.log(res.data.content);
      alert("Xóa người dùng thành công");
      dispatch(fetchUserList);
    } catch (error) {
      console.log(error);
    }
  };
};
