import React, { useEffect, useState, useContext } from "react";
import Api, { endpoints } from "../configs/API";
import { Col, Form, Row } from "react-bootstrap";
import * as ImCon from "react-icons/im";
import { makeStyles } from "@mui/styles";
import pageTitle6 from "../assets/img/Bus-Station-High-Quality-Wallpaper.jpg";
import Header from "../Layout/Header";
import { UserContext } from "../App";
import { FaMoneyBillWaveAlt, FaBus } from "react-icons/fa";
import NumberFormat from "react-number-format";

function Bill(props) {
  const [bill, setBill] = useState([]);
  const [user, dispatch] = useContext(UserContext);

  const [cName, setcName] = useState("wrapper list");
  if (user != null) {
    useEffect(() => {
      let loadBill = async () => {
        let res = await Api.get(endpoints["booking-history-by-user"](user.id));
        setBill(res.data);
        // console.log(res.data);
      };

      loadBill();
    }, []);
  }
  let routes = <></>;

  //  CHÚ Ý LỌC CÓ HAY KHÔNG
  if (user != null) {
    routes = (
      <>
        <div className="tour-list-content list-item">
          {bill.map((t) => (
            <ArticalItem key={t.id} bill={t} />
          ))}
        </div>
      </>
    );
  } else {
    routes = (
      <>
        <div className="tour-list-content list-item">
          <h1>Quý khách vui lòng đăng nhập để xem hóa đơn thanh toán</h1>
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <section
        className="page-title centred"
        style={{ backgroundImage: `url(${pageTitle6})` }}
      >
        <div className="auto-container">
          <div
            className="content-box wow fadeInDown animated animated"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <h1>Hóa Đơn</h1>
            <p>Hóa đơn của quý khách</p>
          </div>
        </div>

        <div></div>
      </section>
      <section className="tours-page-section">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 content-side">
              <div className={cName}>{routes}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Bill;

function ArticalItem(props) {
  return (
    <div
      className="tour-block-two wow fadeInUp animated animated"
      data-wow-delay="00ms"
      data-wow-duration="1500ms"
    >
      <div className="inner-box">
        <figure className="image-box">
          <img
            style={{ width: "190px", height: "227px" }}
            src={props.bill.timeTable.busRouteID.routeID.image}
            alt="ImageTrip"
          />

          {/* <Link to={`/route-detail/${props.id}`}>
            <i className="fas fa-link" />
          </Link> */}
        </figure>
        <div className="content-box">
          <h3>
            <p>
              {props.bill.timeTable.busRouteID.routeID.city_from.name} -
              {props.bill.timeTable.busRouteID.routeID.to_garage.name}
            </p>
          </h3>

          <Row>
            <Col xs={4} style={{ display: "inline-flex" }}>
              <FaMoneyBillWaveAlt />
              <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
                <NumberFormat
                  value={props.bill.timeTable.busRouteID.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Giá: "}
                />
                <span> đ </span>
              </p>
            </Col>
            <Col xs={4} style={{ display: "inline-flex" }}>
              <ImCon.ImClock />
              <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
                Giờ: {props.bill.timeTable.time}
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={4} style={{ display: "inline-flex" }}>
              <ImCon.ImLocation />
              <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
                Điểm lên xe: {props.bill.timeTable.busRouteID.routeID.point}
              </p>
            </Col>
            <Col xs={4} style={{ display: "inline-flex" }}>
              <ImCon.ImClock />
              <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
                Ngày khởi hành: {props.bill.timeTable.date}
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={4} style={{ display: "inline-flex" }}>
              <FaBus />
              <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
                Loại xe: {props.bill.timeTable.busRouteID.busID.typeBusID.name}
              </p>
            </Col>
            {/* <Col xs={4} style={{ display: "inline-flex" }}>
              <ImCon.ImClock />
              <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
                Ngày khởi hành: {props.bill.timeTable.date}
              </p>
            </Col> */}
          </Row>
          <div className="btn-box">
            {/* <Link to={`/route-detail/${props.id}`}>Chi Tiết</Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
