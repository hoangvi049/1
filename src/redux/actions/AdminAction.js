import { adminService } from "../../services/baseService";
import { actionTypes } from "./type";
import { history } from "../../App";
import { token } from "../../config/setting";
import { createAction } from "../actions/index";

export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const res = await adminService.dangNhap(thongTinDangNhap);

      if (res.data.statusCode === 200) {
        dispatch({
          type: actionTypes.DANG_NHAP,
          action: res.data.content,
        });
        console.log(res);
        localStorage.setItem(token, res.data.content.accessToken);

        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const dangXuatAction = () => {
  return (dispatch) => {
    dispatch(createAction(actionTypes.DANG_XUAT));
    window.location.reload();
  };
};
