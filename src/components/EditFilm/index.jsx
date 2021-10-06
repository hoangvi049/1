import React, { useEffect, useState } from "react";
import moment from "moment";
import { groupID } from "../../config/setting";
import {
  capNhatPhimAction,
  layThongTinPhimAction,
} from "../../redux/actions/FilmAction";
import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  InputNumber,
  Switch,
} from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

const EdiFilmComponent = (props) => {
  const dispatch = useDispatch();
  const { id } = props.props.match.params;

  useEffect(() => {
    dispatch(layThongTinPhimAction(id));
  }, [dispatch]);

  let { filmDetail } = useSelector((state) => state.user);
  // const test = () => {
  //   console.log(filmDetail);
  // };
  const [imgSrc, setImgSrc] = useState(null);

  const formik = useFormik({
    //Chỉ nên sử dụng với những Comp sử dụng độc nhất state của formik (hoặc những trang edit)
    //để tránh trường hợp re-render những state khác loại
    enableReinitialize: true,

    initialValues: {
      maPhim: id,
      maNhom: groupID,
      tenPhim: filmDetail?.tenPhim,
      trailer: filmDetail?.trailer,
      moTa: filmDetail?.moTa,
      ngayKhoiChieu: filmDetail.ngayKhoiChieu,
      danhGia: filmDetail?.danhGia,
      dangChieu: filmDetail?.dangChieu,
      sapChieu: filmDetail?.sapChieu,
      hot: filmDetail?.hot,
      hinhAnh: null,
    },
    onSubmit: (values) => {
      //   console.log(values);
      //Tạo đối tượng formData=> đưa giá trị từ formik vào formData
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      console.log(values);
      dispatch(capNhatPhimAction(formData));
    },
  });

  const [componentSize, setComponentSize] = useState("default");
  const handleChangDate = (value) => {
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = async (event) => {
    //Lấy file từ e
    let file = event.target.files[0];
    // console.log(file);
    //Tạo đối tượng để đọc file
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      //side effect của hàm bất đồng bộ
      // settFieldValue là Promise. onload hay reader là các sự kiện độc lập do đó dễ dẫn đến tình trạn set các state trước  khi setFilde chạy xong
      await formik.setFieldValue("hinhAnh", file);

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        setImgSrc(event.target.result);
      };
    }
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <h3 className="text-center"> Sửa thông tin phim</h3>

      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên phim">
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onChange={formik.handleChange}
            value={formik.values.trailer}
          />
        </Form.Item>
        <Form.Item label="Mô Tả">
          <Input
            name="moTa"
            onChange={formik.handleChange}
            value={formik.values.moTa}
          />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            format={"DD / MM / YYYY"}
            onChange={handleChangDate}
            defaultValue={moment(formik.values.ngayKhoiChieu)}
          />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber
            name="danhGia"
            onChange={handleChangeSwitch("danhGia")}
            max={10}
            min={1}
            value={formik.values.danhGia}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu">
          <Switch
            onChange={handleChangeSwitch("dangChieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu">
          <Switch
            onChange={handleChangeSwitch("sapChieu")}
            checked={formik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch
            onChange={handleChangeSwitch("hot")}
            checked={formik.values.hot}
          />
        </Form.Item>
        <Form.Item label="Hình Ảnh">
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/gif, image/jpeg"
          />
          <br />
          <img
            width={100}
            height={100}
            src={imgSrc === null ? filmDetail.hinhAnh : imgSrc}
            alt={formik.values.tenPhim}
          />
        </Form.Item>
        <Form.Item label="Sửa">
          <Button type="primary" htmlType="submit">
            Đồng ý
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EdiFilmComponent;
