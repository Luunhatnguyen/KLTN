import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Api, { endpoints } from "../configs/API";
import { memo } from "react";
import { Link } from "react-router-dom";
import select from "../assets/img/non_select.png";
import select1 from "../assets/img/selected.png";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import { UserContext } from "../App";
import Moment from "react-moment";

function Item(props) {
  const [classStatus, setClassStatus] = useState([]);
  const [seat, setSeat] = useState([]);
  const [placeFrom, setPlaceFrom] = useState();
  const [booking, setBooking] = useState([]);
  const [seatStatusPass, setSeatStatusPass] = useState([]);
  const [seatStatusFree, setSeatStatusFree] = useState([]);
  const [timeTable, setTimeTable] = useState([]);
  const [seatBooking, setSeatBooking] = useState([]);
  const [user, dispatch] = useContext(UserContext);
  const [fromGarage, setFromGarage] = useState();
  const [toGarage, setToGarage] = useState();
  const { routerId } = useParams();
  const setPlaceFromState = (place) => {
    if (place === "undefined" || place === undefined) {
      setPlaceFrom(undefined);
      props.placeFrom(undefined);
    } else {
      setPlaceFrom(place);
      props.placeFrom(place);
    }
  };
  const [cName, setcName] = useState("wrapper list");
  const [cList, setcList] = useState("list-view on");
  const [cGrid, setcGrid] = useState("grid-view");
  const listOn = () => {
    setcName("wrapper list");
    setcList("list-view on");
    setcGrid("grid-view");
  };

  const gridOn = () => {
    setcName("wrapper grid");
    setcList("list-view");
    setcGrid("grid-view on");
  };

  useEffect(() => {
    let seatStatus_pass = [];
    let seatStatus_free = [];
    let seatt = [];
    let loadSeat = async () => {
      let res = await Api.get(endpoints["seats"](props.busTypeId));
      setSeat(res.data);
      seatt = res.data;
    };

    loadSeat();

    let loadBookings = async () => {
      let res = await Api.get(endpoints["bookings"](props.busTypeId));
      setBooking(res.data);

      let seatBookingDetails = await Api.get(
        endpoints["seat-booking-detail"](props.id)
      );
      setSeatBooking(seatBookingDetails.data);

      seatt.map((s) => {
        seatBookingDetails.data.map((b) => {
          if (b.seatID == s.id) {
            seatStatus_pass.push(s.id);
          }
        });

        if (!seatStatus_pass.includes(s.id)) {
          seatStatus_free.push(s.id);
        }
      });

      setSeatStatusPass(seatStatus_pass);
      setSeatStatusFree(seatStatus_free);
    };

    loadBookings();

    let loadTimeTable = async () => {
      let res = await Api.get(endpoints["timetable-detail"](props.id));
      setTimeTable(res.data);
      // console.log(res.data);
      let router = await Api.get(endpoints["route-detail"](routerId));
      console.log(router.data);
      setFromGarage(router.data.city_from.name);
      setToGarage(router.data.to_garage.name);
    };

    loadTimeTable();
  }, [props.busTypeId]);

  const setCountByStatus = classStatus.length;

  const setTotalByStatus = classStatus.length * props.price;

  const check = () => {
    if (props.select === false) {
      props.check(props.id);
    } else {
      props.check(undefined);
    }
  };

  const setSeatSubmit = (seatSubmit) => {
    props.seatSubmit(seatSubmit);
  };

  const setStatuss = () => {
    let seatStatus_pass = [];
    let seatStatus_free = [];
    seat.map((s) => {
      seatBooking.map((b) => {
        if (b.seatID == s.id) {
          seatStatus_pass.push(s.id);
        }
      });

      if (!seatStatus_pass.includes(s.id)) {
        seatStatus_free.push(s.id);
      }
    });

    setSeatStatusPass(seatStatus_pass);
    setSeatStatusFree(seatStatus_free);
  };

  const setStatus = (seat) => {
    var array = [...classStatus];
    var index = array.indexOf(seat);
    if (index !== -1) {
      array.splice(index, 1);
      setClassStatus(array);
    } else {
      const data = [...classStatus, seat];
      setClassStatus(data);
    }
  };

  const setTimeTableIDState = (id) => {
    props.timeTableID(id);
  };

  const formatPrice = (price) => {
    var str = price.toString();
    return str
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ",") + prev;
      });
  };

  const handleClickScroll = () => {
    const element = document.getElementById("section-1");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleClickScroll2 = () => {
    const element = document.getElementById("section-2");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const goToTop = () => {
    window.scrollTo({
      top: 165,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div
        id="section-2"
        style={{
          padding: "30px",
          border: "2px solid #f2754e",
          marginBottom: "5%",
        }}
      >
        <div className="inner-box">
          <div className="text">
            <h2>Chi tiết</h2>
            <p>
              Chọn giờ lên xe đi {toGarage} từ {fromGarage} phù hợp{" "}
            </p>
          </div>
        </div>
        <div className="overview-inner">
          <ul className="overview-list clearfix">
            <li>
              <span>Thời gian:</span>
              {props.timeStart} -> {props.timeEnd}
            </li>
            <li>
              <span>Giá vé:</span>
              {formatPrice(props.price)}
              <sup>₫</sup>
            </li>
            <li>
              <span>Loại xe:</span>
              {props.busType}
            </li>
            <li>
              <span>Số lượng ghế:</span>
              Còn {seatStatusFree.length} chỗ
            </li>
            <li>
              <span>Ngày đi:</span>
              <Moment format="D - MM - YYYY">{props.date}</Moment>
            </li>

            <li>
              <span>Nơi xuất phát:</span>
              {props.point}
            </li>
            <li>
              <span>Xe tuyến:</span>
              {props.distance}km - {props.hours} tiếng
            </li>
            <li>
              <span>Điểm đến:</span>
              {props.destination}
            </li>
          </ul>
        </div>

        <Row style={{ justifyContent: "center" }} id="section-1">
          {props.select == false ? (
            <Col
              xs={1}
              className="select-check"
              style={{ display: "flex", marginRight: "100px" }}
            >
              <h2 style={{ minWidth: "100px" }}>Đặt vé</h2>

              <img
                src={select}
                className="img-click"
                style={{
                  width: "25px",
                  height: "30px",
                  marginLeft: "15px",
                  marginTop: "5px",
                }}
                onClick={() => {
                  check();
                  setStatuss();
                  handleClickScroll();
                }}
                alt=""
              />
            </Col>
          ) : (
            <Col
              xs={1}
              className="select-check"
              style={{ display: "flex", marginRight: "190px" }}
            >
              <h2 style={{ minWidth: "200px" }}>Đặt vé, đánh giá </h2>
              <img
                src={select1}
                className="img-click"
                style={{
                  width: "25px",
                  height: "30px",
                  marginLeft: "15px",
                  marginTop: "5px",
                }}
                onClick={() => {
                  check();
                  setStatuss();
                  handleClickScroll2();
                }}
                alt="ád"
              />
              <div style={{ color: "#4397e0" }}></div>
            </Col>
          )}
        </Row>
        {props.select == true ? (
          <Container style={{ textAlign: "center", padding: "20px" }}>
            <Container>
              <Row
                style={{
                  boxShadow: "0px 0px 10px #646464",
                  padding: "10px",
                  marginBottom: "10px",
                  color: " #ff8b6e",
                }}
              >
                <Col
                  xs={6}
                  style={{
                    cursor: "pointer",
                    color: `${props.choosen == 1 ? "blue" : ""}`,
                    borderBottom: `${
                      props.choosen == 1 ? "2px solid blue" : ""
                    }`,
                  }}
                  onClick={() => {
                    props.setChoosen(1);
                  }}
                >
                  Đặt vé
                </Col>
                <Col
                  xs={6}
                  style={{
                    cursor: "pointer",
                    color: `${props.choosen == 3 ? "blue" : ""}`,
                    borderBottom: `${
                      props.choosen == 3 ? "2px solid blue" : ""
                    }`,
                  }}
                  onClick={() => {
                    props.setChoosen(3);
                  }}
                >
                  Đánh giá và Bình luận
                </Col>
              </Row>
            </Container>
            {props.choosen == 1 ? (
              <div>
                {props.busTypeId == 3 ? (
                  <Row style={{ justifyContent: "space-evenly" }}>
                    <Col xs={6}>
                      <h4 style={{ textAlign: "center", marginBottom: "20px" }}>
                        Tầng dưới
                      </h4>
                      <Row
                        style={{ justifyContent: "center", marginTop: "10px" }}
                      >
                        {seat.map((c) => {
                          if (
                            c.location.indexOf("A") != -1 &&
                            seatStatusPass.includes(c.id)
                          ) {
                            return (
                              <Col xs={4}>
                                <div className="seatStatus-pass1">
                                  {c.location}
                                </div>
                              </Col>
                            );
                          } else if (
                            c.location.indexOf("A") != -1 &&
                            c.status !== "seatStatus-pass1"
                          ) {
                            return (
                              <Col xs={4} onClick={() => setStatus(c)}>
                                <div
                                  className={
                                    [...classStatus].indexOf(c) !== -1
                                      ? "seatStatus-selected1"
                                      : "seatStatus-free1"
                                  }
                                >
                                  {c.location}
                                </div>
                              </Col>
                            );
                          }
                        })}
                      </Row>
                    </Col>
                    <Col xs={6}>
                      <h4 style={{ textAlign: "center", marginBottom: "20px" }}>
                        Tầng trên
                      </h4>
                      <Row
                        style={{ justifyContent: "center", marginTop: "10px" }}
                      >
                        {seat.map((c) => {
                          if (
                            c.location.indexOf("B") !== -1 &&
                            seatStatusPass.includes(c.id)
                          ) {
                            return (
                              <Col xs={4}>
                                <div className="seatStatus-pass1">
                                  {c.location}
                                </div>
                              </Col>
                            );
                          } else if (
                            c.location.indexOf("B") !== -1 &&
                            c.status !== "seatStatus-pass1"
                          ) {
                            return (
                              <Col xs={4} onClick={() => setStatus(c)}>
                                <div
                                  className={
                                    [...classStatus].indexOf(c) !== -1
                                      ? "seatStatus-selected1"
                                      : "seatStatus-free1"
                                  }
                                >
                                  {c.location}
                                </div>
                              </Col>
                            );
                          }
                        })}
                      </Row>
                    </Col>
                  </Row>
                ) : (
                  <Row style={{ justifyContent: "center" }}>
                    <Col xs={12}>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-evenly",
                          marginTop: "5px",
                        }}
                      >
                        <h4 style={{ marginLeft: "2%" }}>Tầng dưới</h4>
                        <h4 style={{ marginLeft: "21%" }}>Tầng trên</h4>
                      </div>

                      <Row
                        style={{ justifyContent: "center", marginTop: "10px" }}
                      >
                        {seat.map((c) => {
                          if (seatStatusPass.includes(c.id)) {
                            return (
                              <Col xs={3}>
                                <div className="seatStatus-pass">
                                  {c.location}
                                </div>
                              </Col>
                            );
                          } else if (c.status !== "seatStatus-pass") {
                            return (
                              <Col xs={3} onClick={() => setStatus(c)}>
                                <div
                                  className={
                                    [...classStatus].indexOf(c) !== -1
                                      ? "seatStatus-selected"
                                      : "seatStatus-free"
                                  }
                                >
                                  {c.location}
                                </div>
                              </Col>
                            );
                          }
                        })}
                      </Row>
                    </Col>
                  </Row>
                )}
                <div class="seat-statuses">
                  <div class="status-item">
                    <div class="active"></div>
                    <div class="status-text">Trống</div>
                  </div>
                  <div class="status-item">
                    <div class="select"></div>
                    <div class="status-text">Đang chọn</div>
                  </div>
                  <div class="status-item">
                    <div class="disable"></div>
                    <div class="status-text">Đã đặt</div>
                  </div>
                </div>
                <Form.Group>
                  <Form.Label>Điểm lên xe</Form.Label>
                  <Form.Select
                    onChange={(e) => setPlaceFromState(e.target.value)}
                  >
                    <option value="undefined">Chọn điểm lên xe</option>
                    {timeTable.map((c) => {
                      return <option value={c.id}>{c.address}</option>;
                    })}
                  </Form.Select>
                </Form.Group>
                {[...classStatus].length > 0 && placeFrom !== undefined ? (
                  <div>
                    {user != null ? (
                      <div className="footer">
                        <div style={{ textAlign: "left", marginTop: "15px" }}>
                          <h5>
                            {setCountByStatus} Vé:{" "}
                            {classStatus.map((c) => c.location + ", ")}
                          </h5>
                          <h5>
                            Tổng tiền:
                            <span className="total">
                              {formatPrice(setTotalByStatus)}
                              <sup>₫</sup>
                            </span>
                          </h5>
                        </div>
                        <button
                          className="next-button"
                          onClick={() => {
                            props.seatSubmit(() =>
                              classStatus.map((c) => c.id)
                            );
                            props.step(1);
                            props.total(setTotalByStatus);
                            props.station(props.stationFrom, props.stationTo);
                            setTimeTableIDState(props.id);
                            goToTop();
                          }}
                        >
                          Tiếp tục
                          <i className="fas fa-angle-right" />
                        </button>
                      </div>
                    ) : (
                      <Link
                        to="/Login"
                        className="text-danger"
                        style={{ width: "120px", marginLeft: "1%" }}
                      >
                        Bạn cần đăng nhập để mua vé !!!
                      </Link>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <Comment busRouteID={props.busRouteID}></Comment>
            )}
          </Container>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default memo(Item);
