import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API, { endpoints } from "../configs/API";
import cookies from "react-cookies";
import { Link } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import WOW from "wowjs";
import Header from "../Layout/Header";
import pageTitle6 from "../assets/img/Bus-Station-High-Quality-Wallpaper.jpg";
import advice1 from "../image/advice/advice-1.jpg";
import MessageSnackbar from "../Components/MessageSnackbar";
import { UserContext } from "../App";

function ArticalDetails(props) {
  const [bus, setBus] = useState([]);
  const [lastestArticals, setLastestArticals] = useState([]);

  const [actionType, setActionType] = useState(1);
  const [stylebtLike, setstylebtLike] = useState(null);
  const [likesChange, setLikesChange] = useState(null);

  const [comment, setComment] = useState("");
  const [listComment, setListComment] = useState([]);
  const [commentChange, setCommentChange] = useState(0);

  const { busId } = useParams();

  const [user, dispatch] = useContext(UserContext);

  // State of message
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    let getArtical = async () => {
      try {
        let res = await API.get(endpoints["bus-details"](busId), {
          headers: {
            Authorization: `Bearer ${cookies.load("access_token")}`,
          },
        });
        setBus(res.data);
        setActionType(res.data.type);
        if (res.data.type === 1 || res.data.type === -1)
          setstylebtLike("outlined");
        else setstylebtLike("contained");
      } catch (error) {
        console.error(error);
      }
    };

    let getComments = async () => {
      try {
        let res = await API.get(endpoints["bus-comments"](busId));
        setListComment(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getArtical();
    getComments();
  }, [busId, commentChange, likesChange]);

  /* Handle like function */
  const addLike = async (event) => {
    if (user != null) {
      let type = null;
      if (actionType === 1 || actionType === -1) {
        type = 0;
        setstylebtLike("contained");
      } else {
        type = 1;
        setstylebtLike("outlined");
      }

      try {
        await API.post(
          endpoints["like"](busId),
          {
            type: type,
          },
          {
            headers: {
              Authorization: `Bearer ${cookies.load("access_token")}`,
            },
          }
        );
        setActionType(type);
        setLikesChange(type);
      } catch (error) {
        console.error(error);
      }
    } else {
      setOpen(true);
      createMessage("Cảnh báo", "Hãy đăng nhập để có thể like", "warning");
    }
  };
  /* End Like Function */

  /* Handle Comment Function */
  const addComment = async (event) => {
    event.preventDefault();
    if (user != null) {
      try {
        let res = await API.post(
          endpoints["add-comment-bus"](busId),
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
          setOpen(true);
          createMessage("Thành công", "Đăng bình luận thành công", "success");

          listComment.push(res.data);
          setListComment(listComment);
          setCommentChange(listComment.length);
          setComment("");
        }
      } catch (error) {
        console.error(error);
        setOpen(true);
        createMessage("Lỗi", "Đăng bình luận thất bại", "error");
      }
    } else {
      setOpen(true);
      createMessage("Cảnh báo", "Hãy đăng nhập để có thể bình luận", "warning");
    }
  };

  // if (artical.length === 0) {
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
            <h1>Chi tiết Nhà xe</h1>
            <p>Khám phá hành trình tuyệt vời tiếp theo của bạn</p>
          </div>
        </div>
      </section>

      <section className="sidebar-page-container">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-8 col-md-12 col-sm-12 content-side">
              <div className="blog-details-content">
                <div className="news-block-one">
                  <div className="inner-box">
                    <div className="lower-content">
                      <div className="category">
                        <Link to="/">
                          <span className="post-date">
                            <i className="fas fa-bus-alt" />
                            {/* {bus.busModel} */}
                          </span>
                        </Link>
                      </div>
                      <h2>{bus.name}</h2>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: `${bus.description}`,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <h2>Tại sao lại đặt xe khách tại Bus Station?</h2>
                <div className="text">
                  <p>
                    Nội thất sang trọng bậc nhất, chỗ ngồi thỏa mái, đầy đủ tiện
                    nghi như khách sạn
                  </p>
                  <p>
                    Tất cả đều là xe đời mới Tất cả những xe đưa rước tại NhaXe
                    đều là xe đời mới để cho du khách có những trải nghiệm tốt
                    nhất trong suốt quá trình di chuyển. Những loại xe đời cũ
                    thường hay gặp các vấn đề như: máy không êm, xe hay bị xóc,
                    điều hòa không tốt, không gian chật hẹp, xe hao tốn nhiên
                    liệu,… Giá cả hợp lý Giá cả luôn là những ưu tiên hàng đầu
                    của du khách nên NhaXe cung cấp những nhà xe uy tín và chất
                    lượng nhất được kí kết hợp đồng rõ ràng giữa 2 bên. Tiết
                    kiệm thời gian Thay vì phải đến tận bến xe, chờ đợi, xếp
                    hàng tốn nhiều công sức để chỉ mua một tấm vé thì chỉ bằng
                    những cú click chuột hay một cuộc gọi điện thoại đơn giản
                    bạn đã có thể sở hữu một tấm vé như mong muốn cho chuyến đi
                    của mình.
                  </p>
                  <p>
                    Vừa đi vừa làm việc thỏa mái
                    <div>Bên cạnh đó các dịch vụ miễn phí trên xe bao gồm:</div>
                    <div>Hướng dẫn</div>
                    <div>Wifi</div>
                    <div>Nước uống</div>
                    <div>Khăn lạnh</div>
                    <div>Đồ ăn nhẹ</div>
                  </p>
                </div>

                <div className="post-share-option clearfix">
                  <div className="text pull-left">
                    <h3>We Are Social On:</h3>
                  </div>
                  <ul className="social-links pull-right clearfix">
                    <li>
                      <Link to="/">
                        <i className="fab fa-facebook-f" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="fab fa-google-plus-g" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="fab fa-twitter" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
              <div className="blog-sidebar default-sidebar ml-20">
                <div className="advice-widget">
                  <div
                    className="inner-box"
                    style={{ backgroundImage: `url(${advice1})` }}
                  >
                    <div className="text">
                      <h2>
                        Get <br />
                        25% Off <br />
                        On New York Tours
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

export default ArticalDetails;

function CommentItem(props) {
  return (
    <div className="comment">
      <figure className="thumb-box">
        <Avatar
          alt="ImageComment"
          src={props.comment.user.avatar}
          sx={{ width: 52, height: 52 }}
        />
      </figure>
      <div className="comment-inner">
        <div className="comment-info clearfix">
          <span className="post-date">{props.comment.created_date}</span>
        </div>
        <p>{props.comment.content}</p>
        <div className="author-comment">
          <span>Bình luận bởi:</span> {props.comment.user.username}
        </div>
      </div>
    </div>
  );
}
