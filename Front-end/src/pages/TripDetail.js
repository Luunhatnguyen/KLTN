import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import API, { endpoints } from "../configs/API";
import cookies from "react-cookies";
import WOW from "wowjs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, Rating } from "@mui/material";
import NumberFormat from "react-number-format";
import advice1 from "../assets/img/14926f75f7d51ac044ccc0847cfb262f.png";
import PreLoader from "../Components/PreLoader";
import MessageSnackbar from "../Components/MessageSnackbar";
import Header from "../Layout/Header";
import Item from "../Components/Item";
import Booking1 from "./Booking1";
import Booking2 from "./Booking2";
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
import { UserContext } from "../App";

export default function TourDetail(props) {
  const [route, setRoute] = useState([]);
  const [services, setServices] = useState([]);

  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");
  const [listComment, setListComment] = useState([]);
  const [commentChange, setCommentChange] = useState(0);

  const { routerId } = useParams();

  const [user, dispatch] = useContext(UserContext);
  const [cName, setcName] = useState("wrapper list");
  // State of message
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");
  const [typeMsg, setTypeMsg] = useState("");
  const [titleMsg, setTitleMsg] = useState("");

  const handleMessageClose = () => {
    setOpen(false);
  };

  const createMessage = (title, msg, type) => {
    setMsg(msg);
    setTitleMsg(title);
    setTypeMsg(type);
  };
  // End message

  useEffect(() => {
    new WOW.WOW({ live: false }).init();
  }, []);

  /* Handle Comment Function */
  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const addRating = async (event, newValue) => {
    if (user != null) {
      if (window.confirm("Bạn xác nhận đánh giá route này ?") === true) {
        try {
          let res = await API.post(
            endpoints["rating"](routerId),
            {
              rating: newValue,
            },
            {
              headers: {
                Authorization: `Bearer ${cookies.load("access_token")}`,
              },
            }
          );
          if (res.status === 200 || res.status === 201) {
            setOpen(true);
            createMessage(
              "Thành công",
              "Đánh giá route thành công !",
              "success"
            );
            setRating(newValue);
          }
        } catch (error) {
          setOpen(true);
          createMessage("Lỗi", "Đánh giá route thất bại !", "error");
          console.error(error);
        }
      }
    } else {
      setOpen(true);
      createMessage(
        "Cảnh báo",
        "Hãy đăng nhập để có thể đánh giá !",
        "warning"
      );
    }
  };

  const addComment = async (event) => {
    event.preventDefault();
    if (user != null) {
      try {
        let res = await API.post(
          endpoints["add-comment-route"](routerId),
          {
            content: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${cookies.load("access_token")}`,
            },
          }
        );

        if (res.status === 201) {
          listComment.push(res.data);
          setListComment(listComment);
          setCommentChange(listComment.length);
          setComment("");

          setOpen(true);
          createMessage(
            "Thành công",
            "Đăng bình luận route thành công !",
            "success"
          );
        }
      } catch (error) {
        console.error(error);
        setOpen(true);
        createMessage("Lỗi", "Đăng bình luận route thất bại !", "error");
      }
    } else {
      setOpen(true);
      createMessage(
        "Cảnh báo",
        "Hãy đăng nhập để có thể bình luận !",
        "warning"
      );
    }
  };
  /* End Comment Function */
  // if (route.length === 0) {
  //     return <PreLoader />
  // }

  const [listRouteDetail, setListRouteDetail] = useState([]);
  const [listTypeBus, setListTypeBus] = useState([]);
  const [sortType, setSortType] = useState();
  const [timeState, setTimeState] = useState();
  const [typeBusState, setTypeBusState] = useState([0].value);
  const [check, setCheck] = useState();
  const [seat, setSeat] = useState([]);
  const [placeFrom, setPlaceFrom] = useState();
  const [timeTableID, setTimeTableID] = useState();
  const [step, setStep] = useState(1);
  const [classStep, setClassStep] = useState([
    { class: "current-step" },
    { class: "current-step" },
    { class: "next-step" },
    { class: "empty-step" },
  ]);
  const [classTitle, setClassTitle] = useState([
    { class: "active-title" },
    { class: "active-title" },
    { class: "next-title" },
    { class: "next-title" },
  ]);
  const [classLine, setClassLine] = useState([
    { class: "current-line" },
    { class: "current-line" },
    { class: "next-line" },
  ]);
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    number: "",
    email: "",
    tinh: "",
    huyen: "",
  });
  const [total, setTotal] = useState();
  const [station, setStation] = useState({ stationFrom: "", stationTo: "" });
  const [choosen, setChoosen] = useState(1);

  const [q] = useSearchParams();
  const [fromGarage, setFromGarage] = useState();
  const [toGarage, setToGarage] = useState();

  useEffect(() => {
    let loadListRouteDetail = async () => {
      let res = await API.get(endpoints["time-table"]);
      setListRouteDetail(res.data);

      let router = await API.get(endpoints["route-detail"](routerId));

      setFromGarage(router.data.city_from.name);
      setToGarage(router.data.to_garage.name);

      let typeBus = await API.get(endpoints["type-bus"]);
      setListTypeBus(typeBus.data);
    };

    loadListRouteDetail();
  }, []);

  const setChoosenState = (id) => {
    setChoosen(id);
  };

  const setStationState = (stationFrom, stationTo) => {
    const data = {
      stationFrom: stationFrom,
      stationTo: stationTo,
    };
    setStation(data);
  };

  const setTotalState = (total) => {
    setTotal(total);
  };

  const setUserInfoState = (id, name, number, email, tinh, huyen) => {
    const data = {
      id: id,
      name: name,
      number: number,
      email: email,
      tinh: tinh,
      huyen: huyen,
    };
    setUserInfo(data);
  };

  const setClassStepState = (step) => {
    let newClassStep = classStep;
    for (var i = 0; i < 4; i++) {
      if (i <= step) {
        newClassStep[i].class = "current-step";
      }
      if (i === step + 1) {
        newClassStep[i].class = "next-step";
      }
      if (i > step + 1) {
        newClassStep[i].class = "empty-step";
      }
    }
    setClassStep(newClassStep);
  };

  const setClassTitleState = (step) => {
    let newClassTitle = classTitle;
    for (var i = 0; i < 4; i++) {
      if (i <= step) {
        newClassTitle[i].class = "active-title";
      }
      if (i > step) {
        newClassTitle[i].class = "next-title";
      }
    }
    setClassTitle(newClassTitle);
  };

  const setClassLineState = (step) => {
    let newClassLine = classLine;
    for (var i = 0; i < 3; i++) {
      if (i <= step) {
        newClassLine[i].class = "current-line";
      }
      if (i > step) {
        newClassLine[i].class = "next-line";
      }
    }
    setClassLine(newClassLine);
  };

  const setStepState = (value) => {
    setStep(step + value);
    setClassStepState(step + value);
    setClassTitleState(step + value);
    setClassLineState(step + value);
  };

  const setPlaceFromState = (place) => {
    setPlaceFrom(place);
  };

  const setTimeTableIDState = (id) => {
    setTimeTableID(id);
  };

  const setChecked = (checked) => {
    setCheck(checked);
  };

  const setSeatSubmit = (seatSubmit) => {
    setSeat(seatSubmit);
  };

  const clearSeatSubmit = () => {
    setSeat([]);
  };

  const element = listRouteDetail.filter(
    (c) => c.busRouteID.routeID.id == routerId
  );

  const sortByTypeBus = element.filter(function(c) {
    if (typeBusState === "0" || typeBusState === undefined) {
      return c;
    } else {
      return c.busRouteID.busID.typeBusID.id == typeBusState;
    }
  });

  const sorted = sortByTypeBus.filter(function(c) {
    if (timeState === undefined || timeState === "-1") {
      return c;
    } else {
      const timeStart = parseInt(timeState);
      const timeEnd = parseInt(timeState) + 6;
      return (
        parseInt(c.time.split(":")[0]) > timeStart &&
        parseInt(c.time.split(":")[0]) <= timeEnd
      );
    }
  });

  const sortByType = sorted.sort((a, b) => {
    if (sortType == "0") {
      return 0;
    }
    if (sortType == "asc") {
      return 1;
    }
    if (sortType == "desc") {
      return -1;
    }
  });

  return (
    <>
      <section
        className="page-title style-three"
        style={{ backgroundImage: `url(${advice1})` }}
      >
        <div className="auto-container">
          <div
            className="inner-box wow fadeInDown animated animated"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <div className="rating">
              <span>
                <i className="fas fa-star"></i>3{/* {route.rating} */}
              </span>
            </div>
            <h2 style={{ width: "750px" }}>
              {/* {route.route_name} */}
              {fromGarage} - {toGarage}
            </h2>
            <h3>
              {/* <NumberFormat
                            value={route.price_of_route}
                            displayType={'text'}
                            thousandSeparator={true}
                            // prefix={'$'}
                            style={{color:'orange',fontSize:'50px'}}
                            />đ / 1 người */}
            </h3>
          </div>
        </div>
      </section>

      <section className="tour-details">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-8 col-md-12 col-sm-12 content-side">
              <div
                className="tour-details-content"
                style={{ padding: "20px 0px" }}
              >
                {step === 1 ? (
                  <div>
                    <section
                      className="tours-page-section"
                      style={{ padding: "10px 0px 0px 0px" }}
                    >
                      <div className="auto-container">
                        <div className="row clearfix">
                          <div className="col-lg-12 col-md-12 col-sm-12 content-side">
                            <div className="item-shorting clearfix">
                              <div className="left-column pull-left">
                                <div>
                                  <h3>Search </h3>
                                </div>
                              </div>
                              <div className="right-column pull-right clearfix">
                                <div className="short-box clearfix">
                                  <FormControl sx={{ m: 0, minWidth: 140 }}>
                                    <InputLabel id="select-sort-label">
                                      Sort by price
                                    </InputLabel>
                                    <Select
                                      labelId="select-sort-label"
                                      id="sort-select"
                                      onChange={(e) => {
                                        setSortType(e.target.value);
                                      }}
                                      autoWidth
                                      lable="Sắp xếp theo"
                                      inputProps={{
                                        MenuProps: { disableScrollLock: true },
                                      }}
                                    >
                                      <MenuItem value={"asc"}>
                                        Prices go up
                                      </MenuItem>
                                      <MenuItem value={"desc"}>
                                        Prices go down
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                </div>
                                <div className="menu-box">
                                  <FormControl sx={{ m: 0, minWidth: 140 }}>
                                    <InputLabel id="select-sort-label">
                                      Sort by vehicle type
                                    </InputLabel>
                                    <Select
                                      labelId="select-sort-label"
                                      id="sort-select"
                                      onChange={(e) => {
                                        setTypeBusState(e.target.value);
                                      }}
                                      autoWidth
                                      lable="Sắp xếp theo"
                                      inputProps={{
                                        MenuProps: { disableScrollLock: true },
                                      }}
                                    >
                                      {listTypeBus.map((c) => {
                                        return (
                                          <MenuItem
                                            style={{ display: "flex" }}
                                            value={c.id}
                                          >
                                            {c.name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                                </div>
                              </div>
                            </div>
                            <div className={cName}>{/* {routes} */}</div>
                            <div className="pagination-wrapper">
                              <ul className="pagination clearfix">
                                {/* {pages} */}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    {sortByType.length > 0 ? (
                      sortByType.map((c) => {
                        return (
                          <Item
                            setChoosen={setChoosenState}
                            choosen={choosen}
                            timeTableID={setTimeTableIDState}
                            check={setChecked}
                            seatSubmit={setSeatSubmit}
                            placeFrom={setPlaceFromState}
                            step={setStepState}
                            total={setTotalState}
                            station={setStationState}
                            select={check === c.id ? true : false}
                            id={c.id}
                            rate={c.rate}
                            busRouteID={c.busRouteID.id}
                            timeStart={
                              c.time.split(":")[0] + "h:" + c.time.split(":")[1]
                            }
                            timeEnd={
                              parseInt(c.time.split(":")[0]) +
                              6 +
                              "h:" +
                              c.time.split(":")[1]
                            }
                            price={c.busRouteID.price}
                            busType={c.busRouteID.busID.typeBusID.name}
                            busTypeId={c.busRouteID.busID.typeBusID.id}
                            seat={c.seat}
                            stationFrom={c.busRouteID.routeID.city_from.name}
                            stationTo={c.busRouteID.routeID.to_garage.name}
                            date={c.date}
                          ></Item>
                        );
                      })
                    ) : (
                      <h1
                        style={{
                          textAlign: "center",
                          margin: "0",
                          padding: "10px",
                        }}
                      >
                        No rides!!!
                      </h1>
                    )}
                  </div>
                ) : step === 2 ? (
                  <Booking1
                    step={setStepState}
                    clearSeat={clearSeatSubmit}
                    userInfo={setUserInfoState}
                  />
                ) : step === 3 ? (
                  <Booking2
                    step={setStepState}
                    placeFrom={placeFrom}
                    userInfo={userInfo}
                    seat={seat}
                    total={total}
                    station={station}
                    timeTableID={timeTableID}
                  ></Booking2>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
              <div className="default-sidebar tour-sidebar ml-20">
                <div className="sidebar-widget downloads-widget">
                  <div className="form-widget">
                    <div className="widget-title">
                      <h3>Experience the trip</h3>
                    </div>
                    <a
                      href="https://www.youtube.com/watch?v=YncYl8rREqQ&ab_channel=KOYMusicGroup"
                      style={{ color: "#fff" }}
                    >
                      <button type="submit" className="theme-btn">
                        Click Here
                      </button>
                    </a>
                  </div>
                  <div className="widget-title">
                    <h3>Download</h3>
                  </div>
                  <div className="widget-content">
                    <ul className="download-links clearfix">
                      <li>
                        <Link to="/">
                          Guide
                          <i className="fas fa-download"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          Trip documents
                          <i className="fas fa-download"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          Logo & Content
                          <i className="fas fa-download"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="advice-widget">
                  <div
                    className="inner-box"
                    style={{ backgroundImage: `url(${advice1})` }}
                  >
                    <div className="text">
                      <h2>
                        Reduce <br />
                        25% for <br />
                        Dalat trips
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MessageSnackbar
        handleClose={handleMessageClose}
        isOpen={open}
        msg={msg}
        type={typeMsg}
        title={titleMsg}
      />
    </>
  );
}
