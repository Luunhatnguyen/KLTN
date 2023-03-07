import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useContext,useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API, { endpoints } from "../configs/API";
import { v4 as uuidv4 } from "uuid";
import WOW from "wowjs";
import NumberFormat from "react-number-format";
import pageTitle5 from "../image/background/page-title-5.jpg";
import PreLoader from "../Components/PreLoader";
import MessageSnackbar from "../Components/MessageSnackbar";
import cookies from "react-cookies";
import { Form } from "react-bootstrap";
import { UserContext } from "../App";

export default function Booking1(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [userff, setUser] = useState([]);
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [tinh, setTinh] = useState("");
  const [huyen, setHuyen] = useState("");
  const [accept, setAccept] = useState(false);
  const [user, dispatch] = useContext(UserContext);

  const userInfo = () => {
    props.userInfo(id, name, number, email, tinh, huyen);
  };

  useEffect(() => {
    let loadUser = async () => {
      setUser(user);
      setName(`${user.first_name} ${user.last_name}`);
      setNumber(user.phone);
      setEmail(user.email);
      setId(user.id);
    };

    loadUser();
  }, []);

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

  return (
    <>
      {/* <section
        className="page-title centred"
        style={{ backgroundImage: `url(${pageTitle5})` }}
      >
        <div className="auto-container">
          <div
            className="content-box wow fadeInDown animated animated"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <h1>Customer information</h1>
            <p>Explore your next great journey</p>
          </div>
        </div>
      </section> */}

      <section className="booking-section booking-process-1">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 content-side">
              <div className="booking-process-content mr-20">
                <ul className="process-label clearfix">
                  <li className="current">
                    <span>1.</span>Customer information
                  </li>
                  <li>
                    <span>2.</span>Payment
                  </li>
                  <li>
                    <span>3.</span>Confirm
                  </li>
                </ul>
                <div className="inner-box">
                  <h3>Contact Info</h3>
                  <form className="processing-form">
                    <div className="row clearfix">
                      <div
                        className="col-lg-6 col-md-6 col-sm-12 column"
                        style={{ marginTop: "-30px" }}
                      >
                        <div className="form-group">
                          <label>First And Last Name</label>
                          <input
                            id="room"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 column"></div>
                      <div
                        className="col-lg-6 col-md-6 col-sm-12 column"
                        style={{ marginTop: "-30px" }}
                      >
                        <div className="form-group">
                          <label>Phone</label>
                          <input
                            id="room"
                            type="text"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div
                        className="col-lg-6 col-md-6 col-sm-12 column"
                        style={{ marginTop: "-30px" }}
                      >
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            id="children"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="notes-container" style={{ marginTop: "-45px" }}>
          <div>
            <p className="info-header">TERMS &amp; NOTES</p>
            <p className="txt">
              (*) Please bring the email containing the ticket code to the
              office to change your ticket to the bus at least before departure
              time
              <span className="high-light">60 minute</span>
              for us to transfer..
            </p>
            <p className="txt">
              (*) Passenger information must be correct, otherwise it will not
              be possible to board the bus or cancel/change tickets.
            </p>
            <p className="txt">
              (*) Customers cannot change/return tickets on New Year's Day (day
              Usually you can change your rights or cancel your ticket
              <span className="high-light">một lần</span>
              only 24 hours before the bus runs), 10% cancellation fee.
            </p>
            <p className="txt">
              (*) If you have transit needs, please contact phone
              <span> 1900 6067 </span>
              before booking. We do not pick up/transfer at these locations The
              shuttle cannot be reached.
            </p>
          </div>
        </div>
        <div>
          <Form.Check
            className="info-check"
            type="checkbox"
            label="Accept the terms and book the ticket"
            onClick={() => setAccept(!accept)}
          />
        </div>

        <div className="booking-nav-buttons" style={{ marginTop: " 20px" }}>
          <div className="left-btns">
            <button
              className="theme-btn"
              onClick={() => {
                props.step(-1);
                props.clearSeat();
              }}
            >
              <i className="fas fa-angle-left" />
              Back
            </button>
          </div>
          {accept === true && name !== "" && number !== "" && email !== "" ? (
            <div
              className="right-btns"
              onClick={() => {
                props.step(1);
                userInfo();
              }}
            >
              <button className="theme-btn confirm">
                Continue
                <i className="fas fa-angle-right" />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <MessageSnackbar
          handleClose={handleMessageClose}
          isOpen={open}
          msg={msg}
          type={typeMsg}
          title={titleMsg}
        />
      </section>
    </>
  );
}
