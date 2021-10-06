import axios from "axios";
import { domain, token, groupID, tokenCybersoft } from "../config/setting";
export class FilmService {
  layDanhSachPhim = () => {
    return axios({
      url: `${domain}/QuanLyPhim/LayDanhSachPhim?MaNhom=${groupID}`,
      method: "GET",
      headers: {
        TokenCybersoft: tokenCybersoft,
      },
    });
  };

  layThongTinPhim = (maPhim) => {
    return axios({
      url: `${domain}/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`,
      method: "GET",
      headers: {
        TokenCybersoft: tokenCybersoft,
      },
    });
  };

  themPhimUpLoadHinh = (formData) => {
    return axios({
      url: `${domain}/QuanLyPhim/ThemPhimUploadHinh`,
      method: "POST",
      data: formData,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
        TokenCybersoft: tokenCybersoft,
      },
    });
  };

  capNhatPhim = (formData) => {
    return axios({
      url: `${domain}/QuanLyPhim/CapNhatPhimUpload`,
      method: "POST",
      data: formData,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
        TokenCybersoft: tokenCybersoft,
      },
    });
  };

  xoaPhim = (maPhim) => {
    return axios({
      url: `${domain}/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
        TokenCybersoft: tokenCybersoft,
      },
    });
  };

  layThongTinHeThongRap = () => {
    return axios({
      url: `${domain}/QuanLyRap/LayThongTinHeThongRap?MaNhom=${groupID}`,
      method: "GET",
      headers: {
        TokenCybersoft: tokenCybersoft,
      },
    });
  };

  layThongTinCumRap = (maHeThongRap) => {
    return axios({
      url: `${domain}/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
      method: "GET",
      headers: {
        TokenCybersoft: tokenCybersoft,
      },
    });
  };

  taoLichChieu = (thongTinLichChieu) => {
    return axios({
      url: `${domain}/QuanLyDatVe/TaoLichChieu`,
      method: "POST",
      data: thongTinLichChieu,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(token),
        TokenCybersoft: tokenCybersoft,
      },
    });
  };
}

export const filmService = new FilmService();
