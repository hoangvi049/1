import axios from "axios";
import { domain, token, groupID, tokenCybersoft } from "../config/setting";
export class AdminService {
  layDanhSachNguoiDung = () => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${groupID}`,
      method: "GET",
      headers: {
        TokenCybersoft: tokenCybersoft,
      },
    });
  };

  // timKiemNguoiDung = (key) => {
  //   return axios({
  //     url: `${domain}/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${groupID}&tuKhoa=${key}`,
  //     method: "GET",
  //     headers: {
  //       TokenCybersoft: tokenCybersoft,
  //     },
  //   });
  // };

  themNguoiDung = (thongTinNguoiDung) => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/ThemNguoiDung`,
      method: "POST",
      data: thongTinNguoiDung,
      headers: {
        TokenCybersoft: tokenCybersoft,
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };

  layThongTinNguoiDung = (taiKhoan) => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`,
      method: "POST",
      headers: {
        TokenCybersoft: tokenCybersoft,
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };

  capNhatThongTinNguoiDung = (thongTinNguoiDung) => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      method: "POST",
      data: thongTinNguoiDung,
      headers: {
        TokenCybersoft: tokenCybersoft,
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };
  xoaNguoiDung = (taiKhoan) => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
      method: "DELETE",
      headers: {
        TokenCybersoft: tokenCybersoft,
        Authorization: "Bearer " + localStorage.getItem(token),
      },
    });
  };

  dangNhap = (thongTinDangNhap) => {
    return axios({
      url: `${domain}/QuanLyNguoiDung/DangNhap`,
      method: "POST",
      data: thongTinDangNhap,
      headers: {
        TokenCybersoft: tokenCybersoft,
      },
    });
  };
}

export const adminService = new AdminService();
