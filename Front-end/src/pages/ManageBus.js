import React, { useEffect, useState, useContext } from "react";
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
import Admin from "./AdminCarrier";
import { UserContext } from "../App";
import { FaMoneyBillWaveAlt, FaBus } from "react-icons/fa";
import Time from "react-time";
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

export default function ManageBus(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const [count, setCount] = useState(-1);
  const [bus, setBus] = useState([]);

  const [cName, setcName] = useState("wrapper list");

  const [page, setPage] = useState(1);
  const classes = useStyles();
  const [user, dispatch] = useContext(UserContext);

  useEffect(() => {
    let loadRouter = async () => {
      let query = location.search;
      if (query === "") query = `?page=${page}`;
      else query += `&page=${page}`;

      try {
        let res = await API.get(endpoints["get_bus_by_carrier"](user.id));
        setBus(res.data);
        setCount(res.data.length);
        // console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadRouter();
  }, [location.search, page]);

  /* End Function Search Tour */

  /* Render tour list */
  let routes = <></>;
  let results = <></>;

  //  CHÚ Ý LỌC CÓ HAY KHÔNG
  routes = (
    <>
      <div className="tour-list-content list-item">
        {bus.map((t) => (
          <RouteItem2 carrier={t} key={t.id} />
        ))}
      </div>
    </>
  );

  results = (
    <>
      <h3>
        Hiển thị {bus.length} trên {count} kết quả chuyến đi
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
  if (bus.length === 0 && count === -1) {
    return <PreLoader />;
  }

  return (
    <>
      <Admin />

      <section className="tours-page-section">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 content-side">
              <div className="item-shorting clearfix">
                <div className="left-column pull-left">{results}</div>
              </div>
              <div className={cName}>{routes}</div>
              <div className="pagination-wrapper">
                <ul className="pagination clearfix">{pages}</ul>
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
            src={props.carrier.image}
            alt="ImageTrip"
          />

          <Link to={`/manageBusDetail/${props.carrier.id}`}>
            <i className="fas fa-link" />
          </Link>
        </figure>
        <div className="content-box">
          <div className="rating">
            <span>
              <i className="fas fa-star" />
              {props.carrier.rating}
            </span>
          </div>

          <h3>
            <Link
              to={`/manageBusDetail/${props.carrier.id}`}
              data-toggle="tooltip"
              title={props.carrier.id}
            >
              <p>{props.carrier.name}</p>
            </Link>
          </h3>
          <Row>
            <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
              {props.carrier.description}
            </p>
          </Row>
          <Row>
            <Col xs={4} style={{ display: "inline-flex" }}>
              <FaBus />
              <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
                Loại xe: {props.carrier.typeBusID.name}
              </p>
            </Col>
            <Col xs={4} style={{ display: "inline-flex" }}>
              <ImCon.ImClock />
              <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
              Ngày tạo: <Time value={props.carrier.created_date} format="DD/MM/YYYY" />
              </p>
            </Col>
          </Row>
          <div className="btn-box">
            <Link to={`/manageBusDetail/${props.carrier.id}`}>Chi Tiết</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
