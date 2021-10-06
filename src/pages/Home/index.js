import React from "react";

export default function HomePages(props) {
  return (
    <div className="container home">
      <div className="row">
        <div className="col-md-5 home-left" style={{ paddingTop: 100 }}>
          <h2
            className="left-content--title"
            style={{
              color: "slategray",
              fontFamily: "sans-serif",
              paddingBottom: 100,
            }}
          >
            Welcome to Movie Project Admin Page
          </h2>
          <h5 className="left-content--web">
            This page is used to manage Movie Project data
          </h5>
        </div>

        <div className="col-md-7 home-right">
          <img
            src="https://i.ibb.co/G3xKFwN/team.jpg"
            alt="hinhAnh"
            style={{
              width: "100%",
              height: "auto",
              transform: "skewX(-12deg)",
              margin: "70px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
