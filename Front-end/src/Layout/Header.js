import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "../App";
import cookies from "react-cookies";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LoginIcon from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import travellogo from "../assets/img/street-sign-direction-way-to-bus-station-street-sign-to-bus-station-151472383.jpg";

const Header = (props) => {
  const nav = useNavigate();
  const [isPopUp, setPopup] = useState("true");
  const [user, dispatch] = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);

  const logout = (event) => {
    event.preventDefault();
    cookies.remove("access_token");
    cookies.remove("current_user");
    dispatch({ type: "logout" });
    nav("/");
  };

  /* Account Menu */
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Menu Header
  let menuHeader = (
    <>
      <li className="dropdown">
        <NavLink activeClassName="is-current" to="/" exact={true}>
          Trang Chủ
        </NavLink>
      </li>
      <li className="dropdown">
        <NavLink activeClassName="is-current" to="/route-list/">
          Chuyến Đi
        </NavLink>
      </li>
      <li className="dropdown">
        <NavLink activeClassName="is-current" to="/garage">
          Hãng Xe
        </NavLink>
      </li>
      <li className="dropdown">
        <NavLink activeClassName="is-current" to="/about-us">
          Thông Tin
        </NavLink>
      </li>
      <li className="dropdown">
        <NavLink activeClassName="is-current" to="/contact">
          Liên Hệ
        </NavLink>
      </li>
      <li className="dropdown">
        <NavLink activeClassName="is-current" to="/bill">
          Hóa Đơn
        </NavLink>
      </li>
    </>
  );

  let btMenuAccount = (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Tài Khoản">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 56, height: 56 }}>
              <i className="far fa-user" />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );

  let menuAccount = (
    <MenuItem>
      <ListItemIcon>
        <LoginIcon fontSize="small" />
      </ListItemIcon>
      <NavLink
        activeClassName="is-current"
        to="/register"
        style={{ color: "black" }}
      >
        Đăng Ký
      </NavLink>
    </MenuItem>
  );
  let mobileMenuAccount = (
    <>
      <li className="dropdown">
        <NavLink activeClassName="is-current" to="/register">
          Đăng Ký
        </NavLink>
      </li>
    </>
  );

  let infoAccount = (
    <MenuItem>
      <Avatar /> Tài Khoản
    </MenuItem>
  );
  // When user is logged
  if (user !== null && user !== undefined) {
    menuAccount = (
      <MenuItem onClick={logout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    );

    mobileMenuAccount = (
      <>
        <li className="dropdown">
          <Link to="/">{user.username}</Link>
        </li>
        <li className="dropdown">
          <Link to="/" onClick={logout}>
            Đăng xuất
          </Link>
        </li>
      </>
    );

    infoAccount = (
      <MenuItem>
        <Avatar
          alt="Avatar"
          src={user.avatar_path}
          sx={{ width: 32, height: 32 }}
        />
        {user.username}
      </MenuItem>
    );
  }
  /* End Account Menu */

  // Add and Remove class mobile-menu from <body></body>
  useEffect(() => {
    document.body.classList.toggle("mobile-menu-visible", isOpen);
  }, [isOpen]);

  let replaceRightPart = ( //phan nay la default right part header
    <>
      {/* <NavLink
        to="/"
        className="login-right-header hover"
        onClick={() => {
          setOpenModalSignIn(true);
        }}
      >
        Log in
      </NavLink>
      <NavLink
        to="/"
        className="signout-right-header hover"
        onClick={() => {
          setOpenModalSignOn(true);
        }}
      >
        Sign on
      </NavLink> */}
    </>
  );

  const ToggleClass = () => {
    setPopup(!isPopUp);
  };

  if (user != null) {
    // console.log(user);
    replaceRightPart = (
      <>
        <div href="#" className="login-right-header">
          {user.username}
        </div>
        <div className="signout-right-header">
          <div className="user-Header-avatarContainer" onClick={ToggleClass}>
            <img
              src={user.avatar_path}
              alt="avatar-user"
              className="user-Header-avatar"
            />
          </div>
          <div
            className={
              isPopUp ? "user-popup-header" : "user-popup-header showPopup"
            }
          >
            <a href="#" className="user-popup-header--logout" onClick={logout}>
              Đăng Xuất
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <header className="main-header style-three">
        <div className="header-lower">
          <div className="outer-box clearfix">
            <div className="menu-area pull-left clearfix">
              <div className="logo-box">
                <figure className="logo">
                  <Link to="/">
                    <img src={travellogo} alt="ImageLogo" />
                  </Link>
                </figure>
              </div>
              <div
                className="mobile-nav-toggler"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <i className="icon-bar" />
                <i className="icon-bar" />
                <i className="icon-bar" />
              </div>

              <nav className="main-menu navbar-expand-md navbar-light">
                <div
                  className="collapse navbar-collapse show clearfix"
                  id="navbarSupportedContent"
                >
                  <ul className="navigation clearfix">{menuHeader}</ul>
                </div>
              </nav>
            </div>

            <ul className="menu-right-content pull-right clearfix">
              <li className="search-box-outer">{btMenuAccount}</li>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 26,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                disableScrollLock={true}
              >
                {infoAccount}
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <LoginIcon fontSize="small" />
                  </ListItemIcon>
                  <NavLink
                    activeClassName="is-current"
                    to="/login"
                    style={{
                      color: "black",
                    }}
                  >
                    Đăng Nhập
                  </NavLink>
                </MenuItem>
                {menuAccount}

                <MenuItem>
                  <ListItemIcon>
                    <ChangeCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <NavLink
                    activeClassName="is-current"
                    to="/change-password"
                    style={{ color: "black" }}
                  >
                    Đổi mật khẩu
                  </NavLink>
                </MenuItem>
              </Menu>
            </ul>
          </div>
        </div>

        {/* narbar translate  */}

        {/* <div className="sticky-header">
          <div className="auto-container">
            <div className="outer-box">
              <div className="logo-box">
                <figure className="logo">
                  <Link to="/">
                    <img src={travellogo} alt="ImageLogo" />
                  </Link>
                </figure>
              </div>
              <div className="menu-area">
                <nav className="main-menu clearfix">
                  <div
                    className="collapse navbar-collapse show clearfix"
                    id="navbarSupportedContent"
                  >
                    <ul className="navigation clearfix">{menuHeader}</ul>
                  </div>
                </nav>
              </div>
              <ul className="menu-right-content clearfix">
                <li className="search-box-outer">{btMenuAccount}</li>
              </ul>
            </div>
          </div>
        </div> */}
      </header>

      <div className="mobile-menu">
        <div
          className="menu-backdrop"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        ></div>

        <div
          className="nav__mobile-close close-btn"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <i className="fas fa-times" />
        </div>

        <nav className="menu-box">
          <div className="nav-logo">
            <Link to="/">
              <img src={travellogo} alt="ImageLogo" />
            </Link>
          </div>
          <div className="menu-outer">
            <div
              className="collapse navbar-collapse show clearfix"
              id="navbarSupportedContent"
            >
              <ul className="navigation clearfix">
                {menuHeader}
                <li className="dropdown">
                  <NavLink activeClassName="is-current" to="/login">
                  Đăng Nhập
                  </NavLink>
                </li>
                {mobileMenuAccount}
              </ul>
            </div>
          </div>

          <div className="contact-info">
            <h4>Thông tin liên lạc</h4>
            <ul>
              <li>242 Hà Huy Giáp, Quận 12, Hồ Chí Minh</li>
              <li>
                <Link to="tel:+0354444899">0354444899</Link>
              </li>
              <li>
                <Link to="mailto:nhatnguyen.01102001@gmail.com">
                  nhatnguyen.01102001@gmail.com
                </Link>
              </li>
            </ul>
          </div>
          <div className="social-links">
            <ul className="clearfix">
              <li>
                <Link to="/">
                  <span className="fab fa-twitter"></span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <span className="fab fa-facebook-square"></span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <span className="fab fa-pinterest-p"></span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <span className="fab fa-instagram"></span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <span className="fab fa-youtube"></span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
