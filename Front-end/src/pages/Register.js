import React, { useEffect, useRef, useState } from "react";
import API, { endpoints } from "../configs/API";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import WOW from "wowjs";
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
import Header from "../Layout/Header";
import pageTitle9 from "../assets/img/14926f75f7d51ac044ccc0847cfb262f.png";
import shape16 from "../image/shape/shape-16.png";
import shape17 from "../image/shape/shape-17.png";
import MessageSnackbar from "../Components/MessageSnackbar";

export default function Register(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const avatar = useRef();

  const [isCarrier, setIsCarrier] = useState("");
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

  const register = (event) => {
    event.preventDefault();

    let registerUser = async () => {
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("avatar", avatar.current.files[0]);
      formData.append("isCarrier", isCarrier);

      try {
        await API.post(endpoints["users"], formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setOpen(true);
        createMessage(
          "Thành công",
          "Đăng kí thành công. Hãy đăng nhập để sử dụng tài khoản",
          "success"
        );
        navigate("/login");
      } catch (error) {
        console.error(error);
        setOpen(true);
        createMessage("Lỗi", "Đăng kí thất bại.", "error");
      }
    };

    let alphabet_count = 0;
    let number_count = 0;
    for (let i = 0; i < password.length; i++) {
      let c = password.charAt(i);

      if ("A" <= c && c <= "Z") {
        alphabet_count += 1;
      } else if ("a" <= c && c <= "z") {
        alphabet_count += 1;
      } else if ("0" <= c && c <= "9") {
        number_count += 1;
      }
    }

    if (password.length > 7) {
      if (alphabet_count === 0 || number_count === 0) {
        setOpen(true);
        createMessage(
          "Invalid Password",
          "Hãy đặt mật khẩu có cả kí tự chữ và số !",
          "warning"
        );
      } else {
        if (password === confirmPassword) {
          registerUser();
        } else {
          setOpen(true);
          createMessage(
            "Cảnh báo",
            "Mật khẩu xác nhận không chính xác",
            "warning"
          );
        }
      }
    } else {
      setOpen(true);
      createMessage(
        "Invalid Password",
        "Hãy đặt mật khẩu tối thiểu 8 kí tự !",
        "warning"
      );
    }
  };

  return (
    <>
      <Header />
      <section
        className="page-title centred"
        style={{ backgroundImage: `url(${pageTitle9})` }}
      >
        <div className="auto-container">
          <div
            className="content-box wow fadeInDown animated animated"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <h1>Đăng Ký</h1>
            <p>Khám phá hành trình tuyệt vời tiếp theo của bạn</p>
          </div>
        </div>
      </section>
      <section className="register-section sec-pad">
        <div className="anim-icon">
          <div
            className="icon anim-icon-1"
            style={{ backgroundImage: `url(${shape16})` }}
          />
          <div
            className="icon anim-icon-2"
            style={{ backgroundImage: `url(${shape17})` }}
          />
        </div>
        <div className="auto-container">
          <div className="inner-box">
            <div
              className="sec-title centred wow fadeInUp animated animated"
              data-wow-delay="00ms"
              data-wow-duration="1500ms"
            >
              <p>Đăng Ký</p>
              <h2>Kết nối với chúng tôi để có một hành trình tốt hơn</h2>
            </div>
            <div className="form-inner">
              <h3>Đăng Ký với</h3>
              <ul className="social-links clearfix">
                <li>
                  <Link to="/">
                    <span>Đăng Nhập với Facebook _</span>
                    <i className="fab fa-facebook-f" />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <span>Đăng Nhập với Google _</span>
                    <i className="fab fa-google-plus-g" />
                  </Link>
                </li>
              </ul>
              <div className="text">
                <span>Hoặc</span>
              </div>
              <form onSubmit={register} className="register-form">
                <div className="row clearfix">
                  <RegisterForm
                    class="col-lg-6 col-md-6 col-sm-12 column"
                    id="firstname"
                    label="Họ và Đệm"
                    type="text"
                    value={firstName}
                    change={(event) => setFirstName(event.target.value)}
                  />
                  <RegisterForm
                    class="col-lg-6 col-md-6 col-sm-12 column"
                    id="lastname"
                    label="Tên"
                    type="text"
                    value={lastName}
                    change={(event) => setLastName(event.target.value)}
                  />
                  <RegisterForm
                    class="col-lg-12 col-md-12 col-sm-12 column"
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    change={(event) => setEmail(event.target.value)}
                  />
                  <RegisterForm
                    class="col-lg-12 col-md-12 col-sm-12 column"
                    id="phone"
                    label="Phone"
                    type="text"
                    value={phone}
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    required
                    plac
                    change={(event) => setPhone(event.target.value)}
                  />
                  <RegisterForm
                    class="col-lg-12 col-md-12 col-sm-12 column"
                    id="username"
                    label="Tên tài khoản"
                    type="text"
                    value={username}
                    change={(event) => setUsername(event.target.value)}
                  />
                  <RegisterForm
                    class="col-lg-12 col-md-12 col-sm-12 column"
                    id="password"
                    label="Mật khẩu"
                    type="password"
                    value={password}
                    change={(event) => setPassword(event.target.value)}
                  />
                  <RegisterForm
                    class="col-lg-12 col-md-12 col-sm-12 column"
                    id="confirmPass"
                    label="Xác nhận mật khẩu"
                    type="password"
                    value={confirmPassword}
                    change={(event) => setConfirmPassword(event.target.value)}
                  />
                  <div className="col-lg-12 col-md-12 col-sm-12 column">
                    <div className="form-group">
                      <label>Avatar</label>
                      <input type="file" id="avatar" ref={avatar} />
                    </div>
                  </div>
                  <div>
                    <InputLabel id="isCarrier">Loại tài khoảng</InputLabel>
                    <Select
                      id="isCarrier"
                      onChange={(e) => {
                        setIsCarrier(e.target.value);
                      }}
                    >
                      <MenuItem value={"true"}>Nhà xe</MenuItem>
                      <MenuItem value={"false"}>Khách hàng</MenuItem>
                    </Select>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 column">
                    <div className="form-group message-btn">
                      <button type="submit" className="theme-btn">
                        Đăng Ký
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="other-text">
                Đã có sẵn tài khoản? <Link to="/login">Đăng Nhập</Link>
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

function RegisterForm(props) {
  {
    return (
      <>
        <div className={props.class}>
          <div className="form-group">
            <label>{props.label}</label>
            <input
              value={props.value}
              type={props.type}
              id={props.id}
              onChange={props.change}
              required
            />
          </div>
        </div>
      </>
    );
  }
}
