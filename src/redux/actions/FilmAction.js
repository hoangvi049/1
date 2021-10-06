import { filmService } from "../../services/filmService";
import { createAction } from "./index";
import { actionTypes } from "./type";
import { history } from "../../App";

export const layDanhSachPhimAcTion = (dispatch) => {
  filmService
    .layDanhSachPhim()
    .then((res) => {
      dispatch(createAction(actionTypes.FETCH_FILM_LIST, res.data.content));
    })
    .catch((err) => {
      console.log(err?.response.data);
    });
};

export const layThongTinPhimAction = (maPhim) => {
  return (dispatch) => {
    filmService
      .layThongTinPhim(maPhim)
      .then((res) => {
        console.log(res.data);
        dispatch(createAction(actionTypes.FETCH_FILM_DETAIL, res.data.content));
      })
      .catch((err) => console.log(err?.response.data));
  };
};

export const themPhimAction = (formData) => {
  return (dispatch) => {
    filmService
      .themPhimUpLoadHinh(formData)
      .then((res) => {
        console.log(res.data.content);
        alert("Thêm phim thành công");
        history.push("/film");
      })
      .catch((err) => {
        console.log(err?.response.data);
      });
  };
};

export const capNhatPhimAction = (formData) => {
  return async (dispatch) => {
    try {
      let res = await filmService.capNhatPhim(formData);
      alert("Cập nhật thông tin phim thành công");
      history.push("/film");

      // dispatch(layDanhSachPhimAcTion);
    } catch (err) {
      console.log(err?.response.data);
    }
  };
};

export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      let res = await filmService.xoaPhim(maPhim);
      alert("Xóa phim thành công");
      dispatch(layDanhSachPhimAcTion);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
};
