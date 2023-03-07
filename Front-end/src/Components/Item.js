import React, { useContext,useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Api, { endpoints } from "../configs/API";
// import "../static/RouteDetail.css";
import { memo } from "react";
import Moment from "react-moment";
import cookies from "react-cookies";
import { Link } from "react-router-dom";
import select from "../assets/img/non_select.png";
import select1 from "../assets/img/selected.png";
import { display } from "@mui/system";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import Comment from "./Comment";
import { UserContext } from "../App";

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

  const setStatus = (id) => {
    var array = [...classStatus];
    var index = array.indexOf(id);
    if (index !== -1) {
      array.splice(index, 1);
      setClassStatus(array);
    } else {
      const data = [...classStatus, id];
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

  return (
    <>
      <div className="inner-box">
        <div className="text">
          <h2>Describe</h2>
          {/* <p dangerouslySetInnerHTML={{__html: `${route.description}`}} /> */}
          <p>Wonderful Trip</p>
          <ul className="info-list clearfix">
            <li>
              <i className="far fa-clock"></i> {props.timeEnd}{" "}
            </li>
            <li>
              <i className="far fa-user"></i>Updating
            </li>
            <li>
              <i className="far fa-map"></i>Updating
            </li>
          </ul>
        </div>
      </div>
      <div className="overview-inner">
        <ul className="overview-list clearfix">
          <li>
            <span>Seat:</span>
            {seatStatusFree.length} seat
          </li>
          <li>
            <span>Departure time:</span>
            {props.timeEnd}
          </li>
          <li>
            <span>Departure day:</span>
            {props.date}
          </li>
          <li>
            <span>Price:</span>
            {formatPrice(props.price)}
            <sup>₫</sup>
          </li>
          {/* <li>
          <span>Departure:</span>
          {props.stationFrom}
        </li>
        <li>
          <span>Destination:</span>
          {props.stationTo}
        </li> */}
        </ul>
      </div>
      <Row>
        {props.select == false ? (
          <Col xs={1} className="select-check" style={{ display: "flex" }}>
            <h2 style={{ minWidth: "614px", marginBottom: "50px" }}>
              Book tickets and Comment
              <span style={{ color: "#ff7c5b" }}> Click Here ->>></span>{" "}
            </h2>

            <img
              src={select}
              style={{
                width: "25px",
                height: "30px",
                marginLeft: "15px",
                marginTop: "5px",
              }}
              onClick={() => {
                check();
                setStatuss();
              }}
              alt="ád"
            />
          </Col>
        ) : (
          <Col xs={1} className="select-check" style={{ display: "flex" }}>
            <h2 style={{ minWidth: "350px" }}>Book tickets and Rating </h2>
            <img
              src={select1}
              style={{
                width: "25px",
                height: "30px",
                marginLeft: "15px",
                marginTop: "5px",
              }}
              onClick={() => {
                check();
                setStatuss();
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
                  borderBottom: `${props.choosen == 1 ? "2px solid blue" : ""}`,
                }}
                onClick={() => {
                  props.setChoosen(1);
                }}
              >
                Book tickets
              </Col>
              <Col
                xs={6}
                style={{
                  cursor: "pointer",
                  color: `${props.choosen == 3 ? "blue" : ""}`,
                  borderBottom: `${props.choosen == 3 ? "2px solid blue" : ""}`,
                }}
                onClick={() => {
                  props.setChoosen(3);
                }}
              >
                Rating and Comment
              </Col>
            </Row>
          </Container>
          {props.choosen == 1 ? (
            <div>
              {props.busTypeId == 3 ? (
                <Row style={{ justifyContent: "center" }}>
                  <Col xs={4}>
                    <h4 style={{ textAlign: "center" }}>Downstairs</h4>
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
                              <div className="seatStatus-pass">
                                {c.location}
                              </div>
                            </Col>
                          );
                        } else if (
                          c.location.indexOf("A") != -1 &&
                          c.status !== "seatStatus-pass"
                        ) {
                          return (
                            <Col xs={4} onClick={() => setStatus(c.id)}>
                              <div
                                className={
                                  [...classStatus].indexOf(c.id) !== -1
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
                  <Col xs={4}>
                    <h4 style={{ textAlign: "center" }}>Up floor</h4>
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
                              <div className="seatStatus-pass">
                                {c.location}
                              </div>
                            </Col>
                          );
                        } else if (
                          c.location.indexOf("B") !== -1 &&
                          c.status !== "seatStatus-pass"
                        ) {
                          return (
                            <Col xs={4} onClick={() => setStatus(c.id)}>
                              <div
                                className={
                                  [...classStatus].indexOf(c.id) !== -1
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
              ) : (
                <Row style={{ justifyContent: "center" }}>
                  <Col xs={12}>
                    <h4 style={{ textAlign: "center", margin: "5px" }}>
                      Row of seats
                    </h4>
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
                            <Col xs={3} onClick={() => setStatus(c.id)}>
                              <div
                                className={
                                  [...classStatus].indexOf(c.id) !== -1
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
                  <div class="status-text">Empty</div>
                </div>
                <div class="status-item">
                  <div class="select"></div>
                  <div class="status-text">Selected </div>
                </div>
                <div class="status-item">
                  <div class="disable"></div>
                  <div class="status-text">Booked</div>
                </div>
              </div>
              <Form.Group>
                <Form.Label>Bus boarding point:</Form.Label>
                <Form.Select
                  onChange={(e) => setPlaceFromState(e.target.value)}
                >
                  <option value="undefined">Bus boarding point.....</option>
                  {timeTable.map((c) => {
                    return <option value={c.id}>{c.name}</option>;
                  })}
                </Form.Select>
              </Form.Group>
              {[...classStatus].length > 0 && placeFrom !== undefined ? (
                <div>
                  {user != null ? (
                    <div className="footer">
                      <div style={{ textAlign: "left" }}>
                        <h4>Booking details</h4>
                        <h5>
                          {setCountByStatus} Ticket: Seat No{" "}
                          {classStatus.map((c) => c + ", ")}
                        </h5>
                        <h5>
                          Total:
                          <span className="total">
                            {formatPrice(setTotalByStatus)}
                            <sup>₫</sup>
                          </span>
                        </h5>
                      </div>
                      <button
                        className="next-button"
                        onClick={() => {
                          props.seatSubmit(() => classStatus.map((c) => c));
                          props.step(1);
                          props.total(setTotalByStatus);
                          props.station(props.stationFrom, props.stationTo);
                          setTimeTableIDState(props.id);
                        }}
                      >
                        Continue
                        <i className="fas fa-angle-right" />
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/Login"
                      className="text-danger"
                      style={{ width: "120px", marginRight: "70px" }}
                    >
                      Login to book bus tickets !!!
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
    </>
  );
}

export default memo(Item);
