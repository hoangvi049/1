import React, { useEffect, useState } from "react";
import { Form, Button, InputNumber } from "antd";
import { Select, DatePicker } from "antd";
import { filmService } from "../../services/filmService";
import { useFormik } from "formik";
import moment from "moment";
import { history } from "../../App";
function AddShowTimeComponent(props) {
  const formik = useFormik({
    initialValues: {
      maPhim: props.maPhim,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: (values) => {
      filmService
        .taoLichChieu(values)
        .then((res) => {
          alert("Thêm lịch chiếu thành công");
          history.push("/film");
        })
        .catch((err) => {
          console.log(err?.response.data);
        });
      console.log(values);
    },
  });

  const [state, setState] = useState({
    heThongRap: [],
    cumRap: [],
  });

  useEffect(() => {
    filmService
      .layThongTinHeThongRap()
      .then((res) => {
        setState({
          ...state,
          heThongRap: res.data.content,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filmService]);

  const handleChangeHeThongRap = (value) => {
    filmService
      .layThongTinCumRap(value)
      .then((res) => {
        setState({
          ...state,
          cumRap: res.data.content,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangeCumRap = (value) => {
    formik.setFieldValue("maRap", value);
  };
  const onChangeDate = (value) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY hh:mm:ss")
    );
  };
  const onOk = (value) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY hh:mm:ss")
    );
  };
  const onChangePrice = (value) => {
    formik.setFieldValue("giaVe", value);
  };
  return (
    <div className="container">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        onSubmitCapture={formik.handleSubmit}
      >
        <h3 className="text-center"> Tạo Lịch Chiếu</h3>
        <Form.Item label="Hệ thống rạp">
          <Select
            options={state.heThongRap?.map((htr, index) => ({
              label: htr.tenHeThongRap,
              value: htr.maHeThongRap,
            }))}
            onChange={handleChangeHeThongRap}
            placeholder="Please Select"
          />
        </Form.Item>

        <Form.Item label="Cụm rạp">
          <Select
            name="maRap"
            options={state.cumRap?.map((cr, index) => ({
              label: cr.tenCumRap,
              value: cr.maCumRap,
            }))}
            onChange={handleChangeCumRap}
            placeholder="Please Select"
          />
        </Form.Item>

        <Form.Item label="Chọn Lịch Chiếu">
          <DatePicker
            name="ngayChieuGioChieu"
            format="DD/MM/YYYY hh:mm:ss"
            showTime
            onChange={onChangeDate}
            onOk={onOk}
          ></DatePicker>
        </Form.Item>
        <Form.Item label="Chọn Giá Vé">
          <InputNumber
            name="giaVe"
            min={75000}
            max={150000}
            onChange={onChangePrice}
          />
        </Form.Item>
        <Form.Item label="Chức năng">
          <Button htmlType="submit" type="primary">
            Tạo Lịch Chiếu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddShowTimeComponent;
