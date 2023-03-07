import React from "react";
import { Container } from "react-bootstrap";

function IndexHeader() {
  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage:
            "url(" + require("../assets/img/Bus-Station-Wallpaper-Background.jpg") + ")",
        }}
      >
        <div className="filter" />
        <div className="content-center">
        </div>
      </div>
    </>
  );
}

export default IndexHeader;
