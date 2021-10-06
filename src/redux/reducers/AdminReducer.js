import { userLogin } from "../../config/setting";
import { actionTypes } from "../actions/type";

let user = {};
if (localStorage.getItem(userLogin)) {
  user = JSON.parse(localStorage.getItem(userLogin));
}

let initialState = {
  AdminDangNhap: user,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DANG_NHAP:
      localStorage.setItem(userLogin, JSON.stringify(action));

      const { thongTinDangNhap } = action;
      return { ...state, AdminDangNhap: thongTinDangNhap };
    case actionTypes.DANG_XUAT:
      localStorage.removeItem("userLogin");
      window.location.reload();
    default:
      return state;
  }
};

export default adminReducer;
