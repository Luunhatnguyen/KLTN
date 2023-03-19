import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API, { endpoints } from "../configs/API";
import { makeStyles } from "@mui/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Pagination,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import advice1 from "../image/advice/advice-1.jpg";
import PreLoader from "../Components/PreLoader";
import { Col, Form, Row } from "react-bootstrap";
import * as ImCon from "react-icons/im";
import Header from "../Layout/Header";

const buttonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "15px",
          backgroundColor: "#ff7c5b",
          width: "110px",
          height: "45px",
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  ul: {
    "& .css-ax94ij-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected": {
      backgroundColor: "#ff7c5b",
    },
    "& .Mui-selected": {
      color: "#fff",
    },
  },
}));

export default function TourList(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const [count, setCount] = useState(-1);
  const [routeList, setRouteList] = useState([]);

  const [cName, setcName] = useState("wrapper list");

  const [page, setPage] = useState(1);
  const classes = useStyles();
  const [fromGarage, setFromGarage] = useState();
  const [toGarage, setToGarage] = useState();

  const [city, setCity] = useState([]);
  const [sDate, setSDate] = useState([]);

  const [seatStatusPass, setSeatStatusPass] = useState([]);
  const [seatStatusFree, setSeatStatusFree] = useState([]);
  const [seatBooking, setSeatBooking] = useState([]);

  /* Radio Search */
  const colorRadio = {
    color: "black",
    "&.Mui-checked": {
      color: "#ff7c5b",
    },
  };
  const [rate, setRate] = useState("");

  const search = (event) => {
    event.preventDefault();
    if (sDate != "") {
      navigate(`/routed/?search=${fromGarage}to${toGarage}ngày${sDate}`);
    } else {
      navigate(`/routed/?search=${fromGarage}to${toGarage}`);
    }
  };

  useEffect(() => {
    let seatStatus_pass = [];
    let seatStatus_free = [];
    let seatt = [];
    
    let loadRouter = async () => {
      let query = location.search;
      if (query === "") query = `?page=${page}`;
      else query += `&page=${page}`;

      try {
        let res = await API.get(`${endpoints["router"]}${query}`);
        console.log(res.data);

        setRouteList(res.data.results);
        setCount(res.data.count);

        let cities = await API.get(endpoints["city"]);
        setCity(cities.data);

        let seatBookingDetails = await API.get(
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
      } catch (error) {
        console.error(error);
      }
    };
    loadRouter();
  }, [location.search, page]);

  const handleRateChange = (event) => {
    setRate(event.target.value);
    navigate(`/route-list/?rate=${event.target.value}`);
  };
  /* End Function Search Tour */

  /* Render tour list */
  let routes = <></>;
  let results = <></>;

  //  CHÚ Ý LỌC CÓ HAY KHÔNG
  routes = (
    <>
      <div className="tour-list-content list-item">
        {routeList.map((t) => (
          <RouteItem2
            route={t}
            key={t.id}
            name={`${t.city_from.name} - ${t.to_garage.name}`}
            id={t.id}
          />
        ))}
      </div>
    </>
  );

  results = (
    <>
      <h3>
        Hiển thị {routeList.length} trên {count} kết quả chuyến đi
      </h3>
    </>
  );

  // Pagination
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  let pages = (
    <>
      <Stack spacing={2}>
        <Pagination
          classes={{ ul: classes.ul }}
          variant="outlined"
          size="large"
          count={Math.ceil(count / 6)}
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );
  /* End Render */
  if (routeList.length === 0 && count === -1) {
    return <PreLoader />;
  }

  return (
    <>
      <Header />
      <section
        className="page-title style-two centred"
        style={{
          backgroundImage:
            "url(" +
            require("../assets/img/yokohama-bus-1f-1280x800.jpg") +
            ")",
        }}
      >
        <div className="auto-container">
          <div
            className="content-box wow fadeInDown animated animated"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <h1>Danh sách chuyến đi</h1>
            <p>Khám phá hành trình tuyệt vời tiếp theo của bạn</p>
          </div>
        </div>
      </section>

      <section className="tours-page-section">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-8 col-md-12 col-sm-12 content-side">
              <div className="item-shorting clearfix">
                <div className="left-column pull-left">{results}</div>
              </div>
              <div className={cName}>{routes}</div>
              <div className="pagination-wrapper">
                <ul className="pagination clearfix">{pages}</ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
              <div className="default-sidebar tour-sidebar ml-20">
                <div className="sidebar-widget sidebar-search">
                  <div className="widget-title">
                    <h3>Tìm</h3>
                  </div>
                  <form onSubmit={search} className="search-form">
                    <div className="form-group">
                      <Form.Group>
                        <h4>Điểm đi</h4>
                        <Form.Select
                          value={fromGarage}
                          onChange={(e) => setFromGarage(e.target.value)}
                        >
                          <option value="0" selected="selected">
                            Điểm đi
                          </option>
                          {city.map((c) => {
                            return <option value={c.name}>{c.name}</option>;
                          })}
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="form-group">
                      <Form.Group>
                        <h4 style={{marginTop:"10px"}}>Điểm đến</h4>
                        <Form.Select
                          value={toGarage}
                          onChange={(e) => setToGarage(e.target.value)}
                        >
                          <option value="0" selected="selected">
                            Điểm đến  
                          </option>

                          {city.map((c) => {
                            return <option value={c.name}>{c.name}</option>;
                          })}
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="form-group">
                      <Form.Group>
                        <h4 style={{marginTop:"10px"}}>Ngày đi</h4>
                        <Form.Control
                          type="date"
                          getDate
                          value={sDate}
                          onChange={(e) => setSDate(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </div>
                    <Box className="box_tim">
                      <ThemeProvider theme={buttonTheme}>
                        <Button
                          color="warning"
                          variant="contained"
                          type="submit"
                          startIcon={<SearchIcon />}
                        >
                          Tìm
                        </Button>
                      </ThemeProvider>
                    </Box>
                  </form>
                </div>
                <div className="sidebar-widget review-widget">
                  <div className="widget-title">
                    <h3>Đánh giá</h3>
                  </div>
                  <div className="widget-content">
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="duration"
                        name="controlled-radio-buttons-group"
                        value={rate}
                        onChange={handleRateChange}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio sx={colorRadio} />}
                          label="1 sao"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio sx={colorRadio} />}
                          label="2 sao"
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio sx={colorRadio} />}
                          label="3 sao"
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio sx={colorRadio} />}
                          label="4 sao"
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio sx={colorRadio} />}
                          label="5 sao"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
                <div className="advice-widget">
                  <div
                    className="inner-box"
                    style={{
                      backgroundImage: `url(${advice1})`,
                    }}
                  >
                    <div className="text">
                      <h2>
                        Giảm <br />
                        25% cho <br />
                        các chuyến đi Bình Định
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
function RouteItem2(props) {
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
            src={props.route.image}
            alt="ImageTrip"
          />

          <Link to={`/route-detail/${props.id}`}>
            <i className="fas fa-link" />
          </Link>
        </figure>
        <div className="content-box">
          <div className="rating">
            <span>
              <i className="fas fa-star" />
              {props.route.rating}
            </span>
          </div>

          <h3>
            <Link
              to={`/route-detail/${props.id}`}
              data-toggle="tooltip"
              title={props.route.id}
            >
              <p>{props.name}</p>
            </Link>
          </h3>

          <Row>
            <Col xs={4} style={{ display: "inline-flex" }}>
              <ImCon.ImLocation />
              <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
                {props.route.distance}km
              </p>
            </Col>
            <Col xs={4} style={{ display: "inline-flex" }}>
              <ImCon.ImClock />
              <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
                {props.route.hours}h
              </p>
            </Col>
          </Row>
          <div className="btn-box">
            <Link to={`/route-detail/${props.id}`}>Chi Tiết</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
