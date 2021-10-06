import React, { useState } from "react";
import moment from "moment";
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
import { useDispatch } from "react-redux";
import { themPhimAction } from "../../redux/actions/FilmAction";
import { groupID } from "../../config/setting";

const AddNewFilmComponent = (props) => {
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState(null);

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      danhGia: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      hinhAnh: {},
      maNhom: groupID,
    },
    onSubmit: (values) => {
      //   console.log(values);
      //Tạo đối tượng formData=> đưa giá trị từ formik vào formData
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      dispatch(themPhimAction(formData));
      console.log(values);
    },
  });

  const [componentSize, setComponentSize] = useState("default");
  const handleChangDate = (value) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = (event) => {
    //Lấy file từ e
    let file = event.target.files[0];
    // console.log(file);
    //Tạo đối tượng để đọc file
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        setImgSrc(event.target.result);
      };
    }
    formik.setFieldValue("hinhAnh", file);
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <h3 className="text-center"> Thêm phim mới</h3>
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
          <Input name="tenPhim" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mô Tả">
          <Input name="moTa" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker format={"DD / MM / YYYY"} onChange={handleChangDate} />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber
            name="danhGia"
            onChange={handleChangeSwitch("danhGia")}
            max={10}
            min={1}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu">
          <Switch onChange={handleChangeSwitch("dangChieu")} />
        </Form.Item>
        <Form.Item label="Sắp chiếu">
          <Switch onChange={handleChangeSwitch("sapChieu")} />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch onChange={handleChangeSwitch("hot")} />
        </Form.Item>
        <Form.Item label="Hình Ảnh">
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/gif, image/jpeg"
          />
          <br />
          <img width={100} height={100} src={imgSrc} alt="" />
        </Form.Item>
        <Form.Item label="Thêm">
          <Button type="primary" htmlType="submit">
            Đồng ý
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddNewFilmComponent;
