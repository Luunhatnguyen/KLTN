import React, { useEffect, useState } from "react";
import API, { endpoints } from "../configs/API";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import WOW from "wowjs";
import { makeStyles } from "@mui/styles";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import pageTitle6 from "../assets/img/Bus-Station-High-Quality-Wallpaper.jpg";
import advice1 from "../image/advice/advice-1.jpg";
import Header from "../Layout/Header";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

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

function Bill(props) {
  const classes = useStyles();
  let location = useLocation();
  const navigate = useNavigate();

  const [count, setCount] = useState(-1);
  const [listArtical, setListArtical] = useState([]);
  const [lastestArticals, setLastestArticals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  /* Radio Search */
  const colorRadio = {
    color: "black",
    "&.Mui-checked": {
      color: "#ff7c5b",
    },
  };

  const [rate, setRate] = useState("");
  const handleRateChange = (event) => {
    setRate(event.target.value);
    navigate(`/garage/?rate=${event.target.value}`);
  };

  useEffect(() => {
    new WOW.WOW({ live: false }).init();
  }, []);

  useEffect(() => {
    let loadArticals = async () => {
      let query = location.search;
      if (query === "") query = `?page=${page}`;
      else query += `&page=${page}`;

      try {
        let res = await API.get(`${endpoints["buss"]}${query}`);
        console.log(res.data);

        setListArtical(res.data.results);
        setCount(res.data.count);
      } catch (error) {
        console.error(error);
      }
    };
    loadArticals();
  }, [location.search, page]);

  const searchArtical = (event, search = `?q=${searchTerm}`) => {
    event.preventDefault();
    navigate(`/garage/?q=${searchTerm}`);
  };

  let buss = <></>;
  let results = <></>;

  if (listArtical.length !== 0) {
    buss = (
      <>
        {listArtical.map((b) => (
          <ArticalItem key={b.id} bus={b} />
        ))}
      </>
    );
  }

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
          count={Math.ceil(count / 5)}
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );

  // if (listArtical.length === 0 && count === -1) {
  //     return <PreLoader />
  // }

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
      </section>

     
    </>
  );
}

export default Bill;

function ArticalItem(props) {
  const componentDidMount = () => {
    new WOW.WOW({
      live: false,
    }).init();
  };
  return (
    <>

    </>
  );
}
