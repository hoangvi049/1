import React from "react";

import AddShowTimeComponent from "../../../components/AddShowTime";

function AddShowTime(props) {
  const maPhim = props.match.params.id;
  return <AddShowTimeComponent maPhim={maPhim} />;
}

export default AddShowTime;
